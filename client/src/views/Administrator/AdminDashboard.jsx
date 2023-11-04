//List of imports
import React, { useEffect, useState } from 'react';
import { Tabs, Table, Button, Popconfirm, message } from 'antd';
import SavedWorkSpaceTab from '../../components/Tabs/SavedWorkspaceTab';
import { getUser } from '../../Utils/AuthRequests';
import { getMentor, getClassrooms, getGrades, getLessonModuleAll } from '../../Utils/requests';
import MentorSubHeader from '../../components/MentorSubHeader/MentorSubHeader';
import DashboardDisplayCodeModal from '../Mentor/Dashboard/DashboardDisplayCodeModal';
import NavBar from '../../components/NavBar/NavBar';
import UnitCreator from '../ContentCreator/UnitCreator/UnitCreator';
import LessonModuleActivityCreator from '../ContentCreator/LessonModuleCreator/LessonModuleCreator';
import './adminDashboard.less'
import { useNavigate, useSearchParams } from 'react-router-dom';


const { TabPane } = Tabs;

function AdminDashboard() {
  //variable/function definitions
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState(
    searchParams.has('tab') ? searchParams.get('tab') : 'organizations'
  );
  const navigate = useNavigate();
  const [page, setPage] = useState(
    searchParams.has('page') ? parseInt(searchParams.get('page')) : 1
  );
  const userData = getUser();
  const [classrooms, setClassrooms] = useState([]);
  const [learningStandardList, setLessonModuleList] = useState([]);
  const [viewing, setViewing] = useState(parseInt(searchParams.get('activity')));
  const [gradeList, setGradeList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [lsResponse, gradeResponse] = await Promise.all([
        getLessonModuleAll(),
        getGrades(),
      ]);
      setLessonModuleList(lsResponse.data);

      const grades = gradeResponse.data;
      grades.sort((a, b) => (a.id > b.id ? 1 : -1));
      setGradeList(grades);

    };
    fetchData();
  }, []);

   //Create lesson table structure
   const lessonColumns = [
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      editable: true,
      width: '22.5%',
      align: 'left',
    },
    {
      title: 'Lesson',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      width: '22.5%',
      align: 'left',
    },
    {
      title: 'Description',
      dataIndex: 'expectations',
      key: 'character',
      editable: true,
      width: '22.5%',
      align: 'left',
    },
  
  ];

  //Create teacher structure
  const teacherColumns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      editable: true,
      width: '22.5%',
      align: 'left',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      editable: true,
      width: '22.5%',
      align: 'left',
    },
    {
      title: 'School',
      dataIndex: 'school',
      key: 'school',
      editable: true,
      width: '22.5%',
      align: 'left',
    },

    {
      title: 'View Classes',
      dataIndex: 'view',
      key: 'view',
      width: '22.5%',
      align: 'left',
    },
  
  ];


  //Create student table structure
  const studentColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      width: '22.5%',
      align: 'left',
    },
    {
      title: 'Animal',
      dataIndex: 'animal',
      key: 'animal',
      width: '22.5%',
      align: 'left',
    },
    {
      title: 'Last Logged in',
      dataIndex: 'log',
      key: 'log',
      width: '22.5%',
      align: 'left',
    },
    {
      title: 'View',
      dataIndex: 'view',
      key: 'view',
      width: '10%',
      align: 'left',
      
    },
    {
      title: 'Enrolled',
      dataIndex: 'enrolled',
      key: 'enrolled',
      width: '10%',
      align: 'left',
    },
  ];

  //Create flagged content table structure
  const flagColumns = [
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
      width: '22.5%',
      align: 'left',
    },
    {
      title: 'Decription',
      dataIndex: 'reason',
      key: 'reason',
      width: '22.5%',
      align: 'left',
    },
  ];

  //Dashboard View
  return (
    <div className='container nav-padding'>
    <NavBar/>
    <div id='main-header' className='centered'>Welcome Administrator</div>

    <Tabs
        centered
        onChange={(activeKey) => {
          setTab(activeKey);
          setPage(1);
          setViewing(undefined);
          setSearchParams({ tab: activeKey });
        }}
        activeKey={tab ? tab : 'organizations'}>
        <TabPane tab = 'Organizations' key='organizations'>
          <div id='page-header'>
            <h1>
              Your Classrooms
            </h1>
          </div>
          <div id = 'classrooms-container'>
            <div id = 'dashboard-card-container'>
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
                <br></br>
                <button onClick = {null} id = "add-unit-btn">
                + Add Organization
                 </button>
            </div>
          </div>

        </TabPane>

        <TabPane tab = 'Teachers' key='teacher'>
        <div id='page-header'>
            <h1>
              Your Teachers
            </h1>
          </div>
          <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
            <button onClick = {null} id = "add-unit-btn">
                + Add Teacher
              </button>
              <button onClick = {null} id = "add-unit-btn">
                + Upload Faculty List
              </button>
            </div>
            <Table
              columns = {teacherColumns}
              //dataSource = {learningStandardList}
              rowClassName = 'editable-row'
              rowKey = 'id'
              onChange = {(Pagination) => {
                setViewing(undefined);
                setPage(Pagination.current);
                setSearchParams({tab, page: Pagination.current});
              }}
              pagination = {{current: page ? page : 1}}
            ></Table>
          </div>
        </TabPane>

        <TabPane tab = 'Students' key='students'>
        <div id='page-header'>
            <h1>
              Your Students
            </h1>
          </div>
          <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
            <button onClick = {null} id = "add-unit-btn">
                + Add Student
              </button>
              <button onClick = {null} id = "add-unit-btn">
                + Upload Roster
              </button>
            </div>
            <Table
              columns = {studentColumns}
              //dataSource = {learningStandardList}
              rowClassName = 'editable-row'
              rowKey = 'id'
              onChange = {(Pagination) => {
                setViewing(undefined);
                setPage(Pagination.current);
                setSearchParams({tab, page: Pagination.current});
              }}
              pagination = {{current: page ? page : 1}}
            ></Table>
          </div>
        </TabPane>

        <TabPane tab = 'Lessons' key='lessons'>
        <div id='page-header'>
            <h1>
              Your Lessons
            </h1>
          </div>
          <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
              <UnitCreator gradeList = {gradeList}
              //unable to get other button to work, think its result from not getting table to load (so replacement button)
              />
              <button onClick = {null} id = "add-unit-btn">
                + Add Lesson
              </button>
            </div>
            <Table
              columns = {lessonColumns}
              dataSource = {learningStandardList}
              rowClassName = 'editable-row'
              rowKey = 'id'
              onChange = {(Pagination) => {
                setViewing(undefined);
                setPage(Pagination.current);
                setSearchParams({tab, page: Pagination.current});
              }}
              pagination = {{current: page ? page : 1}}
            ></Table>
          </div>
        </TabPane>

        <TabPane tab = 'Moderation' key='moderation'>
        <div id='page-header'>
            <h1>
              Content for Review
            </h1>
            </div>
            <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
            <br></br>
            </div>
            <Table
              columns = {flagColumns}
              dataSource = {learningStandardList}
              rowClassName = 'editable-row'
              rowKey = 'id'
              onChange = {(Pagination) => {
                setViewing(undefined);
                setPage(Pagination.current);
                setSearchParams({tab, page: Pagination.current});
              }}
              pagination = {{current: page ? page : 1}}
            ></Table>
          </div>

            <div id = 'page-header'>
            <h1>
              Past Reviews
            </h1>
            </div>
            <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
            <br></br>
            </div>
            <Table
              columns = {flagColumns}
              dataSource = {learningStandardList}
              rowClassName = 'editable-row'
              rowKey = 'id'
              onChange = {(Pagination) => {
                setViewing(undefined);
                setPage(Pagination.current);
                setSearchParams({tab, page: Pagination.current});
              }}
              pagination = {{current: page ? page : 1}}
            ></Table>
          </div>

          <div id = 'page-header'>
            <h1>
              Flagged Users
            </h1>
            </div>
            <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
            <br></br>
            </div>
            <Table
              columns = {flagColumns}
              dataSource = {learningStandardList}
              rowClassName = 'editable-row'
              rowKey = 'id'
              onChange = {(Pagination) => {
                setViewing(undefined);
                setPage(Pagination.current);
                setSearchParams({tab, page: Pagination.current});
              }}
              pagination = {{current: page ? page : 1}}
            ></Table>
            <br></br>
            <br></br>
          </div>
        </TabPane>

      </Tabs>
    </div>


  );
}

export default AdminDashboard;