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
  } = props;

  // Provides default props for the mentorsubheader if a value is not provided
  MentorSubHeader.defaultProps = {
    searchActive: false
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
        {addActivityActive ? (
          <button id='link'>
            <i className='fa fa-plus-square' />
          </button>
        ) : null}
        {addUserActive ? (
          <AddStudentsModal
            addStudentsToTable={addStudentsToTable}
            classroomId={classroomId}
          />
        ) : null}

        {/* Add Search filter here? */}
        {cardViewActive ? (
          <button onClick={() => setListView(false)} id='link'>
            <i className='fa fa-th' />
          </button>
          // What is the use of this class name?
        ) : null}
        {listViewActive ? (
          <button onClick={() => setListView(true)} id='link'>
            <i className='fa fa-list-alt' />
          </button>
        ) : null}
        {checkoutActive ? (
          <Link id='link' to={'/dashboard'}>
            <i className='fa fa-shopping-cart' />
          </Link>
        ) : null}

        {/* Add a searchViewActive check */}
      </span>
    </div>
  );
}
