import React, { useState } from 'react';
import {Button} from 'antd';

function QuestionForm() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (e) => {
    e.preventDefault();
    setQuestions([...questions, {type:"free response", text: '', options: [] }]);
  };

  const addMultQuestion = (e) => {
    e.preventDefault();
    setQuestions([...questions, {type:"multiple choice",text: '', options: ['', '','',''] }]);
  };

  const handleQuestionChange = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = text;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = text;
    setQuestions(updatedQuestions);
  };

  const addOption = (e, questionIndex) => {
    e.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (e, questionIndex) => {
    e.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <Button onClick={addMultQuestion}>Add multiple choice question</Button>
      <Button onClick={addQuestion}>Add free response question</Button>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <input
            type="text"
            placeholder="Question text"
            value={question.text}
            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
          />
          <Button onClick={(e) => removeQuestion(e, questionIndex)}>Remove Question</Button>
          {question.type=="free response" ? (question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                type="text"
                placeholder="Option text"
                value={option}
                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
              />
              <button onClick={(e) => removeOption(questionIndex, optionIndex)}>Remove Option</button>
            </div>
          ))) : (
            <select multiple={true}>
                {question.options.map((option, optionIndex) =>
                 (
                <div key={optionIndex}>
                <option
                    value={option}
                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                >
                    {option}
                </option>
                <button onClick={(e) => removeOption(questionIndex, optionIndex)}>Remove Option</button>
                </div>
            )
            )}
          </select>)
             }
          <Button onClick={(e) => addOption(e, questionIndex)}>Add Option</Button>
        </div>
      ))}
    </div>
  );  
}

export default QuestionForm;