import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Table } from "antd";
import { addClassroom, getAllSchools } from "../../../../Utils/requests";
import { getUser } from "../../../../Utils/AuthRequests";
import "./ClassroomCreator.less";

export default function ClassroomCreator({
  classroomList, 
  handleAddClassroom,
}) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const userData = getUser();

  const showModal = () => {
    setName("");
    setSchool("");
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  
  
  const handleAddClassroomClick = async (e) => {
    handleAddClassroom(name, school, userData);
    setVisible(false);   
  };

  return (
    <div>
      <button onClick={showModal} id="add-class-btn">
        + Add Classroom
      </button>
      <Modal
        title="Create Classroom"
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
            <Input
              onChange={(e) => setSchool(e.target.value)}
              value={school}
              placeholder="Enter the School"
              required
              //Later will replace this with associated administrator's school
            />
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
