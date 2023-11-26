import React, { useEffect, useState } from "react";
import {
  getMentor,
  getClassrooms,
  getSchoolClassrooms,
  getSchoolID,
} from "../../../../Utils/requests";
import { message } from "antd";
import "../../../Mentor/Dashboard/Dashboard.less";
import DashboardDisplayCodeModal from "../../../Mentor/Dashboard/DashboardDisplayCodeModal";
import MentorSubHeader from "../../../../components/MentorSubHeader/MentorSubHeader";
import NavBar from "../../../../components/NavBar/NavBar";
import { useGlobalState } from "../../../../Utils/userState";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";

export default function OrganizationDashboard(props) {
  const [classrooms, setClassrooms] = useState([]);
  const [organization, setOrganization] = useState();
  const [value] = useGlobalState("currUser");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const { record } = props;
  const location = useLocation();

  function handleBack() {
    navigate("/AdminDashboard");
  }
  
  function handleViewClassroom(classroomID){
    
    navigate(`/ClassroomAdmin/${classroomID}`);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const classroomsResponse = await getSchoolClassrooms(id);
        const organizationResponse = await getSchoolID(id);
        setClassrooms(classroomsResponse.data);
        setOrganization(organizationResponse);
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      }
    };

    fetchData();
  }, [id]);

  /*const handleViewClassroom = (classroomId) => {
    navigate(`/classroom/${classroomId}`);
  };*/

  return (
    <div className="container nav-padding">
      <NavBar />

      {organization?.data ? (
        <>
          <div id="main-header">{organization.data.name}</div>
          <button
            id="home-back-btn"
            onClick={handleBack}
            style={{ fontSize: "12px", marginLeft: "100px" }}
          >
            <i className="fa fa-arrow-left" aria-hidden="true" />
          </button>
          <div id="dashboard-class-card-details">
            <div id="card-left-content-container">
              <div id="label">Details:</div>

              <div id="location-teachers-container">
                <div id="location">Location: {organization.data.county}, {organization.data.state}</div>
                <div id="teachers">
                   Teachers: {organization.data.mentors.map((mentor, index) => (
                     <span key={mentor.id}>{mentor.first_name} {mentor.last_name}
                     {index !== organization.data.mentors.length - 1 ? ', ' : ''}
                     </span>
                   ))}
                </div>
              </div>
            </div>

            {/* Existing card content */}
          </div>
          <MentorSubHeader
            title={`${organization.data.name}'s Classrooms`}
          ></MentorSubHeader>
          <div id="classrooms-container">
            <div id="dashboard-card-container">
              {classrooms.map((classroom) => (
                <div key={classroom.id} id="dashboard-class-card">
                  <div id="card-left-content-container">
                    <h1 id="card-title">{classroom.name}</h1>
                    <div id="card-button-container" className="flex flex-row">
                      <button onClick={() => handleViewClassroom(classroom.id)}>View</button>
                    </div>
                  </div>
                  <div id="card-right-content-container">
                    <DashboardDisplayCodeModal code={classroom.code} />
                    <div id="divider" />
                    <div id="student-number-container">
                      <h1 id="number">{classroom.students.length}</h1>
                      <p id="label">Students</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
