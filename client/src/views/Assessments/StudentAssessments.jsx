import React, {useEffect, useState} from 'react';
import {Modal,Button,Table} from 'antd';
import { getStudentClassAssessments } from '../../Utils/requests';
import CompletedAssessment from './CompletedAssessment';
//Page to view the assessments a student has taken and to view their completed assessments
function StudentAssessments({stuId,classId})
{
    const [assessments,setAssessments]=useState([]);
    
    const columns=[
        {
            title: 'Assessment Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            sorter: {
              compare: (a, b) => (a.name < b.name ? -1 : 1),
            },
          },
          {
            title: 'View Assessments',
            dataIndex: 'assessments',
            keyIndex: 'assessments',  
            width: '30%',

          },
          {
            title:'Grade',
            dataIndex:'grade',
            keyIndex:'grade',
            editable:true, 
            width:'20%'
          }
    ]


    useEffect(() => {
 
      getStudentClassAssessments(stuId,classId).then((res) => {
        if (res.data) {
          const data = [];
          res.data.forEach((assessment) => {
            data.push({
              key: assessment.id,
              name: assessment.assessmentName,
              assessments: (
                <Button
                  type="primary"
                  onClick={() => {
                    showModal();
                  }}
                >
                  View
                </Button>
              ),
              grade: "N/A",
            });
          });

          setAssessments(data);
        } else {
          console.log("error"); 
        }
      });


    }, []);
    return (
        <div>
            <Table columns={columns} dataSource={assessments} />
        </div>
    );
}

export default StudentAssessments;