import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import NavbarHome from './NavbarHome';
import './QAPage.css';

const QAPage = () => {
    const [file, setFile] = useState(null);
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [showHistory, setShowHistory] = useState(false); // State to show/hide chat history modal
    const [chatHistory, setChatHistory] = useState([]); // Store chat history
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    // Fetch previous chats from the database
    useEffect(() => {
        if (showHistory) {
            const fetchChatHistory = async () => {
                try {
                    const response = await axios.get("http://127.0.0.1:8000/get-chat-history/");
                    setChatHistory(response.data);
                } catch (error) {
                    console.error("Error fetching chat history:", error);
                }
            };
            fetchChatHistory();
        }
    }, [showHistory]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                setAudioBlob(audioBlob);
                audioChunksRef.current = [];
            };
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start();
            setRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    };

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        let filePath = null;

        if (audioBlob) {
            const audioFormData = new FormData();
            audioFormData.append("audio", audioBlob, "recording.webm");
            const audioUploadResponse = await axios.post("http://127.0.0.1:8000/upload-audio/", audioFormData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            filePath = audioUploadResponse.data.file_path;
        }

        if (!filePath && file) {
            const fileFormData = new FormData();
            fileFormData.append("file", file);
            const fileUploadResponse = await axios.post("http://127.0.0.1:8000/upload-file/", fileFormData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            filePath = fileUploadResponse.data.file_path;
        }

        try {
            const apiResponse = await axios.post("http://127.0.0.1:8000/process_pdf_query/", {
                query: query,
                file_path: filePath,
            });
            const newMessages = [...messages, { type: 'response', text: query }, { type: 'user', text: apiResponse.data.output }];
            setMessages(newMessages);
            setQuery('');
        } catch (error) {
            console.error("Error:", error);
            const newMessages = [...messages, { type: 'response', text: query }, { type: 'user', text: "An error occurred while processing your request." }];
            setMessages(newMessages);
        } finally {
            setLoading(false);
        }
    };

    const speakText = (text) => {
        const speech = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(speech);
    };

    const handleNewChat = () => {
        setMessages([]); // Clear the chat history to start a new chat
        setQuery(''); // Clear query field as well
        setFile(null); // Reset file selection (optional)
        setRecording(false); // Reset the recording state (optional)
    };

    const handleHistoryClick = (history) => {
        // Load the selected chat history into the current chat
        setMessages([{ type: 'user', text: history.query }, { type: 'response', text: history.response }]);
        setShowHistory(false); // Close the history modal
    };

    return (
        <div className="qa-page">
            <NavbarHome />
            <div className="qa-container">
                <h1 className="qa-header">Ask Questions from Uploaded Documents</h1>
                <div className="chat-area">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.type}`}>
                            <p>{message.text}</p>
                            {message.type === 'user' && (
                                <button className="qa-speak-button" onClick={() => speakText(message.text)}>
                                    📢
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Input and Chat History Button */}
            <div className="qa-input-container">
                <form className="qa-form" onSubmit={handleSubmit}>
                    <label htmlFor="file-upload" className="qa-upload-label">
                        <span className="upload-icon">📎</span>
                        {file && <span className="file-name">{file.name}</span>}
                    </label>
                    <input id="file-upload" type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="qa-file-input" />
                    <textarea className="qa-textarea" placeholder="Enter your query here..." value={query} onChange={handleQueryChange}></textarea>
                    <button type="button" className="qa-microphone-icon" onClick={() => (recording ? stopRecording() : startRecording())}>
                        {recording ? '⏹️' : '🎤'}
                    </button>
                    <button type="submit" className="qa-submit-button" disabled={loading}>
                        {loading ? "Processing..." : "Submit"}
                    </button>
                </form>

                {/* Chat History Button */}
                <button className="chat-history-button" onClick={() => setShowHistory(true)} title="Chat History">
                    📜
                </button>
            </div>

            {/* New Chat Button */}
            <button className="new-chat-button" onClick={handleNewChat} title="New Chat">
                ✚
            </button>

            {/* Chat History Modal */}
            {showHistory && (
                <div className="chat-history-modal">
                    <div className="chat-history-content">
                        <h2>Chat History</h2>
                        <button className="close-modal" onClick={() => setShowHistory(false)}>✖</button>
                        <div className="chat-history-scroll">
                            {chatHistory.length === 0 ? <p>No previous messages.</p> : chatHistory.map((history, idx) => (
                                <div key={idx} className="history-item" onClick={() => handleHistoryClick(history)}>
                                    <p>{history.query.slice(0, 30)}...</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* <footer className="qa-footer">
                <p>© 2024 KinetiKids</p>
            </footer> */}
        </div>
    );
};

export default QAPage;
