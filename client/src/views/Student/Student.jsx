import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getStudentClassroom } from '../../Utils/requests';
import './Student.less';
import ShareProgram from './SharePrograms';

function Student() {
  const [learningStandard, setLessonModule] = useState({});
  const [view_activity, setActivity] = useState(false);
  const [view_class, setClass] = useState(false);
  const [view_other_lesson, setLesson] = useState(false);
  const [view_make_programs, setMakeProgram] = useState(false);
  const [view_my_programs, setPrograms] = useState(false);
  const [view_share, setShare] = useState(false);
  const [view_sharedFrom, setSharedFrom] = useState(false);
  const [view_Gallery, setGallery] = useState(false);
  const [view_menu, setMenu] = useState(true);
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
    fetchData();
  }, []);

  function viewActivities(status) {
    setActivity(status);
    setMenu(false);
  }

  function viewClass(status) {
    setClass(status);
    setMenu(false);
  }

  function viewOtherLesson(status) {
    setLesson(status);
    setMenu(false);
  }

  function viewMProgram(status) {
    setMakeProgram(status);
    setMenu(false);
    navigate('/sandbox');
  }

  function viewProgram(status) {
    setPrograms(status);
    setMenu(false);
    navigate('/program_page');
  }

  function viewShare(status) {
    setShare(status);
    setMenu(false);
  }

  function viewSharedF(status) {
    setSharedFrom(status);
    setMenu(false);
  }

  function viewGallery(status) {
    setGallery(status);
    setMenu(false);
  }

  const handleSelection = (activity) => {
    activity.lesson_module_name = learningStandard.name;
    localStorage.setItem('my-activity', JSON.stringify(activity));

    navigate('/workspace');
  };

  return (
    <div className='container nav-padding'>
      <NavBar />
      {view_menu && (
      <div>
        <div className='Welcome'>
          <h1 className="Hello">Hello, StudentName!</h1>
        </div>
        <div className='dbSection'>
          <div className="section_label">
            Class view
          </div>
          <div className="line"></div>
        </div>
        <div className="buttons1">
          <button id="DailyActivity" onClick={() => viewActivities(true)}>
            <i className='fa fa-calendar-check' style={{ marginRight: '10px' }}/>
            Daily Activity
          </button>
          <button id="Classroom" onClick={() => viewClass(true)}>
            <i className='fa fa-book' style={{ marginRight: '10px' }}/>
            Classroom
          </button>
          <button id="OtherLessons" onClick={() => viewOtherLesson(true)}>
            <i className='fa fa-bars' style={{ marginRight: '10px' }}/>
            Other Lessons
          </button>
        </div>
        <div className='dbSection'>
          <div className="section_label">
            Programs
          </div>
          <div className="line"></div>
        </div>
        <div className="buttons1">
          <button id="MakeNewProgram" onClick={() => viewMProgram(true)}>
            <i className='fas fa-plus' style={{ marginRight: '10px' }}/>
            Make New Program
          </button>
          <button id="MyPrograms" onClick={() => viewProgram(true)}>
            <i className="fa fa-layer-group" style={{ marginRight: '10px' }}/>
            My Programs
          </button>
        </div>
        <div className='buttons1'>
          <button id="shareProgram" onClick={() => viewShare(true)}>
            <i className='fa fa-paper-plane' style={{ marginRight: '10px' }}/>
            Share Program
          </button>
          <button id="sharedWithYou" onClick={() => viewSharedF(true)}>
            <i className='fa fa-envelope' style={{ marginRight: '10px' }}/>
            Shared With You
          </button>
          <button id="viewGallery" onClick={() => viewGallery(true)}>
            <i className='fa fa-globe' style={{ marginRight: '10px' }}/>
            View Gallery
          </button>
        </div>
      </div>
    )}
      {view_activity && (
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
      )}
      {/*add view class page*/}
      {view_class && (
      <div id='activity-container'>
        <div id='header'>
          <div>View Class</div>
        </div>
      </div>
      )}
      {/*add other lesson page*/}
      {view_other_lesson && (
      <div id='activity-container'>
        <div id='header'>
          <div>Other Lessons</div>
        </div>
      </div>
      )}
      {/*add other lesson page*/}
      {view_make_programs && (
      <div id='activity-container'>
        <div id='header'>
          <div>Make Program</div>
        </div>
      </div>
      )}
      {/*add My Programs Page*/}
      {view_my_programs && (
      <div id='activity-container'>
        <div id='header'>
          <div>My Programs</div>
        </div>
      </div>
      )}
      {/*add share page*/}
      {view_share && (
      <div id='activity-container'>
        <div id='header'>
          <div>Share Program</div>
        </div>
        <ShareProgram/>
      </div>
      )}
      {/*add shared with you page*/}
      {view_sharedFrom && (
      <div id='activity-container'>
        <div id='header'>
          <div>Shared Programs</div>
        </div>
      </div>
      )}
      {/* add View Gallery */}
      {view_Gallery && (
      <div id='activity-container'>
        <div id='header'>
          <div>Gallery</div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Student;
