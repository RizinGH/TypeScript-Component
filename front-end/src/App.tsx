import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Loginform from './components/Login_Form';
import Registerform from './components/Register_Form';
import Home from './components/Home';
import PasswordReset from './components/Password_Reset';
import Form from './components/Form';
import { LoginProtect, Protected } from './Protected_Route';
import './App.css';

function App() {
  
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
     <Route path="/" element={<LoginProtect><Loginform /></LoginProtect>} />
          <Route path="/register" element={<LoginProtect><Registerform /></LoginProtect>} />          
          <Route path="/home" element={<Protected><Home /></Protected>} />
          <Route path="/home/form" element={<Protected><Form /></Protected>} />
          <Route path="/reset_password" element={<Protected><PasswordReset/></Protected>} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
