import {Modal, Button} from 'antd';
import React, {useState} from "react";
import './Dashboard.less'

export default function DashboardDisplayCodeModal(props) {
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
        <div id='dashboard-display-code-modal'>
            <div id='dashboard-display-gallery-btn' >
                <h1 id="number">{code}</h1>
                <p id="label">Classroom</p>
            </div>
            <Modal
                title={'Join Code'}
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