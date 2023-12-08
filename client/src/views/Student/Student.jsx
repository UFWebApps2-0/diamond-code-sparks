import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getStudentClassroom, getLessonModule } from '../../Utils/requests';
import StudentDiscussionDetailModal from './StudentDiscussionDetailModal';
import './Student.less';

function Student() {
  const [learningStandard, setLessonModule] = useState({}); // learningStandard is the lesson module
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleSelection = (activity) => { // navigate to selected activity page
    activity.lesson_module_name = learningStandard.name;
    localStorage.setItem('my-activity', JSON.stringify(activity));

    navigate('/workspace');
  };

  const handleCancel = () => { // close discussion modal
    setModalVisible(false)
  };

  const handleOk = () => { // close discussion modal
    setModalVisible(false)
  }; 
  
  const handleDiscussionSelection = (discussion) => { // open discussion modal
    setSelectedDiscussion(discussion);
    setModalVisible(true);
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
              .map((activity) => ( // display activity selectors
                <div
                  key={activity.id}
                  id='list-item-wrapper'
                  onClick={() => handleSelection(activity)} // on click navigate to activity page
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
          {learningStandard.discussions  ? (
            learningStandard.discussions.map((discussion) => ( // display discussion selectors
              <div 
              key={discussion.id}
              id='list-item-wrapper'
              onClick={() => handleDiscussionSelection(discussion)} // on click show discussion modal preview
              >
              <li> 
                {`${learningStandard.name}: ${discussion.Title}`} 
                </li>
              </div>
            ))
          ) : (
            <p>No discussions available.</p>
          )}
        </ul>
      </div>
      <StudentDiscussionDetailModal // discussion modal preview component
        learningStandardName={learningStandard ? learningStandard.name : ''}
        title={selectedDiscussion ? selectedDiscussion.Title : ''}
        description={selectedDiscussion ? selectedDiscussion.Description : ''}
        visible={modalVisible}
        setVisible={setModalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </div>
  );
}

export default Student;
