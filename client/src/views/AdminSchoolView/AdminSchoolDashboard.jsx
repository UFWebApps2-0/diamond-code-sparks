import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./AdminSchoolDashboard.less";
import { useNavigate } from "react-router-dom";
import EditSchoolModal from "./EditSchoolModal";

export default function AdminSchoolDashboard() {
    const [schools, setSchools] = useState([]);
    const navigate = useNavigate();

    const sampleSchool1 = {
        id: 1,
        name: "School 1",
        teachers: [
            {teachername: "teachername1"},
            {teachername: "teachername2"}
        ],
        code: "9999",
         name: "School 1",

        students: [
            {studentname: "name1"},
            {studentname: "name2"},
            {studentname: "name3"}
        ]
        
    }
    const sampleSchool2 = {
        id: 2,
        name: "School 2",
        teachers: [
            {teachername: "teachername1"},
            {teachername: "teachername2"}
        ],
        code: "1111",
        
         name: "School 2",

        students: [
            {studentname: "name1"},
            {studentname: "name2"},
            {studentname: "name3"},
            {studentname: "name4"},
            {studentname: "name5"}
        ]
    }

    const handleViewSchool = (schoolId) => {
        //alert("View School " + schoolId);
        navigate('/dashboard')
    }

    const handleEditSchool = (schoolId) => {
        alert("Edit School " + schoolId);
    }


    schools.push(sampleSchool1);
    schools.push(sampleSchool2);

    return (
        <div className='container nav-padding'>
            <NavBar />
            <div id='main-header'>Admin School View</div>
            <div id='page-header'>
                <h1>Schools</h1> 
            </div>
            
            <div id='admin-classrooms-container'>

            <input 
                type = 'button'
                onClick = {() => navigate('/createschool')}
                value = 'Create School'
            />
                <div id='dashboard-card-container'>
                    {schools.map((school) => (
                        <div key={school.id} id='dashboard-class-card'>
                        <div id='card-left-content-container'>
                            <h1 id='card-title'>{school.name}</h1>
                        <div id='admin-card-button-container' className='flex flex-row'>
                            <button onClick={() => handleViewSchool(school.id)}>
                             View
                            </button>
                        </div>
                        <div id='admin-card-button-container' className='flex flex-row'>
                            <EditSchoolModal currentSchool={school}/>
                        {/*<button onClick={() => handleEditSchool(school.id)}>
                             Edit
                            </button>
                    */}
                        </div>
                    
                    </div>
                            <div id='card-right-content-container'>
                            
                            <div id='admin-teacher-number-container'>
                                    <h1 id='number'>{school.teachers.length}</h1>
                                    <p id='label'>Teachers</p>
                            </div>

                            <div id='divider' />

                            <div id='admin-student-number-container'>
                                    <h1 id='number'>{school.students.length}</h1>
                                    <p id='label'>Students</p>
                            </div>
                           {/* <div id='divider' />
                            <div id='admin-code-container'>
                                <h1 id='number'>{school.code}</h1>
                                <p id='label'>Join Code</p>
                            </div>
                    */}
                            
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
      );
}