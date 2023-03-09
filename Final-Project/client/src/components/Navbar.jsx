import React, { useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../stylesheets/navbar.css';
import logo from '../images/logo.png';

function Navbar() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchBlur = () => {
    setSearchValue('');
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <nav>
      <div className="nav-wrapper grey darken-3 flex">
        <div className="logo-container">
          <img className="logo" src={logo} alt="Logo"/>
          <a href="/" className="brand-logo">Stack Underflow</a>
        </div>
        <form className="input-form">
          <div className="input-field">
            <input
              id="search"
              type="search"
              value={searchValue}
              onChange={handleSearchChange}
              onBlur={handleSearchBlur}
            />
            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
            <button type="submit" className="hide">Search</button>
          </div>
        </form>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="/register">Register</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
