import React, { useState } from 'react';
import './AddVenue.css'; // Make sure to have a corresponding CSS file

const AddSpeaker = () => {
    const [speakers, setSpeakers] = useState([]);
    const [newSpeaker, setNewSpeaker] = useState({
        name: '',
        phone: '',
        email: '',
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!newSpeaker.name.trim()) {
            newErrors.name = 'First name is required';
        }



        if (!newSpeaker.phone.trim()) {
            newErrors.phone = 'Phone is required';
        }

        if (!newSpeaker.email.trim()) {
            newErrors.email = 'Email is required';
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

    const handleAddSponsor = async () => {
        if (validateForm()) {
            let response = await fetch('http://localhost:8080/dashboard/add-sponsor', {
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
            setSpeakers((prevSpeakers) => [...prevSpeakers, result.sponsor]);

            setNewSpeaker({
                name: '',
                phone: '',
                email: '',
            });
        }
    };

    return (
        <div className="frame">
            <h1>Sponsor Management</h1>
            <div className="frame">
                <h2>Add New Sponsor</h2>
                <form>
                    <label>
                        First Name:
                        <input type="text" name="name" value={newSpeaker.name} onChange={handleInputChange} />
                        {errors.name && <div className="error-message">{errors.name}</div>}
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
                    <button type="button" onClick={handleAddSponsor}>
                        Add Speaker
                    </button>
                </form>
            </div>

            {speakers.length > 0 && (
                <div className="">
                    <h2>Added Speakers</h2>
                    {speakers.map((speaker, index) => (
                        <div key={index} className="venue-box">
                            <strong>{speaker.name} </strong>
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
