import React, { useState } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "../stylesheets/navbar.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import defaultProfilePic from "../images/defaultProfilePic.png";
import { useNavigate } from "react-router-dom";

// This component is admittedly a mess and should have probably been separated into several different ones.
function Navbar() {
  const [searchValue, setSearchValue] = useState(""); //This is stateful because we want to remove the text when the Search Bar loses focus.

  const navigate = useNavigate();

  const setLoggedOut = () => {
    localStorage.removeItem("token");
    navigate('/'); // When a user logs out they are sent to the home page.
  };

  const handleSearchBlur = () => {
    setSearchValue(''); // Once the bar loses focus we set its state to an empty string.

  }; 
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value); // Search bar updates as you type :).
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append("q", searchValue);
    navigate(`/snippets?${params.toString()}`); //This is a hack because I couldn't figure out a cleaner way to do it and I spent over two hours trying. Sorry it looks gross, it is what it is 😞.
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false); // This makes the hamburger menu appear and disappear on smaller screens.

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // I'm sorry ↓ 😞😞.
  return (
    <nav>
      <div className="nav-wrapper grey darken-3 col s12">
        {/* Brand image */}
        <div className="brand-container col s3">
          <img className="logo" src={logo} alt="Logo" />
          <a href="/" className="brand-name">
            Snack Underflow
          </a>
        </div>

        {/* Search bar */}
        <form className="input-form hide-on-small-only" onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              id="search"
              type="search"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchChange}
              onBlur={handleSearchBlur}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <button type="submit" className="hide">
              Search
            </button>
          </div>
        </form>

        {/* Hamburger menu 🍔🍔🍔🍔 */}
        <a
          href="#!"
          className="sidenav-trigger hide-on-med-and-up"
          onClick={handleMenuClick}
        >
          <i className="material-icons" onClick={handleMenuClick}>menu</i>
        </a>

        {/* List of items inside hamburger menu, usually they are hidden and they are mostly clones of the big ones */}
        <ul
          id="nav-mobile"
          className={`${isMenuOpen ? "open" : "closed"}`}
        >
          {/* This one big mess is a single thing. The search bar */}
          <li className={`${isMenuOpen ? "active" : "closed"}`}>
            <form
              className="input-form"
              onSubmit={(e) => {
                handleMenuClick();
                handleSubmit(e);
              }}
            >
              <div className="input-field">
                <input
                  id="search"
                  type="search"
                  placeholder="Search"
                  value={searchValue}
                  onChange={handleSearchChange}
                  onBlur={handleSearchBlur}
                />
                <label className="label-icon" htmlFor="search">
                  <i className="material-icons">search</i>
                </label>
                <button type="submit" className="hide">
                  Search
                </button>
              </div>
            </form>
          </li>

          {/* This monster here is our lovely friend, conditional rendering. It makes sure that buttons are appropriate (either login and register or logout)*/}
          {localStorage.getItem("token") ? (
            <li className={`${isMenuOpen ? "active" : "closed"} wide`}>
              <a href="/" className="wide" onClick={setLoggedOut}>
                Log Out
              </a>
            </li>
        ) : (
          <li className={`${isMenuOpen ? "active" : "closed"}`}>
            <div className="wide">
              <Link className="wide" to="/register" onClick={handleMenuClick}>Register</Link>
              <Link className="wide" to="/login" onClick={handleMenuClick}>Login</Link>
            </div>
          </li>
        )}
        </ul>
        
        {/* Last part, I promise, I'll just say be glad you didn't have to go through the pain of making this. I'm currently 12 hours in with 0 breaks, not even bathroom breaks and I JUST finished. Also same as the small bar, conditional buttons. */}
        {localStorage.getItem("token") ? (
          <ul id="nav-mobile" className="right hide-on-small-only col s2">
            <li>
              <a href="/" onClick={setLoggedOut}>
                Log Out
              </a>
            </li>
            <li>
              <img
                className="profile-picture"
                src={defaultProfilePic}
                alt="Profile"
              />
            </li>
          </ul>
        ) : (
          <ul id="nav-mobile" className="right hide-on-small-only col">
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
