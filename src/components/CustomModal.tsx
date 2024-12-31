// components/CustomModal.js
import React from 'react';

const CustomModal = ({ isOpen, onClose, height, bgColor, children }) => {
  return (
    <>
      {isOpen && <div className="modal-overlay" onClick={onClose}></div>}
      <div
        className={`modal-container ${isOpen ? 'open' : ''}`}
        style={{ height: height || '50%', backgroundColor: bgColor || '#fff' }}
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
