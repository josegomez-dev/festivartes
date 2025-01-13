// components/CustomModal.js
import React, { ReactNode } from 'react';

interface CustomModalProps {
  isOpen: boolean; // Explicitly set the type for isOpen
  onClose: () => void; // Function type for onClose
  height?: string; // Optional string for height
  bgColor?: string; // Optional string for bgColor
  children: ReactNode; // React children (JSX)
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, height, bgColor, children }) => {
  return (
    <>
      {isOpen && <div className="modal-overlay" onClick={onClose}></div>}
      <div
        className={`modal-container modal-bg ${isOpen ? 'open' : ''}`} style={{ height: height || '50%' }}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </>
  );
};

export default CustomModal;
