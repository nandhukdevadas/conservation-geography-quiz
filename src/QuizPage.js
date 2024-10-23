import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { quizData } from "./quizData";
import { shuffleArray } from "./utils";

function QuizPage() {
  const { index } = useParams(); // Get section index from route
  const sectionIndex = parseInt(index);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({}); // Track if each question is answered correctly

  useEffect(() => {
    let sectionQuestions;

    if (sectionIndex === 3) {
      // If it's the "Overall Quiz", use all questions from quizData
      sectionQuestions = shuffleArray(quizData);
    } else {
      // Calculate start and end based on the section index
      const start = sectionIndex * 40; // 4 weeks * 10 questions per week
      const end = start + 40; 
      sectionQuestions = shuffleArray(quizData.slice(start, end));
    }

    // Randomize the options within each question
    sectionQuestions = sectionQuestions.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));

    setQuestions(sectionQuestions);
  }, [sectionIndex]);

  const handleOptionClick = (qIndex, isCorrect) => {
    if (answers[qIndex] === undefined) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [qIndex]: isCorrect,
      }));
      if (isCorrect) setScore((prevScore) => prevScore + 1);
    }
  };

  return (
    <div className="quiz-page">
      <h1>Quiz: {sectionIndex === 3 ? "Overall Quiz" : `Section ${sectionIndex + 1}`}</h1>
      {questions.map((q, i) => (
        <QuestionCard
          key={i}
          question={q}
          qIndex={i}
          onOptionClick={handleOptionClick}
          answered={answers[i] !== undefined}
          isCorrect={answers[i]}
        />
      ))}
      <div className="score">
        <h2>Your Score: {score} / {questions.length}</h2>
      </div>
    </div>
  );
}

function QuestionCard({ question, qIndex, onOptionClick, answered, isCorrect }) {
  return (
    <div className="question-card">
      <h3>
        {question.text}{" "}
        {answered && (isCorrect ? "✅" : "❌")}
      </h3>
      <div className="options-container">
        {question.options.map((option, i) => (
          <button
            key={i}
            className={`option ${answered ? (option.isCorrect ? "correct" : "incorrect") : ""}`}
            onClick={() => onOptionClick(qIndex, option.isCorrect)}
            disabled={answered}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizPage;
