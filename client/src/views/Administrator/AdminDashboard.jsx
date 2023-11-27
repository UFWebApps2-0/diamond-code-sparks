//List of imports
import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { Tabs, Table } from 'antd';
import { getUser } from '../../Utils/AuthRequests';
import { getAllClassrooms, getAllSchools, getGrades, getLessonModuleAll, getTeachers, addOrganization, addClassroom, addTeacher, updateSchool, updateTeacher, getAllStudents, updateClassroom} from '../../Utils/requests';
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

  const fetchData = async () => {
    const [lsResponse, gradeResponse, teacherResponse, classroomResponse, organizationResponse] = await Promise.all([
      getLessonModuleAll(),
      getGrades(),
      getTeachers(),
      getAllClassrooms(),
      getAllSchools(),
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

  const handleEditOrganization = async (id, name, county, state, classrooms, mentors) => {
    const res = await updateSchool(id, name, county, state, classrooms, mentors);
    if (res.err) {
      message.error("Failed to edit organization");
    } else {
      message.success("Successfully edited organization");
      fetchData(); // Call the function to update the organization list
    }
  };

  const handleAddClassroom = async (name, organization, grade, userData) => {
    const res = await addClassroom(name, organization, grade, [userData]);
    if (res.err) {
      message.error("Fail to create a new classroom");
    } else {
      message.success("Successfully created classroom");
      fetchData(); // Call the function to update the classroom list
    }
  };

  const handleEditClassroom = async (id, name, school, mentors, students, code, grade, currentLesson) => {
    const res = await updateClassroom(id, name, school, mentors, students, code, grade, currentLesson);
    if (res.err) {
      message.error("Failed to edit classroom");
    } else {
      message.success("Successfully edited classroom");
      fetchData(); // Call the function to update the classroom list
    }
  }

  const handleAddTeacher = async (first_name, last_name, school, userData) => {
    const res = await addTeacher(first_name, last_name, school, [userData]);
    if (res.err) {
      message.error("Fail to create a new teacher");
    } else {
      message.success("Successfully created teacher");
      fetchData(); // Call the function to update the teacher list
    }
  };

  const handleEditTeacher = async (id, firstName, lastName, school, classrooms) => {
    const res = await updateTeacher(id, firstName, lastName, school, classrooms);
    if (res.err) {
      message.error("Failed to edit teacher");
    } else {
      message.success("Successfully edited teacher");
      fetchData(); // Call the function to update the teacher list
    }
  };

  useEffect(() => {
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
            classroomList={classroomList}
            mentorList={teacherList}
            page={page}
            setPage={setPage}
            handleAddOrganization={handleAddOrganization}
            handleEditOrganization={handleEditOrganization}
          />
        </TabPane>

        <TabPane tab='Classrooms' key='classrooms'>
          <ClassroomTab
            classroomList={classroomList}
            gradeList={gradeList}
            schoolList={organizationList}
            mentorList={teacherList}
            page={page}
            setPage={setPage}
            handleAddClassroom={handleAddClassroom}
            handleEditClassroom={handleEditClassroom}
          />
        </TabPane>

        <TabPane tab='Teachers' key='teacher'>
          <TeacherTab
            teacherList={teacherList}
            schoolList={organizationList}
            classroomList={classroomList}
            page={page}
            setPage={setPage}
            handleAddTeacher={handleAddTeacher}
            handleEditTeacher={handleEditTeacher}
          />
        </TabPane>

        <TabPane tab='Lessons' key='lessons'>
          <LessonTab
            learningStandardList={learningStandardList}
            gradeList={gradeList}
            page={page}
            setPage={setPage}
            setLessonModuleList = {setLessonModuleList}
            searchParams = {searchParams}
            tab = {tab}
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