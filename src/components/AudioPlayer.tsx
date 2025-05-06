import { useState, useRef, useEffect } from "react";

interface AudioPlayerProps {
  src: string;
  title: string;
}

const AudioPlayer = ({ src, title }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
      }
    };
    const updateDuration = () => {
      if (audio) {
        setDuration(audio.duration);
      }
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);
    }
    
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = (parseFloat(e.target.value) * duration) / 100;
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={src} preload="metadata"></audio>
      <div className="player-controls">
        <button onClick={togglePlay}>{isPlaying ? "⏸️" : "▶️"}</button>
        <span>{title}</span>
        <input
          type="range"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
        />
        <span>{Math.floor(currentTime)} / {Math.floor(duration)}</span>
      </div>
      <style jsx>{`
        .audio-player {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #222;
          padding: 10px;
          border-radius: 8px;
          color: var(--color-white);
          filter: drop-shadow(0 0 0.1rem black);
        }
        .player-controls {
          display: flex;
          align-items: center;
          gap: 5px;
          margin: 0 auto;
        }
        button {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: var(--color-white);
        }
        input {
            width: 50px;
        }
      `}</style>
    </div>
  );
};

export default AudioPlayer;
