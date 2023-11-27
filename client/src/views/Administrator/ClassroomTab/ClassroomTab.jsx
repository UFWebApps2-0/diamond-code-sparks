import React, { useState } from "react";
import { Table, Input, Button } from "antd"
import { useNavigate } from 'react-router-dom';

export default function ClassroomTab({classroomList, page, setPage}) {
  const classroomColumns = [
    {
      title: 'Classroom Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      width: '22.5%',
      align: 'left',
      // Apply filter directly on this column
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
      // Add search functionality for this column
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Classroom Name"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
    },
    {
      title: 'School',
      key: 'school',
      editable: true,
      width: '22.5%',
      align: 'left',
      render: (_, key) => (
        <span>{key.school != null ? key.school.name : <i>No school provided</i>}</span>
      ),
    },
    {
      title: 'Teachers',
      key: 'mentors',
      editable: true,
      width: '22.5%',
      align: 'left',
      render: (_, key) => (
        <span>
          {key.mentors != null ?
            key.mentors.map(mentor => {
              return <li>{mentor.first_name} {mentor.last_name}<br /></li>
            })
            : <i>No mentors assigned</i>}
        </span>
      ),
    },
    {
      title: 'Edit Students',
      dataIndex: 'view',
      key: 'view',
      width: '22.5%',
      align: 'left',
      render: (_, classroom) => (
        <Button type="link" onClick={() => handleViewDetails(classroom.id)}>
          Edit Students
        </Button>
      ),
    },
  ];

  const navigate = useNavigate();

  function handleViewDetails(classroomID){
    navigate(`/ClassroomAdmin/${classroomID}`, { state: { value: 1 } });
  }
    return (
        <div>
            <div id='page-header'>
            <h1>
              Your Classrooms
            </h1>
          </div>
          <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
            <button onClick = {null} id = "add-unit-btn">
                + Add Classroom
              </button>
            </div>
            <Table
              columns = {classroomColumns}
              dataSource = {classroomList}
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