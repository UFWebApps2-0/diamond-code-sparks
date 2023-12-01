import {Modal, Button} from 'antd';
import React, {useState} from "react";
import './AdminSchoolDashboard.less'
export default function DisplayTeacherModal(props) {
    const [visible, setVisible] = useState(false);
    const {members} = props;

    const showModal = () => {
        setVisible(true);
    }

    const handleCancel = () => {
        setVisible(false);
    }

    return (
        <div>
          <button className='modal-button' onClick={showModal}>
            <h1 id='number'>0</h1>
            <p id='label'>Teachers</p>
          </button>
          <Modal
            title={"Classroom Teachers"}
            visible={visible}
            onCancel={handleCancel}
            
            width={'40vw'}
            footer={null}
          ></Modal>
        </div>

    )
}
