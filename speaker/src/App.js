import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "./LoginForm";
import Agenda from "./Agenda";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
              <Route path="/" element={<Agenda/>}/>
            <Route path="/login" element={<LoginForm/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
