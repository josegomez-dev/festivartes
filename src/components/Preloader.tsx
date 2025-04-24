import React from 'react';

const Preloader = ({ message = "Cargando..." }: { message?: string }) => {
  return (
    <div className="preloader-wrapper">
      <div className="spinner" />
      <p style={{ marginTop: '1rem' }}>{message}</p>

      <style jsx>{`
        .preloader-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 6px solid rgba(0, 0, 0, 0.1);
          border-left-color: #00c3ff;
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
