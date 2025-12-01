import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import NavbarHome from './NavbarHome';
import './VideoQuestionsPage.css';

const VideoQuestionsPage = () => {
    const [fileUpload, setFileUpload] = useState(null);
    const [queryText, setQueryText] = useState('');
    const [conversationMessages, setConversationMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioData, setAudioData] = useState(null);
    const [isHistoryVisible, setIsHistoryVisible] = useState(false); // State for displaying chat history modal
    const [storedChatHistory, setStoredChatHistory] = useState([]); // Store chat history
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    // Fetch previous chats from the database when the history modal is opened
    useEffect(() => {
        if (isHistoryVisible) {
            const fetchChatHistory = async () => {
                try {
                    const response = await axios.get("http://127.0.0.1:8000/get-chat-history/");
                    setStoredChatHistory(response.data);
                } catch (error) {
                    console.error("Error fetching chat history:", error);
                }
            };
            fetchChatHistory();
        }
    }, [isHistoryVisible]);

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
                setAudioData(audioBlob);
                audioChunksRef.current = [];
            };
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleFileUpload = (event) => {
        setFileUpload(event.target.files[0]);
    };

    const handleQueryChange = (event) => {
        setQueryText(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        let filePath = null;
        let filePath1 = null;

        if (audioData) {
            const audioFormData = new FormData();
            audioFormData.append("file", audioData, "recording.webm");
            const audioUploadResponse = await axios.post("http://127.0.0.1:8000/upload-audio/", audioFormData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            filePath1 = audioUploadResponse.data.file_path;
        }

        if (!filePath && fileUpload) {
            const fileFormData = new FormData();
            fileFormData.append("file", fileUpload);
            const fileUploadResponse = await axios.post("http://127.0.0.1:8000/upload-file/", fileFormData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            filePath = fileUploadResponse.data.file_path;
            // ✅ Log the file path to the frontend console
            console.log("📁 Uploaded File Path:", filePath);
        }

        try {
            // ✅ If queryText is empty, assign a placeholder text
            const finalQueryText = queryText.trim() === "" ? "🔊 Audio Query Sent" : queryText;
            const apiResponse = await axios.post("http://127.0.0.1:8000/process_vqa_query/", {
                query: queryText,
                file_path: filePath,
                vnfile_path: filePath1,
            });
            // console.log(apiResponse);
            const newMessages = [
                ...conversationMessages, 
                { type: 'response', text: finalQueryText },
                { type: 'user', text: apiResponse.data.output }
            ];
            setConversationMessages(newMessages);
            setQueryText('');
            setFileUpload(null);
            setAudioData(null);
        } catch (error) {
            console.error("Error:", error);
            const newMessages = [
                ...conversationMessages,
                { type: 'response', text: queryText.trim() === "" ? "🔊 Audio Query Sent" : queryText },
                { type: 'user', text: "An error occurred while processing your request." }
            ];
            setConversationMessages(newMessages);
            setQueryText('');
            setFileUpload(null);
            setAudioData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const speakText = (text) => {
        const speech = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(speech);
    };

    const handleNewChat = () => {
        setConversationMessages([]); // Clear the current chat
        setQueryText(''); // Clear the query field
        setFileUpload(null); // Reset file input (optional)
        setIsRecording(false); // Reset recording state (optional)
    };

    // const handleNFileUpload = (event) => {
    //     setFileUpload(event.target.files[0]);
    // };

    const handleHistoryClick = (history) => {
        // Load the selected chat history into the current chat
        setConversationMessages([{ type: 'user', text: history.query }, { type: 'response', text: history.response }]);
        setIsHistoryVisible(false); // Close the history modal
    };

    return (
        <div className="video-questions-page">
            <NavbarHome />
            <div className="video-container">
                <h1 className="video-header">Ask Questions Using Images or Videos</h1>
            </div>

            <div className="vqa-chat-area">
                {conversationMessages.map((message, index) => (
                    <div key={index} className={`vqa-message ${message.type}`}>
                        <p>{message.text}</p>
                        {message.type === 'user' && (
                            <button className="vqa-speak-button" onClick={() => speakText(message.text)}>
                                📢
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="video-input-container">
                <form className="video-form" onSubmit={handleSubmit}>
                    <label htmlFor="file-upload" className="video-upload-label">
                        <span className="upload-icon">📎</span>
                        {fileUpload && <span className="file-name">{fileUpload.name}</span>}
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="video-file-input"
                    />
                    <textarea
                        className="video-textarea"
                        placeholder="Enter your question here..."
                        value={queryText}
                        onChange={handleQueryChange}
                    ></textarea>

                    <button
                        type="button"
                        className={`video-microphone-icon ${isRecording ? 'recording' : ''}`}
                        onClick={() => (isRecording ? stopRecording() : startRecording())}
                    >
                        {isRecording ? '⏹️' : '🎤'}
                    </button>

                    {/* Chat History Button */}
                    <button
                        type="button"
                        className="vqa-chat-history-button"
                        onClick={() => setIsHistoryVisible(true)} // Show chat history
                        title="Chat History"
                    >
                        📜
                    </button>

                    <button type="submit" className="video-submit-button" disabled={isLoading}>
                        {isLoading ? "Processing..." : "Submit"}
                    </button>
                </form>
            </div>

            {/* New Chat Button */}
            <button className="vqa-new-chat-button" onClick={handleNewChat} title="New Chat">
                ✚
            </button>

            {/* Chat History Modal */}
            {isHistoryVisible && (
                <div className="vqa-chat-history-modal">
                    <div className="vqa-chat-history-content">
                        <h2>Chat History</h2>
                        <button className="vqa-close-modal" onClick={() => setIsHistoryVisible(false)}>✖</button>
                        <div className="vqa-chat-history-scroll">
                            {storedChatHistory.length === 0 ? <p>No previous chats.</p> : storedChatHistory.map((history, idx) => (
                                <div key={idx} className="vqa-history-item" onClick={() => handleHistoryClick(history)}>
                                    <p>{history.query.slice(0, 30)}...</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
{/* 
            <footer className="video-footer">
                <p>© 2024 KinetiKids</p>
            </footer> */}
        </div>
    );
};

export default VideoQuestionsPage;
