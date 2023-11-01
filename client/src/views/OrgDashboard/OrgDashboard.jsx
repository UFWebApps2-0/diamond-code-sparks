import React, { useEffect, useState } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import './OrgDashboard.less'
import { useNavigate } from 'react-router-dom';

export default function OrgDashboard() {
	const [orgs, setOrgs] = useState([]);
	const navigate = useNavigate();

	const sampleOrg = {
		id: 1,
		name: "Org 1",
		school: {
			name: "School Name"
		},
		classrooms: [
			{id:1, name:"Class 1"},
			{id:2, name:"Class 2"}
		],
		teachers: [
			{id:1, name:"Teacher 1"}
		],
		students: [
			{id:1, name:"Student 1"},
			{id:2, name:"Student 2"},
			{id:3, name:"Student 3"}
		]
	}

	orgs.push(sampleOrg);
    
	return (
	    <div className='container nav-padding'>
	        <NavBar />
	        {/* Replace 'Admin' with username after admin accounts are created */}
	        <div id='main-header'>Welcome Admin</div>
	        <div id='page-header'>
	        	<h1>Your Organizations</h1>
	        </div>
	        <div id='orgs-container'>
	        	<div id='dashboard-card-container'>
	        		{orgs.map((org) => (
		        		<div key={org.id} id='dashboard-org-card'>
		        			<div id='card-left-content-container'>
		        				<h1 id='card-title'>{org.name}</h1>
		        				<p>{org.school.name}</p>
		        				<div id='card-button-container' className='flex flex-row'>
		        					<button onClick={() => alert("view")}>
		        						View
		        					</button>
		        				</div>
		        			</div>
		        			<div id='card-right-content-container'>
		        				<div id='number-container'>
		        					<h1 id='number'>{org.classrooms.length}</h1>
		        					<p id='label'>Classrooms</p>
		        				</div>
		        				<div id='divider' />
		        				<div id='number-container'>
		        					<h1 id='number'>{org.teachers.length}</h1>
		        					<p id='label'>Teachers</p>
		        				</div>
		        				<div id='divider' />
		        				<div id='number-container'>
		        					<h1 id='number'>{org.students.length}</h1>
		        					<p id='label'>Students</p>
		        				</div>
		        			</div>
		        		</div>
		        	))}
	        	</div>
	        	<input
	        		type='button'
	        		onClick={() => navigate('/createorg')}
	        		value='Create new organization'
	        	/>
	        </div>
	    </div>
    );
}