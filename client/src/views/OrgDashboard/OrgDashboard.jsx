import React from 'react';
import Logo from "../../assets/casmm_logo.png";
import NavBar from "../../components/NavBar/NavBar";
import './OrgDashboard.less'
import { useNavigate } from 'react-router-dom';

export default function OrgDashboard() {
	const navigate = useNavigate();
    
	return (
	    <div className='container nav-padding'>
	        <NavBar />
	        {/* Replace 'Admin' with username after admin accounts are created */}
	        <div id='main-header'>Welcome Admin</div>
	        <div id='page-header'>
	        	<h1>Your Organizations</h1>
	        </div>
	        <div id='orgs-container'>
	        	<p>[Orgs will go here]</p>
	        	<input
	        		type='button'
	        		onClick={() => navigate('/createorg')}
	        		value='Create new organization'
	        	/>
	        </div>
	    </div>
    );
}