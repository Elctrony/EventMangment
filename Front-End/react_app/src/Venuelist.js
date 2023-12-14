import React from 'react';
import Venue from './Venue';
import './Venuelist.css';

const venuesData = [
  {
    id: 1,
    name: 'Venue 1',
    description: 'Description for Venue 1.',
    photo: 'https://www.brides.com/thmb/QAfkHCyXFWZaoykTwYYlTp1v2Ts=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/wedd-venue-questions-0620-75321a982d434a07a474f3d88ba78c6b.jpg',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Venue 2',
    description: 'Description for Venue 2.',
    photo: 'https://www.brides.com/thmb/QAfkHCyXFWZaoykTwYYlTp1v2Ts=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/wedd-venue-questions-0620-75321a982d434a07a474f3d88ba78c6b.jpg',
    rating: 3.8,
  },
  {
    id: 3,
    name: 'Venue 3',
    description: 'Description for Venue 2.',
    photo: 'https://www.brides.com/thmb/QAfkHCyXFWZaoykTwYYlTp1v2Ts=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/wedd-venue-questions-0620-75321a982d434a07a474f3d88ba78c6b.jpg',
    rating: 3.8,
  },
  {
    id: 4,
    name: 'Venue 3',
    description: 'Description for Venue 2.',
    photo: 'https://www.brides.com/thmb/QAfkHCyXFWZaoykTwYYlTp1v2Ts=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/wedd-venue-questions-0620-75321a982d434a07a474f3d88ba78c6b.jpg',
    rating: 3.8,
  },
  {
    id: 5,
    name: 'Venue 3',
    description: 'Description for Venue 2.',
    photo: 'https://www.brides.com/thmb/QAfkHCyXFWZaoykTwYYlTp1v2Ts=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/wedd-venue-questions-0620-75321a982d434a07a474f3d88ba78c6b.jpg',
    rating: 3.8,
  },
  {
    id: 6,
    name: 'Venue 3',
    description: 'Description for Venue 2.',
    photo: 'https://www.brides.com/thmb/QAfkHCyXFWZaoykTwYYlTp1v2Ts=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/wedd-venue-questions-0620-75321a982d434a07a474f3d88ba78c6b.jpg',
    rating: 3.8,
  },
];

const VenueList = () => {
    return (
      <div className="venue-list">
        {venuesData.map((venue) => (
          <Venue key={venue.id} {...venue} />
        ))}
      </div>
    );
  };
  
  export default VenueList;