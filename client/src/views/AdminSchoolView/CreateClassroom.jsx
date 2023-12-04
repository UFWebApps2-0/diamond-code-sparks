import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "../OrgDashboard/CreateOrg.less"
import { useNavigate } from "react-router-dom";
import { addClassroom } from "../../Utils/requests";

export default function CreateClassroom() {
    const[classroomName, setClassroomName] = useState("");
    const navigate = useNavigate();

  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if(classroomName != '') {
      const res = await addClassroom(classroomName);

      if(res.data) {
         message.success(`Successfully created ${classroomName}.`)
      }
      else {
          message.error("Failed to create classroom.")
      }
      setClassroomName('');
      navigate('/dashboard');

  } else {
      message.info('Missing required field.')
  }
    };
    return (
        <div className="container nav-padding">
          <NavBar />
          <div id="create-container">
          <div id="create-header">Create Classroom</div>
          <div id="create-form-container">
            <form onSubmit={handleSubmit}>
              <label>
                School Name: {' '}
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