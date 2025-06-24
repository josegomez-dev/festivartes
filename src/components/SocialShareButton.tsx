import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { RiBubbleChartFill } from 'react-icons/ri'; // Import icons as needed


const ShareButton = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Enlace copiado al portapapeles');
    setShowOptions(false);
  };

  return (
    <div className='social-share-container' onClick={() => setShowOptions(!showOptions)}>
      <div className='social-share-text'>... </div>

      <span className='social-share-icon'>
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
            📲 Compartir en Facebook
          </div>
          <div
            className='copy-link-wrapper'
            onClick={() => alert('Funcionalidad de Exportar Agenda Cultural aún no implementada')}
          >
            📇 Exportar Agenda Cultural
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
