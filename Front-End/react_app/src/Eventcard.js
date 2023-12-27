import React, {useState} from 'react';

import './Eventcard.css';
import Agenda from './Agenda';

import { useNavigate  } from 'react-router-dom';
import DeleteConfirmationModal from "./DeleteEvent";




const EventCard = ({event, handleSelect}) => {
    const navigate = useNavigate ();


    const handleAgenda = () => {

        navigate(`/Agenda/${event.eventid}`)
    };

    const handleVenue=()=>{
        navigate(`/venue?eventid=${event.eventid}`)
    }
    const handleExpenses=()=>{
        navigate(`/expenses/${event.eventid}`);
    }
    const handleOrganizing=()=>{
        navigate(`/organizing?eventid=${event.eventid}`);
    }



  return (
      <div>
    <div className="event-card" /*onClick={handleClick}*/>
      <h3>{event.eventname}</h3>
        <p>{event.description}</p>
        {event.venue_name ? (
            <p>Venue: {event.venue_name}</p>
        ) : (
            <button className="select-venue-button" onClick={handleVenue}>
                Select Venue
            </button>
        )}
        <div></div>
        {event.organizing_team_name ? (
            <p>Organizing Team: {event.organizing_team_name}</p>
        ) : (
            <button className="select-venue-button" onClick={handleOrganizing}>
                Select Org Team
            </button>
        )}
         <p>Date: {event.date}</p>
        <div className="event-time">
            <p>{event.sttime}</p>
            <p>{event.endtime}</p>

        </div>
        <div className="event-time">
            <button className="go-agenda"  onClick={handleAgenda}>
                Agenda
            </button>
            <button className="go-expenses" onClick={handleExpenses}>
                Expenses
            </button>
            <button className="delete-button" onClick={handleSelect} >
                Delete
            </button>
        </div>

    </div>

    </div>
  );
};






export default EventCard;
