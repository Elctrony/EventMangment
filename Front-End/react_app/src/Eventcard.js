import React from 'react';
import './Eventcard.css';
import Agenda from './Agenda';

import { useNavigate  } from 'react-router-dom';


const EventCard = ({event, handleCallback}) => {
    const navigate = useNavigate ();

    const handleClick = () => {
        if(handleCallback){
            handleCallback(event.eventid);
            return
        }
        navigate(`/Agenda/${event.eventid}`)
    };


  return (
    <button className="event-card" onClick={handleClick}>
      <h3>{event.eventname}</h3>
        <p>{event.description}</p>
        <p>{event.name}</p>
      <p>Date: {event.date}</p>
        <div className="event-time">
            <p>{event.sttime}</p>
            <p>{event.endtime}</p>

        </div>
    </button>
  );
};

export default EventCard;
