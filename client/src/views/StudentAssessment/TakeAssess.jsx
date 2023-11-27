import { Select,Radio, Space } from 'antd';
import { Button,Form, Input } from 'antd';
import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import NavBar from "../../components/NavBar/NavBar"
import { getStudentClassroom,createStudentAssessments } from '../../Utils/requests';
function TakeAssess(){
    const data  = JSON.parse(localStorage.getItem('my-assessment'));
    const [answers,setAnswers] = useState(new Array(data["questions"].length).fill(false));

    async function SubmitAssessment(){
        for(let i=0;i<answers.length;i++)
        {
            if(answers[i]==false)
            {
                alert("You must enter an answer for question "+(i+1));
                return;
            }
        }
        let res = await getStudentClassroom();
        const classID =res.data.classroom.id;
        let id = JSON.parse(localStorage.getItem("studentsID"))[0];
        console.log(classID);
        createStudentAssessments(data["name"],id,classID,answers);

    }


    function onChange(index,e){
        let temp = [...answers];
        temp[index]=e.target.value;
        setAnswers(temp);
        console.log(answers);
    }
    return (
        <div className="container nav-padding">
            <NavBar />
            <h1>{data["name"]}</h1>
            <h2>Description: {data["description"]}</h2>
            <div>
            <Space direction="vertical" size={32}>
                {data["questions"].map((question, index) => (
                    <div key={index}>
                        {question.type === "Multiple Choice" ? (
                        <div>
                        <Card title={`Question ${index + 1}.${question.question}`} style={{ width: 300 }}>
                            <Radio.Group onChange={(e) => onChange(index, e)}>
                            <Space direction="vertical">
                                {question.option.map((option, optionIndex) => (
                                <Radio value={optionIndex}>{option}</Radio>
                                ))}
                            </Space>
                            </Radio.Group>
                        </Card>
                        
                        </div>
                    ) : (
                    <div>
                        <Card title={`Question ${index + 1}.${question.question}`} style={{ width: 300 }}>
                            <Form id="activity-detail-editor" layout="horizontal" size="default" labelCol={{
                                span: 6,
                                }}
                                wrapperCol={{
                                span: 14,
                                }}>
                            <Form.Item labelAlign='left' onChange={(e) => onChange(index, e)}>
                                <Input.TextArea />
                            </Form.Item>
                            </Form>
                        </Card>
                        </div>
                )
                }
          </div>
        ))}
            </Space>
            </div>
            <Button id="submit" onClick={SubmitAssessment}>Submit Assessment</Button>
        </div>
    )
}

export default TakeAssess;