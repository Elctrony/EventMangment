import React, {useState} from 'react';
import './ButtonContainer.css';
import {useNavigate} from "react-router-dom"; // You can create a CSS file for styling

const Dashboard = () => {
    const [selected, setSelected] = useState()

    const handleButtonClick = (label) => {
        // Handle button click based on the label
        console.log(`Button clicked: ${label}`);
        setSelected(label);

        // You can add logic to navigate to specific pages or perform other actions
    };
    const navigate = useNavigate();
    return (
        <div>
            <div className="button-container">
                <BigButton label="Add Venue" onClick={() => navigate('/add-venue')} />
                <BigButton label="Add Organizing Team" onClick={() => navigate('/add-organizer')} />
                <BigButton label="Add Speaker" onClick={() => handleButtonClick("Add Speaker")} />
                <BigButton label="Add Sponsor" onClick={() => handleButtonClick("Add Sponsor")} />
            </div>
            <p>Button clicked: {selected}</p>
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
