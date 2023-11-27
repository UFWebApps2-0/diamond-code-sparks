import React, { useEffect, useState } from "react";
import { Table } from "antd";
import OrganizationCreator from "./OrganizationCreator/OrganizationCreator";
import OrganizationEditor from "./OrganizationEditor";

export default function OrganizationTab({
  organizationList,
  classroomList,
  mentorList,
  page,
  setPage,
  handleAddOrganization,
  handleEditOrganization
}) {
  const [organizationColumns, setOrganizationColumns] = useState([])

  useEffect(() => {
    setOrganizationColumns(
      [
        {
          title: "Organization Name",
          dataIndex: "name",
          key: "name",
          editable: true,
          width: "22.5%",
          align: "left",
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        },
        {
          title: "Number of Classrooms",
          key: "num_classrooms",
          editable: true,
          width: "22.5%",
          align: "left",
          render: (_, key) => <p>{key.classrooms.length}</p>,
        },
        {
          title: "Number of Teachers",
          key: "num_mentors",
          editable: true,
          width: "22.5%",
          align: "left",
          render: (_, key) => <p>{key.mentors.length}</p>,
        },
        {
          title: "Edit School Details",
          dataIndex: "view",
          key: "view",
          width: "22.5%",
          align: "left",
          render: (_, key) => <OrganizationEditor 
              id={key.id} 
              schoolName={key.name} 
              classroomList={classroomList} 
              mentorList={mentorList}
              handleEditOrganization={handleEditOrganization}
            />
        },
      ]
    )
  }, [organizationList])

  return (
    <div>
      <div id="page-header">
        <h1>Your Organizations</h1>
      </div>
      <div id="content-creator-table-container">
        <div id="content-creator-btn-container">
          <OrganizationCreator
            OrganizationList={organizationList}
            handleAddOrganization={handleAddOrganization}
          ></OrganizationCreator>
        </div>
        <Table
          columns={organizationColumns}
          dataSource={organizationList}
          rowClassName="editable-row"
          rowKey="id"
          onChange={(Pagination) => {
            setPage(Pagination.current);
            setSearchParams({ tab, page: Pagination.current });
          }}
          pagination={{ current: page ? page : 1 }}
        ></Table>
      </div>
    </div>
  );
}
