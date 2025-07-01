import React from 'react';
import { ARTWORK } from '@/types/artworks.types';

interface TabInfoProps {
  project: ARTWORK;
  onTogglePrivacy: (newPrivacy: 'public' | 'private') => void;
}

const TabInfo: React.FC<TabInfoProps> = ({ project, onTogglePrivacy }) => {
  const isPublic = project?.privacy === 'public';

  const handleToggle = () => {
    const newPrivacy = isPublic ? 'private' : 'public';
    onTogglePrivacy(newPrivacy);
  };

  return (
    <div>
      <h2><b className='font-size-title'>{project.title || 'Título'}</b></h2>
     
      <div style={{ width: '300px', margin: '0 auto', color: 'lightgray' }}>
        <p className='project-info-small-text' style={{ marginBottom: '5px' }}>
          🔐:&nbsp;
          <span style={{ color: isPublic ? 'orange' : 'red' }}>
            {isPublic ? 'Público' : 'Privado'}
            &nbsp;
            &nbsp;
            <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isPublic}
                onChange={handleToggle}
                style={{ position: 'absolute', marginTop: '-10px' }}
              />
            </label>
          </span>
        </p>
      
      </div>

      <img
        src={project.thumbnail || 'https://getuikit.com/v2/docs/images/placeholder_600x400.svg'}
        alt={project.title}
        className="project-thumbnail-wrapper"
        style={{ width: '100%', height: 'auto', maxWidth: '600px', borderRadius: '8px' }}
      />

      <div style={{ width: '300px', textAlign: 'left', margin: '0 auto' }}>
        <p><b className='bolder-text'>Artista:</b> {project.artist}</p>
        <p><b className='bolder-text'>Categoría:</b> {project.category}</p>
      </div>
      
      <br />
      <p className="overflow-area">{project.description}</p>
    </div>
  );
};

export default TabInfo;
