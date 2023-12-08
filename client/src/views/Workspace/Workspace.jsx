import React, { useEffect, useState } from 'react';
import { getActivityToolbox } from '../../Utils/requests.js';
import BlocklyCanvasPanel from '../../components/ActivityPanels/BlocklyCanvasPanel/BlocklyCanvasPanel';
import { message, Checkbox } from 'antd'; // Make sure to import Checkbox
import NavBar from '../../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

export default function Workspace({ handleLogout }) {
  const [activity, setActivity] = useState({});
  // State to keep track of checkbox status
  const [status, setStatus] = useState({
    completed: false,
    inProgress: false,
    late: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const localActivity = JSON.parse(localStorage.getItem('my-activity'));

    if (localActivity) {
      if (localActivity.toolbox) {
        setActivity(localActivity);
      } else {
        getActivityToolbox(localActivity.id).then((res) => {
          if (res.data) {
            let loadedActivity = { ...localActivity, toolbox: res.data.toolbox };

            localStorage.setItem('my-activity', JSON.stringify(loadedActivity));
            setActivity(loadedActivity);
          } else {
            message.error(res.err);
          }
        });
      }
    } else {
      navigate(-1);
    }
  }, [navigate]);

  // Event handler for checkbox changes
  const handleCheckboxChange = (e) => {
    setStatus({ ...status, [e.target.name]: e.target.checked });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    
    <div className='container flex flex-row nav-padding'>
      <NavBar isStudent={true} />
      <div>
        <div className='checkbox-group' style={{ display: 'inline-block', marginLeft: '20px' }}>
          <Checkbox
            name="completed"
            checked={status.completed}
            onChange={handleCheckboxChange}
          >
            Completed
          </Checkbox>
          <Checkbox
            name="inProgress"
            checked={status.inProgress}
            onChange={handleCheckboxChange}
          >
            In-Progress
          </Checkbox>
          <Checkbox
            name="late"
            checked={status.late}
            onChange={handleCheckboxChange}
          >
            Late
          </Checkbox>
        </div></div>
      
      <BlocklyCanvasPanel
        activity={activity}
        lessonName={`${activity.lesson_module_name}, Activity ${activity.number}`}
        handleGoBack={handleGoBack}
        handleLogout={handleLogout}
        isStudent={true}
      />
    </div>
  );
  
}
