import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./CreateOrg.less";
import { useNavigate } from "react-router-dom";
import { addOrganization } from "../../Utils/requests"
import { message } from "antd"

export default function CreateOrg() {
  const [orgName, setOrgName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here

    const res = await addOrganization(
      orgName,
      description
    );

    if (res.data) {
      message.success(
        `${orgName} has been created.`
      );
      setOrgName("");
      setDescription("");
      navigate('/orgdash');
    } else {
      message.error(res.err);
    }

  };

  return (
    <div className="container nav-padding">
      <NavBar />
      <div id="create-container">
        <div id="create-header">Create Organization</div>
        <div id="create-form-container">
          <form onSubmit={handleSubmit}>
            <label>
              {/* label for org name input */}
              Organization Name:
              {/* Input field for Organization Name */}
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </label>
            <label>
              Description:
              {/* text area for description */}
              <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            {/* submit button for the form */}
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
