import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarHome from "./NavbarHome";
import "./ResultsPage.css";

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // ✅ Ensure default values to prevent crash
  const { 
    selectedAnswers = {}, 
    correctAnswers = {}, 
    timeUp = false 
  } = location.state || {};

  // ✅ Calculate Score (only if correctAnswers[questionId] exists)
  const totalQuestions = Object.keys(correctAnswers).length;
  const correctCount = Object.keys(selectedAnswers).filter(
    (questionId) => correctAnswers[questionId] && selectedAnswers[questionId] === correctAnswers[questionId].answer
  ).length;

  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="results-page">
      <NavbarHome />

      <div className={`results-container ${isFlipped ? "flipped" : ""}`}>
        <div className="results-card">
          {/* Front Side - Quiz Score */}
          <div className="front">
            <h1 className="results-title">Quiz Results</h1>
            <p className="results-score">
              {timeUp ? "⏳ Time's Up!" : `🎉 Your Score: `}
              <span className="score-highlight">{correctCount}/{totalQuestions}</span>
            </p>
            <div className="results-actions">
              <button className="see-answers-btn" onClick={() => setIsFlipped(true)}>
                See Correct Answers
              </button>
              <button className="return-btn" onClick={() => navigate("/evaluation")}>
                Return to Evaluation Home
              </button>
            </div>
          </div>

          {/* Back Side - Correct Answers */}
          <div className="back">
            <h2>Correct Answers</h2>
            <ul>
              {Object.keys(correctAnswers).map((id) => (
                <li key={id}>
                  <strong>{correctAnswers[id]?.question || "Unknown Question"}</strong> <br />
                  ✅ {correctAnswers[id]?.answer || "Unknown Answer"}
                </li>
              ))}
            </ul>
            <button className="return-btn" onClick={() => setIsFlipped(false)}>Go Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
