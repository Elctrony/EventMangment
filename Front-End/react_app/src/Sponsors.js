import React, { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import EventCard from './Eventcard';
import Offer from './Offer';
import EventList from './Eventlist';




const TestCall = () => {
  
  }  

  const Sponsors = () => {
    const navigate = useNavigate ();
    const handleCallback = (SponsEventid) => {
      navigate(`/Offer/${SponsEventid}`)
    }
    return (
      <div className = "Spons">
          <EventList cardCallback={handleCallback}/>
      </div>
    );
  };
  
  export default Sponsors;
