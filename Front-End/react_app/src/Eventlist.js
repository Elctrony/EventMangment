import React from 'react';
//import { Link } from 'react-router-dom';
import EventCard from './Eventcard';
import './Eventlist.css'

const eventsData = [
  { id: 1, name: 'Event 1', date: '2023-01-01',description:'Event about rocket science',venue:'Masrah el giza' ,sttime:'12:00PM',endtime:'8:00PM'},
  { id: 2, name: 'Event 2', date: '2023-02-01',description:'Event about rocket science',venue:'Masrah el giza' ,sttime:'12:00PM',endtime:'8:00PM' },
  { id: 3, name: 'Event 3', date: '2023-12-17' ,description:'Event about rocket science' ,venue:'Masrah el giza',sttime:'12:00PM',endtime:'8:00PM'},
  { id: 4, name: 'Event 4', date: '2024-1-6',description:'Event about rocket science' ,venue:'Masrah el giza' ,sttime:'12:00PM',endtime:'8:00PM'},
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
