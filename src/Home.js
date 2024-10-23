// Home.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const sections = ["Week 1-4", "Week 5-8", "Week 9-12", "Overall Quiz"];

  const handleClick = (index) => {
    navigate(`/quiz/${index}`); // Navigate to quiz page
  };

  return (
    <div>
      <h1 className="app-title">Conservation Geography Quiz</h1>
      <div className="sections">
        {sections.map((section, index) => (
          <div
            key={index}
            className="section-card"
            onClick={() => handleClick(index)}
          >
            <h2>{section}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
