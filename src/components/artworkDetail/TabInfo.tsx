// TabInfo.tsx
import React from 'react';
import { ARTWORK } from '@/types/artworks.types';

interface TabInfoProps {
  project: ARTWORK;
}

const TabInfo: React.FC<TabInfoProps> = ({ project }) => {
  return (
    <div>
      <h2><b className='font-size-title'>{project.title || 'Título'}</b></h2>
      <img
        src={project.thumbnail || 'https://getuikit.com/v2/docs/images/placeholder_600x400.svg'}
        alt={project.title}
        className="project-thumbnail-wrapper"
        style={{ width: '100%', height: 'auto', maxWidth: '600px', borderRadius: '8px' }}
      />
      <div style={{ width: '300px', margin: '0 auto', color: 'lightgray' }}>
        <p className='project-info-small-text'>🔐:&nbsp;
          <span style={{ color: project?.privacy === 'public' ? 'orange' : 'white' }}>
            {project?.privacy === 'public' ? 'Público' : 'Privado'}
          </span>
        </p>
      </div>
      <p><b className='bolder-text'>Artista:</b> {project.artist}</p>
      <p><b className='bolder-text'>Categoría:</b> {project.category}</p>
      <br />
      <p className="overflow-area">{project.description}</p>
    </div>
  );
};

export default TabInfo;