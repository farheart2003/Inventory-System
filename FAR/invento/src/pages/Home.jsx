import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const backgroundImage = {
    minHeight: '100vh',
    backgroundImage:
      "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '5rem 2rem',
    color: '#fff',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const fadeInStyle = {
    animation: 'fadeIn 2s ease-in-out'
  };

  return (
    <div style={backgroundImage}>
      <div className="container">
        <h1 className="display-4 fw-bold mb-3" style={fadeInStyle}>
          Welcome to Inventory System
        </h1>
        <p className="lead mb-4" style={fadeInStyle}>
          Simple, powerful, and intuitive inventory management for your small business.
        </p>
        <div className="d-flex gap-3 justify-content-center" style={fadeInStyle}>
          <Link to="/login" className="btn btn-light btn-lg">
            Login
          </Link>
          <Link to="/register" className="btn btn-outline-light btn-lg">
            Sign Up
          </Link>
        </div>
      </div>

      {/* Simple keyframe animation style */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;
