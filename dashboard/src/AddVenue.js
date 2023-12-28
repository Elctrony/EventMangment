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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVenue((prevVenue) => ({
      ...prevVenue,
      [name]: value,
    }));
  };

  const handleAddVenue = () => {
    setVenues((prevVenues) => [...prevVenues, newVenue]);
    setNewVenue({
      name: '',
      location: '',
      capacity: '',
      pricePerHour: '',
      rating: '',
    });
  };

  return (
    <div>
      <h1>Venue Management</h1>
      <div>
        <h2>Add New Venue</h2>
        <form>
          <label>
            Name :
            <input type="text" name="name" value={newVenue.name} onChange={handleInputChange} />
          </label>
          <label>
            Location :
            <input type="text" name="location" value={newVenue.location} onChange={handleInputChange} />
          </label>
          <label>
            Capacity :
            <input type="text" name="capacity" value={newVenue.capacity} onChange={handleInputChange} />
          </label>
          <label>
            Price per Hour :
            <input type="text" name="pricePerHour" value={newVenue.pricePerHour} onChange={handleInputChange} />
          </label>
          <label>
            Rating :
            <input type="text" name="rating" value={newVenue.rating} onChange={handleInputChange} />
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
