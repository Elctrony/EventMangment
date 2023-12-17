import logo from './logo.svg';
import './App.css';
import VenueList from './Venuelist';
import EventList from './Eventlist';
import Agenda from './Agenda';
import React, { useState } from 'react';
import Sponsors from './Sponsors';
import Offer from './Offer';
import {
    BrowserRouter,
    Routes, // instead of "Switch"
    Route,
} from "react-router-dom";


import Venue from "./Venue";

const TestCall = () => {
console.log('test');
}



function App () {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path ="/" element={<Sponsors/>}/>
                    <Route path="/Offer/:id" element={<Offer/>} />
                    <Route path="/Agenda/:id" element={<Agenda />} />
                    <Route path="/Venue" element={<VenueList />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;