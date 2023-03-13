import './stylesheets/app.css'
import NavBar from './components/NavBar'
import SnippetBar from './components/SnippetBar'
import Register from './components/Register';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import SnippetList from './components/SnippetList';
import SingleSnippet from './components/SingleSnippet';

function App() {
  return (
      <div className="App">
        <NavBar />
        {/* Routes are to be placed from more specific to more general when they coincide partially */}
        <Routes>
          <Route exact path="/" element={
            <div className="main-content">
              <h1>Share your code!</h1>
              <SnippetBar />
            </div>
          }/>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path='/snippets/id' element={<SingleSnippet/>} />
          <Route exact path='/snippets' element={<SnippetList />} />
        </Routes>
      </div>
  );
}

export default App;
