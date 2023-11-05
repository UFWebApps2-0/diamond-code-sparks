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
        teacher: "Teacher 1",
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
        teacher: "Teacher 2",
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
            
            <div id='classrooms-container'>

            <input 
                type = 'button'
                onClick = {() => alert("Add a new classroom")}
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