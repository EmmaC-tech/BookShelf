import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

function AlertToast({ show, onClose, message, variant = 'success' }) {
  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
      <Toast
        bg={variant}
        onClose={onClose}
        show={show}
        delay={3000}
        autohide
        animation
      >
        <Toast.Body className={variant === 'light' ? '' : 'text-white'}>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default AlertToast;
