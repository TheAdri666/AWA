import { useParams } from 'react-router-dom';

const Book = () => {
  const { bookName } = useParams();

  async function fetchBookDetails(bookName) {
    const encodedBookName = encodeURIComponent(bookName);
    const response = await fetch(`/api/book/${encodedBookName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch book details for ${bookName}`);
    }
    const bookDetails = await response.json();
    return bookDetails;
  }

  const book = fetchBookDetails(bookName);

  return (
    <div>
      <p>{book.name}</p>
      <p>{book.author}</p>
      <p>{book.pages}</p>
      <p>{book}</p>
    </div>
  );
};

export default Book;