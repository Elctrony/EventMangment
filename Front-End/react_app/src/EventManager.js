import React, { useState } from 'react';
import './EventManager.css'

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    date: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleAddEvent = () => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setNewEvent({ name: '', description: '', date: '' });
  };

  return (
    <div>
      <h1>Event Manager</h1>
      <div className='Line'>
        <label>
          Event Name:
          <input
            type="text"
            name="name"
            value={newEvent.name}
            onChange={handleInputChange}
            className='box'
          />
        </label>
      </div>
      <div className='Line'>
        <label>
          Event Description:
          <input
            type="text"
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            className='box'
          />
        </label>
      </div>
      <div className='Line'>
        <label>
          Event Date:
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
            className='box'
          />
        </label>
      </div>
      <button onClick={handleAddEvent} style={{borderRadius:'1em'}}>Add Event</button>
      <div>
        <h2>Events:</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <strong>{event.name}</strong>
              <p>{event.description}</p>
              <p>{event.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventManager;
