// Agenda.js

import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './Agenda.css'
import moment from "moment/moment";

let agendaId=0;
const Agenda = ({EventId}) => {
    const {id}= useParams();
    agendaId= id;
    console.log("From Agenda: "+agendaId);

  const [agendaItems, setAgendaItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/agenda/${agendaId}`);
                const agendaJson = await response.json();
                const agenda = JSON.parse(agendaJson);
                console.log(agenda);
                agenda.forEach(one=>{
                    let myMoment = moment(`1970-01-01T${one.sttime}`)
                    one.sttime =  myMoment.format('HH:mm');

                })
                setAgendaItems(agenda);
            } catch (error) {
                console.error('Error fetching agenda:', error);
            }
        };

        fetchData();
    }, [agendaId]);
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
        {agendaItems.map((item) => (
            <li key={item.id} className='List'>
                Start Time: {item.sttime} - Duration : {item.duration} Minutes - {item.description}
                <button onClick={() => handleEdit(item.id,prompt('Enter new time:', item.sttime), prompt('Enter new description:',item.description))} className='Button'>
                Edit
                </button>
                <button onClick={() => handleRemove(item.id)} className='Button'>Remove</button>
            </li>
        ))}
      </ul>
      <button onClick={() => handleAdd({ id: Date.now(), time: '12:00 PM', description: 'New Item' })} className='Button'>
        Add Item
      </button>
    </div>
  );
};

export default Agenda;
