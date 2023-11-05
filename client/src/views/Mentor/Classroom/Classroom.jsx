import {React, useEffect} from 'react';
import { Tabs } from 'antd';
import './Classroom.less';
import NavBar from '../../../components/NavBar/NavBar';
import Roster from './Roster/Roster';
import Home from './Home/Home';
import SavedWorkSpaceTab from '../../../components/Tabs/SavedWorkspaceTab';
import { useSearchParams, useParams } from 'react-router-dom';
import { AssessmentButton } from '../../Assessments/AssessmentButton';
const { TabPane } = Tabs;
const name ="assessment1";
const questionSet = {
  setID: 123, // Add an overarching ID for the entire set
  questions: {
    question1: {
      id: 1,
      question: "Here is a question?",
      answer: ["This is the answer", "secanswer"],
      type: "multiple choice",
    },
    question2: {
      id: 2,
      question: "What is the blank",
      type: "free response",
    },
  },
};

export default function Classroom({
  handleLogout,
  selectedActivity,
  setSelectedActivity,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();
  const tab = searchParams.get('tab');
  const viewing = searchParams.get('viewing');

  useEffect(() => {
    sessionStorage.setItem('classroomId', id);

  }, [id]);

  return (
    <div className='container nav-padding'>
      <NavBar isMentor={true} />
      <Tabs
        defaultActiveKey={tab ? tab : 'home'}
        onChange={(key) => setSearchParams({ tab: key })}
      >
        <TabPane tab='Home' key='home'>
          <Home
            classroomId={parseInt(id)}
            selectedActivity={selectedActivity}
            setSelectedActivity={setSelectedActivity}
            viewing={viewing}
          />
        </TabPane>
        <TabPane tab='Roster' key='roster'>
          <Roster handleLogout={handleLogout} classroomId={id} />
        </TabPane>
        <TabPane tab='Saved Workspaces' key='workspace'>
          <SavedWorkSpaceTab
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            classroomId={id}
          />
        </TabPane>
        <TabPane tab="Assessments" key="assessment">
          <AssessmentButton
          assessmentName= {name}
          questions= {questionSet}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}
