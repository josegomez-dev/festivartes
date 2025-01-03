import React from 'react';
import Link from 'next/link';

interface ObjectMiniatureProps {
  projects: any;
  type: string;
}

const ObjectMiniature : React.FC<ObjectMiniatureProps> = ({ projects, type }) => {
  return (
    <div className={`project-miniature-container project-miniature-custom-${type}`}>
      {projects.map((project: any, index: number) => (
        <Link 
          key={index + project.name + 'react-key'} 
          href={`/${type}-detail?id=${project.id}`}
          style={{ textDecoration: 'none' }}
        >
          <div className="project-miniature">
            {project.upcoming && <div className="upcoming-message">
                <b style={{ color: 'black' }}>Próximamente</b>
              </div>}
            {project.thumbnail ? 
            <img 
              src={project.thumbnail} 
              alt={project.name} 
              className="project-thumbnail"
            /> : 
            <div className="banner" style={{ padding: '10px' }}>
              {!project.upcoming && <><br /></>}
              <p style={{ fontSize: '14px' }}>{project.name}</p>
              <p style={{ fontSize: '8px', height: 'auto', marginTop: '5px', color: '#444' }}>Lorem ipsum adipisicing elit. Magni?</p>
            </div>}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ObjectMiniature;
