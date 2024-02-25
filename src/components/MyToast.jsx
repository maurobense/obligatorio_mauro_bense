import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';
const MyToast = ({ show, message, type, onClose }) => {
    return (
      <Toast show={show} onClose={onClose} delay={3000} autohide style={{ position: 'absolute', top: 0, right: 0 }}>
        <Toast.Header closeButton={false} bg={type === 'success' ? 'success' : 'danger'}>
          <strong className="mr-auto">{type === 'success' ? 'Éxito' : 'Error'}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    );
  };
export default MyToast;



