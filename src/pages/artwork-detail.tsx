import styles from '@/app/assets/styles/AdminIndex.module.css';
import SubMenu from '@/components/SubMenu';
import { MOCK_DATA_ARTWORKS } from '@/utils/constants';
import { useRouter } from 'next/router';
import { IoIosMusicalNotes } from "react-icons/io";
import { FaVideo } from "react-icons/fa6";
import { MdOutlineMenuBook } from "react-icons/md";
import AudioPlayer from "@/components/AudioPlayer";
import VideoPlayer from "@/components/VideoPlayer";
import DocumentEditor from "@/components/DocumentEditor";
import { useState } from 'react';

const videos = [
  { id: 1, title: "Video 1", src: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" },
  { id: 2, title: "Video 2", src: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" },
];

const ArtworkDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('document'); // Active tab state

  const project = MOCK_DATA_ARTWORKS.find(p => p.id === parseInt(id as string, 10));

  if (!project) {
    return <div>Loading...</div>;
  }

  const nextVideo = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles['full-view']}>
      <SubMenu />

      <div className='project-detail-wrapper'>
        <div className="project-detail-container">
          <h1>{project.name}</h1>
          <br />
          {project.thumbnail ? (
            <img src={project.thumbnail} alt={project.name} className='project-thumbnail-wrapper' />
          ) : (
            <img src='https://getuikit.com/v2/docs/images/placeholder_600x400.svg' alt={project.name} className='project-thumbnail-wrapper' />
          )}
          <br />
          <div>
            <p><b>Categoría de la Obra</b></p>
            <span className='bolder-text'>Cantautor Solista</span> 
            <br />
            <br />
            <div className='links-spaced'>
              <AudioPlayer src="https://file-examples.com/storage/fe46ad26fa67d4043a4b9e6/2017/11/file_example_MP3_700KB.mp3" title="Sample Track" />
            </div>
            <br />
            <hr />
            <br />
            <p><b>Archivos de la Obra</b></p>
            <br />

            {/* Tab Navigation */}
            <div className="tabs">
              <button 
                className={activeTab === 'document' ? 'active' : ''}
                onClick={() => handleTabClick('document')}
              >
                Editor de Documentos
              </button>
              <button 
                className={activeTab === 'video' ? 'active' : ''}
                onClick={() => handleTabClick('video')}
              >
                Reproductor de Video
              </button>
              <button 
                className={activeTab === 'live' ? 'active' : ''}
                onClick={() => handleTabClick('live')}
              >
                LIVE
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'document' && <DocumentEditor title={project.name} />}
              {activeTab === 'video' && (
                <div className="carousel">
                  <VideoPlayer src={videos[currentIndex].src} title={videos[currentIndex].title} />
                  <div className="controls">
                    <button onClick={prevVideo} disabled={currentIndex === 0}>⬅️ Prev</button>
                    <button onClick={nextVideo} disabled={currentIndex === videos.length - 1}>Next ➡️</button>
                  </div>
                </div>
              )}
              {activeTab === 'live' && <div>Live Content Here</div>} {/* Add live content or functionality */}
            </div>

            <br />
            <hr />
            <br />
            <b>Letra & Música</b>
            <div>Jose Alejandro Gomez Castro</div>
          </div>
        </div>
      </div>

      {/* Tab Styles */}
      <style jsx>{`
        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          overflow-x: auto;
            filter: drop-shadow(0 0 0.1rem black);
        }
        .tabs button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .tabs button.active {
          background-color: orange;
          color: white;
        }
        .tab-content {
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
            background: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
            backdrop-filter: blur(100px); /* Apply the blur effect */
            border: 1px solid rgba(255, 255, 255, 0.2); /* Optional border for added style */
        }
        .carousel {
          text-align: center;
          background: #222;
          padding: 5px 0;
          color: white;
          border-radius: 10px;
        }
        .controls {
          margin-top: 10px;
          display: flex;
          justify-content: center;
          gap: 5px;
        }
        button {
          background: #444;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default ArtworkDetail;
