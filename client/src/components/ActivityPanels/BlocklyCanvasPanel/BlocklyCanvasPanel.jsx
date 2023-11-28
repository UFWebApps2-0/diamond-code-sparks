import React from 'react';
import PublicCanvas from './canvas/PublicCanvas';
import StudentCanvas from './canvas/StudentCanvas';
import MentorCanvas from './canvas/MentorCanvas';
import ContentCreatorCanvas from './canvas/ContentCreatorCanvas';
import { useGlobalState } from '../../../Utils/userState';

const BlocklyCanvasPanel = ({ activity, isSandbox, setActivity, toggleSplit }) => {
  const [value] = useGlobalState('currUser');

  const userRole = value.role;

  switch (userRole) {
    case 'DefaultUser':
      return <PublicCanvas activity={activity} isSandbox={isSandbox} />;
    case 'Student':
      return <StudentCanvas activity={activity} toggleSplit={toggleSplit} />;
    case 'Mentor':
      return <MentorCanvas
      activity={activity}
      setActivity={setActivity}
      isSandbox={isSandbox}
      isMentorActivity={!activity.selectedToolbox && !isSandbox}
      />;
    case 'ContentCreator':
      return (
        <ContentCreatorCanvas
          activity={activity}
          setActivity={setActivity}
          isSandbox={isSandbox}
          isMentorActivity={!activity.selectedToolbox && !isSandbox}
        />
      );
    default:
      return <div></div>;
  }
};

export default BlocklyCanvasPanel;
