import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, message } from 'antd';
import { getStudentGradesByClassroomID, getStudent, getActivity, getClassroom } from '../../Utils/requests';


const Grades = ({ classroomId }) => {
  const [studentNames, setStudentNames] = useState([]);
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const accessTokenRef = useRef(null);
  const [tokenClient, setTokenClient] = useState(null);
  const [courseName, setCourseName] = useState("");


const listCourses = async () => {
    try {
      const response = await window.gapi.client.classroom.courses.list({
        pageSize: 100,
      });
      const coursesData = response.result.courses;
      setCourses(coursesData.map(course => ({ key: course.id, name: course.name, id: course.id })));

      const foundCourse = coursesData.find(course => course.name === courseName);
      if (foundCourse) {
        //Do some logic
      } else {
        console.error('Course not found:', courseName);
      }
    } catch (err) {
      setError(err);
    }
  };


  useEffect(() => {
    getClassroom(classroomId).then((res) => {
      if (res.data) {
        const classroom = res.data;
        console.log(classroom)
        setCourseName(classroom.name);
        
        
  
        // Filter students to include only those with a googleClassroomEmail
        const studentsWithEmail = classroom.students.filter(student => student.googleClassroomEmail);
        
        // Map the filtered students' names
        const names = studentsWithEmail.map(student => student.name);
        setStudentNames(names);
  
        console.log(names); // Log student names with googleClassroomEmail to the console
      } else {
        console.error('Error fetching classroom:', res.err);
      }
    });


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

          // Add the googleClassroomEmail to the grade details
          const studentEmail = studentResponse.data.googleClassroomEmail;
          return { 
            ...grade, 
            studentName: studentResponse.data.name,
            activityName: activityResponse.data.StandardS, // Assuming the activity name is in StandardS
            studentEmail // Added student email
          };
        } catch (e) {
          console.error('Error fetching additional data:', e);
          return grade; // Return the original grade if there's an error
        }
      }));

      setGrades(gradesWithDetails);
      
    };

    const CLIENT_ID = '770928523351-1b7sbtjeoloc1i675t92f0ko31ckaojn.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyDVvW45ZXWBAR1cielzLygxda0XwD9fiAo';
    const DISCOVERY_DOC = 'https://classroom.googleapis.com/$discovery/rest';
    const SCOPES = 'https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.students';

    let gapiInited = false;
    let gisInited = false;

    function gapiLoaded() {
      window.gapi.load('client', initializeGapiClient);
    }

    async function initializeGapiClient() {
      try {
        await window.gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
        maybeEnableButtons();
      } catch (err) {
        setError(err);
      }
    }

    function gisLoaded() {
      const initializedTokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (resp) => {
          if (resp.error !== undefined) {
            throw resp;
          }
          accessTokenRef.current = resp.access_token;
          setIsAuthorized(true);
          listCourses();
        },
      });
      setTokenClient(initializedTokenClient);
      gisInited = true;
      maybeEnableButtons();
    }

    function maybeEnableButtons() {
      if (gapiInited && gisInited) {
        setIsAuthorized(window.gapi.client.getToken() !== null);
      }
    }

    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = gapiLoaded;
    document.body.appendChild(script);

    const gisScript = document.createElement('script');
    gisScript.src = 'https://accounts.google.com/gsi/client';
    gisScript.onload = gisLoaded;
    document.body.appendChild(gisScript);


    fetchGrades();
  }, []);

  const uploadActivitiesToGoogleClassroom = async () => {
    try {
      const foundCourse = courses.find(course => course.name === courseName);
      if (!foundCourse) {
        throw new Error(`Course '${courseName}' not found`);
      }
      
      console.log("This is grades", grades);
      console.log('Student Email for Grades:', grades.map(grade => grade.studentEmail));
  
      for (let i = 0; i < grades.length; i++) {
        const grade = grades[i];
        let assignmentId;
       
        // Check if the assignment already exists
        const existingAssignmentsResponse = await window.gapi.client.classroom.courses.courseWork.list({
          courseId: foundCourse.id,
        });
        const existingAssignments = existingAssignmentsResponse.result.courseWork || [];
        const existingAssignment = existingAssignments.find(assignment => assignment.title === grade.activityName);
  
        // Create assignment if it doesn't exist
        if (!existingAssignment) {
          const newAssignment = await window.gapi.client.classroom.courses.courseWork.create({
            courseId: foundCourse.id,
            title: grade.activityName,
            workType: "ASSIGNMENT",
            state: "PUBLISHED",
            maxPoints: 100, // Set the maximum points to 100
            // ... other necessary assignment properties
          });
          assignmentId = newAssignment.result.id;
        } else {
          assignmentId = existingAssignment.id;
        }
  
        // Retrieve default submission IDs for the assignment
        const submissionsResponse = await window.gapi.client.classroom.courses.courseWork.studentSubmissions.list({
          courseId: foundCourse.id,
          courseWorkId: assignmentId,
        });
        const submissions = submissionsResponse.result.studentSubmissions;
        
        // Update grade for the corresponding submission
        console.log(`Updating grade for submission ID ${submissions[i].id} with grade ${grade.Grade}`);
        
        await window.gapi.client.classroom.courses.courseWork.studentSubmissions.patch({
          courseId: foundCourse.id,
          courseWorkId: assignmentId,
          id: submissions[i].id,
          updateMask: 'draftGrade',
          resource: {
            draftGrade: grade.Grade,
            assignedGrade: grade.Grade,
            // ... other necessary submission properties
          },
        });
      }
  
      message.success('Data successfully uploaded to Google Classroom');
    } catch (err) {
      console.error('Error uploading activities:', err);
      setError(err);
    }
  };
  
  



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
      {isAuthorized ? (
          <Button onClick={() => {
            window.gapi.auth2.getAuthInstance().signOut();
            setCourses([]);
            setAssignments([]);
            setIsAuthorized(false);
          }}>Sign Out</Button>
        ) : (
          <Button onClick={() => {
            if (tokenClient) {
              tokenClient.requestAccessToken({ prompt: 'consent' });
            }
          }}>Authorize</Button>
        )}
        {isAuthorized && (
        <Button
          style={{ margin: '20px 0' }}
          type="primary"
          onClick={uploadActivitiesToGoogleClassroom}
        >
          Upload Grades and Assignments to Google Classroom
        </Button>
      )}

        
  
      <div id='page-header' style={{ marginBottom: '20px' }}>
        <h1>Assignments and Grades</h1>
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

