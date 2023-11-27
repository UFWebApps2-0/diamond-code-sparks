import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Table } from "antd";
import { addTeacher } from "../../../Utils/requests";
import { getUser } from "../../../Utils/AuthRequests";
import TeacherCreator from "./TeacherCreator/TeacherCreator";
import FacultyUpload from "./TeacherCreator/FacultyUpload";

export default function TeacherTab({teacherList, schoolList, page, setPage, handleAddTeacher}) {

    const teacherColumns = [
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'firstName',
            editable: true,
            width: '22.5%',
            align: 'left',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'lastName',
            editable: true,
            width: '22.5%',
            align: 'left',
        },
        {
            title: 'School',
            dataIndex: 'school',
            key: 'school',
            editable: true,
            width: '22.5%',
            align: 'left',
            render: (_, key) => (
                <span>{key.school != null ? key.school.name : <i>No school provided</i>}</span>
            ),
        },
        {
            title: 'View Classes',
            dataIndex: 'view',
            key: 'view',
            width: '22.5%',
            align: 'left',
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