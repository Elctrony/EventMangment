import React, {useEffect, useState} from 'react';
import './EventManager.css'

import {useUser} from "./UserContext";
import {useNavigate} from "react-router-dom";
import './Eventlist.css'
import './SignupForm.css'
const EventManager = () => {

  const {user,setUser} = useUser();
  const navigate = useNavigate();
  console.log(user);
    useEffect(() => {
        if(!user||!user.id){
            navigate('/login');
        }
    }, []);


        // State to manage form fields
        const [eventData, setEventData] = useState({
            eventName: '',
            eventDescription: '',
            date: '',
            startTime: '',
            endTime: '',
        });

        // Event handler for input changes
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setEventData({
                ...eventData,
                [name]: value,
            });
        };

        // Event handler for form submission
        const handleSubmit = (e) => {
            e.preventDefault();
            // Add your logic to handle form submission
            console.log('Form submitted with data:', eventData);
            // Reset form fields after submission
            setEventData({
                eventName: '',
                eventDescription: '',
                date: '',
                startTime: '',
                endTime: '',
            });
        };

        return (
            <div className="event-form">
                <h1>Event Manager</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-line'>
                        <label>
                            Event Name:
                            <input
                                type="text"
                                name="eventName"
                                value={eventData.eventName}
                                onChange={handleInputChange}
                                className='input-box'
                            />
                        </label>
                    </div>

                    <div className='form-line'>
                        <label>
                            Event Description:
                            <input
                                type="text"
                                name="eventDescription"
                                value={eventData.eventDescription}
                                onChange={handleInputChange}
                                className='input-box'
                            />
                        </label>
                    </div>

                    <div className='form-line'>
                        <label>
                            Date:
                            <input
                                type="date"
                                name="date"
                                value={eventData.date}
                                onChange={handleInputChange}
                                className='input-box'
                            />
                        </label>
                    </div>

                    <div className='time'>
                        <label>
                            Start Time:
                            <input
                                type="time"
                                name="startTime"
                                value={eventData.startTime}
                                onChange={handleInputChange}
                                className='input-box'
                            />
                        </label>

                        <label>
                            End Time:
                            <input
                                type="time"
                                name="endTime"
                                value={eventData.endTime}
                                onChange={handleInputChange}
                                className='input-box'
                            />
                        </label>
                    </div>

                    <button type="submit" className="submit-button">Add Event</button>
                </form>
            </div>
        );
    };


export default EventManager;
