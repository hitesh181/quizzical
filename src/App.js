import React from "react";
import Startup from "./Startup"
import Quiz from "./Quiz"
import Question from "./Question";

import { nanoid } from 'nanoid'

export default function App(){
    const [started, setStarted] = React.useState(false)
    const [questionsData, setQuestionsData] = React.useState([])
    const [count, setCount] = React.useState(0)
    const [checked, setChecked] = React.useState(false)
    const [correct, setCorrect] = React.useState(0)
    

       React.useEffect(() => {
        (async()=> {
        const response = await fetch("https://opentdb.com/api.php?amount=7")
        const responsejson = await response.json();
        const data = responsejson.results
        let q  = []
        data.forEach(question => {
            q.push(
                {
                    id:nanoid(),
                    options:shuffleArray([...question.incorrect_answers, question.correct_answer]),
                    question : question.question,
                    correct: question.correct_answer,
                    select: null,
                    checked:false

                }
            )
        })
        setQuestionsData(q);
      })();
       },[count])

       function shuffleArray(arr){
        arr.sort(() => Math.random() - 0.5)
        return arr;
       }

       function handleClickAnswer(id, answer, correct){
        setQuestionsData(questions => questions.map( question =>{
            return question.id === id? {...question, selected:answer} : question
        }))
        //.log("Cliked" ,id,answer,correct)
       }

       const questionElement = questionsData ? questionsData.map(question =>{
        return (

            <Question
            key = {question.id}
            q = {question}
            handleClickAnswer ={handleClickAnswer}
            id = {question.id}
            />
        )
       }) : []

       function handleCheck(){
            let selected = true;
            //agr ek bhi empty/unselected mil gaya toh wapis hojayo kuch mat karo
            questionsData.forEach(question =>{
                if(question.select === null){
                    selected = false;
                    return;
                }
            })
            //was just experimenting ki iske bina chalta h ya nahi
            
            if (!selected){
                console.log("triggered")
                window.alert("Please Select all Questions before checking ")
                return
              }
            
            //saaare question ka checked true kardiua
            setQuestionsData(questions => questions.map(question => {
                return {...question, checked:true}
            }))

            setChecked(true)

            //now counting score
            let correct = 0;
            questionsData.forEach(question => {
                if(question.selected === question.correct)
                    correct+=1
            })
            setCorrect(correct)

       }
       function handlePlayAgain(){
        setCount(count=>count+1);
        setChecked(false)
       }
    
    return (
       <div className ="main-container">
        <div className='content-container'>
            {started ?
                <div className = 'start-content-container'>
                    {questionElement} 
                <div className = 'end-div'>
                {checked &&
                    <span className="score">You Scored {correct}/10</span>
                }
                <button className ='check' 
                onClick = {checked ? handlePlayAgain: handleCheck}>
                {checked ? "Play Again ": "Check Answers"}
                </button>
                </div>
            </div>
            :
            <Startup 
                startQuiz = {()=> setStarted(x => !x)}
            />
            }
        </div>
       </div>
    )
}