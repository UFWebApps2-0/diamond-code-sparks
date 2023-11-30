import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getStudentClassroom, getLessonModule } from '../../Utils/requests';
import './Student.less';

function Student() {
  const [learningStandard, setLessonModule] = useState({}); // learningStandard is the lesson module
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudentClassroom();
        // console.log("getStudentClassroom return:\n" ,res);
        if (res.data) {
          if (res.data.lesson_module) {
            setLessonModule(res.data.lesson_module);
          }
        } else {
          message.error(res.err);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleSelection = (activity) => {
    activity.lesson_module_name = learningStandard.name;
    localStorage.setItem('my-activity', JSON.stringify(activity));

    navigate('/workspace');
  };
  
  const handleDiscussionSelection = (discussion) => {
    // discussion.lesson_module_name = learningStandard.name;
    // localStorage.setItem('my-discussion', JSON.stringify(discussion));
    // navigate('/discussion');
    /* want to open pop up like create discussion page that just has the title and description and button to go to discussion page */
  }

  return (
    <div className='container nav-padding'>
      <NavBar />
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
            {/* <li> {learningStandard.discussions} </li> */}
          {learningStandard.discussions  ? (
            learningStandard.discussions.map((discussion) => (
              <div 
              key={discussion.id}
              id='list-item-wrapper'
              onClick={() => handleDiscussionSelection(discussion)}
              >
              {/* <li> {discussion.Title} </li> */}
              <li> {`${learningStandard.name}: ${discussion.Title}`} </li>
              </div>
            ))
          ) : (
            <p>No discussions available.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Student;
