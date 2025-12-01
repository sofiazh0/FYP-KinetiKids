#!pip install pinecone-client langchain langchain-community 
#!pip install langchain_huggingface

import numpy as np
from langchain.docstore.document import Document
from langchain_huggingface import HuggingFaceEmbeddings
from nltk.tokenize import sent_tokenize
from pinecone import Pinecone
import requests
import warnings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import PyPDF2

warnings.filterwarnings("ignore")
API_KEY = "YOUR_API_KEY"
pc_api_key = "YOUR_API_KEY"
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
pc = Pinecone(api_key=pc_api_key)
API_URL = "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct"
headers = {"Authorization": API_KEY}
app = FastAPI()
# Enable CORS middleware and allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods 
    allow_headers=["*"],  # Allow all headers
)

chunk_size = 3  
chunk_overlap = 1  


text = """Neural networks, a subset of machine learning, are computational models inspired by the human brain's neural structure. They consist of layers of nodes (neurons) connected by weighted edges, where each node processes input data through an activation function and passes it to the next layer. These networks are primarily used for tasks like classification, regression, and pattern recognition. The most basic form, the feedforward neural network, processes data in one direction from input to output layers. More advanced architectures include convolutional neural networks (CNNs), which excel at image processing by learning spatial hierarchies, and recurrent neural networks (RNNs), designed for sequence data such as time series or natural language. Training a neural network involves adjusting the weights using optimization algorithms like gradient descent, where backpropagation calculates the error gradient to refine these weights, improving the network's predictions. Neural networks, especially deep learning models, require vast amounts of data and computational power, but once trained, they can perform highly complex tasks, from object recognition to language translation, with remarkable accuracy. Their ability to automatically learn features from raw data has made them a cornerstone of modern AI, transforming industries ranging from healthcare to finance by enabling systems to make decisions and predictions based on previously unattainable levels of insight."""

# Function to extract all text from a PDF file
def extract_text_from_pdf(pdf_file):
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = ''
    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]
        text += page.extract_text()  # Extract the text from each page
    return text

def tokenizer(text):
    sentences = sent_tokenize(text)
    return sentences

# Function to create chunks of sentences with overlap
def create_sentence_chunks(sentences, chunk_size, chunk_overlap):
    chunks = []
    
    # Create chunks with overlap
    for i in range(0, len(sentences), chunk_size - chunk_overlap):
        chunk = ' '.join(sentences[i:i + chunk_size])
        chunks.append(chunk)
        # Stop if we reach the end
        if i + chunk_size >= len(sentences):
            break
    
    return chunks

def docer(sentence_chunks):
    documents = [Document(page_content=chunk) for chunk in sentence_chunks]
    return documents


def pad_embedding(embedding, target_dim=512):
    # Convert to numpy array if it's not already
    if not isinstance(embedding, np.ndarray):
        embedding = np.array(embedding)
    
    # Calculate the padding needed
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
        # Extract the embedding
        embedding = embeddings.embed_query(text)
        # Pad the embedding to the desired length (512)
        padded_embedding = pad_embedding(embedding, target_dim=512)
        all_embeddings.append(padded_embedding)
    
    return all_embeddings


def insert_to_vdb(documents, embeddings):

    index = pc.Index(name="fyp-txt-embedding2")
    # Get embeddings for each document
    document_contents = [doc.page_content for doc in documents]
    embeddings_list = [embeddings.embed_query(text) for text in document_contents]

    # Prepare data for upsert: List of tuples (id, vector, metadata)
    values = [
        (str(i), emb, {"text": document_contents[i]})  # Convert embedding to list format
        for i, emb in enumerate(embeddings_list)
    ]

    index.upsert(vectors=values)
    return index

def get_input(query_text, index, embeddings):

    # Generate the embedding for the query
    query_embedding = embeddings.embed_query(query_text)

    # Perform the query on the Pinecone index
    response = index.query(
        vector=query_embedding,
        top_k=2,  # Number of closest vectors to return
        include_values=True,  # Include the vectors themselves
        include_metadata=True  # Include the metadata (like original text)
    )


    x = response["matches"]
    z = ''
    for match in response["matches"]:
        z = z + match['metadata']['text']

    # Prepare messages for the API in JSON format
    #messages = [{"role": "system", "content": ("You are a friendly chatbot who always has a positive attitude. You are here to help customers with their questions. Please keep your answer brief and relevant. If the text is not applicable to the question, reply with 'Not applicable.' You need to provide an answer based on the following content: " + z)}, {"role": "user", "content": query_text}]

    temp = " \n Here is my question to you: " + query_text
    tester = "You are a friendly chatbot who always has a positive attitude. You are here to help customers with their questions. Please keep your answer brief and relevant. If the text is not applicable to the question, reply with 'Not applicable.' If you dont find the answer to my question in the given context, just say 'Not Applicable'. You need to provide an answer based on the following content: " + z + temp

    return tester



def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

def get_output(tester):
    	
    output = query({"inputs": tester})

    return output[0]['generated_text'][len(tester):]


# Model for incoming data
class QueryModel(BaseModel):
    text: str
    query_text: str

@app.post("/process_query/")
async def process_query(query: QueryModel):
    # Your existing functions can be adapted here
    sentences = tokenizer(query.text)
    sentence_chunks = create_sentence_chunks(sentences, chunk_size, chunk_overlap)
    documents = docer(sentence_chunks)
    document_contents = [doc.page_content for doc in documents]
    x = extract_embeddings(document_contents)
    index = insert_to_vdb(documents, embeddings)
    final_in = get_input(query.query_text, index, embeddings)
    outer = get_output(final_in)

    return {"response": outer}
