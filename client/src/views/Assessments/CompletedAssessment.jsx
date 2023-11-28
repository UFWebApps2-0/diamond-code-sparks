import { getClassAssessment } from "../../Utils/requests";
import { useState, useEffect } from 'react'
import { Radio, Space } from 'antd';


function CompletedAssessment({ name, answers, classId }) {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState();


    useEffect(() => {
        const fetchAssessmentQuestions = async (name, id) => {
            try {
                const assessmentData = await getClassAssessment(name, id);
                const assessmentQuestions = assessmentData.data[0].questions;
                setQuestions(assessmentQuestions);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching assessment:', error.message);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAssessmentQuestions(name, classId);
    }, [name, classId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>{name}</h1>
            {
                questions.map((item, index) => (
                    <div key={index}>
                        <h3>Question {index + 1}: {item.question}</h3>
                        {item.type === 'Multiple Choice' && (
                            <>
                                <p>{item.type}</p>
                                <ul>
                                    <Radio.Group value={selectedOption}>
                                        <Space direction="vertical">
                                            {item.option.map((option, optionIndex) => (
                                                <Radio value={optionIndex} key={optionIndex} disabled={answers[index] !== optionIndex}>{option}</Radio>
                                            ))}
                                        </Space>
                                    </Radio.Group>
                                </ul>
                                <br />
                            </>
                        )}

                        {item.type === 'Free Response' && (
                            <p>
                                Student Response: {answers[index]}
                            </p>
                        )}
                    </div>
                ))
            }
        </div>
    );

}

export default CompletedAssessment;
