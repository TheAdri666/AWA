import React from 'react'
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div> 
      <AppBar position="static">
        <Toolbar>
          <Button component={Link} color="inherit" to="/">
            Home
          </Button>
          <Button component={Link} color="inherit" to="/about">
            About
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
} 

export default Header;
