import React, { useState } from 'react';
import { Button } from 'antd';

function QuestionForm() {
  const [questions, setQuestions] = useState([]);
  const [multForm, setMultForm] = useState(false);
  const [frForm, setFrForm] = useState(false);
  const [question, setQuestion] = useState("");
  const [option, setOption] = useState([]);
  const [answer, setAnswer] = useState("");
  const [type, setType] = useState("");
  const [frAnswer, setfrAnswer] = useState("")
  const [frQuestion, setfrQuestion] = useState("")


  const addOptions = (e) => {
    e.preventDefault();
    setOption([...option, ""]);
  }

  const optionChange = (index, text) => {
    const updatedOption = [...option];
    updatedOption[index] = text;
    setOption(updatedOption);

  }
  const submitMultQuestion = (e) => {
    console.log('clicked')
    setQuestions([...questions, { type: type, question: question, option: option, answer: answer }]);
    setAnswer("");
    setQuestion("");
    setOption([]);
    setType("");
    setMultForm(false);
  }

  const submitFrQuestion = (e) => {
    setQuestions([...questions, { type: type, question: frQuestion, answer: frAnswer }]);
    setfrAnswer("");
    setfrQuestion("");
    setOption([]);
    setType("");
    setFrForm(false);
  }

  const resetFrForm = () => {
    setType("");
    setfrAnswer("");
    setfrQuestion("");
    setFrForm(false);
  }

  const resetMultForm = () => {
    setType("");
    setAnswer("");
    setQuestion("");
    setMultForm(false);
    setOption([]);
  }

  return (
    <div>

      { /* Multiple Choice Form */}
      <Button onClick={() => { setMultForm(true); setType("Multiple Choice"); }}>Add multiple choice question</Button>
      {
        multForm && (
          <div>
            <input type="text" placeholder="Question text" value={question} onChange={(e) => setQuestion(e.target.value)} />
            {option.length > 0 && <h3>Enter answer options:</h3>}
            {option.map((option, index) => (
              <><input type="text" placeholder="Option text" value={option} onChange={(e) => optionChange(index, e.target.value)} /><br></br></>
            ))}
            <Button onClick={(e) => addOptions(e)}>Add Option</Button><br />
            {option.length > 0 && <h3>Enter the index of the correct answer:</h3>}
            {option.length > 0 && <input type="text" placeholder="Correct answer index" value={answer} onChange={(e) => setAnswer(e.target.value)} />}


            <br /><br /><Button onClick={resetMultForm} >Delete Question</Button><br />
            <Button onClick={(e) => { submitMultQuestion(e) }}>Submit Question</Button><br /><br />
          </div>)
      }

      { /* Free Response Form */}
      <Button onClick={() => { setFrForm(true); setType("Free Response"); }}>Add free response question</Button>
      {
        frForm && (
          <div>
            <br /><label> Free Response Question</label><input type="text" placeholder="Question text" value={frQuestion} onChange={(e) => setfrQuestion(e.target.value)} />
            <br /><br /><label>Enter correct answer:</label><input type="text" placeholder="" value={frAnswer} onChange={(e) => setfrAnswer(e.target.value)} />
            <br /><br /><Button onClick={resetFrForm} >Delete Question</Button><br />
            <Button onClick={(e) => { submitFrQuestion(e) }}>Submit Question</Button><br /><br />
          </div>)
      }

      <h3>Questions:</h3>
      <ul>
        {questions.map((question, index) => (
          <div key={index}>
            {question.type === "Multiple Choice" ? (
              <div>
                <h2>Question #{index + 1}.{question.question}</h2>
                {question.option.map((option, optionIndex) => (
                  <p key={optionIndex}>{index + 1}. {option}</p>
                ))}
              </div>
            ) : (
              <div>
                <h2>Question #{index + 1}.{question.question}</h2>
                {/* Display free response answer */}
                <p>Free Response Answer: {question.answer}</p>
              </div>
            )}
          </div>
        ))}
      </ul>


    </div>
  );


  
}

export default QuestionForm;