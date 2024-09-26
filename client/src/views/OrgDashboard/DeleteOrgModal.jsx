import {Modal, Button, message} from 'antd';
import React, {useState} from "react";
import { deleteOrganization } from "../../Utils/requests"


export default function DeleteOrgModal(props) {
    const [visible, setVisible] = useState(false);
    const {orgId, orgName, orgs, setOrgs, deleteFlag, setDeleteFlag} = props;
    const [confirm, setConfirm] = useState('');

    const showModal = () => {
        setVisible(true);
    }

    const handleCancel = () => {
        setVisible(false);
        setConfirm('');
    }

    const handleDelete = async () => {
        if (confirm == orgName) {
            const res = await deleteOrganization(orgId);
            if (res.data) {
                message.success(orgName + ' has been deleted.');
            } else {
                message.error(res.err);
            }
            setDeleteFlag(!deleteFlag); // trigger re-render
        } else if (confirm == '') {
            message.error('Confirm deletion.');
        } else {
            message.warning('Typo in ' + orgName + '.');
        }
    }

    return (
        <div>
            <button className='manage-btn warning-btn' onClick={showModal}>
                Delete Organization
            </button>
            <Modal
                title={"Are you sure you want to delete this organization?"}
                visible={visible}
                onCancel={handleCancel}
                width={'75vw'}
                footer={[
                    <Button key="cancel" type="primary" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="delete" type="danger" onClick={handleDelete}>
                      Delete
                    </Button>
                ]}
            >
                <p>This will also delete all organizational accounts associated with {orgName}. Users will have 30 days to save the data from their organizational account before it is deleted permanently.</p>
                <div style={{display: 'flex', justifyContent: 'center', fontWeight: 'bold'}}>
                    <p>Type "{orgName}" below to confirm deletion:</p>
                    
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <input
                        type='text'
                        placeholder='Confirm deletion…'
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}                
                    />
                </div>
            </Modal>
        </div>
    );
}