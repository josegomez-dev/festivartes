import React from 'react';

interface PreloaderProps {
  message?: string;
  small?: boolean;
}



const Preloader = ({ message = "Cargando...", small }: PreloaderProps) => {
  return (
    <div className="preloader-wrapper">
      <div className="spinner" />
      <p>{message}</p>

      <style jsx>{`
        .preloader-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-top: 20px;
        }

        .spinner {
          width: ${small ? '30px' : '50px'};
          height: ${small ? '30px' : '50px'};
          border: 6px solid rgba(0, 0, 0, 0.1);
          border-left-color: var(--color-orange);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
