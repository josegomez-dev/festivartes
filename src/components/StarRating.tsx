import React, { useEffect, useRef, useState } from 'react';

interface StarRatingProps {
  totalStars?: number;
  initialAverage?: number;
  handleRating?: (rating: number) => void;
  myRating?: number;
}

const StarRating = ({ totalStars = 5, initialAverage = 0, handleRating, myRating }: StarRatingProps) => {
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
    <div className='text-align-center'>
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
        }}
      >
        {userRating && (
          <>
            Tu puntuación: {userRating}
          </>
          )}
      </div>

      {/* Default average */}
      {!userRating && !showFeedback && (
        <div className='average-rating' style={{ marginBottom: '-5px' }}>
          <span
              style={{
                cursor: 'pointer',
                fontSize: '1rem',
                color: '#ffc107',
                transition: 'color 0.2s ease',
              }}
            >
              ★
            </span> {initialAverage.toFixed(1)} / {totalStars} <br />
          Tu Puntuación {myRating !== undefined ? `: ${myRating}` : ' (no calificado)'}
        </div>
      )}

      {/* Stars */}
      <div className='star-rating-container'>
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={index}
              onClick={() => {
                setUserRating(starValue);
                handleRating && handleRating(starValue);
              }}
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
