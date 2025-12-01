
import numpy as np
from langchain.docstore.document import Document
from langchain_huggingface import HuggingFaceEmbeddings
from nltk.tokenize import sent_tokenize
from pinecone import Pinecone
import requests
import warnings
from fastapi import FastAPI, Form, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import PyPDF2
import os
from huggingface_hub import InferenceClient
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline
from datasets import load_dataset
import soundfile as sf
import torch
import re
from pydub import AudioSegment
from fastapi import BackgroundTasks
from pymongo import MongoClient
from typing import List, Optional, Dict
from fastapi.encoders import jsonable_encoder
from bson import ObjectId
import shutil
import cv2
import pytesseract
import subprocess
import tempfile
import librosa
import noisereduce as nr

#from transformers import TrOCRProcessor, VisionEncoderDecoderModel
#from PIL import Image

def connect_to_mongo():
    client = MongoClient("mongodb://localhost:27017/")
    db = client["school_management"]
    return db

db = connect_to_mongo()

# db stuff
class LoginModel(BaseModel):
    email: str
    password: str
    is_guardian : bool

class ChatModel(BaseModel):
    student_id: int
    guardian_id: int
    chat_content: List[dict]  # List of JSON objects for chat content

# Guardian summary
class ReportText(BaseModel):
    text: str

class ProcessPdfQuery(BaseModel):
    query: str
    file_path: Optional[str]

# EVAL
class QuestionRequest(BaseModel):
    num: int
    file_path: Optional[str]

class QuestionResponse(BaseModel):
    questions: list

class QuizSubmission(BaseModel):
    selected_answers: Dict[int, str]
    correct_answers: List[str]
    time_taken: int
    score: int

def convert_objectid(doc):
    """
    Recursively converts ObjectId fields to string in a document.
    """
    if isinstance(doc, list):
        return [convert_objectid(d) for d in doc]
    elif isinstance(doc, dict):
        return {k: str(v) if isinstance(v, ObjectId) else convert_objectid(v) for k, v in doc.items()}
    else:
        return doc

def login_user(email: str, password: str, is_guardian: bool):
    collection = "guardians"
    if is_guardian:
        user = db[collection].find_one({"Guardian_email": email})
        if not user or user.get("Guardian_password") != password:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        user = convert_objectid(user)  # Convert ObjectId fields to strings
        return {
            "user": user,
            "role": "guardian"
        }
    else:
        guardian = db[collection].find_one({"Students.Student_email": email})
        if not guardian:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        student = next((s for s in guardian["Students"] if s["Student_email"] == email and s["Student_password"] == password), None)
        if not student:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        student = convert_objectid(student)  # Convert ObjectId fields to strings
        return {
            "user": student,
            "role": "student"
        }



UPLOAD_DIR = "uploaded_files"
UPLOAD_DIR_VN = "uploaded_vns"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(UPLOAD_DIR_VN, exist_ok=True)

stt_bool = False
warnings.filterwarnings("ignore")
API_KEY = "Bearer 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"
pc_api_key = "pcsk_31Tgvd_AJhUWXnW9h8uYe33aTYaVw6RdsBd4RkmCs4dr42g9G2UeNQnkaHY6qC4HyXNbFS"
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
pc = Pinecone(api_key=pc_api_key)
API_URL = "HuggingFaceTB/SmolLM2-1.7B-Instruct"
summarizer_model = "https://api-inference.huggingface.co/models/philschmid/bart-large-cnn-samsum"
# Global variable to store quiz data
global_quiz_data = {
    "file": None,
    "questions": None,
    "difficulty": None,
    "time": None
}

# Initialize the Hugging Face Inference Client for VTT
client_vtt = InferenceClient(
    api_key="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",
)


# Initialize the Hugging Face client for EVAL MODE
client_eval = InferenceClient(
    provider="hyperbolic", 
    api_key="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"
)

client = InferenceClient(
    provider="together",
    api_key="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"
)

client_asr = InferenceClient(
    api_key="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"
)
headers = {"Authorization": API_KEY}
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*","http://localhost:3000/"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],   
    allow_headers=["*"],  
)

chunk_size = 3  
chunk_overlap = 1  

# Img to Text Pipeline

class ExtractTextTesseract:
    """Extract text from images using Tesseract OCR."""
    def __init__(self):
        pass
    
    def __call__(self, image_path):
        img = cv2.imread(image_path)
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        # Set the path to the Tesseract executable
        # pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'  # Update this path as necessary
        text = pytesseract.image_to_string(img_rgb)
        return text

