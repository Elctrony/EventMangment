import React, { useState } from 'react';
import './AddVenue.css'; // Make sure to have a corresponding CSS file

const AddSponsor = () => {
    const [Sponsors, setSponsors] = useState([]);
    const [newSponsor, setNewSponsor] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!newSponsor.name.trim()) {
            newErrors.name = 'First name is required';
        }



        if (!newSponsor.phone.trim()) {
            newErrors.phone = 'Phone is required';
        }

        if (!newSponsor.email.trim()) {
            newErrors.email = 'Email is required';
        }

        if (!newSponsor.password.trim()) {
            newErrors.password = 'Password is required';
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSponsor((prevSponsor) => ({
            ...prevSponsor,
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
                body: JSON.stringify(newSponsor),
            });

            if (response.status !== 201) {
                alert('Request has been failed');
                return;
            }

            let result = await response.json();
            console.log(result);
            setSponsors((prevSponsors) => [...prevSponsors, result.sponsor]);

            setNewSponsor({
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
                        <input type="text" name="name" value={newSponsor.name} onChange={handleInputChange} />
                        {errors.name && <div className="error-message">{errors.name}</div>}
                    </label>

                    <label>
                        Phone:
                        <input type="text" name="phone" value={newSponsor.phone} onChange={handleInputChange} />
                        {errors.phone && <div className="error-message">{errors.phone}</div>}
                    </label>
                    <label>
                        Email:
                        <input type="text" name="email" value={newSponsor.email} onChange={handleInputChange} />
                        {errors.email && <div className="error-message">{errors.email}</div>}
                    </label>
                    <button type="button" onClick={handleAddSponsor}>
                        Add Sponsor
                    </button>
                </form>
            </div>

            {Sponsors.length > 0 && (
                <div className="">
                    <h2>Added Sponsors</h2>
                    {Sponsors.map((Sponsor, index) => (
                        <div key={index} className="venue-box">
                            <strong>{Sponsor.name} </strong>
                            <h3>ID: {Sponsor.id}</h3>
                            <p>Phone: {Sponsor.phone}</p>
                            <p>Email: {Sponsor.email}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddSponsor;
