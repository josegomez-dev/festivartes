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
        const isUpcoming = project.upcoming;

        // 🧮 Calculate claps
        const clapCount = Array.isArray(project.claps)
          ? project.claps.filter((c: { clap: boolean }) => c.clap).length
          : 0;

        // ⭐ Calculate average stars
        const starRatings = Array.isArray(project.stars)
          ? project.stars.map((s: { rating: number }) => s.rating)
          : [];

        const averageStars =
          starRatings.length > 0
            ? (starRatings.reduce((acc: number, val: number) => acc + val, 0) / starRatings.length).toFixed(1)
            : null;

        return (
          <Link
            key={`project-${projectId}`}
            href={selectMode ? '' : `/${type}-detail?id=${projectId}`}
            className={`project-miniature-link ${isDisabled ? 'disabled-miniature' : ''}`}
            onClick={(e) => handleClick(e, projectId, isPrivate, isOwner)}
          >
            <div className="project-miniature" style={{ position: 'relative' }}>
              {/* Thumbnail */}
              {imageUrl ? (
                <img src={imageUrl} alt={project.name} className="project-thumbnail" />
              ) : (
                <div className="banner-title">
                  <p className="small-text-size">
                    <MdHideImage className="medium-text-size" />
                  </p>
                  <p className="small-text-size">{project.name}</p>
                </div>
              )}

              {/* Blur and Lock for private */}
              {isDisabled && (
                <>
                  <div className="blur-overlay" />
                  <div className="lock-overlay animated-lock">🔐</div>
                </>
              )}

              {/* Info Overlay */}
              <div className="info-overlay">
                <div className="overlay-content">

                  {icon && (
                    <Image src={icon} alt="type" width={20} height={20} className="type-icon" />
                  )}

                  {/* Claps & Stars */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', textShadow: '1px 1px 2px black', overflow: 'auto' }}>
                    {clapCount > 0 && (
                      <span title="Claps">👏 {clapCount}</span>
                    )}
                    {averageStars && (
                      <span title="Average Rating">⭐ {averageStars}</span>
                    )}
                  </div>

                  <p 
                    className="project-title" 
                    style={{ 
                      animation: isUpcoming ? 'pulse 2s infinite' : '', 
                      background: isUpcoming ? 'orange' : '',
                      borderRadius: isUpcoming ? '6px' : '0', 
                      width: '100%',
                      textAlign: 'center',
                      overflow: 'auto',
                      color: isUpcoming ? 'white' : 'orange',
                      fontWeight: 'bold',
                      fontSize: '10px',
                      textShadow: '1px 1px 2px black'
                    }}
                  >
                    {project.name || project.title || project.displayName}
                  </p>
                </div>

                {/* Upcoming Badge */}
                {isUpcoming && (
                  <div className="upcoming-badge">
                    <button
                      className="calendar-btn"
                      style={{ animation: 'pulse 2s infinite' }}
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Save to calendar coming soon!');
                      }}
                    >
                      📅 Agendar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ObjectMiniature;
