import React from 'react';
import Link from 'next/link';
import { FaStar } from "react-icons/fa";
import Image from 'next/image';
import { MdHideImage } from "react-icons/md";
import { ARTWORK } from '@/types/artworks.types';
import { EVENTS } from '@/types/events.types';

interface ObjectMiniatureProps {
  projects: any;
  type: string;
  customClass?: string;
  ratingException?: boolean;
  selectMode?: boolean;
  selectItem?: (artworkIdentifier: string) => void;
    onDelete?: (id: string) => void; // <- New prop
}

const badgeIcons: Record<string, string> = {
  escultura: "/icons-sculture.png",
  fotografia: "/icons-photography.png",
  musica: "/icons-music.png",
  baile: "/icons-dance.png",
  arte_digital: "/icons-digital.png",
  normal: "/icons-sculture.png",
};

const ObjectMiniature : React.FC<ObjectMiniatureProps> = ({ projects, type, customClass, ratingException, selectMode, selectItem }) => {

  return (
    <div className={`project-miniature-container project-miniature-custom-${type} ${customClass}`}>
      {projects.map((project: any, index: number) => (
        <Link 
          key={`project-${project.id || project.uid || index}`}
          href={selectMode ? `` : `/${type}-detail?id=${project.id || project.uid}`}
          className='project-miniature-link'
          onClick={(e) => {
            if (selectMode) {
              e.preventDefault();
              selectItem && selectItem(project.id || project.uid);
            }
          }}
        >

          {type === 'judge' && 
            <>
              {ratingException && (
                project?.rate && (
                  <p className='mTop-20'>
                    {project?.rate} 🖋️
                  </p>
                )
              )}
              
              <div style={{ marginTop: '-16px' }}></div>

              {badgeIcons[project.type] && (
                <Image
                  width={50}
                  height={50}
                  className={`judges-badge ${project.type === 'normal' ? 'badge-white' : 'badge-orange'}`} 
                  src={badgeIcons[project.type]} 
                  alt={project.type} 
                />
              )}
          </>}
          
          <div className="project-miniature">
            
            {/* {project.upcoming && 
              <div className="upcoming-message">
                <b className='small-text-size'>Próximamente </b>
                <br />
                ⏰
                {project.name}
              </div>} */}

            {project.thumbnail || project.profilePic ? 
              <img 
                src={project.thumbnail || project.profilePic}
                alt={project.name} 
                className="project-thumbnail"
              /> : 
              <div className='banner-title'>
                <p className='small-text-size'>
                  <MdHideImage className='medium-text-size' />
                </p>
                <p className='small-text-size'>{project.name}</p>
              </div>}

            {/* {selectMode && (
              <div className="title-artworks-container">
              <p>{project.title}</p>
            </div>)} */}
            
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ObjectMiniature;
