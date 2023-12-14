import React from 'react';
import './Eventcard.css';
import Agenda from './Agenda';

import { useNavigate  } from 'react-router-dom';


const EventCard = ({ event }) => {
    const navigate = useNavigate ();

    const handleClick = () => {
    const x = event.id; 
    console.log({x});
    navigate(`/Agenda/${x}`);

    
  };
  return (
    <button className="event-card" onClick={handleClick}>
      <h3>{event.name}</h3>
      <p>Date: {event.date}</p>
    </button>
  );
};

export default EventCard;
