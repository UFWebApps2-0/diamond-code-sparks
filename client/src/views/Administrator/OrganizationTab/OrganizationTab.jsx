import { Table } from 'antd';

export default function OrganizationTab({organizationList, page, setPage}) {
    const organizationColumns = [
        {
            title: 'Organization Name',
            dataIndex: 'name',
            key: 'name',
            editable: true,
            width: '22.5%',
            align: 'left',
        },
        {
            title: 'Number of Classrooms',
            key: 'num_classrooms',
            editable: true,
            width: '22.5%',
            align: 'left',
            render: (_, key) => (
                <p>{key.classrooms.length}</p>
            ),
        },
        {
            title: 'Number of Teachers',
            key: 'num_mentors',
            editable: true,
            width: '22.5%',
            align: 'left',
            render: (_, key) => (
                <p>{key.mentors.length}</p>
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
              Your Organizations
            </h1>
          </div>
          <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
            <button onClick = {null} id = "add-unit-btn">
                + Add Organization
              </button>
            </div>
            <Table
              columns = {organizationColumns}
              dataSource = {organizationList}
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