import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../stylesheets/snippet.css'

function Snippet(props) {
  // All of these either change or need to be updated once they are ready, therefore we use the useState hook here.
  const [upvotes, setUpvotes] = useState(props.snippet.upvotes.length);
  const [downvotes, setDownvotes] = useState(props.snippet.downvotes.length);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');

  // Fetch results always should go in a useEffect hook, otherwise they won't work when things need updating.
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const res = await axios.get(`/api/user/${props.snippet.author}`);
        setEmail(res.data.email);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserEmail();
  }, [props.snippet.author]);

  //Voting on a post and commenting are abilities reserved for authenticated users so the requests need to have a token.
  const handleUpvote = async () => {
    try {
      const res = await axios.put(`/api/codeSnippet/upvote/${props.snippet._id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUpvotes(res.data.upvotes.length);
      setDownvotes(res.data.downvotes.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownvote = async () => {
    try {
      const res = await axios.put(`/api/codeSnippet/downvote/${props.snippet._id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUpvotes(res.data.upvotes.length);
      setDownvotes(res.data.downvotes.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/codeSnippet/comment/${props.snippet._id}`, {
        comment,
      },
      { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setComment('');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // q for query on all of the params throughout the application.
  const params = new URLSearchParams();
  params.append('q', props.snippet._id);

  return (
    <div className="snippet">
      <h3>{props.snippet.title}</h3>
      <p>{props.snippet.content}</p>
      <p>By {email}</p>
      <p>{upvotes} upvotes. {downvotes} downvotes</p>
      <button className="btn deep-purple lighten-1 waves-effect waves-light" onClick={handleUpvote}>Upvote</button>
      <button className="btn deep-purple lighten-1 waves-effect waves-light" onClick={handleDownvote}>Downvote</button>
      <ul>
        {props.snippet.comments.map((comment) => (
          <li key={comment._id}>{comment.text}</li>
        ))}
      </ul>
      <form onSubmit={handleComment}>
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="btn deep-purple lighten-1 waves-effect waves-light" type="submit">Comment</button>
      </form>
      {!window.location.href.includes(props.snippet._id) && <Link to={`/snippets/id?${params.toString()}`}>View</Link>}
    </div>
  );
}

export default Snippet;
