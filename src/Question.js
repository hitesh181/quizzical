import React from "react";
import { nanoid } from 'nanoid'
import he from "he";

export default function Question(props){
    let answers = props.q.options

    function handleClick(event, answer, correct){
        //cannot change option after quiz finishsed
        if(props.checked)
            return
        props.handleClickAnswer(props.id, answer, correct)
    }
    const answersElements = answers.map(answer => {
        let id = null
        if(props.q.checked){
            if(answer === props.q.correct)
                id = 'correct'
            else if(answer === props.q.selected)
                id= 'incorrect'
            else
                id = 'not-selected'
        }
        return (
            <button key = {nanoid()}
            id = {id}
            className = {answer === props.q.selected ? 'answer selected' : 'answer'}
            onClick = {(event)=>handleClick(event,answer, props.q.correct)}
            >{he.decode(answer)}
            </button>
        )

    })
    return (
        <div className='question-container'>
        <h3 className='question-title'>{he.decode(props.q.question)}</h3>
          {answersElements}
        <div className='line'></div>
      </div>
    )
}