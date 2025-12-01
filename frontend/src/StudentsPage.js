import React, { useState, useEffect } from 'react';
import NavbarGuardian from './NavbarGuardian';
import './StudentsPage.css';

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [chatLogs, setChatLogs] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatReport, setChatReport] = useState(null); // Store fetched report

  useEffect(() => {
    const guardianData = sessionStorage.getItem("guardian");

    if (guardianData) {
      try {
        const parsedData = JSON.parse(guardianData);
        const studentList = parsedData.Students.map(student => ({
          id: `STD${student.Student_ID.toString().padStart(2, '0')}`,
          name: student.Student_email.split('@')[0],
          chatLogs: student.Chatlogs || [] 
        }));

        setStudents(studentList);
      } catch (error) {
        console.error("Error parsing guardian data:", error);
      }
    }
  }, []);

  // Open student details popup
  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setChatLogs(null);
    setSelectedChat(null);
    setChatReport(null);
  };

  // Show Chat Logs inside the same popup
  const handleShowChatLogs = () => {
    setChatLogs(selectedStudent.chatLogs);
    setSelectedChat(null);
    setChatReport(null);
  };

  // Open specific chat content inside the same popup
  const handleViewChatContent = (chat) => {
    setSelectedChat(chat);
    setChatReport(null);
  };

  // Close all popups
  const handleClosePopup = () => {
    setSelectedStudent(null);
    setChatLogs(null);
    setSelectedChat(null);
    setChatReport(null);
  };

  // Function to format chat content as a string
  const formatChatContent = (chat) => {
    return chat.Chat_content.map(msg => `${msg.sender}: ${msg.message}`).join(". ");
  };

  // Function to request and fetch chat report
  const generateChatReport = async () => {
    if (!selectedChat) return;

    const formattedChat = formatChatContent(selectedChat);
    
    try {
      const response = await fetch("http://127.0.0.1:8000/report_generation/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({text: formattedChat })
      });

      if (!response.ok) {
        throw new Error("Failed to generate chat report");
      }

      const data = await response.json();
      setChatReport(data.output); // Store received report text
    } catch (error) {
      console.error("Error generating chat report:", error);
      alert("Failed to generate chat report.");
    }
  };

  return (
    <div className="students-page">
      <NavbarGuardian />

      <div className="students-container">
        {students.length > 0 ? (
          students.map((student) => (
            <div key={student.id} className="student-row">
              <span className="student-name">
                {student.id} - {student.name}
              </span>
              <button className="student-button" onClick={() => handleViewClick(student)}>View</button>
            </div>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </div>

      {/* Unified Popup for Student Details, Chat Logs, Chat Content, and Report */}
      {(selectedStudent || chatLogs || selectedChat) && (
        <div className="popup-overlay">
          <div className="popup-container">
            {/* Student Details */}
            {selectedStudent && !chatLogs && !selectedChat && !chatReport && (
              <>
                <h2>{selectedStudent.id} - {selectedStudent.name}</h2>
                <div className="popup-buttons">
                  <button className="popup-button" onClick={handleShowChatLogs}>Previous Activity Logs</button>
                  <button className="popup-button">Generate Latest Report</button>
                </div>
              </>
            )}

            {/* Chat Logs */}
            {chatLogs && !selectedChat && !chatReport && (
              <>
                <h2>Previous Activity Logs</h2>
                {chatLogs.length > 0 ? (
                  chatLogs.map((chat) => (
                    <button key={chat.Chat_ID} className="popup-button" onClick={() => handleViewChatContent(chat)}>
                      Chat ID: {chat.Chat_ID} - "{chat.Chat_content[0]?.message}"
                    </button>
                  ))
                ) : (
                  <p>No chat logs available.</p>
                )}
              </>
            )}

            {/* Chat Content */}
            {selectedChat && !chatReport && (
              <>
                <h2>Chat ID: {selectedChat.Chat_ID}</h2>
                <div className="chat-content">
                  {selectedChat.Chat_content.map((message, index) => (
                    <p key={index}><b>{message.sender}:</b> {message.message}</p>
                  ))}
                </div>
                <button className="popup-button" onClick={generateChatReport}>Generate Chat Report</button>
              </>
            )}

            {/* Chat Report */}
            {chatReport && (
              <>
                <h2>Chat Report</h2>
                <div className="chat-content">
                  {chatReport.split(". ").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </>
            )}

            {/* Go Back or Close Button */}
            <button className="popup-go-back" onClick={handleClosePopup}>Go Back</button>
          </div>
        </div>
      )}

      {/* <footer className="students-footer">
        <p>© 2024 KinetiKids</p>
        <div className="footer-social-icons">
          <a href="#"><i className="fab fa-linkedin"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </footer> */}
    </div>
  );
}

export default StudentsPage;
