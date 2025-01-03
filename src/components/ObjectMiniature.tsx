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
          href={`/${type}-detail?id=${project.id}`} // Use the unique ID or name
          style={{ textDecoration: 'none' }}
        >
          <div className="project-miniature">
            {project.upcoming && <div className="upcoming-message">
                {/* <span className="icon">⏰</span> */}
                <b style={{ color: 'black' }}>Próximamente</b>
              </div>}
            <img 
              src={project.thumbnail} 
              alt={project.name} 
              className="project-thumbnail"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ObjectMiniature;
