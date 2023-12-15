import React from 'react';
import './Eventcard.css';
import Agenda from './Agenda';

import { useNavigate  } from 'react-router-dom';


const EventCard = ({event, handleCallback}) => {
    const navigate = useNavigate ();

    const handleClick = () => {
        if(handleCallback){
            handleCallback();
            return
        }
        navigate(`/Agenda/${event.id}`)
    };


  return (
    <button className="event-card" onClick={handleClick}>
      <h3>{event.name}</h3>
      <p>Date: {event.date}</p>
    </button>
  );
};

export default EventCard;
