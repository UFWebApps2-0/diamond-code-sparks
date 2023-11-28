import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import "./ManageAccount.less"; // Import the styles
import { addTeacher } from "../../Utils/requests";
import { Input, Modal, Button, message } from "antd";

export default function ManageAccount() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [school, setSchool] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setConfirm("");
  };

  const handleAdd = async (event) => {
    event.preventDefault();
      // Handle form submission here
      
      console.log("First Name:", first_name);
      console.log("Last Name:", last_name);
      console.log("School:", school);

    const res = await addTeacher(first_name, last_name, school);

    if (res.data) {
      message.success(`${first_name} ${last_name} has been added.`);
      setFirstName("");
      setLastName("");
      setSchool("");
      setIsModalVisible(false);
    } else {
      message.error(res.err);
    }
  };
    
    const handleDelete = async (event) => {
        event.preventDefault();
        // Handle form submission here
        
        console.log("First Name:", first_name);
        console.log("Last Name:", last_name);
        console.log("School:", school);

        const res = await deleteTeacher(teacherID);

        if (res.data) {
            message.success(`${first_name} ${last_name} has been deleted.`);
            setFirstName("");
            setLastName("");
            setSchool("");
            setIsModalVisible(false);
        }
        else {
            message.error(res.err);
        }
    };

  return (
    <div id="container nav-padding">
      {" "}
      {/* Use the id for styling */}
      <NavBar />
      <div id="manage-account">
        {" "}
        {/* search bar for teachers */}
        <input
          type="text"
          placeholder="Search teachers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* sort option */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="school">School</option>
          {/* // Add more options as needed */}
        </select>
        <button id="add-teacher-btn" onClick={showModal}>
          Add
        </button>
        <Modal
          title={"Are you sure you want to delete this teacher?"}
          visible={isModalVisible}
          onCancel={handleCancel}
          width={"75vw"}
          footer={[
            <Button key="cancel" type="primary" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="add" type="primary" onClick={handleAdd}>
              Add
            </Button>,
          ]}
        >
          <Input
            placeholder="Teacher First Name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Teacher Last Name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            placeholder="School Name"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </Modal>
        <button id="remove-teacher-btn">Remove</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>School</th>
              {/* // Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {/* // Replace this with actual data */}
            <tr>
              <td>John Doe</td>
              <td>University of Florida</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
