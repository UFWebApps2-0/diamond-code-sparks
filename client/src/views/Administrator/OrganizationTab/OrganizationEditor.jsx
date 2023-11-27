import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { getSchool } from '../../../Utils/requests';

export default function OrganizationEditor({ id, classroomList, mentorList, handleEditOrganization}) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [county, setCounty] = useState("");
  const [state, setState] = useState('');
  const [classrooms, setClassrooms] = useState([]);
  const [mentors, setMentors] = useState([]);

  const fetchSchool = async () => {
    const res = await getSchool(id);
    setName(res.data.name);
    setCounty(res.data.county);
    setState(res.data.state);
    setClassrooms(res.data.classrooms.map(classroom => classroom.id));
    setMentors(res.data.mentors.map(mentor => mentor.id));
  };

  const showModal = async () => {
    setVisible(true);
    fetchSchool();
  };

  useEffect(() => {
    fetchSchool();
  }, [id]);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleEditOrganization(id, name, county, state, classrooms, mentors);
    setVisible(false);
  };

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <button id='link-btn' onClick={showModal}>
        Edit Details
      </button>
      <Modal
        title='School Editor'
        visible={visible}
        width='35vw'
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form
          id='edit-school'
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout='horizontal'
          size='default'
        >
          <Form.Item id='form-label' label='School Name'>
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='Enter school name'
            />
          </Form.Item>
          <Form.Item id='form-label' label='County'>
            <Input
              onChange={(e) => setCounty(e.target.value)}
              value={county}
              placeholder='Enter county name'
            />
          </Form.Item>
          <Form.Item id='form-label' label='State'>
            <Input
              onChange={(e) => setState(e.target.value)}
              value={state}
              placeholder='Enter State Name number'
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
          <Form.Item label='Mentors'>
            <Select 
                showSearch
                mode='multiple'
                placeholder="Select mentors"
                optionFilterProp="children"
                onChange={(value)=> {setMentors(value)}}
                filterOption={filterOption}
                options={mentorList.map((value) => ({value: value.id, label: value.first_name+" "+value.last_name}))}
                value={mentors}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
