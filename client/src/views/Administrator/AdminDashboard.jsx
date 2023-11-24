//List of imports
import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { Tabs, Table } from 'antd';
import { getUser } from '../../Utils/AuthRequests';
import { getAllClassrooms, getAllSchools, getGrades, getLessonModuleAll, getTeachers, addOrganization, getAdminSchools} from '../../Utils/requests';
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
  console.log(userData);
  const [learningStandardList, setLessonModuleList] = useState([]);
  const [gradeList, setGradeList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [classroomList, setClassroomList] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  
  const updateOrganizationList = async () => {
    const organizationResponse = await getAllSchools();
    setOrganizationList(organizationResponse.data);
  };

  const fetchData = async () => {
    const [lsResponse, gradeResponse, teacherResponse, classroomResponse, organizationResponse] = await Promise.all([
      getLessonModuleAll(),
      getGrades(),
      getTeachers(),
      getAllClassrooms(),
      getAdminSchools(userData.username)
    ]);
    setLessonModuleList(lsResponse.data);

    const grades = gradeResponse.data;
    grades.sort((a, b) => (a.id > b.id ? 1 : -1));
    setGradeList(grades);
    setOrganizationList(organizationResponse.data);
    setTeacherList(teacherResponse.data);
    setClassroomList(classroomResponse.data);
   
  };

  const handleAddOrganization = async (name, county, state, userData) => {
    const res = await addOrganization(name, county, state, [userData]);
    if (res.err) {
      message.error("Fail to create a new organization");
    } else {
      message.success("Successfully created organization");
      fetchData(); // Call the function to update the organization list
    }
  };

  useEffect(() => {
    fetchData();
    /*const intervalId = setInterval(fetchData, 1000); // 1 second in milliseconds

  // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);*/
    
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
            handleAddOrganization={handleAddOrganization}
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