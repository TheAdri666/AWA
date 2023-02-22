import React, { useState } from 'react';

function BookForm() {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/book/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, author, pages })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Book added');
        window.history.push(`/book/${name.replace(' ', '%20')}`);
      })
      .catch((error) => {
        console.error('Error adding book:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Book name:</label>
      <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />

      <label htmlFor="author">Author:</label>
      <input type="text" id="author" value={author} onChange={(event) => setAuthor(event.target.value)} />

      <label htmlFor="pages">Pages:</label>
      <input type="number" id="pages" value={pages} onChange={(event) => setPages(event.target.value)} />

      <button type="submit">Submit</button>
    </form>
  );
}

export default BookForm;