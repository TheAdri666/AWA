import React, { useState } from 'react';
import axios from 'axios';
import  '../stylesheets/login.css'
import { useNavigate } from 'react-router-dom';

function Login() {

  // email, password and error message are all changing, therefore we use state.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const setLoggedIn = (token) => {
    localStorage.setItem('token', token);
    navigate('/'); // Once we are logged in we are redirected to the home page.
  };

  // Remember the names of the keys in the options object must be according to the back-end implementation!
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/user/login', {
        email: email,
        password: password,
      });
      setLoggedIn(res.data.token);
    } catch (error) {
      setErrorMessage('Invalid credentials');
    }
  };

  // The only particular thing about this component is the conditional error message. Nothing too fancy.
  return (
    <div className="container">
      <h1>Login</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleLogin}>
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
        <button className="btn waves-effect waves-light deep-purple lighten-1" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
