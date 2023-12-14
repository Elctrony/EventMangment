import logo from './logo.svg';
import './App.css';
import VenueList from './Venuelist';
import EventList from './Eventlist';
import Agenda from './Agenda';
import React, { useState } from 'react';

function App () {
  return (
    <div className="App">
    <EventList/> 
  </div>
);
}

export default App;
