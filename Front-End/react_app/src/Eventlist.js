import React from 'react';
//import { Link } from 'react-router-dom';
import EventCard from './Eventcard';
import './Eventlist.css'
import {useState, useEffect} from "react";
import {forEach} from "react-bootstrap/ElementChildren";
let moment = require('moment');


const eventsData = [
  { id: 1, name: 'Event 1', date: '2023-01-01',description:'Event about rocket science',venue:'Masrah el giza' ,sttime:'12:00PM',endtime:'8:00PM'},
  { id: 2, name: 'Event 2', date: '2023-02-01',description:'Event about rocket science',venue:'Masrah el giza' ,sttime:'12:00PM',endtime:'8:00PM' },
  { id: 3, name: 'Event 3', date: '2023-12-17' ,description:'Event about rocket science' ,venue:'Masrah el giza',sttime:'12:00PM',endtime:'8:00PM'},
  { id: 4, name: 'Event 4', date: '2024-1-6',description:'Event about rocket science' ,venue:'Masrah el giza' ,sttime:'12:00PM',endtime:'8:00PM'},
];



const EventList = ({cardCallback}) => {
  const [eventList,setEventList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/events');
        const data = await response.json();
        const events = JSON.parse(data);
        console.log(events);
        events.forEach(one=>{
          let myMoment = moment(one.date);
          one.date = myMoment.format('YYYY-MM-DD');
         // console.log(one.sttime);
          myMoment = moment(`1970-01-01T${one.sttime}`)
          one.sttime =  myMoment.format('HH:mm');
          myMoment = moment(`1970-01-01T${one.endtime}`)
          one.endtime =  myMoment.format('HH:mm');
        })
        //console.log(formattedDate);
        setEventList(events);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this useEffect runs only once after the initial render

  return (
    <div className = "Eventlist">
        {eventList.map((event) => (
          <EventCard  handleCallback={cardCallback} key={event.eventid} event={event}/>
        ))}
    </div>
  );
};

export default EventList;
