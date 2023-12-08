import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./AdminSchoolDashboard.less";
import { useNavigate } from "react-router-dom";
import EditSchoolModal from "./EditSchoolModal";
import { useGlobalState } from "../../Utils/userState";
import { getOrganization, getClassroomcount } from "../../Utils/requests";

export default function AdminSchoolDashboard() {
    const [schools, setSchools] = useState([]);
    const [schoolName, setSchoolName] = useState('');
    const [value] = useGlobalState('currUser');
    const [deleteFlag, setDeleteFlag] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let schoolList = [];
        let classroomCountList = [];

        let orgId = window.sessionStorage.getItem("currOrg");

        getOrganization(orgId).then((res) => {
            if (res.data) {
                for(let i = 0; i < res.data.schools.length; i++) {
                    schoolList.push(res.data.schools[i]);
                }
                setSchools(schoolList);
            } else {
                message.error(res.err);
            }
        });

        
    }, [schoolName, deleteFlag]);
    
    


    const handleViewSchool = (schoolId) => {
        navigate('/dashboard')
    }

    const handleEditSchool = (schoolId) => {
        alert("Edit School " + schoolId);
    }


    //schools.push(sampleSchool1);
    //schools.push(sampleSchool2);

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
                            <EditSchoolModal 
                                schoolId={school.id}
                                schoolName={school.name}
                                schoolCounty={school.county}
                                schoolState={school.state}
                                deleteFlag={deleteFlag}
                                setDeleteFlag={setDeleteFlag}
                            />
            
                        </div>
                    
                    </div>
                            <div id='card-right-content-container'>
                            
                            <div id='admin-teacher-number-container'>
                                    <h1 id='number'>6</h1>
                                    <p id='label'>Classrooms</p>
                            </div>


                            
                        </div>
                        
                    </div>
                    ))}
                </div>
            </div>
            
        </div>
      );
}