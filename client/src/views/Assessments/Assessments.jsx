import NavBar from '../../components/NavBar/NavBar';
import { Table, Popconfirm, message } from 'antd';
import {Modal,Button} from 'antd';

import { useState } from 'react';

import CreateAssessments from '../AssesmentsCreate/AssessmentsCreate';
function Assessments()
{
    const wsColumn = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          editable: true,
          width: '30%',
          align: 'left',
          render: (_, key) => key.name,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            editable: true,
            width: '40%',
            align: 'left',
            render: (_, key) => key.description,
          },
          {
            title: 'Open Assigments',
            dataIndex: 'open',
            key: 'open',
            editable: false,
            width: '20%',
            align: 'left',
          },
          {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            width: '10%',
            align: 'right',
          },

    ]

    const [visible, setVisible] = useState(false);
    const showModal = () => {
      setVisible(true);
      console.log("Hello");
  };
  const handleCancel = () => {
    setVisible(false)
};

const handleOk = () => {
    setVisible(false)
}
    return (

        <div>
            <button onClick={showModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"/>
            </svg>
            </button>
          <div id='page-header'>
            <h1>Assessments</h1>
          </div>
          <div id='content-creator-table-container' style={{ marginTop: '6.6vh' }}>
            <Table columns={wsColumn} />
           
          </div>
          <Modal
                title={"Add students to your classroom"}
                visible={visible}
                onCancel={handleCancel}
                width={'75vw'}
                footer={[
                    <Button key="ok" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]}
            >
                <CreateAssessments />
            </Modal>
        </div>
    )
}

export default Assessments;