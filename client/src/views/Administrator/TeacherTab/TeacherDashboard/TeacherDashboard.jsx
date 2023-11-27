import React, { useEffect, useState } from "react";
import {
  getMentor,
  getClassrooms,
  getSchoolClassrooms,
  getSchoolID,
  getMentorID,
  getAllClassrooms,
} from "../../../../Utils/requests";
import { message } from "antd";
import "../../../Mentor/Dashboard/Dashboard.less";
import DashboardDisplayCodeModal from "../../../Mentor/Dashboard/DashboardDisplayCodeModal";
import MentorSubHeader from "../../../../components/MentorSubHeader/MentorSubHeader";
import NavBar from "../../../../components/NavBar/NavBar";
import { useGlobalState } from "../../../../Utils/userState";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";

export default function TeacherDashboard(props) {
  const [mentor, setMentor] = useState();
  const [filteredClassrooms, setFilteredClassrooms] = useState();
  const [value] = useGlobalState("currUser");
  const navigate = useNavigate();
  const { id } = useParams();
  const { record } = props;
  const location = useLocation();

  function handleBack() {
    navigate("/AdminDashboard");
  }

  function handleViewClassroom(classroomID) {
    navigate(`/ClassroomAdmin/${classroomID}`, {
      state: {
        value: 2,
        teacherID: mentor.data.id,
      },
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);
        const mentorResponse = await getMentorID(id);
        const classroomsResponse = await getAllClassrooms();

        const mentorClassroomIDs = mentorResponse.data.classrooms.map(
          (classroom) => classroom.id
        );

        // Filter classrooms based on whether their IDs are in the mentorClassroomIDs array
        setFilteredClassrooms(
          classroomsResponse.data.filter((classroom) =>
            mentorClassroomIDs.includes(classroom.id)
          )
        );
        console.log("test");
        console.log(filteredClassrooms);
        setMentor(mentorResponse);
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      }
    };

    fetchData();
  }, [id]);

  /*const handleViewClassroom = (classroomId) => {
    navigate(`/classroom/${classroomId}`);
  };*/
  console.log(mentor);
  return (
    <div className="container nav-padding">
      <NavBar />

      {mentor?.data ? (
        <>
          <div id="main-header">
            {mentor.data.first_name} {mentor.data.last_name}
          </div>
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
                {mentor.data.school?.name && (
                  <div id="location">School: {mentor.data.school.name}</div>
                )}
              </div>
            </div>
          </div>
          <MentorSubHeader
            title={`${mentor.data.first_name} ${mentor.data.last_name}'s Classrooms`}
          ></MentorSubHeader>
          <div id="classrooms-container">
            <div id="dashboard-card-container">
              {filteredClassrooms.map((classroom) => (
                <div key={classroom.id} id="dashboard-class-card">
                  <div id="card-left-content-container">
                    <h1 id="card-title">{classroom.name}</h1>
                    <div id="card-button-container" className="flex flex-row">
                      <button onClick={() => handleViewClassroom(classroom.id)}>
                        View
                      </button>
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
