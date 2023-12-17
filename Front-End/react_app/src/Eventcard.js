import React from 'react';
import './Eventcard.css';
import Agenda from './Agenda';

import { useNavigate  } from 'react-router-dom';


const EventCard = ({event, handleCallback}) => {
    const navigate = useNavigate ();

    const handleClick = () => {
        if(handleCallback){
            handleCallback(event.id);
            return
        }
        navigate(`/Agenda/${event.id}`)
    };


  return (
    <button className="event-card" onClick={handleClick}>
      <h3>{event.name}</h3>
        <p>{event.description}</p>
        <p>{event.venue}</p>
      <p>Date: {event.date}</p>
        <div className="time">
            <p>{event.sttime}</p>
            <p>{event.endtime}</p>

        </div>
    </button>
  );
};

export default EventCard;
