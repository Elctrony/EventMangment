import React, { useEffect, useState } from 'react';
import './EventManager.css';

import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import './Eventlist.css';
import './SignupForm.css';

const EventManager = () => {
    const { user, setUser } = useUser();
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

    // State to manage form errors
    const [errors, setErrors] = useState({});

    // Event handler for input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData({
            ...eventData,
            [name]: value,
        });
    };

    // Event handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form fields
        const validationErrors = validateForm(eventData);
        setErrors(validationErrors);

        // If there are validation errors, prevent form submission
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        // Add your logic to handle form submission
        console.log('Form submitted with data:', eventData);

        let event={
            id:user.id,
            name:eventData.eventName,
            description: eventData.eventDescription,
            date: eventData.date,
            sttime: eventData.startTime,
            endtime: eventData.endTime
        };

        let response= await fetch('http://localhost:8080/add-event',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event)
        });
        console.log(response);
        navigate('/');
        // Reset form fields and errors after submission
        setEventData({
            eventName: '',
            eventDescription: '',
            date: '',
            startTime: '',
            endTime: '',
        });
        setErrors({});
    };

    // Validation function for the form fields
    const validateForm = (data) => {
        let errors = {};

        if (!data.eventName.trim()) {
            errors.eventName = 'Event Name is required';
        }

        if (!data.eventDescription.trim()) {
            errors.eventDescription = 'Event Description is required';
        }

        if (!data.date) {
            errors.date = 'Date is required';
        }

        if (!data.startTime) {
            errors.startTime = 'Start Time is required';
        }

        if (!data.endTime) {
            errors.endTime = 'End Time is required';
        }

        return errors;
    };

    return (
        <div className="event-form">
            <h1>Event Manager</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-line">
                    <label>
                        Event Name:
                        <input
                            type="text"
                            name="eventName"
                            value={eventData.eventName}
                            onChange={handleInputChange}
                            className="input-box"
                        />
                        {errors.eventName && <p className="error-message">{errors.eventName}</p>}
                    </label>
                </div>

                <div className="form-line">
                    <label>
                        Event Description:
                        <input
                            type="text"
                            name="eventDescription"
                            value={eventData.eventDescription}
                            onChange={handleInputChange}
                            className="input-box"
                        />
                        {errors.eventDescription && <p className="error-message">{errors.eventDescription}</p>}
                    </label>
                </div>

                <div className="form-line">
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={eventData.date}
                            onChange={handleInputChange}
                            className="input-box"
                        />
                        {errors.date && <p className="error-message">{errors.date}</p>}
                    </label>
                </div>

                <div className="time">
                    <label>
                        Start Time:
                        <input
                            type="time"
                            name="startTime"
                            value={eventData.startTime}
                            onChange={handleInputChange}
                            className="input-box"
                        />
                        {errors.startTime && <p className="error-message">{errors.startTime}</p>}
                    </label>

                    <label>
                        End Time:
                        <input
                            type="time"
                            name="endTime"
                            value={eventData.endTime}
                            onChange={handleInputChange}
                            className="input-box"
                        />
                        {errors.endTime && <p className="error-message">{errors.endTime}</p>}
                    </label>
                </div>

                <button type="submit" className="submit-button">
                    Add Event
                </button>
            </form>
        </div>
    );
};

export default EventManager;
