import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarHome from './NavbarHome';
import './QuizPage.css';

const QuizPage = () => {
  const navigate = useNavigate();

  // ✅ States for quiz settings and questions
  const [numQuestions, setNumQuestions] = useState(null);
  const [timeLimit, setTimeLimit] = useState(null);
  const [filePath, setFilePath] = useState(null);

  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ✅ Tracks API loading

  // ✅ Fetch quiz settings when the page loads (ONLY ONCE)
  useEffect(() => {
    const fetchQuizSettings = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/get-quiz-settings/");
        if (!response.ok) throw new Error("Failed to fetch quiz settings");

        const dataa = await response.json();
        console.log("✅ Quiz settings received:", dataa);
        const data = dataa.Quiz_settings;

        setNumQuestions(data.questions);
        setTimeLimit(data.time);
        setFilePath(data.file);
      } catch (error) {
        console.error("🛑 Error fetching quiz settings:", error);
      }
    };

    fetchQuizSettings();
  }, []);

  // ✅ Fetch MCQs from Backend API (Only Once After Settings Are Loaded)
  useEffect(() => {
    const fetchQuestions = async () => {
      if (numQuestions !== null && filePath !== null) {
        try {
          setIsLoading(true);

          const formData = new FormData();
          formData.append("num", parseInt(numQuestions, 10)); // Ensure it's an integer
          formData.append("file_path", filePath);

          console.log("📢 Sending Request to /generate_mcq/ as FormData:");
          for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]} (Type: ${typeof pair[1]})`);
          }

          const response = await fetch("http://127.0.0.1:8000/generate_mcq/", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) throw new Error("Generate MCQ API fails");

          const data = await response.json();
          setQuizQuestions(data.questions);
          setTimeLeft(timeLimit ? parseInt(timeLimit) * 60 : 600); // ✅ Fix: Use timeLimit
        } catch (error) {
          console.error("🛑 Error making quiz questions:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchQuestions();
  }, [numQuestions, filePath]);

  // ✅ Handle answer selection (stores selected answer but does NOT update score yet)
  const handleOptionClick = (questionIndex, option) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: option })); // ✅ Store answer
  };

  // ✅ Function to update score only when moving to the next question
  const goToNextQuestion = () => {
    if (selectedAnswers[currentQuestionIndex] === quizQuestions[currentQuestionIndex].correct_answer) {
      setScore(prevScore => prevScore + 1); // ✅ Update score when clicking "Next"
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  // ✅ Submit Quiz: Also checks last question's answer and navigates to results
  const handleSubmit = useCallback(() => {
    if (!quizCompleted) {
      setQuizCompleted(true);

      // ✅ Final check for last question's answer
      if (selectedAnswers[currentQuestionIndex] === quizQuestions[currentQuestionIndex].correct_answer) {
        setScore(prevScore => prevScore + 1);
      }

      console.log("✅ Navigating to results page...");

      navigate("/results", { 
        state: { 
          selectedAnswers, 
          correctAnswers: quizQuestions.reduce((acc, q, index) => {
            acc[index] = { question: q.question, answer: q.correct_answer };
            return acc;
          }, {}),
          score, 
          timeUp: false 
        } 
      });
    }
  }, [quizCompleted, navigate, selectedAnswers, quizQuestions, score]);

  // ✅ Timer Countdown
  useEffect(() => {
    if (!isLoading && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, isLoading, handleSubmit]);

  // ✅ Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="quiz-page">
      <NavbarHome />

      <div className="quiz-container">
        <h1 className="quiz-title">Quiz Time! ⏳</h1>

        {/* ✅ Show loading message while MCQs are being generated */}
        {isLoading ? (
          <p>⏳ Generating questions, please wait...</p>
        ) : (
          <>
            <div className="quiz-timer">⏳ Time Left: {formatTime(timeLeft)}</div>
            <div className="quiz-score">✅ Score: {score} / {quizQuestions.length}</div>

            {quizQuestions.length > 0 ? (
              <div className="quiz-question">
                <h2>{currentQuestionIndex + 1}. {quizQuestions[currentQuestionIndex].question}</h2>
                <div className="quiz-options">
                  {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                    <button 
                      key={index}
                      className={`quiz-option-btn ${selectedAnswers[currentQuestionIndex] === option ? "selected" : ""}`}
                      onClick={() => handleOptionClick(currentQuestionIndex, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : <p>No questions found.</p>}

            <div className="quiz-navigation">
              <button className="quiz-nav-btn" onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)} disabled={currentQuestionIndex === 0}>◀ Back</button>
              <button className="quiz-nav-btn" onClick={goToNextQuestion} disabled={currentQuestionIndex === quizQuestions.length - 1}>Next ▶</button>
            </div>

            {currentQuestionIndex === quizQuestions.length - 1 && (
              <button className="quiz-submit-btn" onClick={handleSubmit}>Submit Quiz</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
