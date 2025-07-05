import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import 'animate.css';
import Home from './pages/Home';

const App = () => {
return (
<Router>
<Navbar />
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
       <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
   <Footer />
</Router>
);
};

export default App;