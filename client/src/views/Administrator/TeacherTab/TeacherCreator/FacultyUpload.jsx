import React, { useState, Component } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { getUser } from "../../../../Utils/AuthRequests";
import { CSVReader } from "react-papaparse";
import axios from "axios";


export default function FacultyUpload({
    schoolList,
    handleAddTeacher
}){
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState(null);
    const [school, setSchool] = useState(0);
    const userData = getUser();
  
    const buttonRef = React.createRef()
    
    const handleOnDrop = async roster => {
      // on file select, filter out bad data and set uploadedRoster and tableData
      let badInput = false;

      setData(roster);
      console.log(roster.data);
    }
  
    const handleOnRemoveFile = () => {
      // clear uploadedRoster and tableData when file is unselected
      setData([])
    }
  
    const handleRemoveFile = e => {
      // Note that the ref is set async, so it might be null at some point
      if (buttonRef.current) {
        buttonRef.current.removeFile(e)
      }
    }
  
    const handleOnError = (err, file, inputElem, reason) => {
      console.error(err)
      message.error("Failed to parse the uploaded file.")
    }

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
      data.map(teacher => (handleAddTeacher(teacher.data.first_name, teacher.data.last_name, school, userData)));
      
      setVisible(false);   
    };
  
    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const getFile = (e) =>
    {
      if(e.target.files) {
        setData(e.target.files[0]);
      }
      console.log(data);
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
            <h3>Upload Faculty CSV:</h3>
        <p>
          CSV should have the following columns: "First_Name", "Last_Name"
        </p>
        <CSVReader
          ref={buttonRef}
          onDrop={handleOnDrop}
          onError={handleOnError}
          onRemoveFile={handleOnRemoveFile}
          progressBarColor={"#5BABDE"}
          config={{
            header: true,
            transformHeader: h => {
              let header = h.toLowerCase().trim()
              if (header === "student")
                header = "name"
              return header
            },
          }}
          addRemoveButton
        >
          <span>Click to upload your roster.</span>
        </CSVReader>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
              style={{ marginBottom: "0px" }}
            >
              <br/>
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
  