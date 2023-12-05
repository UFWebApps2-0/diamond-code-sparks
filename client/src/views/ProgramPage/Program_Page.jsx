import React, { useEffect, useState } from 'react';
import MyCards from './MyCards';
import { getCurrUser } from '../../Utils/userState';
import { createGlobalState } from "/node_modules/.vite/deps/react-hooks-global-state.js?v=42b93bcb";
//import './Program_Page.less';
import { getSaves, getStudent, getSession, getSessions} from '../../Utils/requests';
import Workspace from '../../views/Workspace/Workspace';
import { useNavigate } from 'react-router-dom';

function ProgramPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = getCurrUser();
        console.log("Current User:", res);
      } catch (error) {
        console.error("Error:", error);
      }
      const result = JSON.parse(sessionStorage.getItem('user'));
      console.log("Result:", result);

      const res1 = await getStudent("me");
      console.log("Student.me: ", res1);

      const res2 = await getSession(res1.data["session"]);
      console.log("session: ", res2);

      const res4 = await getSession(1745);
      console.log("session: ", res4);

      const res3 = await getSessions();
      console.log("sessions", res3);

    };
    fetchData();
  }, []);

  const handleEditClick = () => {
    navigate('/sandbox'); // Navigate to BlocklyPage when button is clicked
  };


  return (
    <div className="my-programs">
      <div className="header">
        <button className="back-button"></button>
        <h1>My Programs</h1>
        <div className="menu"></div>
      </div>
      <div className="programs-list">
        <button onClick={handleEditClick} className="program new-program">
          <div className="add-icon">+</div>
          <div>New Program</div>
        </button>
        <MyCards programNumber={1} lessonNumber={2}/>
        <MyCards programNumber={2} lessonNumber={3}/>
        <MyCards programNumber={3} lessonNumber={2}/>
      </div>
      {/* gonna change class name to footer */}
      <div className="footer">
        <div className="footer-title">People you've worked with on Lesson 2</div>
        {/* Placeholder for user icons */}
        <div className="user-icons">
          {/* Icons would be rendered here */}
        </div>
      </div>
    </div>
  );
}

export default ProgramPage;
