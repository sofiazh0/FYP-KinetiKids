# FYP

An AI-powered educational platform designed to enhance learning experiences for students through interactive Q&A, video-based learning, automated evaluations, and personalized content delivery with guardian oversight.

## Overview

KinetiKids is a comprehensive Final Year Project (FYP) that leverages cutting-edge AI technologies including Natural Language Processing, Computer Vision, and Speech Recognition to create an engaging learning environment. The platform features separate interfaces for students and guardians, enabling personalized learning paths with parental monitoring capabilities.

## Key Features

### Student Features
- **Interactive Q&A System**: Ask questions and get AI-powered answers based on uploaded educational materials (PDFs, images, videos)
- **Multi-Subject Learning**: Dedicated pages for English, Mathematics, and Science
- **Video Library**: Access curated educational videos with integrated question answering
- **Smart Evaluation System**: AI-generated quizzes with customizable difficulty and question count
- **Visual & Audio Learning**: Support for image-to-text (OCR) and video-to-text conversion
- **Speech-to-Text**: Voice-based question input for accessibility
- **Text-to-Speech**: Audio responses for enhanced learning

### Guardian Features
- **Student Progress Monitoring**: Track performance across different subjects
- **Report Generation**: AI-powered summaries of student learning activities
- **Multi-Student Management**: Oversee multiple students from a single account
- **Chat History Access**: Review student interactions with the AI tutor

### AI-Powered Capabilities
- **RAG (Retrieval-Augmented Generation)**: Context-aware answers using Pinecone vector database
- **Document Processing**: Extract and process text from PDFs, images, and videos
- **Automatic Question Generation**: Generate multiple-choice questions from educational content
- **Content Summarization**: Summarize lengthy texts and chat histories
- **Multi-Modal Input**: Process text, images, videos, and audio

## Tech Stack

### Frontend
- **React** 18.3.1
- **React Router DOM** 6.26.2
- **Framer Motion** (animations)
- **Axios** (API communication)
- **Typewriter Effect**
- **TSParticles** (particle effects)

### Backend
- **FastAPI** (Python web framework)
- **MongoDB** (database)
- **PyMongo** (MongoDB driver)

### AI/ML Technologies
- **LangChain** (LLM orchestration)
- **HuggingFace Transformers** (NLP models)
  - DeepSeek-R1 (question answering)
  - SmolLM2-1.7B-Instruct (text generation)
  - Whisper (speech recognition)
  - SpeechT5 (text-to-speech)
  - BART (summarization)
- **Pinecone** (vector database)
- **Tesseract OCR** (image text extraction)
- **OpenCV** (image processing)
- **FFmpeg** (video/audio processing)

### Additional Libraries
- **NumPy** (numerical computing)
- **PyTorch** (deep learning framework)
- **NLTK** (natural language processing)
- **pydub** (audio manipulation)
- **librosa** (audio analysis)
- **noisereduce** (audio preprocessing)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (v4.4 or higher)
- **FFmpeg** (for video processing)
- **Tesseract OCR** (for image text extraction)

### API Keys Required
- **HuggingFace API Key**
- **Pinecone API Key**

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "FYP KinetiKids"
```

### 2. Backend Setup

```bash
cd FYP/backend

# Create and activate virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Download NLTK data
python -c "import nltk; nltk.download('punkt')"
```

#### Configure Backend
Update the following in `main.py`:
- MongoDB connection string (line 38)
- HuggingFace API key (line 122)
- Pinecone API key (line 123)
- File paths for your system (lines 594, 668, 676, 680, 751)

### 3. Frontend Setup

```bash
cd FYP/frontend

# Install Node.js dependencies
npm install
```

### 4. Database Setup

Ensure MongoDB is running locally on `mongodb://localhost:27017/`

**Database Structure:**
- Database: `school_management`
- Collections: 
  - `guardians` (stores guardian accounts with nested student data)
  - `users` (authentication)

### 5. Create Required Directories

```bash
mkdir -p FYP/backend/uploaded_files
mkdir -p FYP/backend/uploaded_vns
mkdir -p FYP/backend/vtt_saves
```

## Running the Application

### Start MongoDB
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
net start MongoDB
```

### Start Backend Server
```bash
cd FYP/backend
python main.py
```
Backend will run on `http://127.0.0.1:8000`

### Start Frontend Server
```bash
cd FYP/frontend
npm start
```
Frontend will run on `http://localhost:3000`

## Project Structure

