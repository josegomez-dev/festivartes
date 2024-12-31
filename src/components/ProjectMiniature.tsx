import React from 'react';
import Link from 'next/link';

const ProjectMiniature = ({ projects, type }) => {
  return (
    <div className={`project-miniature-container project-miniature-custom-${type}`}>
      {projects.map((project, index) => (
        <Link 
          key={index + project.name + 'react-key'} 
          href={`/${type}-detail?id=${project.id}`} // Use the unique ID or name
        >
          <div className="project-miniature">
            {project.upcoming && <div className="upcoming-message">
                <span className="icon">⏰</span>
                <b>Próximamente</b>
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

export default ProjectMiniature;
