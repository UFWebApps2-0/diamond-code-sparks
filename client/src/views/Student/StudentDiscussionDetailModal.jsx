import {Modal, Button} from 'antd';
import React, {useState} from "react";
import './Student.less'

export default function StudentDiscussionDetailModal({ // modal component that displays discussion details
    learningStandardName, 
    title, 
    description,
    visible,
    handleCancel,
    handleOk,
    setVisible
}) {
    return (
        <div>
            <Modal
                title={`${learningStandardName}: ${title}`} // display the discussion title
                visible={visible}
                onCancel={handleCancel}
                footer={[
                    <Button key="ok" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]}
            >
                <div id="code-display-text">{description}</div> {/* display the discussion description */}
            </Modal>
        </div>
    );
}
