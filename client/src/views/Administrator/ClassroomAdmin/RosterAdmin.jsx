import React, { useEffect, useState } from 'react';
import {
  deleteStudent,
  getClassroom,
  getAllClassrooms,
  setEnrollmentStatus,
  updateStudent,
} from '../../../Utils/requests';
import '../../Mentor/Classroom/Roster/Roster.less';
import MentorSubHeader from '../../../components/MentorSubHeader/MentorSubHeader';
import ListView from '../../Mentor/Classroom/Roster/ListView';
import CardView from '../../Mentor/Classroom/Roster/CardView';
import { Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Roster({ classroomId, value, teacherID}) {
  const [form] = Form.useForm();
  const [studentData, setStudentData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [listView, setListView] = useState(true);
  const [classroom, setClassroom] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let data = [];
    getAllClassrooms().then((res) => {
      if (res.data) {
        const allClassrooms = res.data;
       
        const numericClassroomId = parseInt(classroomId, 10);
      // Find the classroom with the correct ID
      const selectedClassroom = allClassrooms.find((classroom) => classroom.id === numericClassroomId);
        if (selectedClassroom) {
          setClassroom(selectedClassroom);
          selectedClassroom.students.forEach((student) => {
            data.push({
              key: student.id,
              name: student.name,
              character: student.character,
              enrolled: {
                id: student.id,
                enrolled: student.enrolled,
              },
              last_logged_in: student.last_logged_in,
            });
          });
          setStudentData(data);
        } else {
          message.error("Classroom not found");
        }
      } else {
        message.error(res.err);
      }
    });
  }, [classroomId]);

  const getFormattedDate = (value, locale = 'en-US') => {
    if (value) {
      let output = new Date(value).toLocaleDateString(locale);
      return output + ' ' + new Date(value).toLocaleTimeString(locale);
    } else {
      return 'N/A';
    }
  };

  const onEnrollToggle = async (id, toggled) => {
    const res = await setEnrollmentStatus(id, toggled);
    if (res.data) {
      const updatedStudent = res.data;
      let newStudentData = [...studentData];
      const index = studentData.findIndex(function (student) {
        return student.key === id;
      });
      newStudentData[index] = {
        key: updatedStudent.id,
        name: updatedStudent.name,
        character: updatedStudent.character,
        enrolled: {
          id: updatedStudent.id,
          enrolled: updatedStudent.enrolled,
        },
        last_logged_in: updatedStudent.last_logged_in,
      };
      setStudentData(newStudentData);
      message.success(
        `Successfully updated ${updatedStudent.name}'s enrollment status.`
      );
    } else {
      message.error(res.err);
    }
  };

  const addStudentsToTable = (students) => {
    let newStudentData = [...studentData];
    students.forEach((student) =>
      newStudentData.push({
        key: student.id,
        name: student.name,
        character: student.character,
        enrolled: {
          id: student.id,
          enrolled: student.enrolled,
        },
        last_logged_in: student.last_logged_in,
      })
    );
    setStudentData(newStudentData);
  };

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      character: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancelEdit = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();

      // update edited row to studentData state
      const newData = [...studentData];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setStudentData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setStudentData(newData);
        setEditingKey('');
      }

      // update student in db
      let student = classroom.students.find((student) => student.id === key);
      for (let attribute in row) student[attribute] = row[attribute];
      if (student) {
        const res = await updateStudent(student.id, student);
        if (res.data) {
          message.success(
            `Successfully updated ${res.data.name}'s information.`
          );
        } else {
          message.error(res.err);
        }
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = async (key) => {
    const dataSource = [...studentData];
    setStudentData(dataSource.filter((item) => item.key !== key));

    const res = await deleteStudent(key);
    if (res.data) {
      message.success(`Successfully deleted student, ${res.data.name}.`);
    } else {
      message.error(res.err);
    }
  };

  const handleBack = () => {
    if(value == '0'){
         navigate(`/OrganizationDashboard/${classroom.school.id}`);
    }
    else if(value == '1'){
      navigate("/AdminDashboard");
    }
    else if(value == '2'){
      navigate(`/TeacherDashboard/${teacherID}`);
    }
  };

  return (
    <div>
      <button id='home-back-btn' onClick={handleBack}>
        <i className='fa fa-arrow-left' aria-hidden='true' />
      </button>
      <MentorSubHeader
        title={'Your Students'}
        addStudentsToTable={addStudentsToTable}
        addUserActive={true}
        classroomId={classroomId}
        cardViewActive={listView}
        listViewActive={!listView}
        setListView={setListView}
      />
      {listView ? (
        <ListView
          studentData={studentData}
          onEnrollToggle={onEnrollToggle}
          editingKey={editingKey}
          isEditing={isEditing}
          edit={edit}
          cancelEdit={cancelEdit}
          save={save}
          form={form}
          handleDelete={handleDelete}
          getFormattedDate={getFormattedDate}
        />
      ) : (
        <CardView
          studentData={studentData}
          onEnrollToggle={onEnrollToggle}
          getFormattedDate={getFormattedDate}
        />
      )}
    </div>
  );
}
