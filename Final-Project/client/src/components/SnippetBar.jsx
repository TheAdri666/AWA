import React, { useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../stylesheets/snippetbar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SnippetBar() {
  // These elements either change or are not ready when the page first loads, therefore they are stateful.
  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Submitting a comment is protected, therefore a header is needed. JWT is stored in Local Storage for convenience. Be mindful that it is probably not the best practice.
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post('/api/codeSnippet', {
          title: title,
          content: snippet
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTitle('');
        setSnippet('');
        setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    } 
  };

  // Snippet and title change as you type 😁
  const handleSnippetChange = (e) => {
    setSnippet(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit} className="publish-form">
        {/* The ability to write snippets is blocked for non authenticated users. */}
        {localStorage.getItem('token') &&
          <div className="snippet-wrapper">
            <textarea id="snippet-title" className="materialize-textarea" value={title} onChange={handleTitleChange} placeholder='Title'></textarea>
            <textarea id="code-snippet" className="materialize-textarea" value={snippet} onChange={handleSnippetChange} placeholder='Code'></textarea>
            <button className="btn deep-purple lighten-1 waves-effect waves-light" type="submit" name="sumbit">
              Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        }
        {/* The error message string only shows when something went wrong and hides otherwise */}
        {errorMessage && <div className="error-message">Something went wrong. Please log back in again</div>}
        <button className="btn deep-purple lighten-1 waves-effect waves-light" type="button" name="findAll" onClick={() => navigate('/snippets')}>
          Find all code snippets
          <i className="material-icons right">search</i>
        </button>
      </form>
    </div>
  );
}

export default SnippetBar;
