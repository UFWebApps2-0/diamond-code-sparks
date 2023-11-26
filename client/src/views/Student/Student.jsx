import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSearchParams,useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getAssessments,getStudentClassroom } from '../../Utils/requests';
import './Student.less';
import {Tabs} from 'antd';
const { TabPane } = Tabs;
const joinCode = localStorage.getItem('join-code');

function Student() {
  const [learningStandard, setLessonModule] = useState({});
  const [assessments,setAssessments] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudentClassroom();
        if (res.data) {
          if (res.data.lesson_module) {
            setLessonModule(res.data.lesson_module);
          }
        } else {
          message.error(res.err);
        }
      } catch {}
    };

    const fetchAssessments = async () => {
      let temp = [];
      try {
        let res = await getStudentClassroom();
        const id =res.data.classroom.id;
        res = await getAssessments();
        if (res.data) {
          for(let i=0;i<res.data.length;i++){ 
            if(res.data[i].classroomID==id && res.data[i].isPublic==true){
              temp.push({
                key:res.data[i].id,
                name:res.data[i].assessmentName,
                description:res.data[i].description,
                questions:res.data[i].questions,
              })

            }
          }
          setAssessments(temp);
        } else {
          message.error(res.err);
        }
      } catch {}
    };

    fetchData();
    fetchAssessments();
  }, []);

  const handleSelection = (activity) => {
    activity.lesson_module_name = learningStandard.name;
    localStorage.setItem('my-activity', JSON.stringify(activity));

    navigate('/workspace');
  };

  const handleAssessment = (assessment) => {
    localStorage.setItem('my-assessment', JSON.stringify(assessment));
    console.log(localStorage.getItem('my-assessment'));
    navigate('/assessment');

  };

  return (
    <div className='container nav-padding'>
      <NavBar />
      <Tabs>
        <TabPane tab="Activity" key="1">
        <div id='activity-container'>
          <div id='header'>
            <div>Select your Activity</div>
          </div>
          <ul>
            {learningStandard.activities ? (
              learningStandard.activities
                .sort((activity1, activity2) => activity1.number - activity2.number)
                .map((activity) => (
                  <div
                    key={activity.id}
                    id='list-item-wrapper'
                    onClick={() => handleSelection(activity)}
                  >
                    <li>{`${learningStandard.name}: Activity ${activity.number}`}</li>
                  </div>
                ))
            ) : (
              <div>
                <p>There is currently no active learning standard set.</p>
                <p>
                  When your classroom manager selects one, it will appear here.
                </p>
              </div>
            )}
          </ul>
        </div>
        </TabPane>
        <TabPane tab="Assessments" key="2">
        <div id="assessment-container">
          <div id="header">
            <div>Assessments</div>
          </div>
          <ul>
              {
                assessments.length>0 ? (
                  assessments.map((assessment) => (
                    <div
                      key={assessment.key}
                      id='list-item-wrapper'
                      onClick={()=> handleAssessment(assessment)}
                    >
                      <li>{`${assessment.name}`}</li>
                    </div>
                  ))
                ):(
                  <div>
                    <p>There is currently no assessments assigned.</p>
                    <p>
                      When your classroom manager assigns one, it will appear here.
                    </p>
                  </div>
                )
                
              }
          </ul>
        </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Student;
