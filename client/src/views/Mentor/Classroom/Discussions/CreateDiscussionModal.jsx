import {Modal, Button, Input, message, DatePicker} from 'antd';
//import React, {useState} from "react";
import React, { useRef, useState } from 'react';
import {createDiscussion} from "../../../../Utils/requests";
import './Discussions.less'
    
export default function CreateDiscussionModal({ onCreate }) {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDueDate] = useState('');
    const [reminderInterval, setReminderInterval] = useState(1);

    const showModal = () => {
        setVisible(true)
    };

    const handleCancel = () => {
        setVisible(false)
    };

    const handleOk = async () => {
        onCreate(title, description, date, reminderInterval);
        setVisible(false)
    };

    return (
        <div id='create-discussion-modal'>
            <button id='create-disc-btn' onClick={showModal}>Create New Discussion</button> {/* show modal button */}
            <Modal
                title={'New Discussion'}
                visible={visible}
                onCancel={handleCancel}
                width='50vw'
                footer={[
                    <Button key="ok" type="primary" onClick={handleOk}>
                        Create
                    </Button>,
                ]}
            >
                <div id="create-discussion-inputs"> {/* input fields for the discussion title and description */}
                    <Input placeholder="Discussion Title" onChange={(e) => setTitle(e.target.value)} />
                    <Input.TextArea placeholder="Discussion Description" onChange={(e) => setDescription(e.target.value)} />
                    {/* Include the DueDate component and pass setDueDate */}
                    <div> <DatePicker placeholder='Select Due Date' onChange={(date, dateString) => setDueDate(dateString)} /> </div>
                    <div><label>Reminder Interval (Days):</label>
                        <Input
                        type="number"
                        min={1}
                        max={14}
                        value={reminderInterval}
                        onChange={(e) => setReminderInterval(e.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

