import {Modal, Button} from 'antd';
import React, {useState} from "react";
import './Student.less'

export default function StudentDiscussionDetailModal({
    learningStandardName, 
    title, 
    description,
    visible,
    handleCancel,
    handleOk,
    setVisible
}) {
    // const [visible, setVisible] = useState(false);

    // const showModal = () => {
    //     setVisible(true)
    // };

    // const handleCancel = () => {
    //     setVisible(false)
    // };

    // const handleOk = () => {
    //     setVisible(false)
    // };

    return (
        <div 
        // id='display-code-modal'
        // id='list-item-wrapper'
        >
            {/* <button id='display-code-btn' onClick={showModal}>
                {`${learningStandardName}: ${title}`}
                </button> */}
            <Modal
                title={`${learningStandardName}: ${title}`}
                visible={visible}
                onCancel={handleCancel}
                // onCancel={setVisible(false)}
                // width='50vw'
                footer={[
                    <Button key="ok" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]}
            >
                <div id="code-display-text">{description}</div>
            </Modal>
        </div>
    );
}
