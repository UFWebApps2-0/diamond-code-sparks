import {Modal, Button, Form, Input, message} from 'antd';
import React, {useState} from "react";
import './AdminSchoolDashboard.less'
import { deleteSchool, updateSchoolName, updateSchoolCounty, updateSchoolState} from '../../Utils/requests';

export default function EditSchoolModal(props) {
    const [visible, setVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const {schoolId, schoolName, schoolCounty, schoolState, deleteFlag, setDeleteFlag} = props;
    const [newSchoolName, setNewSchoolName] = useState("");
    const [newSchoolCounty, setNewSchoolCounty] = useState("");
    const [newSchoolState, setNewSchoolState] = useState("");
    const [confirm, setConfirm] = useState('');

    const showModal = () => {
        setVisible(true);
    }

    const handleCancel = () => {
        setNewSchoolName('');
        setNewSchoolCounty('');
        setNewSchoolState('');
        setVisible(false);
    }

    const handleDeleteCancel = () => {
        setConfirm("");
        setDeleteVisible(false);
        setVisible(true);
    }


    const handleSave = async (event) => {
        event.preventDefault();
        // if one of the fields is edited
        if(newSchoolName != '' || newSchoolCounty != '' || newSchoolState != '') {
          let success = false;
          if(newSchoolName != '') {
            const res= await updateSchoolName(schoolId, newSchoolName);
            if(res.data) {
              success = true;
            }
          }
          if(newSchoolCounty != '') {
            const res= await updateSchoolCounty(schoolId, newSchoolCounty);
            if(res.data) {
              success = true;
            }
          }
          if(newSchoolState != '') {
            const res = await updateSchoolState(schoolId, newSchoolState);
            if(res.data) {
              success = true;
            }
          }
          
          if(success) {
            message.success(`Successfully edited ${schoolName}.`);
          } else {
              message.error(res.err);
          }
          setDeleteFlag(!deleteFlag);
          setNewSchoolName('');
          setNewSchoolCounty('');
          setNewSchoolState('');
          setVisible(false);
        }
        else {
          message.info('No changes were made.');
        }

        
        {/* update changes in back-end */}
    }

    const handleDelete = () => {
        setVisible(false);
        setDeleteVisible(true);
    }

    const handlePermanentDelete = async () => {
      if(confirm == schoolName) {
        // Do the deleting
        const res = await deleteSchool(schoolId);
        if(res.data) {
          message.success(schoolName + ' has been deleted');
        }
        setDeleteFlag(!deleteFlag);
        setConfirm("");
        setDeleteVisible(false);
      }
      else if (confirm == '') {
        message.error('Confirm deletion.');
      }
      else {
        message.warning('Typo in ' + schoolName + ".")
      }
    }

    return (
        <div>
          <button className='admin-edit-classroom-button' onClick={showModal}>
            <p id='label'>Edit</p>
          </button>
          <Modal
            title={"Are you sure you want to delete this school?"}
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
              <p>Type "{schoolName}" below to confirm deletion:</p>
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
            title={"Edit School"}
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
            onChange={e => setNewSchoolName(e.target.value)}
            value={newSchoolName}
            className="input"
            required
            placeholder={schoolName}
          ></Input>
        </Form.Item>
        <Form.Item id="form-label" label="County">
          <Input
            onChange={e => setNewSchoolCounty(e.target.value)}
            value={newSchoolCounty}
            className="input"
            required
            placeholder={schoolCounty}
          ></Input>
        </Form.Item>
        <Form.Item id="form-label" label="State">
          <Input
            onChange={e => setNewSchoolState(e.target.value)}
            value={newSchoolState}
            className="input"
            required
            placeholder={schoolState}
          ></Input>
        </Form.Item>
      </Form>


      
          </Modal>
        </div>

    )
}