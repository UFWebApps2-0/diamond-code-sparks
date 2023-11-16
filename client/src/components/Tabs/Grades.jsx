import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import { getStudentGradesByClassroomID, getStudent, getActivity } from '../../Utils/requests';

const Grades = ({ classroomId }) => {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState(null);



  useEffect(() => {
    console.log('Classroom ID:', classroomId); // Log the classroom ID
    const fetchGrades = async () => {
      const { data, err } = await getStudentGradesByClassroomID(classroomId);
      if (err) {
        setError(err);
        message.error(err);
        return;
      }
      const gradesWithDetails = await Promise.all(data.map(async (grade) => {
        try {
          const [studentResponse, activityResponse] = await Promise.all([
            getStudent(grade.submission.student),
            getActivity(grade.submission.activity)
          ]);
          return { 
            ...grade, 
            studentName: studentResponse.data.name,
            activityName: activityResponse.data.StandardS // Assuming the activity name is in StandardS
          };
        } catch (e) {
          console.error('Error fetching additional data:', e);
          return grade; // Return the original grade if there's an error
        }
      }));

      setGrades(gradesWithDetails);
    };

    fetchGrades();
  }, []);

  const columns = [
    {
      title: 'Activity',
      dataIndex: 'activityName', // Updated to use the fetched activity name
      key: 'activity',
      width: 200,
    },
    {
      title: 'Student',
      dataIndex: 'studentName',
      key: 'student',
      width: 100,
    },
    {
      title: 'Grade',
      dataIndex: 'Grade',
      key: 'grade',
    },
    {
      title: 'Comments',
      dataIndex: 'Comments',
      key: 'comments',
    },
    // Add more columns as necessary
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    
    <div>
      <div id='page-header' style={{ marginBottom: '20px' }}>
        <h1>Select Assignment to view Grades</h1>
      </div>
      <div id='content-creator-table-container' style={{ marginTop: '7vh' }}>
        <Table
          columns={columns}
          dataSource={grades}
          rowKey='id'
        />
      </div>
    </div>
  );
};

export default Grades;
