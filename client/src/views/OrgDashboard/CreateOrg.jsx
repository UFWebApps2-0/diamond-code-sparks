import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./CreateOrg.less";
import { useNavigate } from "react-router-dom";
import { addOrganization, getSchools, addSchool } from "../../Utils/requests"
import { message, Select, Divider, Input, Button, Space } from "antd"

export default function CreateOrg() {
  const [orgName, setOrgName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [isError, setIsError] = useState("");
  const [newSchoolName, setNewSchoolName] = useState("");

  useEffect(() => {
    let schoolList = [];
    getSchools().then((res) => {
      if (res.data) {
        for (let i = 0; i < res.data.length; i++) {
          // only allow users to select schools that aren't already connected to an org
          if(res.data[i].organization == null) {
              schoolList.push(res.data[i]);
          }
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

  const newSchoolNameChange = (event) => {
    setNewSchoolName(event.target.value);
  }

  const addNewSchool = async (e) => {
    e.preventDefault();

    // add new school to db
    if (newSchoolName != "") {
      const res = await addSchool(
        newSchoolName
      );
  
      if (res.data) {
          setSchools([...schools, res.data]);
          setNewSchoolName("");
      } else {
          message.error(res.err);
      }
    } else {
      message.error("New school must have a name.");
    }
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
            {/* customized dropdown code adapted from https://ant.design/components/select */}
            <label>
              Add Schools:
              <Select 
                style={{width: '100%'}}
                placeholder="Please select at least one"
                mode="multiple"
                onSelect={handleSelectSchool}
                onDeselect={handleDeselectSchool}
                status={isError}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider
                      style={{margin: "8px 0"}}
                    />
                    <Space
                      style={{padding: "0 8px 4px"}}
                    >
                      <Input
                        placeholder="Please enter school"
                        value={newSchoolName}
                        onChange={newSchoolNameChange}
                      />
                      <Button type="text" onClick={addNewSchool}>
                        Add School
                      </Button>
                    </Space>
                  </>
                )}
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
