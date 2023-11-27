import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { getClassroom, getSchool } from '../../../Utils/requests';

export default function ClassroomEditor({ id, schoolList, mentorList, gradeList, handleEditClassroom}) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [school, setSchool] = useState(0);
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [grade, setGrade] = useState(0);
  const [currentLesson, setCurrentLesson] = useState({});

  const [code, setCode] = useState(0);


  const fetchSchool = async () => {
    const res = await getClassroom(id);
    setName(res.data.name);
    setSchool(res.data.school.id);
    setMentors(res.data.mentors.map(mentor => mentor.id));
    setStudents(res.data.students.map(student => student.id));
    setCode(res.data.code);
    setGrade(res.data.grade.id);
    setCurrentLesson(res.data.selections[0] === undefined ? 0 : res.data.selections[0].lesson_module);
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
    handleEditClassroom(id, name, school, mentors, students, code, grade, currentLesson);
    setVisible(false);
  };

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <button id='link-btn' onClick={showModal}>
        Edit Details
      </button>
      <Modal
        title='Classroom Editor'
        visible={visible}
        width='35vw'
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form
          id='edit-classroom'
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout='horizontal'
          size='default'
        >
          <Form.Item id='form-label' label='Classroom Name'>
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='Enter classroom name'
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
          <Form.Item id='form-label' label='Login Code'>
            <Input
                disabled
                value={code}
                placeholder='Classroom Code'
            />
          </Form.Item>
          <Form.Item label='Grade'>
            <Select 
                showSearch
                placeholder="Select grade"
                optionFilterProp="children"
                onChange={(value)=> {setGrade(value)}}
                filterOption={filterOption}
                options={gradeList.map((value) => ({value: value.id, label: value.name}))}
                value={grade}
            />
          </Form.Item>
          <Form.Item id='form-label' label='Active Lesson'>
            <Input
                disabled
                value={currentLesson}
                placeholder='Active Lesson'
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
