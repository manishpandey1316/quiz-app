import React, { useState } from "react";
import Data from "../Data.json";
import Result from "./Result";
import "./Question.css";
import Timer from "./Timer";
import { time_per_question,score_per_ques } from "../constants";
function Question() {

  const QuizData = Data.questions;
  const [question, setQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [displayResult, setDisplayResult] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(time_per_question);
  const [skipped,setSkipped]=useState(0)
  const shuffleData=()=>
  {
      for (let i = QuizData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [QuizData[i], QuizData[j]] = [QuizData[j], QuizData[i]];
      }
  }
  const changeQuestion = () => {
    if(selectedAnswer!==null)
     {updateScore();}
     else
     {setSkipped(skipped+1)}

    if (currentProgress + 100 / QuizData.length <= 100) {
      setCurrentProgress(currentProgress + 100 / QuizData.length);
    }
    
    if (question < QuizData.length - 1) {
      setQuestion(question + 1);
      setSelectedAnswer(null);
    } else {
      setDisplayResult(true);
    }
    setTotalSeconds(time_per_question)
  };
  const updateScore = () => {
    if (selectedAnswer === QuizData[question].correctAnswer) {
      setScore(score + score_per_ques);
    }
  };
  const resetAll = () => {
    setDisplayResult(false);
    setQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setCurrentProgress(0);
    setTotalSeconds(time_per_question);
    setSkipped(0)
    shuffleData()
  };
  return (
    <div className="container">
      {
         totalSeconds===0?changeQuestion():null
      }
      {displayResult ? (
        <Result
          score={score}
          totalScore={QuizData.length * score_per_ques}
          skipped={skipped}
          tryAgain={resetAll}
        />
      ) : (
        <>
          <div className="container-top">
            <p className="heading">Quiz APP</p>
           
            <Timer totalSeconds={totalSeconds} setTotalSeconds={setTotalSeconds}></Timer>
          </div>
          <div className="progress-bar">
              <div
                className="progress"
                style={{ width: currentProgress + "%" }}
              ></div>
            </div>
          <div className="container-bottom">
            <div className="question-container">
              <span id="question" key={question}>
                {question + 1}. {QuizData[question].question}
              </span>
            </div>
            <div className="option-container" key={question}>
              {QuizData[question].Options.map((option, i) => {
                return (
                  <button
                    className={`option ${
                      selectedAnswer == option ? "checked" : null
                    }`}
                    key={i}
                    onClick={() => setSelectedAnswer(option)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <input
              type="button"
              value="Next"
              id="next-button"
              onClick={changeQuestion}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Question;
