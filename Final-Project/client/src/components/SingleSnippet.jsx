import { React, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Snippet from './Snippet';
import Comment from './Comment';

//This component is a slight hack over the SnippetList one, for reference I would suggest looking there.
function SingleSnippet() {
  const [snippet, setSnippet] = useState({}); //This is the most notable difference, there is an object instead of an array in the useState hook
  const [searchQuery, setSearchQuery] = useState('');

  const [searchParams] = useSearchParams();
  const searchParamValue = searchParams.get('q');

  useEffect(() => {
    setSearchQuery(searchParamValue ?? '');
  }, [searchParamValue]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`/api/codeSnippet/id/${searchQuery}`);
      setSnippet(result.data);
    }
    fetchData();
  }, [searchQuery]);

  return (
    <div>
      {Object.keys(snippet).length !== 0 && <Snippet key={snippet.id} snippet={snippet} />}
      <div className='comments'>
        {Object.keys(snippet).length !== 0 && snippet.comments.map(c => (
          <Comment author={c.author} content={c.content}/>
        ))}
      </div>
    </div>
  );
}

export default SingleSnippet;
