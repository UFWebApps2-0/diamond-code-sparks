import React from 'react';
import MyCards from './MyCards';
//import './Program_Page.less';

function ProgramPage() {
  return (
    <div className="my-programs">
      <div className="header">
        <button className="back-button"></button>
        <h1>My Programs</h1>
        <div className="menu"></div>
      </div>
      <div className="programs-list">
        <div className="program new-program">
          <div className="add-icon">+</div>
          <div>New Program</div>
        </div>
        <MyCards programNumber={1} lessonNumber={2}/>
        <MyCards programNumber={2} lessonNumber={3}/>
        <MyCards programNumber={3} lessonNumber={2}/>
      </div>
      {/* gonna change class name to footer */}
      <div className="footer">
        <div className="footer-title">People you've worked with on Lesson 2</div>
        {/* Placeholder for user icons */}
        <div className="user-icons">
          {/* Icons would be rendered here */}
        </div>
      </div>
    </div>
  );
}

export default ProgramPage;
