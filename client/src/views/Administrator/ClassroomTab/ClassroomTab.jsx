import { Table } from "antd";
import ClassroomCreator from "./ClassroomCreator/ClassroomCreator";
import ClassroomEditor from "./ClassroomEditor";

export default function ClassroomTab({classroomList, gradeList, schoolList, mentorList, studentList, page, setPage, handleAddClassroom, handleEditClassroom}) {
    const classroomColumns = [
        {
            title: 'Classroom Name',
            dataIndex: 'name',
            key: 'name',
            editable: true,
            width: '22.5%',
            align: 'left',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        },
        {
            title: 'School',
            key: 'school',
            editable: true,
            width: '22.5%',
            align: 'left',
            sorter: (a, b) => a.school.name.toLowerCase().localeCompare(b.school.name.toLowerCase()),
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
                    {key.mentors != null && key.mentors.length != 0 ? 
                        key.mentors.map(mentor => {
                            return <li>{mentor.first_name} {mentor.last_name}<br /></li>
                        }) 
                        : <i>No mentors assigned</i>}
                </span>
            ),
        },
        {
            title: 'Edit Classroom Details',
            dataIndex: 'view',
            key: 'view',
            width: '22.5%',
            align: 'left',
            render: (_, key) => (
                <ClassroomEditor
                    id={key.id}
                    schoolList={schoolList}
                    mentorList={mentorList}
                    gradeList={gradeList}
                    handleEditClassroom={handleEditClassroom}
                />
            )
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
            <ClassroomCreator
            classroomList={classroomList}
            gradeList={gradeList}
            schoolList={schoolList}
            handleAddClassroom={handleAddClassroom}
          ></ClassroomCreator>
            </div>
            <Table
              columns = {classroomColumns}
              dataSource = {classroomList}
              rowClassName = 'editable-row'
              rowKey = 'id'
              onChange = {(Pagination) => {
                setPage(Pagination.current);
              }}
              pagination = {{current: page ? page : 1}}
            ></Table>
          </div>
        </div>
    );
}