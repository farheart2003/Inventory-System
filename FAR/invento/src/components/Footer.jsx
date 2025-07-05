// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto" style={{
  background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
}}>
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} Inventory System</p>
        <small>Designed by Farhat |</small>
      </div>
    </footer>
  );
};

export default Footer;
