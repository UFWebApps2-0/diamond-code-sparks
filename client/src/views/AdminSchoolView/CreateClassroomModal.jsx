import {Modal, Button, Form, Input, message} from 'antd';
import React, {useState} from "react";
import '../Mentor/Dashboard/Dashboard.less';

export default function CreateClassroomModal() {
    const [classroomName, setClassroomName] = useState("");
    const [visible, setVisible] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        setVisible(false);
    }

    const handleCancel = (e) => {
        setVisible(false);
    }

    const showModal = () => {
        setVisible(true);
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
      </Form>
            
            
            </Modal>
        </div>

    )
}