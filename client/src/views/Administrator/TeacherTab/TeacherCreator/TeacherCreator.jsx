import React, { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { getUser } from "../../../../Utils/AuthRequests";
import "./TeacherCreator.less";

export default function TeacherCreator({
  TeacherList, 
  schoolList,
  handleAddTeacher,
}) {
  const [visible, setVisible] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [school, setSchool] = useState(0);
  const userData = getUser();

  const showModal = () => {
    setFirstName("");
    setLastName("");
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  
  const handleAddTeacherClick = async (e) => {
    if (school == 0) {
      return
    }

    handleAddTeacher(first_name, last_name, school, userData);
    setVisible(false);   
  };

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <button onClick={showModal} id="add-teacher-btn">
        + Add Teacher
      </button>
      <Modal
        title="Create Teacher"
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
          <Form.Item id="form-label" label="First Name">
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              value={first_name}
              placeholder="Enter First Name"
              required
            />
          </Form.Item>
          <Form.Item id="form-label" label="Last Name">
            <Input
              onChange={(e) => setLastName(e.target.value)}
              value={last_name}
              placeholder="Enter Last Name"
              required
            />
          </Form.Item>
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
