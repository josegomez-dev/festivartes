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
}

const ObjectMiniature : React.FC<ObjectMiniatureProps> = ({ projects, type, customClass, ratingException, selectMode, selectItem }) => {

  // const getStarsRaitingByProject = (project: ARTWORK | EVENTS) => {
  //   let average = 0;

  //   if (!project.stars || project.stars.length === 0) {
  //     return 0;
  //   }
   
  //   const totalStars = project.stars.length;
  //   const totalRating = project.stars.reduce((acc, item) => acc + (item.rating || 0), 0);
  //   average = totalStars > 0 ? totalRating / totalStars : 0;
  //   return Math.round(average);
  // };

  // const getCurrentProjectClaps = (project: ARTWORK | EVENTS) => {
  //   let totalClaps = 0;
  //   if (project.claps && project.claps.length > 0) {
  //     project.claps.forEach((item: any) => {
  //       if (item.clap) {
  //         totalClaps++;
  //       }
  //     });
  //   }
  //   return totalClaps;
  // }

  return (
    <div className={`project-miniature-container project-miniature-custom-${type} ${customClass}`}>
      {projects.map((project: any, index: number) => (
        <Link 
          key={index + project.name + document.location.search + 'react-key'} 
          href={selectMode ? `` : `/${type}-detail?id=${project.id || project.uid}`}
          className='project-miniature-link'
          onClick={(e) => {
            if (selectMode) {
              e.preventDefault();
              // handle select mode logic here
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

              {project.type === 'escultura' &&  
                <Image
                  width={50}
                  height={50}
                  className='judges-badge badge-orange' 
                  src="/icons-sculture.png" 
                  alt="" 
                />
              }

              {project.type === 'fotografia' &&  
                <Image
                  width={50}
                  height={50}
                  className='judges-badge badge-orange' 
                  src="/icons-photography.png" 
                  alt="" 
                />
              }

              {project.type === 'musica' &&  
                <Image
                  width={50}
                  height={50}
                  className='judges-badge badge-orange' 
                  src="/icons-music.png" 
                  alt="" 
                />
              }
              
              {project.type === 'baile' &&  
                <Image
                  width={50}
                  height={50}
                  className='judges-badge badge-orange' 
                  src="/icons-dance.png" 
                  alt="" 
                />
              }
              
              {project.type === 'arte_digital' &&  
                <Image
                  width={50}
                  height={50}
                  className='judges-badge badge-orange' 
                  src="/icons-digital.png" 
                  alt="" 
                />
              }
              
              {project.type === 'normal' &&  
                <Image
                  width={50}
                  height={50}
                  className='judges-badge badge-white' 
                  src="/icons-sculture.png" 
                  alt="" 
                />
              }
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
