import React, { useState, useEffect } from 'react';
import './AttendeeList.css';
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "./UserContext";

const AttendeeList = () => {
    // State for managing the list of attendees
    const [attendees, setAttendees] = useState([]);
    const [count, setCount] = useState(0)

    const {user,setUser} = useUser();
    const navigate =useNavigate();

    if(!user||!user.id){
        navigate('/login');
    }
    // State for managing form visibility
    const [isFormVisible, setFormVisibility] = useState(false);

    // State for managing form data
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        phone: '',
        email: '',
    });

    const {id}= useParams();
    let eventID = parseInt(id);
    console.log("From Attendees: "+eventID);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/attendees/${eventID}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                const attendees = JSON.parse(data);
                setAttendees(attendees);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [eventID,count]); // Empty dependency array ensures that the effect runs only once when the component mounts

    const toggleFormVisibility = () => {
        setFormVisibility(!isFormVisible);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new attendee object with a unique ID
        const newAttendee = {
            fname: formData.fname,
            lname: formData.lname,
            phone: formData.phone,
            email: formData.email,
            eventid: eventID
        };

        let respone = await fetch('http://localhost:8080/add-attendee',
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAttendee)
            })
        if(respone.status!==201){
            alert('There is an error in the request');
            return;
        }
        let result = await respone.json();
        console.log(result);
        let attendee = result.attendee

        // Update the attendees list with the new attendee
        setAttendees([...attendees, attendee]);

        // Reset the form fields
        setFormData({
            fname: '',
            lname: '',
            phone: '',
            email: '',
        });

        // Reset the form visibility
        setFormVisibility(false);
    };

    const handleClose = () => {
        setFormVisibility(false);
    };

    const handleDelete =async (id) => {
        // Filter out the attendee with the specified ID
        const updatedAttendees = attendees.filter((attendee) => attendee.id !== id);
        console.log("DELETE Attendee ",id)
       let respone = await fetch('http://localhost:8080/attendee',{
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "attendeeid":id
            })
        })
        if(respone.status!==200){
            alert("There is a problem in this request");
            return;
        }
        setAttendees(updatedAttendees);
    };

    return (
        <div className="attendee-list-container">
            <h2>Attendees List</h2>
            {user.type===2? <button onClick={toggleFormVisibility} className="add-attendee-button">
                Add Attendee
            </button>:<></>}

            {isFormVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={toggleFormVisibility}>
                            &times;
                        </span>
                        <h3>Attendee Registration</h3>
                        <form onSubmit={handleSubmit} className="attendee-form">
                            <label>
                                First Name:
                                <input type="text" name="fname" value={formData.fname} onChange={handleChange} required />
                            </label>
                            <label>
                                Last Name:
                                <input type="text" name="lname" value={formData.lname} onChange={handleChange} required />
                            </label>
                            <label>
                                Phone:
                                <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                            </label>
                            <label>
                                Email:
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </label>
                            <button type="submit" className="submit-button">
                                Submit
                            </button>
                            <button type="button" className="close-modal-button" onClick={handleClose}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <ul className="attendee-list">
                {attendees.map((attendee) => (
                    <li key={attendee.id} className="attendee-item">
                        <div className="attendee-info">
                            <strong>Name:</strong> {attendee.fname} {attendee.lname} <br />
                            <strong>Phone:</strong> {attendee.phone} <br />
                            <strong>Email:</strong> {attendee.email}
                        </div>
                        {user.type===2? <button onClick={() => handleDelete(attendee.id)} className="delete-button">
                            Delete
                        </button>:<></>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AttendeeList;
