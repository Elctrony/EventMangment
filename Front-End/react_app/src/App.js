import logo from './logo.svg';
import './App.css';
import VenueList from './Venuelist';
import EventList from './Eventlist';
import Agenda from './Agenda';
import React, { useState } from 'react';
import Sponsors from './Sponsors';
import EventManager from './EventManager';
import Offer from './Offer';
import OrganizingTeamPage from './OrgSelection';
import VenuePage from './AddVenue';
import AddOrgTeam from './AddOrgTeam';
import Dashboard from './DashBoard';

import {
    BrowserRouter,
    Routes, // instead of "Switch"
    Route,
} from "react-router-dom";


import Venue from "./Venue";
import Eventlist from "./Eventlist";
import SignupForm from "./SignupForm";

const TestCall = () => {
console.log('test');
}



function App () {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path ="/add-event" element={<EventManager/>}/>
                    <Route path="/offer/:id" element={<Offer/>} />
                    <Route path="/agenda/:id" element={<Agenda />} />
                    <Route path="/venue" element={<VenueList />} />
                    <Route path="/signup" element={<SignupForm/>}/>
                    <Route path="/AddVenue" element={<VenuePage/>}/>
                    <Route path="/AddOrgTeam" element={<AddOrgTeam/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;