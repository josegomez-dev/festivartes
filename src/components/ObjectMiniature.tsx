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
          className='project-miniature-link'
        >
          <div className="project-miniature">
            {project.upcoming && <div className="upcoming-message">
                <b className='medium-text-size'>Próximamente</b>
              </div>}
            {project.thumbnail ? 
            <img 
              src={project.thumbnail} 
              alt={project.name} 
              className="project-thumbnail"
            /> : 
            <div className='banner-title'>
              <p className='small-text-size'>{project.name}</p>
            </div>}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ObjectMiniature;
