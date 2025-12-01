import React from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Use HashRouter for hash-based routing
import Home from "./Home"; // Import the Home page
import LandingPage from "./LandingPage"; // Import the Landing Page
import ServicesPage from "./ServicesPage"; // Import the Services Page
import GuardianHome from "./GuardianHome"; // Import the Guardian Home Page
import QAPage from "./QAPage"; // Import the Q&A Page
import VideoQuestionsPage from "./VideoQuestionsPage"; // Import the Video Questions Page
import StudentsPage from "./StudentsPage"; // Import the Students Page
import GuardianAbout from "./GuardianAbout"; // Import the Guardian About Page
import Login from "./login"; // Import the Login Page
import StudentModePage from "./StudentModePage"; // Import the Student Mode Page
import StudentSignupPage from "./StudentSignupPage"; // Import Student Signup Page
import GuardianModePage from "./GuardianModePage"; // Import Guardian Mode Page
import GuardianSignupPage from "./GuardianSignupPage"; // Import Guardian Signup Page
import AboutUsPage from "./AboutUsPage"; // Import the About Us Page
import EvaluationPage from "./EvaluationPage"; // Import the EvaluationPage component
import QuizPreferences from "./QuizPreferences";
import InstructionsPage from "./InstructionsPage";
import GenericInstructionsPage from "./GenericInstructionsPage";
import CoursesPage from "./CoursesPage";
import VideoLibraryEN from "./VideoLibraryEN";
import ResultsPage from "./ResultsPage";
import Footer from "./Footer";
import "./App.css"; // Import your global styles
import QuizPage from "./QuizPage";
import Logincopy from "./Logincopy";
import SciencePage from "./SciencePage";
import MathPage from "./MathPage";
import EnglishPage from "./EnglishPage";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {/* Main Content */}
        <div style={{ flexGrow: 1 }}>
          {/* Removed: <Navbar /> - Each page now controls its own navbar */}

          {/* Define all routes */}
          <Routes>
            {/* Landing Page - Clean Design */}
            <Route path="/" element={<LandingPage />} />

            {/* Student Login */}
            <Route path="/login" element={<Login />} exact />

            {/*Login Guardian*/}
            <Route path="/logincopy" element={<Logincopy />} exact />

            {/* Home Page */}
            <Route path="/home" element={<Home />} />

            {/* Services Page */}
            <Route path="/services" element={<ServicesPage />} />

            {/* Guardian Home Page */}
            <Route path="/guardian" element={<GuardianHome />} />

            {/* Q&A Page */}
            <Route path="/qa" element={<QAPage />} />

            {/* Video Questions Page */}
            <Route path="/video-questions" element={<VideoQuestionsPage />} />

            {/* Students Page for Guardian */}
            <Route path="/students-guardian" element={<StudentsPage />} />

            {/* Guardian About Page */}
            <Route path="/guardian-about" element={<GuardianAbout />} />

            {/* Student Mode Page */}
            <Route path="/student-mode" element={<StudentModePage />} />

            {/* Student Signup Page */}
            <Route
              path="/student-signup"
              element={<StudentSignupPage />}
              exact
            />

            {/* Guardian Mode Page */}
            <Route path="/guardian-mode" element={<GuardianModePage />} exact />

            {/* Guardian Signup Page */}
            <Route
              path="/guardian-signup"
              element={<GuardianSignupPage />}
              exact
            />

            {/* About Us Page */}
            <Route path="/about-us" element={<AboutUsPage />} />

            {/*Science Page*/}
            <Route path="/science-page" element={<SciencePage />} />

            {/*Math Page*/}
            <Route path="/math-page" element={<MathPage />} />

            {/*eng Page*/}
            <Route path="/english-page" element={<EnglishPage />} />

            {/* Evaluation Pages */}
            <Route path="/evaluation" element={<EvaluationPage />} />
            <Route path="/quiz-preferences" element={<QuizPreferences />} />
            <Route path="/instructions" element={<GenericInstructionsPage />} />
            <Route path="/quizinstructions" element={<InstructionsPage />} />
            <Route path="/quiz-start" element={<QuizPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/english" element={<VideoLibraryEN />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </div>

        {/* Include the Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
