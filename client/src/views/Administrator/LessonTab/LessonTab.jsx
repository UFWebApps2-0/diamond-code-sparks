import React, { useState } from 'react';
import { Table, Input, Button } from 'antd';
import UnitCreator from '../../ContentCreator/UnitCreator/UnitCreator';
import UnitEditor from '../../ContentCreator/UnitEditor/UnitEditor';

export default function LessonTab({learningStandardList, gradeList, page, setPage}) {
    
    const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const lessonColumns = [
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      editable: true,
      width: '22.5%',
      align: 'left',
      render: (_, key) => (
        <UnitEditor id={key.unit.id} unitName={key.unit.name} linkBtn={true} />
      ),
    },
    {
      title: 'Lesson',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      width: '22.5%',
      align: 'left',
      // Apply filter directly on this column
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
      // Add search functionality for this column
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Lesson Name"
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
      title: 'Description',
      dataIndex: 'expectations',
      key: 'description',
      editable: true,
      width: '22.5%',
      align: 'left',
    },
    {
      title: 'View',
      key: 'view',
      editable: true,
      width: '10%',
      align: 'left',
    },
  ];

  return (
    <div>
        <div id='page-header'>
        <h1>
            Your Lessons
        </h1>
        </div>
        <div id='content-creator-table-container'>
        <div id='content-creator-btn-container'>
            <UnitCreator gradeList = {gradeList} />
            {/* unable to get other button to work, think its result from not getting table to load (so replacement button) */}
            <button onClick = {null} id = "add-unit-btn">
            + Add Lesson
            </button>
        </div>
        <Table
            columns = {lessonColumns}
            dataSource = {learningStandardList}
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