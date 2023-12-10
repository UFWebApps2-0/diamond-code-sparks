import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import "../OrgDashboard/CreateOrg.less"
import { addSchool, updateSchoolCounty } from "../../Utils/requests";
import {message} from "antd"

export default function CreateClassroom() {
    const navigate = useNavigate();
    const [classroomName, setClassroomName] = useState("");
    //const [classroomCounty, setClassroomCounty] = useState("");
    //const [classroomState, setClassroomState]= useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await addSchool(
          classroomName,
          window.sessionStorage.getItem("currOrg")
        );

        if(res.data) {
          message.success(
            `${classroomName} has been created.`
          );

          setClassroomName("");
          //setClassroomCounty("");
          //setClassroomState("");
          navigate("/admindashboard");
        }
        else {
          message.error(res.err);
        }
    };
    return (
        <div className="container nav-padding">
          <NavBar />
          <div id="create-container">
            <button id='back-btn' onClick={() => navigate('/admindashboard')}>
              <i className='fa fa-arrow-left' aria-hidden='true' />
            </button>
          <div id="create-header">Create School</div>
          <div id="create-form-container">
            <form onSubmit={handleSubmit}>
              <label>
                School Name (required): {' '}
                <input
                  type="text"
                  value={classroomName}
                  onChange={(e) => setClassroomName(e.target.value)}
                />
                
              </label>
              {/*}
              <label>
                County: {' '}
              <input
                  type="text"
                  value={classroomCounty}
                  onChange={(e) => setClassroomCounty(e.target.value)}
                />
              </label>
              <label>
                State: {' '}
              <input
                  type="text"
                  value={classroomState}
                  onChange={(e) => setClassroomState(e.target.value)}
                />
              </label>
              
    */}
              {/* Other Classroom Fields */}
              <input type="submit" value="Submit" />
            </form>
            </div>
            </div>
        
        </div>


    );

};