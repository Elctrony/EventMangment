import React, {useState} from 'react';

import './Eventcard.css';
import Agenda from './Agenda';

import { useNavigate  } from 'react-router-dom';
import DeleteConfirmationModal from "./DeleteEvent";


import {useUser} from "./UserContext";

const EventCard = ({event, handleSelect}) => {
    const navigate = useNavigate ();
    const {user,setUser} = useUser();

    const handleAgenda = () => {

        navigate(`/Agenda/${event.eventid}`)
    };


    const handleOffer = ()=>{
        navigate(`/offer/${event.eventid}`);
    }
    const handleVenue=()=>{
        navigate(`/venue?eventid=${event.eventid}`)
    }
    const handleExpenses=()=>{
        navigate(`/expenses/${event.eventid}`);
    }
    const handleOrganizing=()=>{
        navigate(`/organizing?eventid=${event.eventid}`);
    }
    const handleRegistration=()=>{
        navigate(`/attendee/${event.eventid}`);
    }


  return (
      <div>
    <div className="event-card" /*onClick={handleClick}*/>
      <h3>{event.eventname}</h3>
        <p>{event.description}</p>
        { event.venue_name ? (
            <p>Venue: {event.venue_name}</p>
        ) : user.type===2?(
            <button className="select-venue-button" onClick={handleVenue}>
                Select Venue
            </button>
        ):<p>Venue is not selected yet</p>}
        <div></div>
        {
            user.type===1? event.organizing_team_name ? (
                <p>Organizing Team: {event.organizing_team_name}</p>
            ) : (
                <button className="select-venue-button" onClick={handleOrganizing}>
                    Select Organizing Team
                </button>
            ):<></>
        }
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
            <button className="go-agenda" onClick={handleRegistration}>
                Registration
            </button>
            <button className="go-agenda" onClick={handleOffer}>
                Sponsor Offers
            </button>
            {user.type===1?<button className="delete-button" onClick={handleSelect}>
                Delete
            </button>:<></>}
        </div>

    </div>

    </div>
  );
};






export default EventCard;
