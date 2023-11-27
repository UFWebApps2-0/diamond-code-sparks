import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./AdminGalleryDashboard.less";
import DashboardDisplayCodeModal from "../Mentor/Dashboard/DashboardDisplayCodeModal";
import DashboardDisplayGalleryModal from "../Mentor/Dashboard/DashboardDisplayGalleryModal";
import { useNavigate } from "react-router-dom";

export default function AdminGalleryDashboard() {
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

    let images = []
    images.push({
        src: "/gallery/img1.png",
        classroom: "1",
        students: "5"
    })
    images.push({
        src: "/gallery/img2.png",
        classroom: "2",
        students: "10"
    })
    images.push({
        src: "/gallery/img3.png",
        classroom: "3",
        students: "2"
    })
    images.push({
        src: "/gallery/img4.png",
        classroom: "4",
        students: "9"
    })

    return (
        <div className='container nav-padding'>
            <NavBar />
            <div id='main-header'>Admin Gallery View</div>
            <div id='page-header'>
                <h1>Galleries</h1> 
            </div>
            
            <div id='galleries-container'>

            {/* <input 
                type = 'button'
                onClick = {() => alert("Add a new gallery")}
                value = '(+) Create Gallery'
            /> */}
            {/* <div id='dashboard-card-container'>
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
            </div> */}
            <div id='dashboard-card-container'>
                {images.map((image) => (
                    <div key="1" id='dashboard-class-card'>
                        <div id='card-left-content-container'>
                            {/* <h1 id='card-title'>Hello</h1>
                            <div id='card-button-container' className='flex flex-row'>
                                <button onClick={() => {}}>
                                    View
                                </button>
                            </div> */}
                            <img src={image.src} alt="" className="image"/>
                        </div>
                        <div id='card-right-content-container'>
                            <DashboardDisplayGalleryModal code={image.classroom} />
                            <div id='divider' />
                            <div id='student-number-container'>
                                <h1 id='number'>{image.students}</h1>
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