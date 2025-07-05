import React from 'react';

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary px-4 sticky-top"
      style={{ zIndex: 999 }}
    >
      <a className="navbar-brand fw-bold" href="#">
        Inventory
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link active" href="/register">
              <button className="btn btn-outline-light">Sign Up</button>
            </a>
          </li>
          <li className="nav-item ms-2">
            <a className="nav-link active" href="/login">
              <button className="btn btn-light">Login</button>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
