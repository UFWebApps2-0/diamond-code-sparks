import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "../OrgDashboard/CreateOrg.less"

export default function CreateClassroom() {
    const[classroomName, setClassroomName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    };
    return (
        <div className="container nav-padding">
          <NavBar />
          <div id="create-container">
          <div id="create-header">Create School</div>
          <div id="create-form-container">
            <form onSubmit={handleSubmit}>
              <label>
                Classroom Name: {' '}
                <input
                  type="text"
                  value={classroomName}
                  onChange={(e) => setClassroomName(e.target.value)}
                />
              </label>
              
              {/* Other Classroom Fields */}
              <input type="submit" value="Submit" />
            </form>
            </div>
            </div>
        
        </div>


    );

};