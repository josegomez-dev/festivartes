// components/CustomModal.js
import React from 'react';

const CustomModal = ({ isOpen, onClose, height, bgColor, children }) => {
  return (
    <>
      {isOpen && <div className="modal-overlay" onClick={onClose}></div>}
      <div
        className={`modal-container ${isOpen ? 'open' : ''}`}
        style={{ height: height || '50%',   background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
      >
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </>
  );
};

export default CustomModal;
