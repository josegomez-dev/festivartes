
// TabAudio.tsx
import React from 'react';
import AudioPlayer from '@/components/AudioPlayer';
import Preloader from '@/components/Preloader';
import { ARTWORK } from '@/types/artworks.types';

interface TabAudioProps {
  project: ARTWORK;
  user: any;
  loading: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'audio') => void;
}

const TabAudio: React.FC<TabAudioProps> = ({ project, user, loading, onUpload }) => {
  return (
    <div>
      <h2><b className='font-size-title'>{project.title || 'Título'}</b></h2>
      {loading ? (
        <Preloader message='🎵 Cargando audio...' small />
      ) : (
        <>
          {user?.uid && project.audio ? (
            <AudioPlayer src={project.audio} />
            ) : (
            <>
              <p className='disabled small-text-size'>No hay audio disponible para esta obra de arte.</p>
              <p><b className='bolder-text'>¡Subí el audio de tu obra de arte!</b></p>
            </>
            )}
            <br />
            <br />
            <div className="input-group margin-0-auto">
                <label htmlFor="audio">Subir archivo de audio</label>
                <input
                type="file"
                id="audio"
                name="audio"
                className="file-input"
                accept="audio/*"
                onChange={(e) => onUpload(e, 'audio')}
                />
            </div>
        </>
      )}
    </div>
  );
};

export default TabAudio;