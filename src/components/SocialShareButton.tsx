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
    <div style={{ textAlign: 'center', position: 'relative' }} onClick={() => setShowOptions(!showOptions)}>
      <div style={{ fontSize: '1rem', marginTop: '10px', color: '#fff' }}>
        Compartir
      </div>

      <span
        style={{ fontSize: '2rem', cursor: 'pointer', color: '#fff' }}
        title="Compartir"
      >
        📣
      </span>

      {/* Share Options Dropdown */}
      {showOptions && (
        <div
          style={{
            marginTop: '10px',
            background: 'linear-gradient(135deg, #2c5364, #203a43, #0f2027)',
            fontSize: '1rem',
            color: '#fff',
            padding: '10px 15px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            position: 'absolute',
            top: '65px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            minWidth: '180px',
          }}
        >
          <div style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={handleCopy}>
            📋 Copiar enlace
          </div>
          <div
            style={{ marginBottom: '10px', cursor: 'pointer' }}
            onClick={() =>
              window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')
            }
          >
            📘 Compartir en Facebook
          </div>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() =>
              window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')
            }
          >
            🐦 Compartir en Twitter
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
