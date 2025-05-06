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
    <div className='clap-button-wrapper' onClick={handleClaps}>

      {/* Reaction Face Animation */}
      {reaction && (
        <div className='reaction-face'>
          {reaction === 'happy' ? '😊' : '😢'}
        </div>
      )}

      <div className='clap-count'>
        {currentClaps}
      </div>

      <button className='clap-button'>
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
