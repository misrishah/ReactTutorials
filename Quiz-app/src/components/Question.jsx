import { useState } from 'react';
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

export default function Question({
  index,
  onSelectAnswer,
  onSkipAnswer 
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null
  });

  const isAnswered = answer.selectedAnswer !== '';
  const isResultShown = answer.isCorrect !== null;

  let timer = 10000;

  // Only reduce timer AFTER selection
  if (isAnswered && !isResultShown) {
    timer = 4000; // show feedback time
  }

  function handleSelectAnswer(selected) {
    setAnswer({
      selectedAnswer: selected,
      isCorrect: null
    });

    // First delay: show user their selected answer
    setTimeout(() => {
      const isCorrect = QUESTIONS[index].answers[0] === selected;
      setAnswer({
        selectedAnswer: selected,
        isCorrect
      });

      // Second delay: move to next question
      setTimeout(() => {
        onSelectAnswer(selected);
      }, 2000);
    }, 2000);
  }

  let answerState = '';

  if (isAnswered && isResultShown) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (isAnswered) {
    answerState = 'answered';
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer} // re-render timer on time change
        timeout={timer}
        onTimeout={!isAnswered ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
