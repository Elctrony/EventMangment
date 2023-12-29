import logo from './logo.svg';
import './App.css';
import Dashboard from "./Dashboard";
import {
    BrowserRouter,
    Routes, // instead of "Switch"
    Route,
} from "react-router-dom";
import AddVenue from "./AddVenue";
import AddOrgTeam from "./AddOrgTeam";
import AddSpeaker from "./AddSpeaker";
import AddSponsor from "./AddSponsor";
import Venuelist from "./Venuelist";
import OrgSelection from "./OrgSelection";
import SpeakersList from "./SpeakersList";
import SponsorsList from "./SonsorsList";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/add-venue" element={<AddVenue/>}/>
                    <Route path="/add-organizer" element={<AddOrgTeam/>}/>
                    <Route path="/add-speaker" element={<AddSpeaker/>}/>
                    <Route path="/add-sponsor" element={<AddSponsor/>}/>
                    <Route path="/venues" element={<Venuelist/>}/>
                    <Route path="/organinzers" element={<OrgSelection/>}/>
                    <Route path="/speakers" element={<SpeakersList/>}/>
                    <Route path="/sponsors" element={<SponsorsList/>}/>
                </Routes>
          </div>
      </BrowserRouter>

  );
}

export default App;
