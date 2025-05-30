import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import useLibrary from '../hooks/useLibrary';

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById, updateBook } = useLibrary();

  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    description: '',
  });

  useEffect(() => {
    if (id) {
      const book = getBookById(id);
      if (book) {
        setFormData({
          title: book.volumeInfo.title || '',
          authors: (book.volumeInfo.authors || []).join(', '),
          description: book.volumeInfo.description || '',
        });
      } else {
        alert('Book not found');
        navigate('/library');
      }
    }
  }, [id, getBookById, navigate]);

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBook = {
      id,
      volumeInfo: {
        ...formData,
        authors: formData.authors.split(',').map((a) => a.trim()),
      },
    };
    updateBook(updatedBook);
    alert('Book updated!');
    navigate('/library');
  };

  return (
    <div className="container p-4">
      <h2>{id ? 'Edit Book' : 'Add Book'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAuthors">
          <Form.Label>Authors (comma separated)</Form.Label>
          <Form.Control
            name="authors"
            value={formData.authors}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
}

export default EditBook;

