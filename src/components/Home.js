import Question from "./Question"
import "./Home.css"
import { useState } from "react"
function Home()
{
    const [start,setStart]=useState(false)
    return (
         <>
         {start ? <Question/> :
        <div className="dash">
            <h1 id="heading">Welcome to Quiz Application</h1>
             <img src="quiz-time.jpg" id ="img"alt="quiz time"></img>
             <button id="btn" onClick={()=>setStart(true)}>Start</button> 
        </div>}
        </>
    )
}
export default Home