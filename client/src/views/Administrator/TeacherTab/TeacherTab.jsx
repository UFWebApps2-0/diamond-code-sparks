import { Table } from 'antd';

export default function TeacherTab({teacherList, page, setPage}) {

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
            <button onClick = {null} id = "add-unit-btn">
                + Add Teacher
              </button>
              <button onClick = {null} id = "add-unit-btn">
                + Upload Faculty List
              </button>
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