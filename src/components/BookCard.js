import React from 'react';
import { Card, Button } from 'react-bootstrap';

function BookCard({ book, onSave }) {
  const { title, authors, imageLinks, description } = book.volumeInfo;

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex">
          {imageLinks?.thumbnail && (
            <img
              src={imageLinks.thumbnail}
              alt={title}
              className="me-3"
              style={{ width: '100px' }}
            />
          )}
          <div className="flex-grow-1">
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {authors?.join(', ')}
            </Card.Subtitle>
            <Card.Text>{description?.slice(0, 150)}...</Card.Text>
            <Button
              variant="outline-primary"
              href={book.volumeInfo.infoLink}
              target="_blank"
              className="me-2"
            >
              More Info
            </Button>
            {onSave && (
              <Button variant="success" onClick={() => onSave(book)}>
                Save
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
