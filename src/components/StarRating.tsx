import React, { useEffect, useRef, useState } from 'react';

const StarRating = ({ totalStars = 5, initialAverage = 3.8 }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hideAnimation, setHideAnimation] = useState(false);

  const displayRating = hover ?? userRating ?? initialAverage;

  useEffect(() => {
    if (userRating !== null) {
      audioRef.current?.play().catch((error) => {
        console.error('Playback failed:', error);
      });
      setShowFeedback(true);
      setHideAnimation(false);

      const hideTimer = setTimeout(() => setHideAnimation(true), 2200); // start fade out early
      const clearTimer = setTimeout(() => {
        setShowFeedback(false);
        setUserRating(null);
        setHover(null);
        setHideAnimation(false);
      }, 3000);

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(clearTimer);
      };
    }
  }, [userRating]);

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Feedback animation block */}
      <audio ref={audioRef} src="https://cdn.freesound.org/previews/784/784433_4468658-lq.mp3" />
      <div
        style={{
          opacity: showFeedback ? (hideAnimation ? 0 : 1) : 0,
          transform: showFeedback ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'opacity 1s ease, transform 0.5s ease',
          fontSize: '1rem',
          fontWeight: 'bold',
          color: 'green',
          marginBottom: '6px',
        }}
      >
        {userRating && (
          <>
            Tu calificación <br />
            {userRating} / {totalStars}
          </>
          )}
      </div>

      {/* Default average */}
      {!userRating && !showFeedback && (
        <div style={{ fontSize: '1rem', color: '#fff', marginBottom: '6px' }}>
          Promedio:<br /> {initialAverage.toFixed(1)} / {totalStars}
        </div>
      )}

      {/* Stars */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={index}
              onClick={() => setUserRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(null)}
              style={{
                cursor: 'pointer',
                fontSize: '1rem',
                color: starValue <= displayRating ? '#ffc107' : '#e4e5e9',
                transition: 'color 0.2s ease',
              }}
            >
              ★
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
