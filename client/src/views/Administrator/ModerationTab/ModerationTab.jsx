import { Table } from 'antd';

export default function ModerationTab({page, setPage}) {

    //Create flagged content table structure
    const flagColumns = [
        {
        title: 'Student Name',
        dataIndex: 'studentName',
        key: 'studentName',
        width: '22.5%',
        align: 'left',
        },
        {
        title: 'Decription',
        dataIndex: 'reason',
        key: 'reason',
        width: '22.5%',
        align: 'left',
        },
    ];

    return (
        <div>
            <div id='page-header'>
            <h1>
              Content for Review
            </h1>
          </div>
          <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
              <br></br>
            </div>
            <Table
              columns={flagColumns}
              dataSource={[]}
              rowClassName='editable-row'
              rowKey='id'
              onChange={(Pagination) => {
                setPage(Pagination.current);
                setSearchParams({ tab, page: Pagination.current });
              }}
              pagination={{ current: page ? page : 1 }}
            ></Table>
          </div>

          <div id='page-header'>
            <h1>
              Past Reviews
            </h1>
          </div>
          <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
              <br></br>
            </div>
            <Table
              columns={flagColumns}
              dataSource={[]}
              rowClassName='editable-row'
              rowKey='id'
              onChange={(Pagination) => {
                setPage(Pagination.current);
                setSearchParams({ tab, page: Pagination.current });
              }}
              pagination={{ current: page ? page : 1 }}
            ></Table>
          </div>

          <div id='page-header'>
            <h1>
              Flagged Users
            </h1>
          </div>
          <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
              <br></br>
            </div>
            <Table
              columns={flagColumns}
              dataSource={[]}
              rowClassName='editable-row'
              rowKey='id'
              onChange={(Pagination) => {
                setPage(Pagination.current);
                setSearchParams({ tab, page: Pagination.current });
              }}
              pagination={{ current: page ? page : 1 }}
            ></Table>
            <br></br>
            <br></br>
          </div>
        </div>
    )
}