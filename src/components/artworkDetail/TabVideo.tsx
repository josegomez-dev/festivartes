
// TabVideo.tsx
import React from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import Preloader from '@/components/Preloader';
import { ARTWORK } from '@/types/artworks.types';

interface TabVideoProps {
  project: ARTWORK;
  user: any;
  loading: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'video') => void;
}

const TabVideo: React.FC<TabVideoProps> = ({ project, user, loading, onUpload }) => {
  return (
    <div>
      <h2><b className='font-size-title'>{project.title || 'Título'}</b></h2>
      {loading ? (
        <Preloader message='🎥 Preparando tu video...' small />
      ) : (
        <>
          {user?.uid && project.video ? (
            <VideoPlayer src={project.video} />
          ) : (
            <>
              <p className='disabled small-text-size'>No hay video disponible para esta obra de arte.</p>
              <p><b className='bolder-text'>¡Subí el video de tu obra de arte!</b></p>
            </>
          )}
          <br /><br />
          <div className="input-group margin-0-auto">
            <label htmlFor="video">Subir video de la obra de arte</label>
            <input
              type="file"
              id="video"
              name="video"
              className="file-input"
              accept="video/*"
              onChange={(e) => onUpload(e, 'video')}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TabVideo;
