import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import "./Quiz.css";
let score = 0;
function Quiz() {
  const [CurrentCategory, setCurrent] = useState(
    localStorage.getItem("category")
  );
  const [allQuestions, setAllQuestions] = useState([]); //stores all the quiz data per session.
  const [currentQuestion, SetCurrentQuestion] = useState(0);
  const [displayScore, setDisplayScore] = useState(false);

  //function to hit the api to get questions
  async function getQuestion() {
    const questionData = await fetch(
      "https://opentdb.com/api.php?amount=20&category=" +
        CurrentCategory +
        "&type=multiple"
    );
    const response = await questionData.json();
    const Questions = response.results.map((data) => {
      data.allAnswers = data.incorrect_answers.slice();
      data.allAnswers.push(data.correct_answer);
      const index = Math.floor(Math.random() * 4 + 1) - 1; //this will shuffle the position of right answer
      const correctIndex = data.allAnswers.indexOf(data.correct_answer);
      const tempAns = data.allAnswers[index];
      data.allAnswers[index] = data.correct_answer;
      data.allAnswers[correctIndex] = tempAns;
      return data;
    });
    setAllQuestions(Questions);
  }

  useEffect(() => {
    getQuestion();
  }, []);

  //function to check answer and initiate the next question and add the scores.
  function checkAnswer(event) {
    event.target.style.backgroundColor = "yellow";
    document.getElementById(
      allQuestions[currentQuestion].correct_answer
    ).style.backgroundColor = "green";

    if (allQuestions[currentQuestion].correct_answer === event.target.value) {
      // setScore(score + 1);
      score = score + 1;
    }
    setTimeout(() => {
      event.target.style.backgroundColor = "transparent";
      document.getElementById(
        allQuestions[currentQuestion].correct_answer
      ).style.backgroundColor = "transparent";
    }, 1000);

    if (currentQuestion !== 19) {
      setTimeout(() => {
        SetCurrentQuestion(currentQuestion + 1);
        localStorage.setItem("Score", score);
      }, 2000);
    } else {
      setTimeout(() => {
        localStorage.setItem("Score", score);
        score = 0;
        setDisplayScore(true);
      }, 2000);
    }
  }
  return (
    <div>
      {displayScore ? (
        <Link to="/Score">
          <Redirect to="/Score" />
        </Link>
      ) : (
        // <div className="score-area">
        //   {localStorage.getItem('player') ? localStorage.getItem('player'):"You"} scored {score} out of {allQuestions.length}
        // </div>
        <>
          <div className="question-area">
            <div className="question-count"><h2>              <span>Question {currentQuestion + 1}</span>/{allQuestions.length}
</h2>
            </div>
            <div className="question-text">
              <h4>{allQuestions.length > 0
                ? allQuestions[currentQuestion].question
                : null}</h4>
              
            </div>
          </div>
          <div className="options-area">
            {allQuestions.length > 0
              ? allQuestions[currentQuestion].allAnswers.map(
                  (option, index) => (
                    <button
                      className="optionclass"
                      key={index}
                      id={option}
                      value={option}
                      onClick={checkAnswer}
                    >
                      {option}
                    </button>
                  )
                )
              : ""}
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
