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
        <Card className={`venue-card ${isClicked ? 'clicked' : ''}`}style = {{width : '250px'}} onClick={handleClick}>
          <Card.Img
            variant="top"
            src={photo}
            alt={name}
            style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover',margin:'20px'}}
          />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            {isClicked && <Card.Text>{description}</Card.Text>}
            <Card.Text>Rating: {rating}</Card.Text>
            <Button className = "rounded-button" variant="primary" onClick={handleClick}>
              {isClicked ? 'Hide Description' : 'Show Description'}
            </Button>
          </Card.Body>
        </Card>
      );
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
