import React, {useState, useEffect} from 'react';
import './Quiz.css';
import {Link} from 'react-router-dom'
function Quiz() {
  const [CurrentCategory, setCurrent] = useState(
    localStorage.getItem('category')
  );
  const [allQuestions, setAllQuestions] = useState([]);//stores all the quiz data per session.
  const [currentQuestion, SetCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(false);
  console.log(allQuestions);

  //function to hit the api to get questions
  async function getQuestion() {
    const questionData = await fetch(
      'https://opentdb.com/api.php?amount=20&category=' +
        CurrentCategory +
        '&type=multiple'
    );
    const response = await questionData.json();
    const Questions = response.results.map((data) => {
      data.allAnswers = data.incorrect_answers.slice();
      data.allAnswers.push(data.correct_answer);
      const index = Math.floor(Math.random() * 4 + 1) - 1;//this will shuffle the position of right answer
      const correctIndex = data.allAnswers.indexOf(data.correct_answer);
      const tempAns = data.allAnswers[index];
      data.allAnswers[index] = data.correct_answer;
      data.allAnswers[correctIndex] = tempAns;
      return data;
    });
    console.log(Questions, '???????????');
    setAllQuestions(Questions);
  }

  useEffect(() => {
    getQuestion();
  }, []);

//function to check answer and initiate the next question and add the scores.
  function checkAnswer(answer) {
    if (allQuestions[currentQuestion].correct_answer == answer) {
        setTimeout(() => {
            SetCurrentQuestion(currentQuestion + 1);
      setScore(score+1);
            
        }, 1000);
      
    }else{
        setTimeout(() => {
            setDisplayScore(true);            
        }, 1000);

    }
  }
  return (
    <div>
      {displayScore ? (
        <div className="score-area">
          You scored {score} out of {allQuestions.length}
        </div>
        // <Link to='/Score'></Link>
      ) : (
        <>
          <div className="question-area">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{allQuestions.length}
            </div>
            <div className="question-text">
              {allQuestions.length > 0
                ? allQuestions[currentQuestion].question
                : null}
            </div>
          </div>
          <div className="options-area">
            {allQuestions.length > 0 ? allQuestions[currentQuestion].allAnswers.map((option,index) => (
              <button key={index} onClick={() => checkAnswer(option)}>{option}</button>
            )):''}
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
