import React, { useState, useEffect } from 'react';

import './ProjectStatistics.css'
let moment = require('moment');
const EventTable = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {


        fetch('http://localhost:8080/dashboard/events-table').then(response => response.json()).then(data => {

            let eventData = data.eventTable;
            eventData.forEach(one=>{
                console.log(one);
                let myMoment = moment(one.date);
                one.date = myMoment.format('YYYY-MM-DD');
            })
            setEvents(eventData);

        });
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div className="project-statistics-container">
            <h2>Event Table</h2>
            <table>
                <thead>
                <tr>
                    <th>Event ID</th>
                    <th>Event Name</th>
                    <th>Event Date</th>
                    <th>Number of Attendees</th>
                </tr>
                </thead>
                <tbody>
                {events.map((event) => (
                    <tr key={event.eventid}>
                        <td>{event.eventid}</td>
                        <td>{event.eventname}</td>
                        <td>{event.date}</td>
                        <td>{event.attendee_count}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EventTable;
