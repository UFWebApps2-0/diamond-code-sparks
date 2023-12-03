import React from 'react';
import { Link } from 'react-router-dom';
import AddStudentsModal from '../../views/Mentor/Classroom/Roster/AddStudents/AddStudentsModal';
import './MentorSubHeader.less';
import Search from '../../../src/views/Mentor/Classroom/Roster/Search';

export default function MentorSubHeader(props) {
  const {
    title,
    addActivityActive,
    addUserActive,
    classroomId,
    cardViewActive,
    listViewActive,
    checkoutActive,
    setListView,
    addStudentsToTable,

    // New
    filterText,
    setFilterText,
    searchActive,

    // Group
    setGroupView,
    groupViewActive,
    studentViewActive,
  } = props;

  // Provides default props for the mentorsubheader if a value is not provided
  MentorSubHeader.defaultProps = {
    groupButtonActive: false,
    searchActive: false,
  }

  return (
    <div id='page-header'>
      <h1>{title}</h1>
      <span id='header-nav'>

        {/* Checks if search bar needs to be rendered */}
        {searchActive ? (
          <Search
            filterText={filterText}
            setFilterText={setFilterText}
          />
        ) : null}

        {/* New user story to create groups */}
        {groupViewActive ? (
          <span>
            <button onClick={() => setGroupView(false)}>
              View Roster
            </button>
          </span>
        ) : null}

        {studentViewActive ? (
          <button onClick={() => setGroupView(true)}>
            View Groups
          </button>
        ) : null}

        {addActivityActive && groupViewActive ? (
          <button id='link'>
            <i className='fa fa-plus-square' />
          </button>
        ) : null}

        {addUserActive && !groupViewActive ? (
          <AddStudentsModal
            addStudentsToTable={addStudentsToTable}
            classroomId={classroomId}
          />
        ) : null}

        {cardViewActive && !groupViewActive ? (
          <button onClick={() => setListView(false)} id='link'>
            <i className='fa fa-th' />
          </button>
        ) : null}

        {listViewActive && !groupViewActive ? (
          <button onClick={() => setListView(true)} id='link'>
            <i className='fa fa-list-alt' />
          </button>
        ) : null}

        {checkoutActive ? (
          <Link id='link' to={'/dashboard'}>
            <i className='fa fa-shopping-cart' />
          </Link>
        ) : null}
      </span>
    </div >
  );
}
