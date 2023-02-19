import React from 'react';
import { useEffect, useState } from 'react';

function About() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((posts) => setData(posts))
      .catch((err) => console.error(err))
  }, []);
  return (
    <div>
      <p>About Component</p>
        <ul style={{ listStyleType: 'none' }}>
        {data.map((post) => <li key={post.id}>{post.title}</li>)}
      </ul>
    </div>
  );
}

export default About;
