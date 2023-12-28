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

function App() {
  return (
      <BrowserRouter>
          <div className="App">
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/add-venue" element={<AddVenue/>}/>
                    <Route path="/add-organizer" element={<AddOrgTeam/>}/>
                </Routes>
          </div>
      </BrowserRouter>

  );
}

export default App;
