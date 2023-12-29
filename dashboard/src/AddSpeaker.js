import React, { useState } from 'react';
import './AddVenue.css';

const AddSpeaker = () => {
    const [speakers, setSpeakers] = useState([]);
    const [newSpeaker, setNewSpeaker] = useState({
        fname: '',
        lname: '',
        phone: '',
        email: '',
        regPassword: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!newSpeaker.fname.trim()) {
            newErrors.fname = 'First name is required';
        }

        if (!newSpeaker.lname.trim()) {
            newErrors.lname = 'Last name is required';
        }

        if (!newSpeaker.phone.trim()) {
            newErrors.phone = 'Phone is required';
        }

        if (!newSpeaker.email.trim()) {
            newErrors.email = 'Email is required';
        }

        if (!newSpeaker.password.trim()) {
            newErrors.password = 'Password is required';
        }


        if (!newSpeaker.regPassword.trim()) {
            newErrors.regPassword = 'Registration Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSpeaker((prevSpeaker) => ({
            ...prevSpeaker,
            [name]: value,
        }));
    };

    const handleAddSpeaker = async () => {
        if (validateForm()) {
            console.log(newSpeaker);
            let response = await fetch('http://localhost:8080/dashboard/add-speaker', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSpeaker),
            });

            if (response.status !== 201) {
                alert('Request has been failed');
                return;
            }

            let result = await response.json();
            console.log(result);

            setSpeakers((prevSpeakers) => [...prevSpeakers, result.speaker]);
            setNewSpeaker({
                fname: '',
                lname: '',
                phone: '',
                email: '',
                password: '',
                regPassword: ''
            });
        }
    };

    return (
        <div className="frame">
            <h1>Speaker Management</h1>
            <div className="frame">
                <h2>Add New Speaker</h2>
                <form>
                    <label>
                        First Name:
                        <input type="text" name="fname" value={newSpeaker.fname} onChange={handleInputChange} />
                        {errors.fname && <div className="error-message">{errors.fname}</div>}
                    </label>
                    <label>
                        Last Name:
                        <input type="text" name="lname" value={newSpeaker.lname} onChange={handleInputChange} />
                        {errors.lname && <div className="error-message">{errors.lname}</div>}
                    </label>
                    <label>
                        Phone:
                        <input type="text" name="phone" value={newSpeaker.phone} onChange={handleInputChange} />
                        {errors.phone && <div className="error-message">{errors.phone}</div>}
                    </label>
                    <label>
                        Email:
                        <input type="text" name="email" value={newSpeaker.email} onChange={handleInputChange} />
                        {errors.email && <div className="error-message">{errors.email}</div>}
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" value={newSpeaker.password} onChange={handleInputChange} />
                        {errors.password && <div className="error-message">{errors.password}</div>}
                    </label>
                    <label>
                        Registration Password:
                        <input type="password" name="regPassword" value={newSpeaker.regPassword} onChange={handleInputChange} />
                        {errors.regPassword && <div className="error-message">{errors.regPassword}</div>}
                    </label>
                    <button type="button" onClick={handleAddSpeaker}>
                        Add Speaker
                    </button>
                </form>
            </div>

            {speakers.length > 0 && (
                <div>
                    <h2>Added Speakers</h2>
                    {speakers.map((speaker, index) => (
                        <div key={index} className="venue-box">
                            <strong>{speaker.fname} {speaker.lname}</strong>
                            <h3>ID: {speaker.id}</h3>
                            <p>Phone: {speaker.phone}</p>
                            <p>Email: {speaker.email}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddSpeaker;
