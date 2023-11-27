import React from "react";
import { Table } from "antd";
import TeacherCreator from "./TeacherCreator/TeacherCreator";
import FacultyUpload from "./TeacherCreator/FacultyUpload";
import TeacherEditor from "./TeacherEditor";

export default function TeacherTab({teacherList, schoolList, classroomList, page, setPage, handleAddTeacher, handleEditTeacher}) {

    const teacherColumns = [
        {
            title: 'Name',
            key: 'firstName',
            editable: true,
            width: '22.5%',
            align: 'left',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => {
              let a_name = a.first_name + " " + a.last_name;
              let b_name = b.first_name + " " + b.last_name;
              return a_name.toLowerCase().localeCompare(b_name.toLowerCase());
            },
            render: (_, key) => (<p>{key.first_name + " " + key.last_name}</p>)
        },
        {
            title: 'School',
            dataIndex: 'school',
            key: 'school',
            editable: true,
            width: '22.5%',
            align: 'left',
            render: (_, key) => (
                <span>
                  {key.school != null && Object.keys(key.school) != 0 ? key.school.name : <i>No school provided</i>}
                </span>
            ),
        },
        {
            title: 'Edit Teacher Details',
            dataIndex: 'view',
            key: 'view',
            width: '22.5%',
            align: 'left',
            render: (_, key) => (
              <TeacherEditor
                id={key.id}
                schoolList={schoolList}
                classroomList={classroomList}
                handleEditTeacher={handleEditTeacher}
              />)
        },
    ];

    return (
        <div>
            <div id='page-header'>
            <h1>
              Your Teachers
            </h1>
          </div>
          <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
            <TeacherCreator
            TeacherList={teacherList}
            schoolList={schoolList}
            handleAddTeacher={handleAddTeacher}
          ></TeacherCreator>
             <FacultyUpload
             schoolList = {schoolList}
             handleAddTeacher={handleAddTeacher}
             ></FacultyUpload>
            </div>
            <Table
              columns = {teacherColumns}
              dataSource = {teacherList}
              rowClassName = 'editable-row'
              rowKey = 'id'
              onChange = {(Pagination) => {
                setPage(Pagination.current);
                setSearchParams({tab, page: Pagination.current});
              }}
              pagination = {{current: page ? page : 1}}
            ></Table>
          </div>
        </div>
    );
}