import React from 'react';
//import './Program_Page.less';

function ProgramPage() {
  return (
    <div className="my-programs">
      <div className="header">
        <button className="back-button">←</button>
        <h1>My Programs</h1>
        <div className="menu">menu ▾</div>
      </div>
      <div className="programs-list">
        <div className="program new-program">
          <div className="add-icon">+</div>
          <div>New Program</div>
        </div>
        <div className="program">
          <div className="program-title">Program 1</div>
          <button className="edit-button">edit</button>
          <button className="share-button">share</button>
        </div>
        <div className="program submitted">
          <div className="program-title">Program 2 for Lesson 3</div>
          <button className="edit-button">edit</button>
          <button className="share-button">share</button>
        </div>
        <div className="program">
          <div className="program-title">Program 3 for Lesson 2</div>
          <button className="edit-button">edit</button>
          <button className="share-button">share</button>
        </div>
      </div>
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
