import React from 'react';
import './DashBoard.css'; 
import { useNavigate  } from 'react-router-dom';





const Dashboard = () => {
    const navigate = useNavigate ();
  const handleButtonClick1 = () => {
    //console.log('Button 1');
    navigate(`/AddVenue`)
  };

  const handleButtonClick2 = () => {
    //console.log('Button 2');
    navigate(`/AddOrgTeam`)
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div className='button-container'>
      <button onClick={handleButtonClick1}>Add Venue</button>
      <button onClick={handleButtonClick2}>Add Organizing Team</button>
      </div>
    </div>
  );
};

export default Dashboard;
