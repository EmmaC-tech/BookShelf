import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useLibrary from '../hooks/useLibrary';

function Library() {
  const { books, removeBook } = useLibrary();
  const navigate = useNavigate();

  if (books.length === 0) {
    return <div className="p-4">Your library is empty. Save some books from Home!</div>;
  }

  return (
    <div className="container p-4">
      <h2 className="mb-4">My Library</h2>
      {books.map((book) => {
        const { title, authors, imageLinks } = book.volumeInfo;
        return (
          <Card className="mb-3" key={book.id}>
            <Card.Body className="d-flex align-items-center">
              {imageLinks?.thumbnail && (
                <img
                  src={imageLinks.thumbnail}
                  alt={title}
                  style={{ width: '80px' }}
                  className="me-3"
                />
              )}
              <div className="flex-grow-1">
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {authors?.join(', ')}
                </Card.Subtitle>
              </div>
              <Button
                variant="primary"
                className="me-2"
                onClick={() => navigate(`/edit/${book.id}`)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  if (window.confirm(`Delete "${title}" from your library?`)) {
                    removeBook(book.id);
                  }
                }}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default Library;
