import { React, useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/comment.css'

//Probaably the easiest component, just waits to fetch the author's email (for a lack of a username) from the database with the id that is associated to the comment and then displays it.
function Comment({ author, content }) {
  const [authorEmail, setAuthorEmail] = useState('');

  useEffect(() => {
    async function fetchAuthorEmail() {
      const result = await axios.get(`/api/user/${author}`);
      setAuthorEmail(result.data.email);
    }
    fetchAuthorEmail();
  }, [author]);

  return (
    <div className="comment">
      <p>{content}</p>
      <p>By: {authorEmail}</p>
    </div>
  );
}

export default Comment;
