import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import "./ManageAccount.less"; // Import the styles
import {
  addTeacher,
  deleteTeacher,
  getTeachers,
  addSchool,
  getSchools,
} from "../../Utils/requests"; // Import the deleteTeacher function
import { Input, Modal, Button, message, Select, Divider, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons"; // Import the close icon

export default function ManageAccount() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [school, setSchool] = useState("");
  const [schools, setSchools] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [isError, setIsError] = useState("");
  const [newSchoolName, setNewSchoolName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    handleGetTeachers();
    let schoolList = [];
    getSchools().then((res) => {
      if (res.data) {
        for (let i = 0; i < res.data.length; i++) {
          // only allow users to select schools that aren't already connected to an org
          if (res.data[i].organization == null) {
            schoolList.push(res.data[i]);
          }
        }
      } else {
        message.error(res.err);
      }
      setSchools(schoolList);
    });
  }, []);

  const handleSelectSchool = (id) => {
    setSelectedSchools([...selectedSchools, id]);
    setIsError("");
  };

  const handleDeselectSchool = (id) => {
    setSelectedSchools(selectedSchools.filter((school) => school != id));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showDeleteModal = () => {
    setDeleteModal(true);
  };

  const newSchoolNameChange = (event) => {
    setNewSchoolName(event.target.value);
  };

  const addNewSchool = async (e) => {
    e.preventDefault();

    // add new school to db
    if (newSchoolName != "") {
      const res = await addSchool(newSchoolName);

      if (res.data) {
        setSchools([...schools, res.data]);
        setNewSchoolName("");
      } else {
        message.error(res.err);
      }
    } else {
      message.error("New school must have a name.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    console.log("First Name:", first_name);
    console.log("Last Name:", last_name);
    console.log("School:", JSON.stringify(school));
    console.log("Selected Schools:", JSON.stringify(selectedSchools));

    const res = await addTeacher(first_name, last_name, selectedSchools[0]);

    if (res.data) {
      message.success(`${first_name} ${last_name} has been added.`);
      setFirstName("");
      setLastName("");
      setSchool("");
      setSelectedSchools([]);
      setNewSchoolName("");
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

  const filterTeachers = (teacher) => {
    const fullName = `${teacher.first_name} ${teacher.last_name}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  };

  const sortByName = (a, b) => {
    const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
    const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
    return nameA.localeCompare(nameB);
  };

  const sortAtoZ = (a, b) => {
    return a.school.name < b.school.name ? -1 : 1;
  };

  const sortedTeachers = [...teachers];
  const sortedSchools = [...schools];

  if (sortOption === "name") {
    sortedTeachers.sort(sortByName);
  } else if (sortOption === "school") {
    sortedTeachers.sort(sortAtoZ);
    console.log(sortedTeachers);
  }
    
  const filteredTeachers = sortedTeachers.filter(filterTeachers);

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
          <Select
            style={{ width: "100%" }}
            placeholder="Please select at least one"
            onSelect={handleSelectSchool}
            onDeselect={handleDeselectSchool}
            status={isError}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
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
            {sortedSchools.map((school) => (
              <option value={school.id}>{school.name}</option>
            ))}
          </Select>
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
            {teachers !== null ? (
              filteredTeachers.map((teacher) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
