import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./CreateOrg.less";
import { useNavigate } from "react-router-dom";
import { addOrganization, getSchools } from "../../Utils/requests"
import { message, Select } from "antd"

export default function CreateOrg() {
  const [orgName, setOrgName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    let schoolList = [];
    getSchools().then((res) => {
      if (res.data) {
        for (let i = 0; i < res.data.length; i++) {
          schoolList.push(res.data[i]);
        }
      } else {
        message.error(res.err);
      }
      setSchools(schoolList);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // validate if at least one school is selected
    if (selectedSchools.length > 0) {
      const res = await addOrganization(
        orgName,
        description,
        selectedSchools
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
    } else {
      setIsError("error");
      message.error("You must select at least one school.");
    }

  };

  const handleSelectSchool = (id) => {
    setSelectedSchools([...selectedSchools, id]);
    setIsError("");
  }

  const handleDeselectSchool = (id) => {
    setSelectedSchools(selectedSchools.filter((school) => school != id));
  }

  return (
    <div className="container nav-padding">
      <NavBar />
      <div id="create-container">
        <button id="back-btn" onClick={() => navigate('/orgdash')}>
          <i className='fa fa-arrow-left' aria-hidden='true' />
        </button>
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
            <label>
              Add Schools:
              <Select 
                style={{width: '100%'}}
                placeholder="Please select at least one"
                mode="multiple"
                onSelect={handleSelectSchool}
                onDeselect={handleDeselectSchool}
                status={isError}
              >
                {schools.map((school) => <option value={school.id}>{school.name}</option>)}
              </Select>
            </label>
            {/* submit button for the form */}
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
