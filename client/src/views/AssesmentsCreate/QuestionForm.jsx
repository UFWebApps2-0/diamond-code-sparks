import React, { useState } from 'react';

function QuestionForm() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (e) => {
    e.preventDefault();
    setQuestions([...questions, { text: '', options: [] }]);
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
      <button onClick={addQuestion}>Add Question</button>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <input
            type="text"
            placeholder="Question text"
            value={question.text}
            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
          />
          <button onClick={(e) => removeQuestion(e, questionIndex)}>Remove Question</button>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                type="text"
                placeholder="Option text"
                value={option}
                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
              />
              <button onClick={(e) => removeOption(questionIndex, optionIndex)}>Remove Option</button>
            </div>
          ))}
          <button onClick={(e) => addOption(e, questionIndex)}>Add Option</button>
        </div>
      ))}
    </div>
  );  
}

export default QuestionForm;