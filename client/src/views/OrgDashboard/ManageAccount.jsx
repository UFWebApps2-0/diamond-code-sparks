import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import "./ManageAccount.less"; // Import the styles
import {
  addTeacher,
  deleteTeacher,
  getTeachers,
  
  addSchool,
} from "../../Utils/requests"; // Import the deleteTeacher function
import { Input, Modal, Button, message } from "antd";
import { CloseOutlined } from "@ant-design/icons"; // Import the close icon

export default function ManageAccount() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [school, setSchool] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetTeachers();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showDeleteModal = () => {
    setDeleteModal(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAdd = async (event) => {
    event.preventDefault();

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
      handleGetTeachers();
    } else {
      message.error(res.err);
    }
  };

  const handleRemove = async () => {
    if (!selectedTeacher) {
      message.error("Please select a teacher to remove.");
      return;
    }

    console.log("Deleting teacher with ID:", selectedTeacher.id);

    const res = await deleteTeacher(selectedTeacher.id);

    console.log("Delete Teacher Response:", res);

    if (res.data) {
      message.success(
        `${selectedTeacher.first_name} ${selectedTeacher.last_name} has been deleted.`
      );
      setFirstName("");
      setLastName("");
      setSchool("");
      setIsModalVisible(false);
      setSelectedTeacher(null);
      setDeleteModal(false);
      handleGetTeachers();
    } else {
      message.error(res.err);
    }
  };

  const handleTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
    setDeleteModal(true);
  };

  const handleGetTeachers = async () => {
    try {
      const res = await getTeachers();
      setTeachers(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="container nav-padding">
      <NavBar />
      <div id="manage-account">
        <input
          type="text"
          placeholder="Search teachers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="school">School</option>
        </select>
        <button id="add-teacher-btn" onClick={showModal}>
          Add
        </button>
        <Modal
          title={"Enter teacher information."}
          visible={isModalVisible}
          onCancel={handleCancel}
          width={"50vw"}
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
        <Modal
          title={"Are you sure you want to delete this teacher?"}
          visible={deleteModal}
          onCancel={() => setDeleteModal(false)}
          width={"50vw"}
          footer={[
            <Button
              key="cancel"
              type="primary"
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </Button>,
            <Button key="delete" type="primary" danger onClick={handleRemove}>
              Delete
            </Button>,
          ]}
        >
          Are you sure you want to delete this teacher?
        </Modal>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>School</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace this with actual data */}
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{`${teacher.first_name} ${teacher.last_name}`}</td>
                <td>{teacher.school ? teacher.school.name : "N/A"}</td>
                <td>
                  <Button
                    type="link"
                    danger
                    onClick={() => {
                      showDeleteModal();
                      handleTeacherClick(teacher);
                    }}
                  >
                    <CloseOutlined />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
