import React from "react";
import { useNavigate } from "react-router-dom"; // Import Link for navigation
import NavbarHome from "./NavbarHome";
import "./CoursesPage.css";

const courses = [
  {
    id: 1,
    name: "English",
    description: "Dive deeper into our colorful collections!",
    icon: require("./assets/english-icon.png"),
    path: "/english-page",
    color: "green",
    emoji1: "📚",
    emoji2: "✏️",
  },
  {
    id: 2,
    name: "Maths",
    description: "Check out our latest arrivals!",
    icon: require("./assets/maths-icon.png"),
    path: "/math-page",
    color: "orange",
    emoji1: "🔢",
    emoji2: "🧮",
  },
  {
    id: 3,
    name: "Science",
    description: "Find your child's perfect look!",
    icon: require("./assets/science-icon.png"),
    path: "/science-page",
    color: "blue",
    emoji1: "🔬",
    emoji2: "🧪",
  },
];

const CoursesPage = () => {
  const navigate = useNavigate();

  const handleSelectCourse = (course) => {
    navigate(course.path); // Navigate to specific course or science page
  };

  return (
    <div className="courses-page">
      {/* Background decorations */}
      <div className="courses-deco-1"></div>
      <div className="courses-deco-2"></div>
      <div className="courses-deco-3"></div>

      {/* ✅ Navbar */}
      <NavbarHome />

      {/* Page Title */}
      <div className="courses-header">
        <h1 className="courses-title">
          Style Your Little Ones with <span>Playful</span> Flair!
        </h1>
        <p className="courses-subtitle">
          Choose from our exciting subjects and start a fun learning journey
          today!
        </p>
      </div>

      {/* ✅ Course Cards */}
      <div className="courses-container">
        {courses.map((course) => (
          <div key={course.id} className={`course-card ${course.color}`}>
            <div className="card-corner"></div>
            <div className="card-emoji emoji-1">{course.emoji1}</div>
            <div className="card-emoji emoji-2">{course.emoji2}</div>
            <div className="card-content">
              <img
                src={course.icon}
                alt={course.name}
                className="course-icon"
              />
              <h2>{course.name}</h2>
              <p className="course-description">{course.description}</p>
              <button
                className={`course-button ${course.color}-button`}
                onClick={() => handleSelectCourse(course)}
              >
                Explore
              </button>
            </div>
            <div className="arrow-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Footer */}
      {/* <footer className="courses-footer">
        <p>© 2024 KinetiKids</p> */}
      {/* <div className="footer-social-icons">
          <a href="#"><i className="fab fa-linkedin"></i></a>
          <a href="#"><i className="fab fa-x-twitter"></i></a>
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div> */}
      {/* </footer> */}
    </div>
  );
};

export default CoursesPage;
