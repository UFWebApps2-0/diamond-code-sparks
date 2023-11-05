import React from 'react';
import { createAsessment } from '../../Utils/requests';
import { addStudent } from '../../Utils/requests';

export function AssessmentButton({assessmentName, questions}){
  const handleButtonClick = async () => {
  console.log(assessmentName)
  console.log(questions);
   const res = await createAsessment(assessmentName, questions);
    console.log(res.data);
  }

    return (    <div>
        <button onClick={handleButtonClick}>Add Questions</button>
      </div>);


}