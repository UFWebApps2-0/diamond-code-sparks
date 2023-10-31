import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import './OrgDashboard.less'
import { useNavigate } from 'react-router-dom';

export default function CreateOrg() {
    return (
	    <div className='container nav-padding'>
	        <NavBar />
	    </div>
    );
}