import React, { useEffect, useState } from 'react';
import './Discussions.less';
import {
  getClassroom,
  getLessonModule,
  getLessonModuleDiscussions,
  createDiscussion,
} from '../../../../Utils/requests';
import MentorSubHeader from '../../../../components/MentorSubHeader/MentorSubHeader';
import CreateDiscussionModal from './CreateDiscussionModal';
import MentorDiscussionDetailModal from './MentorDiscussionDetailModal';
import MentorActivityDetailModal from '../Home/MentorActivityDetailModal';
// import LessonModuleModal from './LessonModuleSelect/LessonModuleModal';
import LessonModuleModal from '../Home/LessonModuleSelect/LessonModuleModal';
import { message, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Discussions({ classroomId, viewing }) {
  const [classroom, setClassroom] = useState({});
  const [activities, setActivities] = useState([]);
//   above will be replaced w below
  const [discussions, setDiscussions] = useState([]);
  const [gradeId, setGradeId] = useState(null);
  const [activeLessonModule, setActiveLessonModule] = useState(null);
  const [activityDetailsVisible, setActivityDetailsVisible] = useState(false)
  const [discussionDetailsVisible, setDiscussionDetailsVisible] = useState(false)
  const navigate = useNavigate();

  const SCIENCE = 1;
  const MAKING = 2;
  const COMPUTATION = 3;

  useEffect(() => { // if the classroom id changes, get the new classroom info
    const fetchData = async () => {
      const res = await getClassroom(classroomId);
      if (res.data) {
        const classroom = res.data;
        setClassroom(classroom);
        setGradeId(classroom.grade.id);
        classroom.selections.forEach(async (selection) => {
          if (selection.current) {
            const lsRes = await getLessonModule(
              selection.lesson_module
            );
            if (lsRes.data) setActiveLessonModule(lsRes.data);
            else {
              message.error(lsRes.err);
            }
            const discRes = await getLessonModuleDiscussions(lsRes.data.id);
            if (discRes) setDiscussions(discRes.data);
            else { message.error(discRes.err); }
          }
        });
      } else {
        message.error(res.err);
      }
    };
    fetchData();
  }, [classroomId]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const color = [
    'magenta',
    'purple',
    'green',
    'cyan',
    'red',
    'geekblue',
    'volcano',
    'blue',
    'orange',
    'gold',
    'lime',
  ];

  const addDiscussion = async (title, description, dueDate) => {
    const res = await createDiscussion(title, description, activeLessonModule.id);
    if (res.err) {message.error(res.err)}
    setDiscussions([...discussions, res.data]);
  }

  return (
    <div>
      {/* return home */}
      <button id='home-back-btn' onClick={handleBack}>
        <i className='fa fa-arrow-left' aria-hidden='true' />
      </button>
      {/* make new discussion button */}
      <CreateDiscussionModal onCreate={addDiscussion}/>
      <MentorSubHeader title={classroom.name}></MentorSubHeader>
      <div id='home-content-container'> {/* container for the whole page */}
        <div id='active-lesson-module'> {/* container for the currently selected lesson module */}
          {activeLessonModule ? (
            <div>
              <div id='active-lesson-module-title-container'>
                <h3>{`Learning Standard - ${activeLessonModule.name}`}</h3> 
                <LessonModuleModal ///////////// button to change the lesson module
                  setActiveLessonModule={setActiveLessonModule}
                  classroomId={classroomId}
                  gradeId={gradeId}
                  viewing={viewing}
                  setActivities={setDiscussions}
                  // setActivities={setActivities}
                  // setDiscussions={setDiscussions}
                />
              </div>
              <p id='lesson-module-expectations'>{`Expectations: ${activeLessonModule.expectations}`}</p>
             {activeLessonModule.link ? ( // if there is a link to additional resources, display it
                <p>
                  Addtional resources to the lesson:{' '}
                  <a
                    href={activeLessonModule.link}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {activeLessonModule.link}
                  </a>
                </p>
              ) : null}
              {discussions ? ( // display the discussions for this lesson module
                <div id='card-btn-container' className='flex space-between'>
                  {discussions.map((discussion) => ( // map through each discussion in discussions
                    <div id="view-discussion-card" key={discussion.id}>
                      <div id='discussion-title'>
                       {discussion.Title} {/* title each card w a discussion topic */}
                       </div>
                      <div id='view-discussion-heading' style={{display: "flex"}}>
                        <MentorDiscussionDetailModal ///////////// button for mentor to view the discussion details
                          learningStandard={activeLessonModule}
                          selectDiscussion={discussion}
                          activityDetailsVisible={false}
                          setActivityDetailsVisible={false}
                          setDiscussions={setDiscussions}
                          viewing={false}
                        />
                      </div>
                      <div id='view-discussion-info'> {/* display the discussion info */}
                        <p>
                          <strong>Description: </strong>
                          {discussion.Description}
                        </p>
                        {discussion.link ? (
                          <p>
                            <strong>Link to Additional Information: </strong>
                            <a href={discussion.link} target='_blank' rel='noreferrer'>
                              {discussion.link}
                            </a>
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : ( 
            // if there is no active lesson module, display this message
            <div> 
              <p>There is currently no active lesson set.</p>
              <p>Click the button below to browse available lessons.</p>
              <LessonModuleModal
                setActiveLessonModule={setActiveLessonModule}
                classroomId={classroomId}
                gradeId={gradeId}
                viewing={viewing}
                setActivities={setActivities}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
