import { useCallback, useState } from 'react';
import QUESTIONS from "../questions.js";
//import Answers from './Answers.jsx';
import Question from './Question.jsx';
import Summary  from './summary.jsx';

export default function Quiz()
{
    const [userAnswers,setUserAnswers]= useState([]);

    const activeQuestionIndex = userAnswers.length ;
    console.log("User Answers:", userAnswers);
    console.log("Current Index:", activeQuestionIndex);

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  
    const handleSelectAnswer = useCallback(
        function handleSelectAnswer(selectedAnswer){
            setUserAnswers((prevUserAnswers) => {
              return [...prevUserAnswers,selectedAnswer];
            });

            
    }, 
    [ ]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete){
        return <Summary userAnswers={userAnswers}/>
    
    }

    return (
        <div id="quiz">
        <Question 
        key= {activeQuestionIndex}
        index = {activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
        />     
        </div>
    );
}
