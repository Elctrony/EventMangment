import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "./LoginForm";
import SponsorOffersList from "./SponsorOffersList";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
              <Route path="/" element={<SponsorOffersList/>}/>
            <Route path="/login" element={<LoginForm/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
