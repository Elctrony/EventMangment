import React from 'react';
import { useParams } from 'react-router-dom';

const Offer = ({eventId}) => {
  const {id}= useParams();
  return (
    <div>
      <h2>You Selected Event with Id : {id} to Sponsor</h2>
    </div>
  );
};

export default Offer;
