import {Modal, Button, Form, Input, message} from 'antd';
import React, {useState} from "react";
import { updateClassroom } from '../../Utils/requests';
import './AdminSchoolDashboard.less'

export default function EditClassroomModal(props) {
    const [visible, setVisible] = useState(false);
    const {classroomId, classroomName, classroomCode, deleteFlag, setDeleteFlag} = props;
    const [name, setName] = useState("");
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [confirm, setConfirm] = useState('');

    const showModal = () => {
        setVisible(true);
    }

    const handleCancel = () => {
        setVisible(false);
    }

    const handleDeleteCancel = () => {
        setDeleteVisible(false);
    }

    const handleSave = async(event) => {
        event.preventDefault();

        if(name != '') {
          const res = await updateClassroom(classroomId, name);

          if(res.data) {
            message.success(`Successfully edited ${classroomName}`);
          }
          else {
            message.error(res.err);
          }
        }
        setDeleteFlag(!deleteFlag);
        setName('');
        
        setVisible(false);
        
    }

    const handleDelete = () => {
        setVisible(false);
        setDeleteVisible(true);
    }

    const handlePermanentDelete = () => {
      /*
      if(confirm == classroomName) {
        // Do the deleting
        setDeleteVisible(false);
      }
      else if (confirm == '') {
        message.error('Confirm deletion.')
      }
      else {
        message.warning('Typo in ' + classroomName + ".")
      }
      */
     alert("Handle Classroom Delete");
     setDeleteVisible(false);
    }

    return (
        <div>
          <button className='admin-edit-classroom-button' onClick={showModal}>
            <p id='label'>Edit</p>
          </button>
          <Modal
            title={"Are you sure you want to delete this classroom?"}
            visible={deleteVisible}
            onCancel={handleDeleteCancel}
            footer = {[
              <Button key='deleteCancel' type="primary" onClick={handleDeleteCancel}>
                Cancel
              </Button>,
              <Button key='confirmDelete' type="danger" onClick={handlePermanentDelete}>
                Delete
              </Button>

            ]}
          >
            <div style={{display: 'flex', justifyContent:'center', fontWeight:'bold'}}>
              <p>Type "{classroomName}" below to confirm deletion:</p>
            </div>

            <div style={{display: 'flex', justifyContent:'center'}}>
              <input
                type='text'
                placeholder='Confirm deletion...'
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                />
            </div>


          </Modal>
          <Modal
            title={"Edit Classroom"}
            visible={visible}
            onCancel={handleCancel}
            footer = {[
                <Button key='delete' type="danger" onClick={handleDelete}>
                    Delete
                </Button>,
                <Button key='cancel' onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key='save' type="primary" onClick={handleSave}>
                    Save
                </Button>,


            ]}
            width={'40vw'}
            
        >
            <Form
        id="activity-detail-editor"
        layout="horizontal"
        size="default"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        onFinish={handleSave}
      >

<Form.Item id="form-label" label="Name">
          <Input
            onChange={e => setName(e.target.value)}
            value={name}
            className="input"
            required
            placeholder={classroomName}
          ></Input>
        </Form.Item>
      </Form>


      
          </Modal>
        </div>

    )
}