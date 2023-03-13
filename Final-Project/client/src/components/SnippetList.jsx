import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snippet from './Snippet';
import { useSearchParams } from 'react-router-dom';

function SnippetList() {
  // Both the snippet and the search query are reactive because they take time to load and are not readily available.
  const [snippets, setSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // q for query is the param I have used throughout the entire application.
  const [searchParams] = useSearchParams();
  const searchParamValue = searchParams.get('q');

  // When the search param loads it checks if it is null or undefined and, if so, turns it into an empty string instead.
  useEffect(() => {
    setSearchQuery(searchParamValue ?? '');
  }, [searchParamValue]);

  // When the searchQuery is empty the fetch is done with no filtering.
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/codeSnippet/${searchQuery}`);
      setSnippets(data);
    };
    fetchData();
  }, [searchQuery]);

  return (
    <div>
      {snippets.map(snippet => (
        <Snippet key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
}

export default SnippetList;