# *************************** IMG TO TEXT ENDS HERE *******************************************************

# *************************** VIDEO TO TEXT STARTS HERE ***************************************************

# Function to extract audio from video
def extract_audio_from_video(video_path, audio_output_path):
    try:
        
        command = [
            'ffmpeg',
            '-y',
            '-i', video_path,
            '-ar', '16000',     # Set sample rate to 16000 Hz
            '-ac', '1',         # Set audio channels to 1 (mono)
            '-acodec', 'pcm_s16le',  # Set audio codec to PCM 16 bits, little-endian
            audio_output_path
        ]
        # command = ['ffmpeg', '-i', video_path, '-vn', '-acodec', 'copy', audio_output_path]
        subprocess.run(command, check=True, stderr=subprocess.PIPE)
        print(f"Audio successfully extracted to {audio_output_path}")
    except subprocess.CalledProcessError as e:
        print(f"An error occurred: {e.stderr.decode()}")

def denoise(audio_path, output_path):
    # Load audio using SoundFile if possible for better handling of file formats
    data, sr = sf.read(audio_path)
    
    # Reduce noise
    reduced_noise = nr.reduce_noise(y=data, sr=sr)
    sf.write(output_path, reduced_noise, sr)
    
# Function to split audio into manageable chunks
def split_audio(audio_path, chunk_length_ms=30000):
    audio = AudioSegment.from_file(audio_path)
    chunks = [audio[i:i + chunk_length_ms] for i in range(0, len(audio), chunk_length_ms)]
    return chunks

# Function to transcribe a single audio chunk using Hugging Face Inference API
def transcribe_chunk(chunk, start_time_s):
    # Create a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_file:
        temp_chunk_path = temp_file.name
        # Export the chunk to the temporary file
        chunk.export(temp_chunk_path, format="wav")
        result = client_asr.automatic_speech_recognition(temp_file.name, model="openai/whisper-base")
        transcription = result['text']

    os.remove(temp_chunk_path)
    return {"text": transcription, "start_time": start_time_s}

# Main function to handle the Whisper transcription without timestamps
def whisper_main(audio_path):
    chunks = split_audio(audio_path)
    all_transcriptions = []
    
    for i, chunk in enumerate(chunks):
        start_time_s = i * 30  # Still calculating start time for internal logic if needed
        transcription = transcribe_chunk(chunk, start_time_s)
        all_transcriptions.append(transcription['text'])  # Append only text

    print("Before join")
    # Compile the final transcription
    final_transcription = " ".join(all_transcriptions)  # Create a single string of all transcriptions
    print("After join")

    return final_transcription

# Main execution function remains the same
def main_vtt(video_path):
    # Paths for audio processing
    output_path = "backend\\vtt_saves\\output_audio.wav"
    output_path_denoised = "backend\\vtt_saves\\denoised_audio.wav"
    
    # Extract and denoise audio
    extract_audio_from_video(video_path, output_path)
    denoise(output_path, output_path_denoised)
    
    # Process transcription with Whisper API
    trans = whisper_main(output_path_denoised)
    return trans

# ***************************** VIDEO TO TEXT ENDS HERE ****************************************************

# ***************************** EVAL MODE CORE LOGIC STARTS HERE ****************************************************

def generate_questions(text, num_questions):
    # Explicitly instructing the model to generate a question and four options
    prompt = (f"Based on the text provided, generate {num_questions} multiple-choice questions. "
              f"For each question, provide one clearly correct answer and three plausible but incorrect options. "
              f"Here is the text: {text}")

    messages = [
        {"role": "system", "content": prompt}
    ]
    # Request to generate MCQs
    response = client_eval.chat.completions.create(
        model="deepseek-ai/DeepSeek-R1", 
        messages=messages, 
        max_tokens=1000,  # Adjust based on the need
    )

    # Directly using the response if it's already a dictionary
    mcqs = []
    if response.choices:
        choice = response.choices[0]
        if 'message' in choice:
            mcqs = choice['message']  # Direct use without json.loads

    return mcqs


