import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";
import Score from './Score';  

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [answeredQuestions, setAnsweredQuestions] = useState(new Array(data.length).fill(false));

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        option_array[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
      const newAnsweredQuestions = [...answeredQuestions];
      newAnsweredQuestions[index] = true;
      setAnsweredQuestions(newAnsweredQuestions);
    }
  };

  const previous = () => {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      setQuestion(data[newIndex]);
      setLock(answeredQuestions[newIndex]);

      // Clear any visual feedback from the previous question
      option_array.forEach((option) => {
        if (option.current) {
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
        }
      });
    }
  };

  const next = () => {
    if (index < data.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      setQuestion(data[newIndex]);
      setLock(answeredQuestions[newIndex]);

      // Clear any visual feedback from the previous question
      option_array.forEach((option) => {
        if (option.current) {
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
        }
      });
    } else {
      setResult(true);
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    setAnsweredQuestions(new Array(data.length).fill(false));
  };

  const renderOptions = () => {
    if (index === 0 || answeredQuestions[index - 1]) {
      return (
        <ul>
          <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
            {question.option1}
          </li>
          <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
            {question.option2}
          </li>
          <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
            {question.option3}
          </li>
          <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
            {question.option4}
          </li>
        </ul>
      );
    } else {
      return <p>You need to answer the previous question to see the options.</p>;
    }
  };

  const percentage = Math.round((score / data.length) * 100);   // Calculate percentage 

  return (
    <div className="container">
      <h1>Steven's React Trivia Project</h1>
      <hr />
      {result ? (
        <>
          <h2>
            You answered {score} questions correctly out of {data.length} Your score is:  {percentage}%
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <Score score={score} total={data.length} />  {/* Include the Score component */}
          <h2>
            {index + 1}. {question.question}
          </h2>
          {renderOptions()}
          <button onClick={previous}>Previous</button>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
