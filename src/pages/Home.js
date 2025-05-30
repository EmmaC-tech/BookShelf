import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import useLibrary from '../hooks/useLibrary';
import AlertToast from '../components/AlertToast';

function Home() {
  const [books, setBooks] = useState([]);
  const { books: savedBooks, addBook } = useLibrary();

  // Toast state
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
      );
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      setToast({ show: true, message: 'Error fetching books', variant: 'danger' });
    }
  };

  const handleSave = (book) => {
    addBook(book);
    setToast({ show: true, message: `"${book.volumeInfo.title}" saved to your library!`, variant: 'success' });
  };

  const isSaved = (id) => savedBooks.some((b) => b.id === id);

  return (
    <div className="container p-4">
      <h1 className="mb-4">Search Google Books</h1>
      <SearchBar onSearch={handleSearch} />
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onSave={isSaved(book.id) ? null : handleSave}
        />
      ))}

      <AlertToast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        variant={toast.variant}
      />
    </div>
  );
}

export default Home;