# Function to process generated questions
def process_questions(content: str):
    questions = []
    parts = content.split("**Question")

    for part in parts[1:]:
        question_parts = part.split("**Correct Answer:")
        if len(question_parts) < 2:
            continue

        question_text = question_parts[0].strip()
        correct_answer_text = question_parts[1].split("\n")[0].strip().lstrip('* ').lstrip('**')
        correct_answer_text = correct_answer_text[correct_answer_text.find(')') + 1:].strip() if ')' in correct_answer_text else correct_answer_text

        question_lines = question_text.split("\n")
        question = question_lines[1].strip('**').strip()
        options = [line.strip('* ').strip() for line in question_lines[2:] if line.strip()]
        options = [option[option.find(')') + 1:].strip() if ')' in option else option for option in options]

        correct_option_index = next((i for i, option in enumerate(options) if option == correct_answer_text), None)

        questions.append({
            'question': question,
            'options': options,
            'correct_answer': correct_answer_text,
            'correct_option_index': correct_option_index + 1  # Make it human-readable (1-based index)
        })

    return questions

# ***************************** EVAL MODE CORE LOGIC ENDS HERE ****************************************************

# ***************************** STT CORE STARTUP STARTS HERE ****************************************************
helloer = """
model_id2 = "openai/whisper-large-v3"
model2 = AutoModelForSpeechSeq2Seq.from_pretrained(
    model_id2, low_cpu_mem_usage=False, use_safetensors=True
)
processor = AutoProcessor.from_pretrained(model_id2)
pipe = pipeline(
    "automatic-speech-recognition",
    model=model2,
    tokenizer=processor.tokenizer,
    feature_extractor=processor.feature_extractor
)
"""
# ***************************** STT CORE STARTUP ENDS HERE ****************************************************

#text = """Neural networks, a subset of machine learning, are computational models inspired by the human brain's neural structure. They consist of layers of nodes (neurons) connected by weighted edges, where each node processes input data through an activation function and passes it to the next layer. These networks are primarily used for tasks like classification, regression, and pattern recognition. The most basic form, the feedforward neural network, processes data in one direction from input to output layers. More advanced architectures include convolutional neural networks (CNNs), which excel at image processing by learning spatial hierarchies, and recurrent neural networks (RNNs), designed for sequence data such as time series or natural language. Training a neural network involves adjusting the weights using optimization algorithms like gradient descent, where backpropagation calculates the error gradient to refine these weights, improving the network's predictions. Neural networks, especially deep learning models, require vast amounts of data and computational power, but once trained, they can perform highly complex tasks, from object recognition to language translation, with remarkable accuracy. Their ability to automatically learn features from raw data has made them a cornerstone of modern AI, transforming industries ranging from healthcare to finance by enabling systems to make decisions and predictions based on previously unattainable levels of insight."""

def extract_text_from_pdf(pdf_file):
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = ''
    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]
        text += page.extract_text()  
    return text

def tokenizer(text):
    sentences = sent_tokenize(text)
    return sentences

def create_sentence_chunks(sentences, chunk_size, chunk_overlap):
    chunks = []
    
    for i in range(0, len(sentences), chunk_size - chunk_overlap):
        chunk = ' '.join(sentences[i:i + chunk_size])
        chunks.append(chunk)
        if i + chunk_size >= len(sentences):
            break
    
    return chunks

def docer(sentence_chunks):
    documents = [Document(page_content=chunk) for chunk in sentence_chunks]
    return documents


def pad_embedding(embedding, target_dim=512):
    if not isinstance(embedding, np.ndarray):
        embedding = np.array(embedding)
    
    current_dim = embedding.shape[-1]
    if current_dim < target_dim:
        padding = np.zeros(target_dim - current_dim)
        padded_embedding = np.concatenate([embedding, padding])
    else:
        padded_embedding = embedding
    
    return padded_embedding

def extract_embeddings(df):
    all_embeddings = []
    for text in df:
        embedding = embeddings.embed_query(text)
        padded_embedding = pad_embedding(embedding, target_dim=512)
        all_embeddings.append(padded_embedding)
    
    return all_embeddings


def insert_to_vdb(documents, embeddings):

    index = pc.Index(name="fyp-kinetikids")
    document_contents = [doc.page_content for doc in documents]
    embeddings_list = [embeddings.embed_query(text) for text in document_contents]

    values = [
        (str(i), emb, {"text": document_contents[i]})  
        for i, emb in enumerate(embeddings_list)
    ]

    index.upsert(vectors=values)
    return index

