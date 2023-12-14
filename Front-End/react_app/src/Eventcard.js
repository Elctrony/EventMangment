import React from 'react';
import './Eventcard.css';
import Agenda from './Agenda';




const EventCard = ({ event }) => {
  const handleClick = () => {
    const x = event.id; 
    console.log({x});
    
  };
  return (
    <button className="event-card" onClick={handleClick}>
      <h3>{event.name}</h3>
      <p>Date: {event.date}</p>
    </button>
  );
};

export default EventCard;
