import React, { useEffect, useState } from 'react';
import { getAssessments,getMentor, getClassrooms, updateAssessmentPublic } from '../../../Utils/requests';
import './Dashboard.less';
import DashboardDisplayCodeModal from './DashboardDisplayCodeModal';
import MentorSubHeader from '../../../components/MentorSubHeader/MentorSubHeader';
import NavBar from '../../../components/NavBar/NavBar';
import { useGlobalState } from '../../../Utils/userState';
import { useNavigate } from 'react-router-dom';
import { Table, Popconfirm, message } from 'antd';
import {Modal,Button,Switch} from 'antd';
import ViewAssessment from '../../Assessments/ViewAssessment';

export default function Dashboard() {
  const [classrooms, setClassrooms] = useState([]);
  const [assessments,setAssessments]=useState();
  const [value] = useGlobalState('currUser');
  const [view,setView] = useState(new Array(getAssessments().then((res)=>res.data.length)).fill(false));
  const navigate = useNavigate();


  const viewWork = (i) => {
    let temp = [...view];
    temp[i] = true;
    setView(temp);
  }

  const leaveWork = (i) => {
    let temp = [...view];
    temp[i] = false;
    setView(temp);
  }

  useEffect(() => {
    let classroomIds = [];
    getMentor().then((res) => {
      if (res.data) {
        res.data.classrooms.forEach((classroom) => {
          classroomIds.push(classroom.id);
        });
        getClassrooms(classroomIds).then((classrooms) => {
          setClassrooms(classrooms);
        });
      } else {
        message.error(res.err);
        navigate('/teacherlogin');
      }
    }).then(getAssessments().then((res) => {
      let temp = [];
      const set = new Set(classroomIds);
      for(let i=0;i<res.data.length;i++){
          if(set.has(res.data[i].classroomID)){
            temp.push({
              key:res.data[i].id,
              name:res.data[i].assessmentName,
              description:res.data[i].description,
              open:
              <>
                  <Button type="sucess" onClick={()=>viewWork(i)}>
                    Open
                  </Button>
                  <Modal
                    title={"View Assessment"}
                    visible={view[i]} // Change 'open' to 'visible'
                    onCancel={leaveWork}
                    width={'75vw'}
                    footer={[
                      <Button key="ok" type="primary" onClick={()=>leaveWork(i)}>
                        Cancel
                      </Button>,
                    ]}
                  >
                    <ViewAssessment name= {res.data[i].assessmentName} description = {res.data[i].description} questions = {res.data[i].questions}/>
                </Modal>
            </>,
              delete:
              <>
                <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={()=> deleteAssessment(res.data[i].id)}>
                  <Button type="danger">
                    Delete
                  </Button>
                </Popconfirm>
              </>,
              public:
              <>
                <Switch checkedChildren="Public" unCheckedChildren="Private" defaultChecked={res.data[i].isPublic} onChange={()=>updateAssessmentPublic(res.data[i].id,res.data[i].isPublic)}/>
              </>,
            });
          }
      }
      setAssessments([...temp]);
    }
    ));

  }, [view]);

  const handleViewClassroom = (classroomId) => {
    navigate(`/classroom/${classroomId}`);
  };

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
          align: 'left'
        }

  ]
  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='main-header'>Welcome {value.name}</div>
      <MentorSubHeader title={'Your Classrooms'}></MentorSubHeader>
      <div id='classrooms-container'>
        <div id='dashboard-card-container'>
          {classrooms.map((classroom) => (
            <div key={classroom.id} id='dashboard-class-card'>
              <div id='card-left-content-container'>
                <h1 id='card-title'>{classroom.name}</h1>
                <div id='card-button-container' className='flex flex-row'>
                  <button onClick={() => handleViewClassroom(classroom.id)}>
                    View
                  </button>
                </div>
              </div>
              <div id='card-right-content-container'>
                <DashboardDisplayCodeModal code={classroom.code} />
                <div id='divider' />
                <div id='student-number-container'>
                  <h1 id='number'>{classroom.students.length}</h1>
                  <p id='label'>Students</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
          <div id="page-header">
            <h1>All Assessments</h1>
          </div>
          <div id='content-creator-table-container' style={{ marginTop: '6.6vh' }}>
            <Table columns={wsColumn} dataSource={assessments} />
          </div>
      </div>
    </div>
  );
}
