import React, { useState, Component } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { getUser } from "../../../../Utils/AuthRequests";
import "./ClassroomCreator.less";
import axios from "axios";


export default function RosterUpload({
  classroomList, 
  gradeList,
  schoolList,
  handleAddClassroom,
}){
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [school, setSchool] = useState(0);
  const [grade, setGrade] = useState(0);
  const userData = getUser();
  
    const showModal = () => {
          setVisible(true);
    };
  
    const handleCancel = () => {
      setVisible(false);
    };
    
    const handleAddClassroomClick = async (e) => {
      if (school == 0) {
        return
      }
      const reader = new FileReader();
      fs.readFile(data, 'utf8', function(err, data)
      {
        if (err) {
          message.error("Failed to upload roster");
          return
        }

        const fileData = JSON.parse(data);
        fileData.entries.forEach((elem) =>
        {
          handleAddClassroom(elem.name, school, grade, userData);
        })
      })
      setVisible(false);   
    };
  
    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const getFile = (e) =>
    {
      if(e.target.files) {
        setData(e.target.files[0]);
      }
    };
  
    return (
      <div>
        <button onClick={showModal} id="add-class-btn">
          + Upload roster
        </button>
        <Modal
          title="Add Roster"
          open={visible}
          width="35vw"
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            id="add-class"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            onFinish={handleAddClassroomClick}
            layout="horizontal"
            size="default"
          >
            <Form.Item id="form-label" label="Classroom Name">
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter the Classroom Name"
              required
            />
          </Form.Item>
          <Form.Item id="form-label" label="School">
            <Select
              showSearch
              placeholder="Select a school"
              optionFilterProp="children"
              onChange={(value)=>setSchool(value)}
              filterOption={filterOption}
              options={schoolList.map((value) => ({value: value.id, label: value.name}))}
            />
          </Form.Item>
          <Form.Item id="form-label" label="Grade">
            <select
              id = "school-grade-dropdown"
              name="grade"
              defaultValue = {grade}
              onChange={e => setGrade(e.target.value)}
            >
               <option key={0} value={grade} disabled id="disabled-option">
                Grade
              </option>
              {gradeList.map(grade_ => (
                <option key={grade_.id} value={grade_.id}>
                  {grade_.name}
                </option>
              ))}
            </select>
          </Form.Item>
            <Form.Item id="form-label" label="Upload Json File"
              wrapperCol={{
                offset: 0,
                span: 16,
              }}
              style={{ marginBottom: "0px" }}
            >
              <input type = "file" onChange={getFile} />
              <br></br>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
              style={{ marginBottom: "0px" }}
            >
              <Button
                onClick={handleCancel}
                size="large"
                className="class-cancel-button"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="class-submit-button"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
  