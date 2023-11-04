import React, { useEffect, useState } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import './OrgDashboard.less';
import { useNavigate } from 'react-router-dom';

export default function OrgDashboard() {
	const [orgs, setOrgs] = useState([]);
	const navigate = useNavigate();
	const [isFlipped, setFlipped] = useState(new Set());

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

	const sampleOrg2 = {
		id: 2,
		name: "Org 2",
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

	useEffect(() => {
		let sampleOrgs = [];
		sampleOrgs.push(sampleOrg);
		sampleOrgs.push(sampleOrg2);
		setOrgs(sampleOrgs);
	}, []);

	const handleFlip = (id) => {
		// handleFlip code so that cards flip individually rather than all at the same time from 
		// https://stackoverflow.com/questions/71720642/flipping-multiple-cards-in-react-functional-component

    	return (e) => {
    		e.preventDefault();
    		let flipped = new Set(isFlipped)
    		if (flipped.has(id)) {
      			flipped.delete(id)
      		} else {
        	 	flipped.add(id)
      		}
      		setFlipped(flipped)
    	}
	}

	const handleEditOrg = () => {
		event.preventDefault();
		alert('submitted');
	}
    
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
		        		<div key={org.id} id='dashboard-org-card' className={isFlipped.has(org.id) ? "flipped" : ""}>
		        			<div className="org-card-front">
				        		<button id='edit-org-btn' onClick={handleFlip(org.id)}>
									<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
									    <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
									</svg>
								</button>
			        			<div id='card-top-content-container'>
				        			<h1 id='card-title'>{org.name}</h1>
				        			<p>{org.classrooms.length} classrooms, {org.teachers.length} teachers, {org.students.length} students</p>
				        		</div>
				        		<div id='card-bottom-content-container'>
				        			<button className='manage-btn'>
				        				<p>Manage Classrooms</p>
				        			</button>
				        			<div className='divider' />
				        			<button className='manage-btn'>
				        				<p>Manage Galleries</p>
				        			</button>
				        			<div className='divider' />
				        			<button className='manage-btn'>
				        				<p>Manage Accounts</p>
				        			</button>
				        		</div>
				        	</div>
				        	<div className="org-card-back">
				        		<button id='card-back-btn' onClick={handleFlip(org.id)}>
        							<i className='fa fa-arrow-left' aria-hidden='true' />
     							</button>
     							<div id='card-top-content-container'>
     								<form onSubmit={handleEditOrg}>
     									<label>Edit Organization Name:</label>
     									<input
     										type='text'
     										placeholder={org.name}
     									/>
     									<button type='submit' className='manage-btn save-btn'>Save Changes</button>
     								</form>
     								<div className='divider' />
     								<button className='manage-btn warning-btn'>Delete Organization</button>
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