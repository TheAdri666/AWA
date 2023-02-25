import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Book() {
  const { bookName } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  async function fetchBookDetails(bookName) {
    const encodedBookName = encodeURIComponent(bookName);
    const response = await fetch(`/api/book/${encodedBookName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch book details for ${bookName}`);
    }
    const bookDetails = await response.json();
    return bookDetails;
  }

  useEffect(() => {
    async function fetchDetails() {
      try {
        const details = await fetchBookDetails(bookName);
        setBookDetails(details);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDetails();
  }, [bookName]);

  return (
    <div>
      {bookDetails ? (
        <div>
          <h2>{bookDetails.name}</h2>
          <p>{bookDetails.author}</p>
          <p>{bookDetails.pages}</p>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
}

export default Book;
