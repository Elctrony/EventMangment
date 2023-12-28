// Agenda.js

import React, { useState,useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import './Agenda.css'
import moment from "moment/moment";
import PopupForm from './AddAgenda'

import {useUser} from "./UserContext";;
let agendaId=0;
const Agenda = ({EventId}) => {
    const {id}= useParams();
    agendaId= id;
    console.log("From Agenda: "+agendaId);

    const [agendaItems, setAgendaItems] = useState([]);
    const [count,setCount] = useState(0);

    const {user,setUser} = useUser();
    const navigate =useNavigate();

    if(!user||!user.id){
        navigate('/login');
    }



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
    }, [EventId,count]);



  const handleRemove = (id) => {
    setAgendaItems((prevItems) => prevItems.filter((item) => item.sessionid !== id));
   // alert(`You want to delete Session: ${id}`);
    fetch('http://localhost:8080/delete-session',
        {
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({sessionid:id})
        });
  };

    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = (newItem) => {

        setPopupOpen(false);
        if(newItem===-1){
            return;
        }
        setCount(count+1);
    };


  return (
    <div>
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item) => (
            <li key={item.sessionid} className='List'>
                Start Time: {item.sttime} - Duration : {item.duration} Minutes - {item.description}
                {user.type===2?<button onClick={() => handleRemove(item.sessionid)} className='Button'>Remove</button>:<></>}
            </li>
        ))}
      </ul>
        {user.type===2?<button onClick={openPopup} className='Button'>
        Add Item
      </button>:<></>}
        <div>
            {isPopupOpen && <PopupForm eventId={agendaId} onClose={closePopup} />}
        </div>

    </div>
  );
};

export default Agenda;
