import React, {useEffect, useState} from 'react';
import {Modal,Button,Table} from 'antd';
import { getStudentAssessments } from '../../Utils/requests';
//Page to view the assessments a student has taken and to view their completed assessments
function StudentAssessments({stuId,classId})
{
    const [assessments,setAssessments]=useState([]);
    useEffect(() => {
 
      getStudentAssessments().then((res) => {
        if (res.data) {
          console.log(res.data);
          setAssessments(res.data);
        } else {
          console.log("error"); 
        }
      });


    }, []);
    return (
        <div>
            <p>Hello World</p>
        </div>
    );
}

export default StudentAssessments;