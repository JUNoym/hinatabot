import React from "react"
import Answer from "./Answer"

const AnswersList = (props) => {
    return (
        <div className="answer">
            {props.answers.map((value, index) => {
                return <Answer content={value.content} key={index.toString()} nextId={value.nextId} select={props.select} />
            })}


        </div>
    )
}

export default AnswersList