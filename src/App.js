import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import QuizPage from "./QuizPage";
import Home from "./Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<Home />} />
          {/* Route for the quiz page with dynamic index */}
          <Route path="/quiz/:index" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
