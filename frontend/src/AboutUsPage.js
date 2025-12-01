import React from "react";
import NavbarHome from "./NavbarHome"; // Import Navbar
// import Footer from "./Footer"; // Import Footer component
import "./AboutUsPage.css"; // Import CSS

const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      {/* Navbar */}
      <NavbarHome />

      {/* Main Content */}
      <div className="about-us-container">
        
        {/* Left Section - Image Grid */}
        <div className="about-images">
          <div className="image-grid">
            <div className="image-box img-1"></div>
            <div className="image-box img-2"></div>
            <div className="image-box img-3"></div>
            <div className="image-box img-4"></div>
          </div>
        </div>

        {/* Right Section - Text */}
        <div className="about-text">
          <h1 className="about-title">About Us</h1>
          <p>
            In the region of Pakistan, not many primary grade students have the ability to read
            or understand English, which hinders their learning and becomes a barrier in their education. 
            We want to provide these students with a bilingual platform that supports English as well as Urdu language.
          </p>
          <p>
            KinetiKids aims to bring a new landscape of education by incorporating the use of
            <strong> Generative AI</strong> and <strong> Retrieval Augmented Reality (RAG)</strong>. 
            Such technologies can enhance a student’s learning outcomes by engaging their 
            <strong> auditory, visual, and cognitive abilities altogether.</strong>
          </p>
        </div>
      </div>

      {/* Footer */}
      {/* <Footer /> Use Footer component here */}
    </div>
  );
};

export default AboutUsPage;
