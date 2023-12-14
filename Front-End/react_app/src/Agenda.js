// Agenda.js

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import './Agenda.css'

let agendaId=0;
const Agenda = ({EventId}) => {
    const {id}= useParams();
    agendaId= id;
    console.log(agendaId);

  const [agendaItems, setAgendaItems] = useState([
    { id: 1,Eventid:1, time: '10:00 AM', description: 'Opening Ceremony' },
    { id: 2,Eventid:1, time: '11:00 AM', description: 'Panel Discussion' },
    // Add more initial agenda items as needed
  ]);

  const handleEdit = (id,updatedTime, updatedDescription) => {
    setAgendaItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item,time:updatedTime, description: updatedDescription } : item
      )
    );
  };

  const handleAdd = (newItem) => {
    setAgendaItems((prevItems) => [...prevItems, newItem]);
  };

  const handleRemove = (id) => {
    setAgendaItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item) => item.Eventid === agendaId?(
            <li key={item.id} className='List'>
                {item.time} - {item.description}
                <button onClick={() => handleEdit(item.id,prompt('Enter new time:', item.time), prompt('Enter new description:'))} className='Button'>
                Edit
                </button>
                <button onClick={() => handleRemove(item.id)} className='Button'>Remove</button>
            </li>
        ):'')}
      </ul>
      <button onClick={() => handleAdd({ id: Date.now(), time: '12:00 PM', description: 'New Item' })} className='Button'>
        Add Item
      </button>
    </div>
  );
};

export default Agenda;
