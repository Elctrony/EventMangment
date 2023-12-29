// AddVenue.js

import React, { useState } from 'react';
import './AddVenue.css';

const VenuePage = () => {
  const [venues, setVenues] = useState([]);
  const [newVenue, setNewVenue] = useState({
    name: '',
    location: '',
    capacity: '',
    pricePerHour: '',
    rating: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!newVenue.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!newVenue.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!newVenue.capacity.trim()) {
      newErrors.capacity = 'Capacity is required';
    } else if (isNaN(newVenue.capacity) || parseInt(newVenue.capacity, 10) <= 0) {
      newErrors.capacity = 'Capacity must be a positive number';
    }

    if (!newVenue.pricePerHour.trim()) {
      newErrors.pricePerHour = 'Price per Hour is required';
    } else if (isNaN(newVenue.pricePerHour) || parseFloat(newVenue.pricePerHour) <= 0) {
      newErrors.pricePerHour = 'Price per Hour must be a positive number';
    }

    if (!newVenue.rating.trim()) {
      newErrors.rating = 'Rating is required';
    } else {
      const ratingValue = parseFloat(newVenue.rating);
      if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
        newErrors.rating = 'Rating must be between 1 and 5';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVenue((prevVenue) => ({
      ...prevVenue,
      [name]: value,
    }));
  };

  const handleAddVenue = async () => {
    if (validateForm()) {
      console.log(newVenue)
      let respone = await fetch('http://localhost:8080/dashboard/add-venue',{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(newVenue)
      })
      if(respone.status!==201){
        alert('Request has been failed');
        return;
      }
      let result = await respone.json();
      console.log(result);


      setVenues((prevVenues) => [...prevVenues, result.venue]);
      setNewVenue({
        name: '',
        location: '',
        capacity: '',
        pricePerHour: '',
        rating: '',
      });
    }
  };

  return (
      <div className="frame">
        <h1>Venue Management</h1>
        <div className="frame">
          <h2>Add New Venue</h2>
          <form>
            <label>
              Name:
              <input type="text" name="name" value={newVenue.name} onChange={handleInputChange} />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </label>
            <label>
              Location:
              <input type="text" name="location" value={newVenue.location} onChange={handleInputChange} />
              {errors.location && <div className="error-message">{errors.location}</div>}
            </label>
            <label>
              Capacity:
              <input type="text" name="capacity" value={newVenue.capacity} onChange={handleInputChange} />
              {errors.capacity && <div className="error-message">{errors.capacity}</div>}
            </label>
            <label>
              Price per Hour:
              <input type="text" name="pricePerHour" value={newVenue.pricePerHour} onChange={handleInputChange} />
              {errors.pricePerHour && <div className="error-message">{errors.pricePerHour}</div>}
            </label>
            <label>
              Rating:
              <input type="text" name="rating" value={newVenue.rating} onChange={handleInputChange} />
              {errors.rating && <div className="error-message">{errors.rating}</div>}
            </label>
            <button type="button" onClick={handleAddVenue}>
              Add Venue
            </button>
          </form>
        </div>

        {venues.length > 0 && (
            <div>
              <h2>Added Venues</h2>
              {venues.map((venue, index) => (
                  <div key={index} className="venue-box">
                    <strong>{venue.name}</strong>
                    <p>Location: {venue.location}</p>
                    <p>Capacity: {venue.capacity}</p>
                    <p>Price per Hour: {venue.pricePerHour}</p>
                    <p>Rating: {venue.rating}</p>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default VenuePage;
