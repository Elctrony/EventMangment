import React, {useState} from 'react';
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
  /*{
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
  },*/
];

const VenueList = () => {

    const locationChangeHanlder = ()=>{
        console.log(location)
    }

    const [location,setLocation] = useState("");
    return (

        <div className="container">
          <h1>Available Venues</h1>

          <div className="filter-section">
            <select value={location} className="filter-select" id="locationFilter" onChange={locationChangeHanlder}>
              <option value="">All Locations</option>
              <option value="City A">City A</option>
              <option value="City B">City B</option>
            </select>

            <select className="filter-select" id="priceFilter">
              <option value="">All Prices</option>
              <option value="500">$500 and below</option>
              <option value="700">$700 and below</option>
            </select>
          </div>

          <div className="venues-grid">

            {venuesData.map((venue) => (
                <Venue key={venue.id} {...venue} />
            ))}
          </div>
        </div>


    );
  };
  
  export default VenueList;