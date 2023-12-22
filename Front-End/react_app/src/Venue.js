import { hover } from '@testing-library/user-event/dist/hover';
import React, {useState} from 'react';
import { Card ,Button} from 'react-bootstrap';
import './Venue.css';
import './button.css';

const Venue = ({ name, description, photo, rating }) => {
    const [isClicked, setIsClicked] = useState(false);
  
    const handleClick = () => {
      setIsClicked(!isClicked);
    };

    return (
        <div className="venue-card" data-location="City A" data-price="500" data-rating="4.5">
            <img className="venue-image" src="https://www.iacconline.org/wp-content/uploads/ut20texas20venue20crop.jpeg" alt="Venue 1"/>
                <div className="venue-details">
                    <h2>Venue 1</h2>
                    <p>Location: City A</p>
                    <p>Capacity: 100 people</p>
                    <p className="price">Price: $500</p>
                    <div className="rating">
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                        <span className="star">&#9734;</span>
                    </div>
                    <button class="select-button" onclick="selectVenue('Venue 1')">Select</button>
                </div>
        </div>);
    };

// const Venue = ({ name, description, photo, rating }) => {
//   return (
//     <Card className="venue-card" style = {{width : '250px'}}>
//       <Card.Img variant="top" src={photo} alt={name} style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover',margin:'20px'}} />
//       <Card.Body>
//         <Card.Title>{name}</Card.Title>
//         <Card.Text>{description}</Card.Text>
//         <Card.Text>Rating: {rating}</Card.Text>
//       </Card.Body>
//     </Card>
//   );
// };


export default Venue;
