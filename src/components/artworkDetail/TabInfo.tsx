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
        <p>
          <span className='project-info-small-text'>¿Quién puede ver este proyecto?</span>
        </p>
        <p className='project-info-small-text' style={{ marginBottom: '5px' }}>
          🔐:&nbsp;
          <span style={{ color: isPublic ? 'lightgreen' : 'orange' }}>
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
        // src={project.thumbnail || 'https://getuikit.com/v2/docs/images/placeholder_600x400.svg'}
        src={'https://getuikit.com/v2/docs/images/placeholder_600x400.svg'}
        alt={project.title}
        className="project-thumbnail-wrapper"
        style={{ width: '100%', height: 'auto', maxWidth: '600px', borderRadius: '8px' }}
      />

      <div style={{ width: '100%', maxWidth: '600px', background: 'linear-gradient(0deg, var(--color-blue), var(--color-orange))', textAlign: 'justify', margin: '0 auto', padding: '10px', borderRadius: '8px', color: 'var(--color-white)' }}>
        <p><b>Artista/Grupo:</b> {project.artist}</p>
        <p><b>Categoría:</b> {project.category}</p>
        <hr />
        <b>Descripción de la Obra</b>
        <p className="overflow-area">{project.description}</p>
      </div>
      
    </div>
  );
};

export default TabInfo;
