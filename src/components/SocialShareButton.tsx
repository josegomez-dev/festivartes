import React, { useState } from 'react';
import toast from 'react-hot-toast';


const ShareButton = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Enlace copiado al portapapeles');
    setShowOptions(false);
  };

  return (
    <div className='social-share-container' onClick={() => setShowOptions(!showOptions)}>
      <div className='social-share-text'>
        Compartir
      </div>

      <span
        className='social-share-icon'
        title="Compartir"
      >
        📣
      </span>

      {/* Share Options Dropdown */}
      {showOptions && (
        <div className='share-icons-container'>
          <div className='copy-link-wrapper' onClick={handleCopy}>
            📋 Copiar enlace
          </div>
          <div
            className='copy-link-wrapper'
            onClick={() =>
              window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')
            }
          >
            📘 Compartir en Facebook
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