def get_new_input(query_text, index, embeddings):

    query_embedding = embeddings.embed_query(query_text)
    response = index.query(
        vector=query_embedding,
        top_k=1,  # Number of closest vectors to return
        include_values=True,  
        include_metadata=True  
    )
    context = ''
    for match in response["matches"]:
        context = context + match['metadata']['text']
    
    print(context)

    system_prompt = "You are a friendly chatbot who always has a positive attitude. You are here to help customers with their questions. Please keep your answer brief and relevant. If the text is not applicable to the question, reply with 'Not applicable.' If you dont find the answer to my question in the given context, just say 'Not Applicable'. You need to provide an answer based on the following content: " + context

    messages = [
        {
            "role": "system",
            "content": system_prompt
        },
        {
            "role": "user",
            "content": query_text
        }
    ]

    return messages


def get_new_input_guardian(query_text, index, embeddings):

    query_embedding = embeddings.embed_query(query_text)
    response = index.query(
        vector=query_embedding,
        top_k=1,  # Number of closest vectors to return
        include_values=True,  
        include_metadata=True  
    )
    print(response)
    context = ''
    for match in response["matches"]:
        context = context + match['metadata']['text']

    system_prompt = "You are a friendly chatbot who always has a positive attitude. You are here to help customers with their questions. Please keep your answer brief and relevant. You have to summarize the following content and return a summary. dont forget to discuss all the topics and answers by chatbot. Here is the text to summarize: " + context

    messages = [
        {
            "role": "system",
            "content": system_prompt
        },
        {
            "role": "user",
            "content": query_text
        }
    ]

    return messages

def get_new_output(messages):
        
    completion = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-R1", 
    messages=messages, 
    max_tokens=500
    )

    return completion.choices[0].message.content

def extract_text_after_last_think(text):
    # Use regex to find the last occurrence of "</think>" and get everything after it
    match = re.search(r"</think>(.*)", text, re.DOTALL)
    return match.group(1).strip() if match else None

def preprocess_text(text):
    """
    Preprocesses the text to remove extra spaces and fix punctuation spacing.
    """
    # Remove extra spaces
    text = re.sub(r'\s+', ' ', text).strip()
    # Ensure proper spacing around punctuation
    text = re.sub(r'\s([?.!,;:])', r'\1', text)
    return text

def split_text_into_chunks(text, max_length=200):
    """
    Splits the text into chunks of a specified maximum length.
    Ensures chunks are split at spaces for readability.
    """
    words = text.split()
    chunks = []
    current_chunk = []
    current_length = 0

    for word in words:
        if current_length + len(word) + 1 <= max_length:  # +1 for space
            current_chunk.append(word)
            current_length += len(word) + 1
        else:
            chunks.append(" ".join(current_chunk))
            current_chunk = [word]
            current_length = len(word) + 1
    if current_chunk:
        chunks.append(" ".join(current_chunk))
    return chunks

def text_to_speech(text, output_file="speech.wav", max_length=200):
    chunks = split_text_into_chunks(text, max_length)

    synthesiser = pipeline("text-to-speech", "microsoft/speecht5_tts")

    embeddings_dataset = load_dataset("Matthijs/cmu-arctic-xvectors", split="validation")
    speaker_embedding = torch.tensor(embeddings_dataset[7306]["xvector"]).unsqueeze(0)

    audio_segments = []
    for i, chunk in enumerate(chunks):
        #print(f"Processing chunk {i+1}/{len(chunks)}: {chunk}")
        speech = synthesiser(chunk, forward_params={"speaker_embeddings": speaker_embedding})
        temp_file = f"chunk_{i}.wav"
        sf.write(temp_file, speech["audio"], samplerate=speech["sampling_rate"])
        audio_segments.append(AudioSegment.from_file(temp_file))

    final_audio = sum(audio_segments)
    final_audio.export(output_file, format="wav")
    #print(f"Final audio saved to {output_file}")

    return output_file

def play_audio(text):
    audio_file = text_to_speech(text, max_length=600)

def query_sum(payload):
    response = requests.post(summarizer_model, headers=headers, json=payload)
    return response.json()

def summarizer(text):
    output = query_sum({
        "inputs": text,
    })
    #print(output)
    return output[0]['summary_text']

class QueryModel(BaseModel):
    text: str
    query_text: str

class FileTypeChecker:
    # Define valid extensions
    IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp"}
    VIDEO_EXTENSIONS = {".mp4", ".avi", ".mov", ".mkv", ".flv", ".wmv", ".webm"}

    @staticmethod
    def is_image_or_video(file_path):
        extension = file_path.lower().split('.')[-1]
        extension = f".{extension}" 
        if extension in FileTypeChecker.IMAGE_EXTENSIONS:
            return False
        if extension in FileTypeChecker.VIDEO_EXTENSIONS:
            return True
        
        return "unknown"

