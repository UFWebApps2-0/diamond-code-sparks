import { Select,Radio, Space } from 'antd';
import { Button,Form, Input } from 'antd';
import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import NavBar from "../../components/NavBar/NavBar"
function TakeAssess(){

    function SubmitAssessment(){

    }
    const data  = JSON.parse(localStorage.getItem('my-assessment'));
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
                            <Radio.Group>
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
                            <Form.Item labelAlign='left'>
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