import React from 'react';
//import { Link } from 'react-router-dom';
import EventCard from './Eventcard';
import './Eventlist.css'

const eventsData = [
  { id: 1, name: 'Event 1', date: '2023-01-01' },
  { id: 2, name: 'Event 2', date: '2023-02-01' },
  { id: 3, name: 'Event 3', date: '2023-12-17' },
  { id: 4, name: 'Event 4', date: '2024-1-6' },
];



const EventList = ({cardCallback}) => {
  return (
    <div className = "Eventlist">
        {eventsData.map((event) => (
          <EventCard  handleCallback={cardCallback} key={event.id} event={event}/>
        ))}
    </div>
  );
};

export default EventList;
