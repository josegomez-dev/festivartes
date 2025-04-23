import React, { useRef, useState } from 'react';

const LikeDislike = () => {
  const likeSound = useRef<HTMLAudioElement | null>(null);
  const dislikeSound = useRef<HTMLAudioElement | null>(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [reaction, setReaction] = useState<"happy" | "sad" | null>(null);

  const triggerReaction = (type: "happy" | "sad") => {
    setReaction(type);
    setTimeout(() => setReaction(null), 1500);
  };

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setDisliked(false);
      setLikeCount((count) => count + 1);
      if (disliked) setDislikeCount((count) => count - 1);
      likeSound.current?.play().catch((error) => {
        console.error('Playback failed:', error);
      });
      triggerReaction("happy");
    } else {
      setLiked(false);
      setLikeCount((count) => count - 1);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDisliked(true);
      setLiked(false);
      setDislikeCount((count) => count + 1);
      if (liked) setLikeCount((count) => count - 1);
      dislikeSound.current?.play().catch((error) => {
          console.error('Playback failed:', error);
      });
      triggerReaction("sad");
    } else {
      setDisliked(false);
      setDislikeCount((count) => count - 1);
    }
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '1.2rem',
    borderRadius: '50px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s ease, background-color 0.3s ease',
  };

  const likedStyle = {
    ...buttonStyle,
    backgroundColor: liked ? '#4caf50' : '#d4edda',
    color: liked ? 'white' : '#2e7d32',
  };

  const dislikedStyle = {
    ...buttonStyle,
    backgroundColor: disliked ? '#f44336' : '#fddede',
    color: disliked ? 'white' : '#c62828',
  };

  return (
    <div style={{ position: 'relative', textAlign: 'center', marginTop: '30px' }}>
      {/* Emoji Reaction Animation */}
      <audio ref={likeSound} src="https://cdn.freesound.org/previews/607/607207_7724198-lq.ogg" />
      <audio ref={dislikeSound} src="https://cdn.freesound.org/previews/687/687017_321967-lq.mp3" />
      {reaction && (
        <div
          style={{
            position: 'absolute',
            top: '-40px',
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

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
        <button
          onClick={handleLike}
          style={likedStyle}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          👍 Like ({likeCount})
        </button>

        <button
          onClick={handleDislike}
          style={dislikedStyle}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          👎 Dislike ({dislikeCount})
        </button>
      </div>

      {/* Animation keyframes */}
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

export default LikeDislike;
