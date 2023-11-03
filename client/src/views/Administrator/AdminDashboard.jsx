import React, { useEffect, useState } from 'react';
import { getUser } from '../../Utils/AuthRequests';
import MentorSubHeader from '../../components/MentorSubHeader/MentorSubHeader';
import NavBar from '../../components/NavBar/NavBar';
import './adminDashboard.less'
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const userData = getUser();
  
  return (
    <div className='container nav-padding'>
    <NavBar/>
    <div id='main-header' className='centered'>Welcome {userData.username}</div>
    </div>
  );
}

export default AdminDashboard;

