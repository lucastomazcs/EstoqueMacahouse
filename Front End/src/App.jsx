import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/Forms/LoginForm';
import RegisterForm from './Components/Forms/RegisterForm';
import HomePage from './Components/HomePage/HomePage';
import SaleForm from './Components/Forms/SaleForm';
import Inventory from './Components/HomePage/Inventory';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App-header">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          
          <Route path="/register" element={<RegisterForm />} />

          <Route path="/sale" element={<SaleForm />} />

          <Route path="/home" element={<HomePage />} />

          <Route path="/manage" element={<Inventory />}/>
        </Routes>
      </div>
    </Router>
  );
}


export default App;