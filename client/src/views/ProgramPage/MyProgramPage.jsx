import React from 'react';
import './Program_Page.less';
import ProgramPage from './Program_Page';
import NavBar from '../../components/NavBar/NavBar';

function MyProgramPage() {
  return (
    <div className="program_page" >
    <div className="flex-container">
        <div className="navbar">
        <NavBar />
        </div>
        <div className="react-component">
            <ProgramPage />
        </div>
    </div>
    </div>
  );
}

export default MyProgramPage;