import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Table } from "antd";
import { addOrganization, getAllSchools } from "../../../../Utils/requests";
import { getUser } from "../../../../Utils/AuthRequests";
import "./OrganizationCreator.less";

export default function OrganizationCreator({
  OrganizationList, 
  handleAddOrganization,
}) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [county, setCounty] = useState("");
  const [state, setState] = useState("");
  const userData = getUser();

  const showModal = () => {
    setName("");
    setCounty("");
    setState("");
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  
  
  const handleAddOrganizationClick = async (e) => {
    handleAddOrganization(name, county, state, userData);
    setVisible(false);   
  };

  return (
    <div>
      <button onClick={showModal} id="add-org-btn">
        + Add Organization
      </button>
      <Modal
        title="Create Organization"
        open={visible}
        width="35vw"
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          id="add-orgs"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          onFinish={handleAddOrganizationClick}
          layout="horizontal"
          size="default"
        >
          <Form.Item id="form-label" label="School Name">
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter the School Name"
              required
            />
          </Form.Item>
          <Form.Item id="form-label" label="County">
            <Input
              onChange={(e) => setCounty(e.target.value)}
              value={county}
              placeholder="Enter the County"
              min={1}
              max={15}
              required
            />
          </Form.Item>
          <Form.Item id="form-label" label="State">
            <Input
              onChange={(e) => setState(e.target.value)}
              value={state}
              placeholder="Enter the State"
              required
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
              className="organization-cancel-button"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="organization-submit-button"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
