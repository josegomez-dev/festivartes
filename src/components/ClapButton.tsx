import React, { useRef, useState } from 'react';

interface ClapButtonProps {
  maxClaps?: number;
  currentClaps?: number;
  handleClaps: () => void;
  reaction?: 'happy' | 'sad' | null;
  hasClapped?: boolean;
}

const ClapButton: React.FC<ClapButtonProps> = ({ maxClaps = 50, currentClaps = 0, handleClaps, reaction, hasClapped }) => {
  return (
    <div style={{ textAlign: 'center', position: 'relative' }} onClick={handleClaps}>

      {/* Reaction Face Animation */}
      {reaction && (
        <div
          style={{
            position: 'absolute',
            top: '-70px',
            left: '50%',
            transform: 'translateX(-50%) scale(1)',
            fontSize: '2rem',
            opacity: 1,
            animation: 'fadeOutScale 1.5s forwards',
          }}
        >
          {reaction === 'happy' ? '😊' : '😢'}
        </div>
      )}

      <div style={{ fontSize: '1rem', marginTop: '4px', color: '#fff' }}>
        {currentClaps}
      </div>

      <button
        style={{
          fontSize: '2rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          // color: hasClapped ? '#f50057' : '#aaa',
          // transform: hasClapped ? 'scale(1.2)' : 'scale(1)',
          transition: 'transform 0.2s ease',
        }}
      >
        👏
      </button>

      {/* Animation styles */}
      <style>
        {`
          @keyframes fadeOutScale {
            0% {
              opacity: 1;
              transform: translateX(-50%) scale(1);
            }
            100% {
              opacity: 0;
              transform: translateX(-50%) scale(2);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ClapButton;
