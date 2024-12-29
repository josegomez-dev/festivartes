import React from 'react';
import Link from 'next/link';

const ProjectMiniature = ({ projects, type }) => {
  return (
    <div className="project-miniature-container">
      {projects.map((project, index) => (
        <Link 
          key={index + project.name + 'react-key'} 
          href={`/admin/${type}-detail?id=${project.id}`} // Use the unique ID or name
        >
          <div className="project-miniature">
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
