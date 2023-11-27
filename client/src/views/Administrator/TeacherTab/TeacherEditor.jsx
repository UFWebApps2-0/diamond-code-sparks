import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { getTeacher } from '../../../Utils/requests';

export default function TeacherEditor({ id, schoolList, classroomList, handleEditTeacher}) {
  const [visible, setVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [school, setSchool] = useState(0);
  const [classrooms, setClassrooms] = useState([]);

  const fetchTeacher = async () => {
    const res = await getTeacher(id);
    setFirstName(res.data.first_name);
    setLastName(res.data.last_name);
    setSchool(res.data.school.id);
    setClassrooms(res.data.classrooms.map(classroom => classroom.id))
  };

  const showModal = async () => {
    setVisible(true);
    fetchTeacher();
  };

  useEffect(() => {
    fetchTeacher();
  }, [id]);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleEditTeacher(id, firstName, lastName, school, classrooms);
    setVisible(false);
  };

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <button id='link-btn' onClick={showModal}>
        Edit Details
      </button>
      <Modal
        title='Teacher Editor'
        visible={visible}
        width='35vw'
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form
          id='edit-teacher'
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout='horizontal'
          size='default'
        >
          <Form.Item id='form-label' label='First Name'>
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              placeholder='Enter first name'
            />
          </Form.Item>
          <Form.Item id='form-label' label='Last Name'>
            <Input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              placeholder='Enter last name'
            />
          </Form.Item>
          <Form.Item label='School'>
            <Select 
                showSearch
                placeholder="Select a school"
                optionFilterProp="children"
                onChange={(value)=> {setSchool(value)}}
                filterOption={filterOption}
                options={schoolList.map((value) => ({value: value.id, label: value.name}))}
                value={school}
            />
          </Form.Item>
          <Form.Item label='Classrooms'>
            <Select 
                showSearch
                mode='multiple'
                placeholder="Select classrooms"
                optionFilterProp="children"
                onChange={(value)=> {setClassrooms(value)}}
                filterOption={filterOption}
                options={classroomList.map((value) => ({value: value.id, label: value.name}))}
                value={classrooms}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
