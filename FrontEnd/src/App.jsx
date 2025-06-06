import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Forms/LoginForm';
import RegisterForm from './components/Forms/RegisterForm';
import HomePage from './components/HomePage/HomePage';
import SaleForm from './components/Forms/SaleForm';
import Inventory from './components/HomePage/Inventory';
import UserList from './components/Register';
import './App.css';


function App() {
  return (
    <div className="App-header">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          
          <Route path="/register" element={<UserList />} />

          <Route path="/sale" element={<SaleForm />} />

          <Route path="/home" element={<HomePage />} />

          <Route path="/manage" element={<Inventory />}/>
        </Routes>
      </Router>
      <main>
      </main>
    </div>
  );
}

export default App;