function CompletedAssessment({name,answers,questions}){

    
    return(
        <div>
            <h1>{name}</h1>
            {
                answers.map((answer,index) => (
                    <div key={index}>
                        <h3>Question {index+1}:{questions[index]}</h3>
                        <p>{answer}</p>
                    </div>
                ))
            }

        </div>
    );
}

export default CompletedAssessment;