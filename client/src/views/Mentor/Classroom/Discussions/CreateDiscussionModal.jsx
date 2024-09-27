import {Modal, Button, Input, message} from 'antd';
import React, {useState} from "react";
import {createDiscussion} from "../../../../Utils/requests";
import './Discussions.less'

export default function CreateDiscussionModal({ onCreate }) {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    
    // maybe need props.lessonModuleId to pass to createDiscussion

    // need lesson_module.id to pass to createDiscussion
    // const {code} = props;

    const showModal = () => {
        setVisible(true)
    };

    const handleCancel = () => {
        setVisible(false)
    };

    const handleOk = async () => {
        // const res = await createDiscussion(title, description, lessonModuleId);
        // if (res.err) {message.error(res.err)}        
        // onCreate(res.data);
        onCreate(title, description);
        setVisible(false)
    };

    return (
        <div id='create-discussion-modal'>
            <button id='create-disc-btn' onClick={showModal}>Create New Discussion</button>
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
                {/* <div id="code-display-text">123</div> */}
                <div id="create-discussion-inputs"> {/* input fields for the discussion title and description */}
                    <Input placeholder="Discussion Title" onChange={(e) => setTitle(e.target.value)} />
                    {/* it would be nice to have a space between these */}
                    <Input.TextArea placeholder="Discussion Description" onChange={(e) => setDescription(e.target.value)} />
                </div>
            </Modal>
        </div>
    );
}
