//List of imports
import React, { useEffect, useState } from 'react';
import { Tabs, Table, Popconfirm, message } from 'antd';
import SavedWorkSpaceTab from '../../components/Tabs/SavedWorkspaceTab';
import { getUser } from '../../Utils/AuthRequests';
import { getMentor, getClassrooms, getLessonModuleAll } from '../../Utils/requests';
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
            </div>
          </div>
          
        </TabPane>

        <TabPane tab = 'Teachers' key='teachers'>
        <div id='page-header'>
            <h1>
              Your Teachers
            </h1>
          </div>
          <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>

            </div>
            <Table
              //Table info here
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

            </div>
            <Table
              //Table info here
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
             
            </div>
            <Table
              //Table info here
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

            </div>
            <Table
              //Table info here
            ></Table>
          </div>

            <div id = 'page-header'>
            <h1>
              Past Reviews
            </h1>
            </div>
            <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>

            </div>
            <Table
              //Table info here
            ></Table>
          </div>
      
          <div id = 'page-header'>
            <h1>
              Flagged Users
            </h1>
            </div>
            <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>

            </div>
            <Table
              //Table info here
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

