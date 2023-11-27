import {React, useEffect} from 'react';
import { Tabs } from 'antd';
import '../../Mentor/Classroom/Classroom.less';

import NavBar from '../../../components/NavBar/NavBar';
import Roster from './RosterAdmin';
import Home from '../../Mentor/Classroom/Home/Home';
import SavedWorkSpaceTab from '../../../components/Tabs/SavedWorkspaceTab';
import { useSearchParams, useLocation, useParams } from 'react-router-dom';

const { TabPane, classroomName} = Tabs;

export default function ClassroomAdmin(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();
  const tab = searchParams.get('tab');
  const viewing = searchParams.get('viewing');
  const location = useLocation();
  const { value } = location.state || {};
  const { classroomName } = location.state || {};
  const { teacherID } = location.state || {};

  return (
    <div className='container nav-padding'>
      
      <NavBar/>
      <Tabs
        defaultActiveKey={tab ? tab : 'home'}
        onChange={(key) => setSearchParams({ tab: key })}
      >
        <TabPane tab='Roster' key='roster'>
          <Roster classroomId={id} value={value} teacherID={teacherID}/>
        </TabPane>
      </Tabs>
    </div>
  );
}
