// Import necessary components and styles
import { Select, Radio, Space } from 'antd';
import { Button, Form, Input } from 'antd';
import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import NavBar from "../../components/NavBar/NavBar";

// Basic CSS for styling
const submitButtonStyle = {
    marginTop: '16px',
    marginBottom: '42px',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    color: 'black',
    width: '30%',
    height: '30%',
    fontSize: '1.2rem'
};

function TakeAssess() {
   function SubmitAssessment() {
    
   }

   const data = JSON.parse(localStorage.getItem('my-assessment'));

   return (
      <div className="container nav-padding">
         <NavBar />

         <Card title={<h1 style={{ fontSize: '2rem' }}>{data["name"]}</h1>} >
               <h2>Description: {data["description"]}</h2>
            <Space direction="vertical" size={32}>
               {data["questions"].map((question, index) => (
                  <div key={index}>
                     {question.type === "Multiple Choice" ? (
                        <div>
                           <Card title={`Question ${index + 1}. ${question.question}`} >
                              <Radio.Group>
                                 <Space direction="vertical">
                                    {question.option.map((option, optionIndex) => (
                                       <Radio key={optionIndex} value={optionIndex}>
                                          {option}
                                       </Radio>
                                    ))}
                                 </Space>
                              </Radio.Group>
                           </Card>
                        </div>
                     ) : (
                        <div>
                           <Card title={`Question ${index + 1}. ${question.question}`} >
                              <Form id="activity-detail-editor" layout="horizontal" size="default" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
                                 <Form.Item labelAlign='left'>
                                    <Input.TextArea />
                                 </Form.Item>
                              </Form>
                           </Card>
                        </div>
                     )}
                  </div>
               ))}
            </Space>

            {/* Move the Submit button outside the Space component */}
         </Card>

         <Button type="primary" id="submit" onClick={SubmitAssessment} style={submitButtonStyle}>
            Submit Assessment
         </Button>
      </div>
   );
}

export default TakeAssess;
