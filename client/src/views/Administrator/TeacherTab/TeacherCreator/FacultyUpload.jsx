import React, { useState, Component } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { getUser } from "../../../../Utils/AuthRequests";
import "./TeacherCreator.less";
import axios from "axios";


export default function FacultyUpload({
    schoolList,
    handleAddTeacher
}){
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState(null);
    const [school, setSchool] = useState(0);
    const userData = getUser();
  
    const showModal = () => {
          setVisible(true);
    };
  
    const handleCancel = () => {
      setVisible(false);
    };
    
    const handleAddTeacherClick = async (e) => {
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
          handleAddTeacher(elem.first_name, elem.last_name, school, userData);
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
        <button onClick={showModal} id="add-teacher-btn">
          + Upload Faculty List
        </button>
        <Modal
          title="Add Faculty List"
          open={visible}
          width="35vw"
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            id="add-teacher"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            onFinish={handleAddTeacherClick}
            layout="horizontal"
            size="default"
          >
            <Form.Item id="form-label" label="School">
              <select
                id = "school-dropdown"
                required
                name="school"
                defaultValue = {school}
                onChange={e => setSchool(e.target.value)}
              >
                 <option key={0} value={school} disabled id="disabled-option">
                  School
                </option>
                {schoolList.map(school_ => (
                  <option key={school_.id} value={school_.id}>
                    {school_.name}
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
                className="teacher-cancel-button"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="teacher-submit-button"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
  