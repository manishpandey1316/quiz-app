import React, { useEffect, useState } from 'react'
import "./Result.css"
import Confetti from 'react-confetti';
import ResultChart from './ResultChart';
function Result(props) {
   const [celebrate,setCelebrate]=useState(false) 
   const [quizResults,setQuizResults]=useState(null)
   useEffect(()=>
   {
      setQuizResults(
     {
        Correct:props.score/10,
        Skipped:props.skipped,
        Incorrect:(props.totalScore/10)-(props.skipped+props.score/10),
     })
      
         setCelebrate(true)
         setTimeout(()=>{
            setCelebrate(false)
         },10000)
      
   },[props])
   
  return (
    <>
    {celebrate && <Confetti />}
    
    <div className='show-score-1'>
        Your Score:{props.score}<br/>
        </div>
    <div className='show-score-2'>    
        Total Score:{props.totalScore}
    </div>
    <ResultChart quizResults={quizResults}></ResultChart>
    <button id="next-button" className= "try-btn" onClick={props.tryAgain}>Try Again</button>
   
    </>
  )
}

export default Result