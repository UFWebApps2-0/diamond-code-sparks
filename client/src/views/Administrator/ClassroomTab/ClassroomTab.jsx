import { Table } from 'antd';

export default function ClassroomTab({classroomList, page, setPage}) {
    const classroomColumns = [
        {
            title: 'Classroom Name',
            dataIndex: 'name',
            key: 'name',
            editable: true,
            width: '22.5%',
            align: 'left',
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
            title: 'View Details',
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