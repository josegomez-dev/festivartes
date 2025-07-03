import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdHideImage } from "react-icons/md";
import { ARTWORK } from '@/types/artworks.types';
import { EVENTS } from '@/types/events.types';

interface ObjectMiniatureProps {
  projects: ARTWORK[] | EVENTS[] | any[];
  type: string;
  customClass?: string;
  ratingException?: boolean;
  selectMode?: boolean;
  selectItem?: (artworkIdentifier: string) => void;
  onDelete?: (id: string) => void;
  currentUserId?: string;
}

const badgeIcons: Record<string, string> = {
  musica: "/icons/icons-music.png",
  baile: "/icons/icons-dance.png",
  arte: "/icons/icons-digital.png",
};

const ObjectMiniature: React.FC<ObjectMiniatureProps> = ({
  projects,
  type,
  customClass = '',
  ratingException,
  selectMode = false,
  selectItem,
  onDelete,
  currentUserId
}) => {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    projectId: string,
    isPrivate: boolean,
    isOwner: boolean
  ) => {
    if (selectMode && selectItem && (!isPrivate || isOwner)) {
      e.preventDefault();
      selectItem(projectId);
    }

    if (isPrivate && !selectMode && !isOwner) {
      e.preventDefault(); // block navigation
    }
  };

  return (
    <div className={`project-miniature-container project-miniature-custom-${type} ${customClass}`}>
      {projects.map((project, index) => {
        const projectId = project.id || project.uid || index.toString();
        const imageUrl = project.thumbnail || project.profilePic;
        const icon = badgeIcons[project.type];
        const isPrivate = project.privacy === 'private';
        const isOwner = project.createdBy === currentUserId;
        const isDisabled = isPrivate && !selectMode && !isOwner;

        return (
          <Link
            key={`project-${projectId}`}
            href={selectMode ? '' : `/${type}-detail?id=${projectId}`}
            className={`project-miniature-link ${isDisabled ? 'disabled-miniature' : ''}`}
            onClick={(e) => handleClick(e, projectId, isPrivate, isOwner)}
          >
            {type === 'judge' && (
              <>
                {ratingException && project?.rate && (
                  <p className="mTop-20">{project.rate} 🖋️</p>
                )}
                <div style={{ marginTop: '-16px' }} />
                {icon && (
                  <Image
                    width={50}
                    height={50}
                    className={`judges-badge ${project.type === 'normal' ? 'badge-white' : 'badge-orange'}`}
                    src={icon}
                    alt={project.type}
                  />
                )}
              </>
            )}

            <div className="project-miniature" style={{ position: 'relative' }}>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={project.name}
                  className="project-thumbnail"
                />
              ) : (
                <div className="banner-title">
                  <p className="small-text-size">
                    <MdHideImage className="medium-text-size" />
                  </p>
                  <p className="small-text-size">{project.name}</p>
                </div>
              )}

              {isDisabled && (
                <>
                  <div className="blur-overlay" />
                  <div className="lock-overlay animated-lock">🔐</div>
                </>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ObjectMiniature;
