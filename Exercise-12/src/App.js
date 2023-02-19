import React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import Header from './components/Header';
import MyContainer from './components/MyContainer';
import About from './components/About';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" element={<MyContainer />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </I18nextProvider>
  );
} 

export default App;
