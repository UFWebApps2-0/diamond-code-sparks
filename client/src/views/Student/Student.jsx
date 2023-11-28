import { message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getStudentClassroom } from '../../Utils/requests';
import './Student.less';

const { Option } = Select;

function Student() {
  const [learningStandard, setLessonModule] = useState({});
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
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleViewAllLessonsClick = () => {
    navigate('/all-lessons-student');
  };

  const handleSelection = (activity, status) => {
    activity.lesson_module_name = learningStandard.name;
    activity.status = status; // Add status to the activity object
    localStorage.setItem('my-activity', JSON.stringify(activity));

    navigate('/workspace');
  };

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
                <div key={activity.id} id='list-item-wrapper'>
                  <li onClick={() => handleSelection(activity)}>
                    {`${learningStandard.name}: Activity ${activity.number}`}
                  </li>
                  <div></div>
                  <div>
                  <Select className="custom-dropdown"
                    defaultValue="Select Status"
                    style={{ width: 200, marginLeft: 20 }}
                  >
                    <Option value="completed">Completed</Option>
                    <Option value="inProgress">In-Progress</Option>
                  </Select>
                </div>
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
        <button onClick={handleViewAllLessonsClick} className="view-all-lessons-button">
            View all Lessons
          </button>
      </div>
    </div>
  );
}

export default Student;