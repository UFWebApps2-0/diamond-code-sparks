import { Select,Radio, Space } from 'antd';
import { Button,Form, Input } from 'antd';
import React, { useState } from 'react';
function ViewAssessment({questions}){



    return (
        <div>
            <h1>View Assessment</h1>
            {questions.map((question, index) => (
                <div key={index}>
                    {question.type === "Multiple Choice" ? (
                    <div>
                    <h4>Question #{index + 1}.{question.question}</h4>
                    <Radio.Group>
                    <Space direction="vertical">
                        {question.option.map((option, optionIndex) => (
                        <Radio value={optionIndex}>{option}</Radio>
                        ))}
                    </Space>
                    </Radio.Group>
                </div>
                ) : (
                <div>
                    <h4>Question #{index + 1}.{question.question}</h4>
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
                </div>
            )
            }
          </div>
        ))}
        </div>
    );
}

export default ViewAssessment;