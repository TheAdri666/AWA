import React, { useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../stylesheets/main.css';

function Main() {
  const [snippet, setSnippet] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(snippet); //TODO: replace with actual submit logic
  };

  const handleChange = (e) => {
    setSnippet(e.target.value);
  };

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit} className="publish-form">
        <textarea id="code-snippet" className="materialize-textarea" value={snippet} onChange={handleChange}></textarea>
        <button className="btn deep-purple lighten-1 waves-effect waves-light" type="submit" name="action">Submit
          <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  );
}

export default Main;
