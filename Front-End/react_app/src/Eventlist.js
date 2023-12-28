import React from 'react';
import EventCard from './Eventcard';
import './Eventlist.css'
import {useState, useEffect} from "react";

import {useUser} from './UserContext'
import {useNavigate} from "react-router-dom";
import DeleteConfirmationModal from "./DeleteEvent";

let moment = require('moment');



let selectIndx=-1;
let selectId = -1;

const EventList = ({cardCallback}) => {
  const [eventList,setEventList] = useState([]);
  const { user, setUser } = useUser();
  const navigate =useNavigate();
  useEffect(() => {
    if(!user||!user.id){
      navigate('/login');
      return;
    }
    const fetchData = async () => {
      try {
        let url = `http://localhost:8080/events`;
        if(user.id){
          url = url+`/${user.id}`;
        }
        if(user.type){
          url=url+`?type=${user.type}`;
        }
        console.log(url);
        const response = await fetch(url);
        console.log(response);
        const data = await response.json();
        console.log(data);

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

  const handleAddEvent=()=>{
    navigate(`/add-event`)
  }

  const handleDelete=async (index,eventId)=>{
    if(eventId===-1){
      return;
    }

    console.log('EventId id: ',eventId);
    let body ={
      id:eventId
    };
    console.log(body);
    try{
      let respone = await fetch('http://localhost:8080/event',{
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(body)
      });
      console.log(respone);
      if(respone.status!==200){
        alert("There is an error in the request");
        return;
      }
    }catch (e) {
      console.log(e);
      alert("There is an error in the request");
      return;
    }
    const updatedEvents = [...eventList];
    updatedEvents.splice(index, 1);
    setEventList(updatedEvents);
  }


  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const closeDeleteModal = () => {
    console.log(selectIndx,'Cancel Event: ',selectId);
    selectIndx=-1;
    selectId=-1;
    setDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    // Call the handleDelete function passed as a prop
    console.log(selectIndx,'Confrim Event: ',selectId);
    handleDelete(selectIndx,selectId);
    selectIndx=-1;
    selectId=-1;
    setDeleteModalOpen(false);

  };

  const handleClick = (index,id)=>{
    console.log(index,"Clicked");
    selectIndx = index;
    selectId = id;
    setDeleteModalOpen(true);
  };

  return (
      <div className="event-list">

          {eventList.map((event,index) => (
              <div>
              <EventCard key={event.eventid} handleSelect={()=>handleClick(index,event.eventid)}   event={event}  />
              </div>
          ))}

        {user.type===1?<button className="add-event-button" onClick={handleAddEvent}>Add Event</button>:<></>}


      {isDeleteModalOpen?<DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onCancel={closeDeleteModal}
          onConfirm={confirmDelete}
      />:<></>}
  </div>
  );
};

export default EventList;
