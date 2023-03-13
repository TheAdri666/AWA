import React, { useState } from 'react';
import axios from 'axios';
import '../stylesheets/login.css'

// This page is so similar to the login page it even uses its stylesheet ↑↑↑↑ 🤭. Look there if you need slightly more in depth comments.
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        throw new Error();
      }
      await axios.post('/api/user/register', {
        email: email,
        password: password,
      });
      window.location.href = '/login'; // Once a user registers without errors happening they are send to the login page.
    } catch (error) {
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleRegister}>
        <div className="input-field">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
        </div>
        <div className="input-field">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>
        <div className="input-field">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label>Confirm Password</label>
        </div>
        <button className="btn waves-effect waves-light deep-purple lighten-1" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
