import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarHome from './NavbarHome'; // Keep navbar unchanged
import './QuizPreferences.css';

const QuizPreferences = () => {
  const navigate = useNavigate();
  
  const [questionsOpen, setQuestionsOpen] = useState(false);
  const [difficultyOpen, setDifficultyOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  
  const [selectedQuestions, setSelectedQuestions] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [showPopup, setShowPopup] = useState(false); // Pop-up state

  const questionOptions = ["No Selection", 5, 10, 15, 20, 25, 30];
  const difficultyOptions = ["No Selection", "Easy", "Medium", "Hard"];
  const timeOptions = ["No Selection", "10 min", "15 min", "20 min", "30 min"];

  // ✅ Handle File Upload with Logging
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      console.log("✅ Selected File:", file.name); // Debug log
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // ✅ Handle Questions Selection with Logging
  const handleQuestionsSelect = (num) => {
    const value = num === "No Selection" ? "" : `${num} Questions`;
    setSelectedQuestions(value);
    console.log("✅ Selected Questions:", value); // Debug log
  };

  // ✅ Handle Difficulty Selection with Logging
  const handleDifficultySelect = (level) => {
    const value = level === "No Selection" ? "" : level;
    setSelectedDifficulty(value);
    console.log("✅ Selected Difficulty:", value); // Debug log
  };

  // ✅ Handle Time Selection with Logging
  const handleTimeSelect = (time) => {
    const value = time === "No Selection" ? "" : time;
    setSelectedTime(value);
    console.log("✅ Selected Time:", value); // Debug log
  };

  // ✅ Check if "Start" Button Should Be Enabled
  const isStartDisabled = !selectedFile || !selectedQuestions || !selectedDifficulty || !selectedTime;

  const handleStartClick = async () => {
    if (isStartDisabled) {
        setShowPopup(true);
        return;
    }

    try {
        let filePath = null;

        // ✅ 1. Upload the file first and retrieve its location
        if (selectedFile) {
            const fileFormData = new FormData();
            fileFormData.append("file", selectedFile);

            console.log("🚀 Uploading file...");

            const uploadResponse = await fetch("http://127.0.0.1:8000/upload-file/", {
                method: "POST",
                body: fileFormData,
            });

            if (!uploadResponse.ok) {
                throw new Error("❌ File upload failed");
            }

            const uploadResult = await uploadResponse.json();
            filePath = uploadResult.file_path; // ✅ Extracted file path
            console.log("✅ File uploaded successfully:", filePath);
        }

        // ✅ 2. Prepare FormData for Quiz Start API
        const quizFormData = new FormData();
        quizFormData.append("file_path", filePath); // ✅ Send extracted file path
        quizFormData.append("questions", selectedQuestions.replace(" Questions", ""));
        quizFormData.append("difficulty", selectedDifficulty);
        quizFormData.append("time", selectedTime);

        console.log("🚀 Sending quiz data...");
        for (const pair of quizFormData.entries()) {
            console.log(pair[0], ":", pair[1]); // ✅ Debug log for FormData contents
        }

        // ✅ 3. Send quiz data to /start-quiz/
        const quizResponse = await fetch("http://127.0.0.1:8000/startquiz/", {
            method: "POST",
            body: quizFormData,
        });

        if (!quizResponse.ok) {
            throw new Error("❌ Failed to start quiz");
        }

        console.log("✅ Quiz started successfully!");
        navigate('/quizinstructions');

    } catch (error) {
        console.error("❌ Error:", error);
        alert("Error: Unable to start quiz. Please try again.");
    }
    };


  return (
    <div className="quiz-preferences">
      {/* ✅ Navbar Stays the Same */}
      <NavbarHome />

      {/* ✅ Quiz Card */}
      <div className="quiz-card">
        <h2>Create a Quiz</h2>

        {/* ✅ Upload Section */}
        <div className="upload-section">
          <span className="upload-label">Upload a Document</span>
          <input 
            type="file" 
            accept="application/pdf" 
            style={{ display: "none" }} 
            id="file-upload" 
            onChange={handleFileUpload} 
          />
          <label htmlFor="file-upload" className="upload-button">
            {selectedFile ? "Uploaded ✔" : "Upload"}
          </label>
        </div>

        {/* ✅ Dropdowns with "No Selection" Option */}
        <div className="dropdown-container">
          <button className="dropdown-btn" onClick={() => setQuestionsOpen(!questionsOpen)}>
            {selectedQuestions || "Select Total Questions"}
          </button>
          {questionsOpen && (
            <div className="dropdown-content">
              {questionOptions.map((num, index) => (
                <div key={index} onClick={() => { 
                  handleQuestionsSelect(num);
                  setQuestionsOpen(false); 
                }}>
                  {num}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dropdown-container">
          <button className="dropdown-btn" onClick={() => setDifficultyOpen(!difficultyOpen)}>
            {selectedDifficulty || "Select Difficulty Level"}
          </button>
          {difficultyOpen && (
            <div className="dropdown-content">
              {difficultyOptions.map((level, index) => (
                <div key={index} onClick={() => { 
                  handleDifficultySelect(level);
                  setDifficultyOpen(false); 
                }}>
                  {level}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dropdown-container">
          <button className="dropdown-btn" onClick={() => setTimeOpen(!timeOpen)}>
            {selectedTime || "Select Time Duration"}
          </button>
          {timeOpen && (
            <div className="dropdown-content">
              {timeOptions.map((time, index) => (
                <div key={index} onClick={() => { 
                  handleTimeSelect(time);
                  setTimeOpen(false); 
                }}>
                  {time}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ✅ Correct Button Placement */}
        <div className="quiz-actions">
          <button className="go-back" onClick={() => navigate('/evaluation')}>Back</button>
          <button className="start" onClick={handleStartClick}>
            Start
          </button>
        </div>
      </div>

      {/* ✅ Pop-up for Missing Fields */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>⚠️ Missing Fields</h3>
            <p>Please make sure you have:</p>
            <ul>
              {!selectedFile && <li>📄 Uploaded a document</li>}
              {!selectedQuestions && <li>🔢 Selected total questions</li>}
              {!selectedDifficulty && <li>🎚️ Chosen difficulty level</li>}
              {!selectedTime && <li>⏳ Selected time duration</li>}
            </ul>
            <button className="close-popup" onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}

      {/* ✅ Footer Same as Home Page */}
      {/* <footer className="quiz-footer">
        <p>© 2024 KinetiKids</p>
      </footer> */}
    </div>
  );
};

export default QuizPreferences;
