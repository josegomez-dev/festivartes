import { useState, useRef, useEffect } from "react";

interface VideoPlayerProps {
  src: string;
  title?: string;
}

const VideoPlayer = ({ src, title }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const updateTime = () => {
      if (video) {
        setCurrentTime(video.currentTime);
      }
    };
    const updateDuration = () => {
      if (video) {
        setDuration(video.duration);
      }
    };

    if (video) {
      video.addEventListener("timeupdate", updateTime);
      video.addEventListener("loadedmetadata", updateDuration);
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", updateTime);
        video.removeEventListener("loadedmetadata", updateDuration);
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = (parseFloat(e.target.value) * duration) / 100;
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  const toggleFullscreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="video-player">
      <video ref={videoRef} src={src} width="100%" preload="metadata"></video>
      <div className="controls">
        <button onClick={togglePlay}>{isPlaying ? "⏸️" : "▶️"}</button>
        <span>{title}</span>
        <input
          type="range"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
        />
        <span>{Math.floor(currentTime)} / {Math.floor(duration)}</span>
        <button onClick={toggleFullscreen}>🔳</button>
      </div>
      <style jsx>{`
        .video-player {
          max-width: 600px;
          margin: 0 auto;
          border-radius: 8px;
          overflow: hidden;
          background: #222;
          color: var(--color-white);
          filter: drop-shadow(0 0 0.1rem var(--color-black));
        }
        video {
          width: 100%;
          display: block;
        }
        .controls {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 10px;
          background: #333;
        }
        button {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: var(--color-white);
        }
        input {
          width: 100px;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;
