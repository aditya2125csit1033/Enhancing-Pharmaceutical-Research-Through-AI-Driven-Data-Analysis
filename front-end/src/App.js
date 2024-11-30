import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Components/Login/Login.jsx';
import Signup from './Components/Signup/Signup.jsx';
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import ForgotP from "./Components/ForgotP/ForgotP.jsx";
import UpdateP from "./Components/UpdateP/UpdateP.jsx"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<Login/>}/>
      <Route path="/register" element ={<Signup/>}/>
      <Route path="/dashboard" element = {<Dashboard/>}/>
      <Route path="/password-change" element = {<ForgotP/>}/>
      <Route path="/newpass" element = {<UpdateP/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
