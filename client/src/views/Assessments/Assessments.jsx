import NavBar from '../../components/NavBar/NavBar';
import { Table, Popconfirm, message } from 'antd';
import {Modal,Button,Switch} from 'antd';
import { useEffect, useState } from 'react';
import { getClassroom } from '../../Utils/requests';
import StudentAssessmenmts from './StudentAssessments';
import './assessmentStyle.css';
import QuestionForm from '../AssesmentsCreate/QuestionForm';
function Assessments({ classroomId})
{
    const [names,setNames]=useState([]);
    useEffect(() => {
      getClassroom(classroomId).then((res) => {
        if (res.data) {
          let newNames=[];

          res.data.students.forEach((student) => newNames.push({key: student.id,name:student.name,assessments:"view",grade:"N/A"}));
          setNames([...newNames]);
        } else {
          message.error(res.err);
        }
      });
    }, [classroomId]);

    const wsColumn = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          editable: true,
          width: '30%',
          align: 'left',
          sorter: {
            compare: (a, b) => (a.name < b.name ? -1 : 1),
          },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            editable: true,
            width: '30%',
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
            align: 'left',
          },
          {
            title: 'Make Public',
            dataIndex: 'public',
            key: 'public',
            width: '10%',
            align: 'left',
            render: () => (
              <Switch
              />)
          }

    ]

    const studColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        sorter: {
          compare: (a, b) => (a.name < b.name ? -1 : 1),
        },
      },
      {
        title: 'Assessments',
        dataIndex: 'assessments',
        keyIndex: 'assessments',  
        width: '30%',
        render: () => (
          <StudentAssessmenmts/>
        ),
        
      },
      {
        title:'Grade',
        dataIndex:'grade',
        keyIndex:'grade',
        editable:true, 
        width:'20%'
      }
    ]

    const [visible, setVisible] = useState(false);
    const showModal = () => {
      setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false)
};

const handleOk = () => {
    setVisible(false)
}

const handleBack = () => {
  navigate('/dashboard');
};
    return (

        <div>
          <button id='home-back-btn' onClick={handleBack}>
            <i className='fa fa-arrow-left' aria-hidden='true' />
          </button>
          <div>
          <div id='page-header'>
            <h1>Assessments</h1>
          </div>
          <button id="assessment" onClick={showModal} >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"/>
              </svg>
          </button>
          <div id='content-creator-table-container' style={{ marginTop: '6.6vh' }}>
            <Table columns={wsColumn} />
          </div>
          <Modal
                title={"Create Assessment"}
                visible={visible}
                onCancel={handleCancel}
                width={'75vw'}
                footer={[
                    <Button key="ok" type="primary" onClick={handleOk}>
                        Cancel
                    </Button>,
                ]}
            >
                <QuestionForm id={classroomId}/>
            </Modal>
            </div>
            <div>
                <div id="page-header">
                  <h1>Students Assessments</h1>
                </div>
                <div id='content-creator-table-container' style={{ marginTop: '6.6vh' }}>
                  <Table columns={studColumns} dataSource={names} />
                </div>
            </div>
        </div>
    )
}

export default Assessments;