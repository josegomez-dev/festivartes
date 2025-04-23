import React, { useRef, useState } from 'react';

const ClapButton = ({ maxClaps = 50 }) => {
  const clapSoundRef = useRef<HTMLAudioElement | null>(null);
  const unclapSoundRef = useRef<HTMLAudioElement | null>(null);
  const [claps, setClaps] = useState(0);
  const [hasClapped, setHasClapped] = useState(false);
  const [reaction, setReaction] = useState<"happy" | "sad" | null>(null);

  const handleClapToggle = () => {
    if (hasClapped) {
      const audio = unclapSoundRef.current;

      if (audio) {
        audio.volume = 0.8; // Start at full volume
        audio.play().catch((e) => console.error('Clap sound error:', e));
      
        const fadeDuration = 2000; // Total fade time in ms
        const fadeStep = 10; // How often to reduce volume (ms)
        const fadeAmount = audio.volume / (fadeDuration / fadeStep); // Volume step
      
        const fadeInterval = setInterval(() => {
          if (audio.volume - fadeAmount > 0) {
            audio.volume -= fadeAmount;
          } else {
            audio.volume = 0;
            clearInterval(fadeInterval);
            audio.pause(); // Optional: pause when faded out
            audio.currentTime = 0; // Reset to beginning
            audio.volume = 0.8; // Reset volume for next play
          }
        }, fadeStep);
      }    

      unclapSoundRef.current?.play().catch((e) => console.error('Unclap sound error:', e));
      setClaps((prev) => Math.max(prev - 1, 0));
      setReaction("sad");
    } else {
      if (claps < maxClaps) {
        
        const audio = clapSoundRef.current;

        if (audio) {
          audio.volume = 0.8; // Start at full volume
          audio.play().catch((e) => console.error('Clap sound error:', e));
        
          const fadeDuration = 5500; // Total fade time in ms
          const fadeStep = 10; // How often to reduce volume (ms)
          const fadeAmount = audio.volume / (fadeDuration / fadeStep); // Volume step
        
          const fadeInterval = setInterval(() => {
            if (audio.volume - fadeAmount > 0) {
              audio.volume -= fadeAmount;
            } else {
              audio.volume = 0;
              clearInterval(fadeInterval);
              audio.pause(); // Optional: pause when faded out
              audio.currentTime = 0; // Reset to beginning
              audio.volume = 0.8; // Reset volume for next play
            }
          }, fadeStep);
        }        

        setClaps((prev) => prev + 1);
        setReaction("happy");
      }
    }
    setHasClapped(!hasClapped);

    setTimeout(() => setReaction(null), 1500); // Hide face after 1.5s
  };

  return (
    <div style={{ textAlign: 'center', position: 'relative' }} onClick={handleClapToggle}>
      <audio ref={clapSoundRef} src="/sounds/spot.mp3" />
      <audio ref={unclapSoundRef} src="https://cdn.freesound.org/previews/687/687017_321967-lq.mp3" />

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
        {claps}
      </div>

      <button
        style={{
          fontSize: '2rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: hasClapped ? '#f50057' : '#aaa',
          transform: hasClapped ? 'scale(1.2)' : 'scale(1)',
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
