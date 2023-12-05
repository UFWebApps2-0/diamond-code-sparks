import React from 'react';
import BlocklyPage from '../BlocklyPage/BlocklyPage';
import { useNavigate } from 'react-router-dom';


const MyCards = ({ programNumber, workspace }) => {
  const programTitle = `Activity ${programNumber}`;
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/sandbox'); // Navigate to BlocklyPage when button is clicked
  };

  const handleShareClick = () => {
    navigate('/student');
  };
  

  return (
    <div className="program">
      <div className="program-title">{programTitle}</div>
      <button onClick={handleEditClick} className="edit-button">Edit</button>
      <button onClick={handleShareClick} className="share-button">Share</button>
    </div>
  );
};

export default MyCards;
