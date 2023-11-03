import React, { useState } from 'react';
import {Button} from 'antd';

function QuestionForm() {
  const [questions, setQuestions] = useState([]);
  const[multForm,setMultForm] = useState(false);
    const [question,setQuestion] = useState("");
    const[option,setOption] = useState([]);
    const [answer,setAnswer] = useState("");
    const [type,setType] = useState("");

    const addOptions= (e) => {
        e.preventDefault();
        setOption([...option,""]);
    }

  const optionChange = (index, text) => {
    const updatedOption = [...option];
    updatedOption[index] = text;
    setOption(updatedOption);

}
  const submitQuestion= (e)=>{
    setQuestions([...questions,{type:type,question:question,option:option,answer:answer}]);
    setAnswer("");
    setQuestion("");
    setOption([]);
    setType("");
    setMultForm(false);
  }
  return (
    <div>

      <Button onClick={() =>{setMultForm(true);setType("Multiple Choice");}}>Add multiple choice question</Button>
      {
        multForm && (
        <div>
            <input type="text" placeholder="Question text" value={question} onChange={(e) => setQuestion(e.target.value)}/>
            {option.length > 0 && <h3>Enter answer options:</h3>}
            {option.map((option,index) => (
                <><input type="text" placeholder="Option text" value={option} onChange={(e) => optionChange(index, e.target.value)} /><br></br></>
            ))}
            <Button onClick={(e)=>addOptions(e)}>Add Option</Button><br/>
            {option.length > 0 && <h3>Enter the index of the correct answer:</h3>}
            {option.length >0 && <input type="text" placeholder="Correct answer index" value={answer} min="1" max={option.length} onChange={(e) => setAnswer(e.target.value)}/>}
            
            
            <br/><Button onClick={(e)=>{setType("");setAnswer("");setQuestion("");setOption([]);setMultForm(false);}} >Delete Question</Button><br/>
            <Button onClick={submitQuestion}>Submit Question</Button><br/>
        </div>)
      }
      
      <h3>Questions:</h3>
      <ul>
        {questions.map((question,index) => (question.type=="Multiple Choice") ? 
        (
            <><h2 key={index}>Question #{index+1}.{question.question}</h2><br/>{question.option.map((option, index) => (<option>{index + 1}. {option}<br /></option>))}</>)
        : (<li key={index}>{question.question}<br/>Correct Answer: {question.answer}</li>
        ))}
      </ul>

    </div>
  );  
}

export default QuestionForm;