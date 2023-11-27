import React from 'react';

const MyCards = ({ programNumber, lessonNumber }) => {
  const programTitle = `Program ${programNumber} for Lesson ${lessonNumber}`;

  return (
    <div className="program">
      <div className="program-title">{programTitle}</div>
      <button className="edit-button">Edit</button>
      <button className="share-button">Share</button>
    </div>
  );
};

export default MyCards;
