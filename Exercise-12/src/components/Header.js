import React from 'react'
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

function Header() {
  const { t, i18n } = useTranslation();

  return (
    <div> 
      <AppBar position="static">
        <Toolbar>
          <Button component={Link} color="inherit" to="/">{t('home')}</Button>
          <Button component={Link} color="inherit" to="/about">{t('about')}</Button>
          <Button color="inherit" id="en" onClick={() => i18n.changeLanguage('en')}>EN</Button>
          <Button color="inherit" id="fi" onClick={() => i18n.changeLanguage('fi')}>FI</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
} 

export default Header;
