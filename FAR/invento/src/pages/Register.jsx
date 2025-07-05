import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' }); // Clear error on typing
  };

  // Simple frontend validation
  const validate = () => {
    const errors = {};
    if (!form.username.trim()) errors.username = 'Username is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Email is invalid';
    if (!form.password) errors.password = 'Password is required';
    else if (form.password.length < 6) errors.password = 'Password must be at least 6 characters';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validate()) return;

    try {
      const res = await axios.post('http://localhost:8080/api/users', {
        username: form.username,
        email: form.email,
        password: form.password,
        role: 'USER',
      });

      setSuccess('✅ Registration successful! Redirecting to login...');
      setForm({ username: '', email: '', password: '' });

      setTimeout(() => {
        setSuccess('');
        navigate('/login');
      }, 3000);

    } catch (err) {
      // Extract backend error message if any
      const msg =
        err.response?.data?.message ||
        '❌ Failed to register. Please try again later.';
      setError(msg);

      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <h3 className="text-center mb-4">Sign Up</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{formErrors.username}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{formErrors.email}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{formErrors.password}</div>
        </div>

        <button className="btn btn-success w-100" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
