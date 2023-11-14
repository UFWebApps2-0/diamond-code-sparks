import {Modal, Button} from 'antd';
import React, {useState} from "react";
import './Discussions.less'

export default function CreateDiscussionModal(props) {
    const [visible, setVisible] = useState(false);
    const {code} = props;

    const showModal = () => {
        setVisible(true)
    };

    const handleCancel = () => {
        setVisible(false)
    };

    const handleOk = () => {
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
                        OK
                    </Button>,
                ]}
            >
                <div id="code-display-text">{code}</div>
            </Modal>
        </div>
    );
}
