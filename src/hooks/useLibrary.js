import { useState, useEffect } from 'react';

const STORAGE_KEY = 'book-buddy-library';

function useLibrary() {
  const [books, setBooks] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    setBooks((prev) => {
      // Avoid duplicates by id
      if (prev.find((b) => b.id === book.id)) return prev;
      return [...prev, book];
    });
  };

  const updateBook = (updatedBook) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === updatedBook.id ? updatedBook : b))
    );
  };

  const removeBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const getBookById = (id) => books.find((b) => b.id === id);

  return {
    books,
    addBook,
    updateBook,
    removeBook,
    getBookById,
  };
}

export default useLibrary;
