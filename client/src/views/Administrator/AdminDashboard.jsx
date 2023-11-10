//List of imports
import React, { useEffect, useState } from 'react';
import { Tabs, Table } from 'antd';
import { getUser } from '../../Utils/AuthRequests';
import { getAllClassrooms, getAllSchools, getGrades, getLessonModuleAll, getTeachers } from '../../Utils/requests';
import NavBar from '../../components/NavBar/NavBar';
import './AdminDashboard.less'
import { useSearchParams } from 'react-router-dom';
import LessonTab from './LessonTab/LessonTab';
import TeacherTab from './TeacherTab/TeacherTab';
import ClassroomTab from './ClassroomTab/ClassroomTab';
import OrganizationTab from './OrganizationTab/OrganizationTab';
import ModerationTab from './ModerationTab/ModerationTab';


const { TabPane } = Tabs;

function AdminDashboard() {
  //variable/function definitions
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState(
    searchParams.has('tab') ? searchParams.get('tab') : 'organizations'
  );
  const [page, setPage] = useState(
    searchParams.has('page') ? parseInt(searchParams.get('page')) : 1
  );
  const userData = getUser();
  const [learningStandardList, setLessonModuleList] = useState([]);
  const [gradeList, setGradeList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [classroomList, setClassroomList] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [lsResponse, gradeResponse, teacherResponse, classroomResponse, organizationResponse] = await Promise.all([
        getLessonModuleAll(),
        getGrades(),
        getTeachers(),
        getAllClassrooms(),
        getAllSchools()
      ]);
      setLessonModuleList(lsResponse.data);

      const grades = gradeResponse.data;
      grades.sort((a, b) => (a.id > b.id ? 1 : -1));
      setGradeList(grades);
      setOrganizationList(organizationResponse.data);
      setTeacherList(teacherResponse.data);
      setClassroomList(classroomResponse.data);
     
    };
    fetchData();
  }, []);

  //Dashboard View
  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='main-header' className='centered'>Welcome Administrator</div>

      <Tabs
        centered
        onChange={(activeKey) => {
          setTab(activeKey);
          setPage(1);
          setSearchParams({ tab: activeKey });
        }}
        activeKey={tab ? tab : 'organizations'}>
        <TabPane tab='Organizations' key='organizations'>
          <OrganizationTab
            organizationList={organizationList}
            page={page}
            setPage={setPage}
          />
        </TabPane>

        <TabPane tab='Classrooms' key='classrooms'>
          <ClassroomTab
            classroomList={classroomList}
            page={page}
            setPage={setPage}
          />
        </TabPane>

        <TabPane tab='Teachers' key='teacher'>
          <TeacherTab
            teacherList={teacherList}
            page={page}
            setPage={setPage}
          />
        </TabPane>

        <TabPane tab='Lessons' key='lessons'>
          <LessonTab
            learningStandardList={learningStandardList}
            gradeList={gradeList}
            page={page}
            setPage={setPage}
          />
        </TabPane>

        <TabPane tab='Moderation' key='moderation'>
          <ModerationTab 
            page={page}
            setPage={setPage}
          />
        </TabPane>

      </Tabs>
    </div>


  );
}

export default AdminDashboard;