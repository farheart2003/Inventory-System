import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // 🔒 Ikiwa user tayari ame-login, mpeleke moja kwa moja dashboard
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/Dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.username || form.username.length < 3) {
      setError('Username must be at least 3 characters.');
      return false;
    }
    if (!form.password || form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', form);

      // ✅ Save user session in localStorage
      // if (response.data) {
      //   localStorage.setItem('user', JSON.stringify(response.data));
      //   setSuccess('✅ Login successful! Redirecting...');
      //   setTimeout(() => {
      //     navigate('/Dashboard');
      //   }, 1000);
      // } else {
      //   setError('❌ Unexpected server response. Try again.');
      // }
      // ✅ Save user session in localStorage
       // ✅ Save user session in localStorage - flexible approach
            if (response.data) {
              try {
                // Log response to inspect structure
                console.log("✅ Login response:", response.data);

                // Save to localStorage (entire response)
                localStorage.setItem('user', JSON.stringify(response.data));

                setSuccess('✅ Login successful! Redirecting...');
                setTimeout(() => {
                  navigate('/Dashboard');
                }, 1000);
              } catch (err) {
                console.error('❌ Failed to save user session:', err);
                setError('❌ Could not process login. Try again.');
              }
            } else {
              console.error('❌ Empty response from server');
              setError('❌ Unexpected server response. Try again.');
            }


    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('❌ Invalid username or password');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <h3 className="text-center mb-4">Login</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className={`form-control ${error.includes('Username') ? 'is-invalid' : ''}`}
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${error.includes('Password') ? 'is-invalid' : ''}`}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary w-100" type="submit">Login</button>
      </form>

      <p className="text-center mt-3">
        Don't have an account?{' '}
        <Link to="/register" className="text-decoration-none">
          Please Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
