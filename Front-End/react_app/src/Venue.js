import { hover } from '@testing-library/user-event/dist/hover';
import React, {useState} from 'react';
import { Card ,Button} from 'react-bootstrap';
import './Venue.css';
import './button.css';
const VenueCard = ({ venueName, location, capacity, priceperhour, rating, onSelect }) => (
    <div className="venue-card" data-location={location} data-price={priceperhour} data-rating={rating}>
        {/* Replace the image source with the appropriate path */}
        <img className="venue-image" src="https://www.iacconline.org/wp-content/uploads/ut20texas20venue20crop.jpeg" alt={venueName} />
        <div className="venue-details">
            <h2>{venueName}</h2>
            <p>Location: {location}</p>
            <p>Capacity: {capacity} people</p>
            <p className="price">Price: ${priceperhour}</p>
            <div className="rating">
                {Array.from({ length: Math.floor(rating) }, (_, index) => (
                    <span key={index} className="star">&#9733;</span>
                ))}
                {Array.from({ length: 5 - Math.floor(rating) }, (_, index) => (
                    <span key={index + Math.floor(rating)} className="star">&#9734;</span>
                ))}
            </div>
            <button className="select-button" onClick={() => onSelect(venueName)}>
                Select
            </button>
        </div>
    </div>
);


export default VenueCard;