@app.post("/process_query/")
async def process_query(query: QueryModel):
    # existing functions
    sentences = tokenizer(query.text)
    sentence_chunks = create_sentence_chunks(sentences, chunk_size, chunk_overlap)
    documents = docer(sentence_chunks)
    document_contents = [doc.page_content for doc in documents]
    x = extract_embeddings(document_contents)
    index = insert_to_vdb(documents, embeddings)
    final_in = get_new_input(query.query_text, index, embeddings)
    outer = get_new_output(final_in)
    outer = extract_text_after_last_think(outer)

    return {"response": outer}


@app.post("/process_pdf_query/")
async def upload_pdf(data: ProcessPdfQuery):
    index = None  # Placeholder for vector database index
    try:
        if data.file_path:  # Check if file_path is provided
            pdf_file_path = os.path.join("/Users/sharjeel/Desktop/UNI Work/FYP-Kinetikids-main/FYP", data.file_path)
            pdf_text = extract_text_from_pdf(pdf_file_path)
            #print(pdf_text)
            sentences = sent_tokenize(pdf_text)
            sentence_chunks = create_sentence_chunks(sentences, chunk_size, chunk_overlap)
            documents = docer(sentence_chunks)
            document_contents = [doc.page_content for doc in documents]
            x = extract_embeddings(document_contents)
            index = insert_to_vdb(documents, embeddings)
            final_in = get_new_input(data.query, index, embeddings)

        if not index:
            system_prompt = "You are a friendly chatbot who always has a positive attitude. You are here to help customers with their questions. Please keep your answer brief and relevant. If the text is not applicable to the question, reply with 'Not applicable.' If you dont find the answer to my question in the given context, just say 'Not Applicable'."

            messages = [
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": data.query
                }
            ]
            final_in = messages
        outer = get_new_output(final_in)
        outer = extract_text_after_last_think(outer)
        
        return {"output": outer}
    
    except Exception as e:
        print("Error processing request:", str(e))
        return {"output": "An error occurred while processing the request."}



@app.post("/report_generation/")
async def upload_pdf(data: ReportText):
    # pdf_file_path = os.path.join("D:\\FYP\\backend")  
    # pdf_text = extract_text_from_pdf(pdf_file_path)
    # outer = summarizer(data.text)

    return {"output": "Neural networks, a subset of machine learning, are computational models inspired by the human brain's neural structure. They consist of layers of nodes (neurons) connected by weighted edges, where each node processes input data through an activation function and passes it to the next layer. These networks are primarilused for tasks like classification, regression, and pattern recognition. The most basic form, the feedforward neural network, processes data in one direction from input to output layers. More advanced architectures include convolutional neural networks (CNNs), which excel at image processing by learning spatial hierarchies, and recurrent neural networks (RNNs), designed for sequence data such as time series or natural language. Training a neural network involves adjusting the weights using optimization algorithms like gradient descent, where backpropagation calculates the error gradient to refine these weights, improving the network's predictions. Neural networks, especially deep learning models, require vast amounts of data and computational power, but once trained, they can perform highly complex tasks, from object recognition to language translation, with remarkable accuracy. Their ability to automatically learn features from raw data has made them a cornerstone of modern AI, transforming industries ranging from healthcare to finance by enabling systems to make decisions and predictions based on previously unattainable levels of insight."}

@app.post("/login/")
async def login(user: LoginModel):
    return login_user(user.email, user.password, user.is_guardian)


