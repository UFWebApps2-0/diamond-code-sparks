import {React, useEffect} from 'react';
import { Tabs } from 'antd';
import '../../../../Mentor/Classroom/Classroom.less';

import NavBar from '../../../../../components/NavBar/NavBar';
import Roster from './RosterAdmin';
import Home from '../../../../Mentor/Classroom/Home/Home';
import SavedWorkSpaceTab from '../../../../../components/Tabs/SavedWorkspaceTab';
import { useSearchParams, useParams } from 'react-router-dom';

const { TabPane } = Tabs;

export default function ClassroomAdmin({

}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();
  const tab = searchParams.get('tab');
  const viewing = searchParams.get('viewing');

  /*useEffect(() => {
    sessionStorage.setItem('classroomId', id);

  }, [id]);*/

  return (
    <div className='container nav-padding'>
      <NavBar/>
      <Tabs
        defaultActiveKey={tab ? tab : 'home'}
        onChange={(key) => setSearchParams({ tab: key })}
      >
        <TabPane tab='Roster' key='roster'>
          <Roster classroomId={id} />
        </TabPane>
      </Tabs>
    </div>
  );
}
