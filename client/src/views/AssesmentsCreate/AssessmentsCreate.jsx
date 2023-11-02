import {React,useState} from 'react';
import QuestionForm from './QuestionForm';

function CreateAssessments()
{


    return (
        <div>
            <form>
                <QuestionForm/>
                <button type="submit">Submit</button>
        </form>
        </div>
    )
}

export default CreateAssessments;