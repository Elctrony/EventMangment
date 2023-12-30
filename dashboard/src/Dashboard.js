import React, {useState} from 'react';
import './ButtonContainer.css';
import {useNavigate} from "react-router-dom";
import ProjectStatistics from "./ProjectStatistics";
import EventTable from "./EventTable";
import OrganizerTable from "./OrganizerTable"; // You can create a CSS file for styling

const Dashboard = () => {


    const navigate = useNavigate();
    return (
        <div>
            <div className="button-container">
                <BigButton label="Add Venue" onClick={() => navigate('/add-venue')} />
                <BigButton label="Add Organizing Team" onClick={() => navigate('/add-organizer')} />
                <BigButton label="Add Speaker" onClick={() => navigate('/add-speaker')} />
                <BigButton label="Add Sponsor" onClick={() => navigate('/add-sponsor')} />
                <BigButton label="Select Venue" onClick={() => navigate('/venues')} />
                <BigButton label="Select Organizing Team" onClick={() =>  navigate('/organinzers')} />
                <BigButton label="Select Speakers" onClick={() => navigate('/speakers')} />
                <BigButton label="Select Sponsors" onClick={() =>  navigate('/sponsors')} />
            </div>

            <div></div>
            <ProjectStatistics/>
            <div></div>
            <EventTable/>
            <div></div>
            <OrganizerTable/>
        </div>

    );
};

const BigButton = ({ label, onClick }) => {
    return (
        <button className="big-button" onClick={onClick}>
            {label}
        </button>

    );
};

export default Dashboard;
