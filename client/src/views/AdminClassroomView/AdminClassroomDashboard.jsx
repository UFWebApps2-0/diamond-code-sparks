import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./AdminClassroomDashboard.less";
import DashboardDisplayCodeModal from "../Mentor/Dashboard/DashboardDisplayCodeModal";
import { useNavigate } from "react-router-dom";

export default function AdminClassroomDashboard() {
    const [classrooms, setClassrooms] = useState([]);
    // const user = getUser();
    const navigate = useNavigate();

    const sampleClassroom1 = {
        id: 1,
        name: "Classroom 1",
        teachers: [
            {teachername: "teachername1"},
            {teachername: "teachername2"}
        ],
        code: "9999",
        school: {
         name: "School Name"
        },
        students: [
            {studentname: "name1"},
            {studentname: "name2"}
        ]
        
    }
    const sampleClassroom2 = {
        id: 2,
        name: "Classroom 2",
        teachers: [
            {teachername: "teachername1"},
            {teachername: "teachername2"}
        ],
        code: "1111",
        school: {
         name: "School Name 1"
        },
        students: [
            {studentname: "name1"},
            {studentname: "name2"}
        ]
    }

    const handleViewClassroom = (classroomId) => {
        alert("View Classroom" + classroomId);
    }

    classrooms.push(sampleClassroom1);
    classrooms.push(sampleClassroom2);

    return (
        <div className='container nav-padding'>
            <NavBar />
            <div id='main-header'>Admin Classroom View</div>
            <div id='page-header'>
                <h1>Classrooms</h1> 
            </div>
            
            <div id='admin-classrooms-container'>

            <input 
                type = 'button'
                onClick = {() => navigate('/createclassroom')}
                value = '(+) Create Classroom'
            />
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
                            
                            <div id='admin-teacher-number-container'>
                                    <h1 id='number'>{classroom.teachers.length}</h1>
                                    <p id='label'>Teachers</p>
                            </div>

                            <div id='divider' />

                            <div id='admin-student-number-container'>
                                    <h1 id='number'>{classroom.students.length}</h1>
                                    <p id='label'>Students</p>
                            </div>
                            <div id='divider' />
                            <div id='admin-code-container'>
                                <h1 id='number'>{classroom.code}</h1>
                                <p id='label'>Join Code</p>
                            </div>
                            
                            
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
      );
}