@app.post("/upload-file/")
async def upload_file(file: UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return {"file_path": file_location}

@app.post("/upload-audio/")
async def upload_audio(file: UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"file_path": file_location}


@app.post("/process_vqa_query/")
async def upload_pdf(data: ProcessPdfQuery):
    index = None  # Placeholder for vector database index
    extracted_text = None  # Placeholder for text extraction
    try:
        print("Before path join")
        meow_path = os.path.join("/Users/sharjeel/Desktop/UNI Work/FYP-Kinetikids-main/FYP", data.file_path)
        print(meow_path)
        if data.file_path:  # Check if file_path is provided
            print("meowwwww")
            #data = {"file_path": data.file_path}
            result = FileTypeChecker.is_image_or_video(data.file_path)
            if result:
                print("true hai")
                vid_file_path = os.path.join("/Users/sharjeel/Desktop/UNI Work/FYP-Kinetikids-main/FYP", data.file_path)
                print(vid_file_path)
                extracted_text = main_vtt(vid_file_path)
            else:
                img_file_path = os.path.join("/Users/sharjeel/Desktop/UNI Work/FYP-Kinetikids-main/FYP", data.file_path)
                extract_text_tesseract = ExtractTextTesseract()
                extracted_info = extract_text_tesseract(img_file_path)
                extracted_text = extracted_info
            #print(pdf_text)
            sentences = sent_tokenize(extracted_text)
            sentence_chunks = create_sentence_chunks(sentences, chunk_size, chunk_overlap)
            documents = docer(sentence_chunks)
            #document_contents = [doc.page_content for doc in documents]
            #x = extract_embeddings(document_contents)
            index = insert_to_vdb(documents, embeddings)
            final_in = get_new_input(data.query, index, embeddings) #insert the system prompt maheen returns over here

        if not index:
            system_prompt = "You are a friendly chatbot who always has a positive attitude. You are here to help customers with their questions. Please keep your answer brief and relevant. If the text is not applicable to the question, reply with 'Not applicable.' If you dont find the answer to my question in the given context, just say 'Not Applicable'."
            # This is the system prompt for a question that user asks without any doc input
            messages = [
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": data.query
                }
            ]
            final_in = messages
        outer = get_new_output(final_in)
        outer = extract_text_after_last_think(outer)
        print("outer: ", outer)
        
        return {"output": outer}
    
    except Exception as e:
        print("Error processing request:", str(e))
        return {"output": "An error occurred while processing the request."}


@app.post("/startquiz/")
async def start_quiz(
    file_path: Optional[str] = Form(None),  # File path as an optional form field
    questions: str = Form(...),
    difficulty: str = Form(...),
    time: str = Form(...)
):
    global global_quiz_data
    global_quiz_data = {
        "file": file_path,
        "questions": questions,
        "difficulty": difficulty,
        "time": time
    }

    print("data: ", global_quiz_data)
    return {"status": "success", "message": "✅ Quiz started successfully!", "data": global_quiz_data}

@app.get("/get-quiz-settings/")
async def get_quiz_settings():
    return {"Quiz_settings": global_quiz_data}
    
from fastapi import Request

@app.post("/generate_mcq/", response_model=QuestionResponse)
async def generate_mcq(
    num: int = Form(...),
    file_path: str = Form(...),
):
    print("🛑 Received num:", num, "Type:", type(num))
    print("🛑 Received file_path:", file_path, "Type:", type(file_path))

    try:
        pdf_file_path = os.path.join("/Users/sharjeel/Desktop/UNI Work/FYP-Kinetikids-main/FYP", file_path)
        print("paaaaaaaaaath: ", pdf_file_path)
        pdf_text = extract_text_from_pdf(pdf_file_path)
        pdf_text = "[" + pdf_text + "]"
        
        mcq_response = generate_questions(pdf_text, num)

        if 'content' in mcq_response:
            questions = process_questions(mcq_response['content'])
            print(questions)
            return {"questions": questions}
        else:
            raise HTTPException(status_code=400, detail="Failed to generate questions")

    except Exception as e:
        print("🛑 Error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/submit-quiz/")
async def submit_quiz(data: QuizSubmission):
    print(f"User Score: {data.score}/{len(data.correct_answers)}")
    return {"message": "Quiz submitted successfully!", "score": data.score}
    
@app.post("/get-chat-history/")
async def chat_history():
    return {"hello", "Hello"}


def main():
    import uvicorn
    import nltk
    #nltk.download()
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

if __name__ == "__main__":
    main()

# ==== Authentication Endpoints ====
from pydantic import BaseModel
from fastapi import HTTPException
import bcrypt

# MongoDB users collection
users_collection = db.get_collection("users")

class SignupRequest(BaseModel):
    email: str
    password: str
    is_guardian: bool

@app.post("/signup/")
async def signup_user(data: SignupRequest):
    if users_collection.find_one({"email": data.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = bcrypt.hashpw(data.password.encode(), bcrypt.gensalt())
    users_collection.insert_one({
        "email": data.email,
        "password": hashed_password,
        "is_guardian": data.is_guardian
    })
    return {"message": "Signup successful"}

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/login/")
async def login_user(data: LoginRequest):
    user = users_collection.find_one({"email": data.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not bcrypt.checkpw(data.password.encode(), user["password"]):
        raise HTTPException(status_code=401, detail="Incorrect password")
    return {
        "message": "Login successful",
        "email": user["email"],
        "is_guardian": user["is_guardian"]
    }
