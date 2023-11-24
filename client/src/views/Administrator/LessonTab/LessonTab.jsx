import { Table } from 'antd';
import UnitCreator from '../../ContentCreator/UnitCreator/UnitCreator';
import UnitEditor from '../../ContentCreator/UnitEditor/UnitEditor';
import React, { useState, useEffect } from 'react';
import LessonModuleActivityCreator from '../../ContentCreator/LessonModuleCreator/LessonModuleCreator';
import '../../ContentCreator/ContentCreator.less';

export default function LessonTab({learningStandardList, gradeList, page, setPage, setLessonModuleList, searchParams, tab}) {
    const [viewing, setViewing] = useState(parseInt(searchParams.get('activity')));


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
            <LessonModuleActivityCreator
                setLessonModuleList={setLessonModuleList}
                viewing={viewing}
                setViewing={setViewing}
                tab={tab}
                page={page}
              />
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