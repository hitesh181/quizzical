import React from "react";

export default function Startup(props){
    return (
        <main className="startup">
            <h1 className="page-title">Quizical</h1>
            <h4 className="page-description">Quiz Contains 7 Questions extracted 
            from the Trivia API.<br/>
            Auto check is enabled you just need to submit
            </h4>
            <button className = "start-button"onClick = {props.startQuiz}>Start Quiz</button>
        </main>
    )
}