import './App.css';
import BookForm from './components/BookForm'
import Book from './components/Book';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Books</h1>
        <Routes>
          <Route exact path="/">
            <BookForm />
          </Route>
          <Route path="/book/:bookName">
            <Book />
          </Route>
          <Route path="*">
            <h1>404</h1>
            <p>This is not the webpage you are looking for.</p>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
