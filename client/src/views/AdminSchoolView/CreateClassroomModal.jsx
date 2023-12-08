import {Modal, Button, Form, Input, message, Select} from 'antd';
import React, {useState} from "react";
import '../Mentor/Dashboard/Dashboard.less';
import { getAllClassrooms, addClassroom } from '../../Utils/requests';

export default function CreateClassroomModal(props) {
    const [classroomName, setClassroomName] = useState("");
    const [classroomGrade, setClassroomGrade] = useState("");
    const [visible, setVisible] = useState(false);
    const { Option } = Select;


    const handleSubmit = async (event) => {
        event.preventDefault();
        alert("Handle Create Classroom");
        setVisible(false);
        /*
        if(classroomName != '') {

            let codes = [];

            const min = 1000;
            const max = 9999;

            
            getAllClassrooms().then((res) => {
                if (res.data) {
                    for(let i = 0; i < res.data.length; i++) {
                        codes.push(res.data[i].code);
                    }
                }
            });

            let code = Math.round(min + Math.random() * (max - min));
            //while(codes.includes(code)) {
                //code = Math.round(min + Math.random() * (max - min));
                
            //}
            console.log(code);
            console.log(codes);
            console.log(classroomName);
            console.log(classroomGrade);
            
            const res = await addClassroom(classroomName);

            if(res.data) {
               message.success(`Successfully created ${classroomName}.`)
            }
            else {
                message.error("Failed to create classroom.")
            }

        } else {
            message.info('Missing required field.')
        }


        
        setVisible(false);
        */
    }


    const handleCancel = (e) => {
        setClassroomName("");
        setVisible(false);
    }

    const showModal = () => {
        setVisible(true);
    }

    function handleChange(value) {
        setClassroomGrade(value);
        console.log(`Grade: ${value}`);
    }

    return (
        <div>
            <button className ='button' onClick={showModal}>
                <p id='label'> Create Classroom</p>
            </button>
            <Modal
            title={'Create Classroom'}
            visible={visible}
            onCancel={handleCancel}
            footer = {[
                <Button key='cancel' onClick={handleCancel}>
                Cancel
            </Button>,
            <Button key='save' type="primary" onClick={handleSubmit}>
                Create
            </Button>,
            ]}
            width={'40vw'}
        >
            <Form>
            <Form.Item id="form-label" label="Name">
          <Input
            onChange={e => setClassroomName(e.target.value)}
            value={classroomName}
            className="input"
            required
            placeholder={"Classroom Name"}
          ></Input>
        </Form.Item>
        <Form.Item id="form-label" label="Grade">
            <Select style={{ width: 120}} onChange={handleChange}>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
            </Select>
        </Form.Item>
      </Form>
            
            
            </Modal>
        </div>

    )
}