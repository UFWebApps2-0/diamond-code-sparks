import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./AdminSchoolDashboard.less";
import { useNavigate } from "react-router-dom";
import DashboardDisplayCodeModal from '../Dashboard/DashboardDisplayCodeModal';

export default function AdminClassroomView() {
    const [classrooms, setClassrooms] = useState([]);
    const navigate = useNavigate();

    const sampleClassroom1 = {
        id: 1,
        name: 'Classroom 1',
        students: [
            {studentname: "name1"},
            {studentname: "name2"},
            {studentname: "name3"}
        ],
        teachers: [
            {teachername: "teacher1"}
        ],
        code: "1234"

    }
    const sampleClassroom2 = {
        id: 2,
        name: 'Classroom 2',
        students: [
            {studentname: "name4"},
            {studentname: "name5"},
            {studentname: "name6"}
        ],
        teachers: [
            {teachername: "teacher2"}
        ],
        code: "9999"
        
    }

    const handleViewClassroom = (classroomId) => {
        alert("view classroom " + classroomId);
    }

    classrooms.push(sampleClassroom1);
    classrooms.push(sampleClassroom2);

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
            </div>
          
    );
}