```
FYP KinetiKids/
├── FYP/
│   ├── backend/
│   │   ├── main.py                 # Main FastAPI application
│   │   ├── requirements.txt        # Python dependencies
│   │   ├── uploaded_files/         # User-uploaded files storage
│   │   ├── uploaded_vns/           # Video/audio storage
│   │   └── vtt_saves/              # Video-to-text processing files
│   │
│   └── frontend/
│       ├── public/                 # Static assets
│       ├── src/
│       │   ├── App.js              # Main application component
│       │   ├── components/         # Reusable components
│       │   ├── assets/             # Images and icons
│       │   ├── *Page.js            # Individual page components
│       │   └── *.css               # Styling files
│       └── package.json            # Node.js dependencies
│
└── README.md                       # This file
```

## API Endpoints

### Authentication
- `POST /signup/` - User registration
- `POST /login/` - User authentication

### Document Processing
- `POST /upload-file/` - Upload PDF/image files
- `POST /upload-audio/` - Upload audio files
- `POST /process_pdf_query/` - Process PDF with Q&A
- `POST /process_vqa_query/` - Process image/video with Q&A

### Q&A System
- `POST /process_query/` - General text-based Q&A

### Evaluation System
- `POST /startquiz/` - Initialize quiz session
- `POST /generate_mcq/` - Generate MCQ questions from content
- `POST /submit-quiz/` - Submit quiz answers
- `GET /get-quiz-settings/` - Retrieve current quiz configuration

### Reports & Analytics
- `POST /report_generation/` - Generate guardian reports
- `POST /get-chat-history/` - Retrieve chat history

## Usage Guide

### For Students

1. **Register/Login**: Create a student account or login with credentials provided by your guardian
2. **Select Subject**: Choose from English, Math, or Science
3. **Upload Material**: Upload PDFs, images, or videos for learning
4. **Ask Questions**: Type or speak your questions to get instant answers
5. **Take Quizzes**: Test your knowledge with AI-generated quizzes
6. **Review Videos**: Watch educational videos and ask questions about them

### For Guardians

1. **Register/Login**: Create a guardian account
2. **Add Students**: Register student accounts linked to your guardian profile
3. **Monitor Progress**: View student activities and quiz results
4. **Generate Reports**: Access AI-generated summaries of student performance
5. **Review Interactions**: Check chat histories and learning patterns

## Configuration

### Environment Variables (Recommended)
Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/
HUGGINGFACE_API_KEY=your_huggingface_key
PINECONE_API_KEY=your_pinecone_key
```

### Tesseract Configuration
If Tesseract is not in your system PATH, update line 180 in `main.py`:
```python
pytesseract.pytesseract.tesseract_cmd = '/path/to/tesseract'
```

## Testing

```bash
# Frontend tests
cd FYP/frontend
npm test

# Backend tests (if implemented)
cd FYP/backend
pytest
```

## Features in Detail

### RAG (Retrieval-Augmented Generation)
The system uses Pinecone vector database with HuggingFace embeddings to provide context-aware answers:
1. Documents are chunked into semantic segments
2. Embeddings are generated using `all-MiniLM-L6-v2`
3. User queries are matched against the vector database
4. Relevant context is retrieved and fed to the LLM
5. AI generates accurate, source-based responses

### Multi-Modal Processing
- **PDF**: Text extraction with PyPDF2
- **Images**: OCR with Tesseract
- **Videos**: Audio extraction → Denoising → Whisper transcription
- **Audio**: Direct transcription with Whisper

### Quiz Generation
AI analyzes uploaded content and generates:
- Multiple-choice questions
- Plausible distractors (wrong options)
- Correct answer identification
- Difficulty adjustment

## Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Check if MongoDB is running
mongosh
# If not, start the service
brew services start mongodb-community  # macOS
```

**FFmpeg Not Found**
```bash
# Install FFmpeg
# macOS
brew install ffmpeg
# Ubuntu/Debian
sudo apt-get install ffmpeg
```

**Tesseract Not Found**
```bash
# macOS
brew install tesseract
# Ubuntu/Debian
sudo apt-get install tesseract-ocr
```

**HuggingFace API Rate Limits**
- Consider using local models for production
- Implement request caching
- Add rate limiting middleware

## Future Enhancements

- [ ] Real-time collaboration features
- [ ] Mobile application (React Native)
- [ ] More subject areas (History, Geography, etc.)
- [ ] Gamification elements (badges, leaderboards)
- [ ] Offline mode support
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Integration with school management systems
- [ ] Parent-teacher communication portal

---

**Note**: This is an educational project. Please ensure you have proper API keys and comply with usage limits of third-party services.


