import styles from '@/app/assets/styles/AdminIndex.module.css';
import SubMenu from '@/components/SubMenu';
import { useRouter } from 'next/router';
import AudioPlayer from "@/components/AudioPlayer";
import VideoPlayer from "@/components/VideoPlayer";
import DocumentEditor from "@/components/DocumentEditor";
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../firebaseConfig';
import CoreSectionJudges from '@/components/CoreSectionJudges';
import CustomModal from '@/components/CustomModal';
import { useAuth } from '@/context/AuthContext';
import RatingForm from '@/components/RatingForm';

const videos = [
  { id: 1, title: "Video 1", src: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" },
  { id: 2, title: "Video 2", src: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" },
];

const ArtworkDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('document'); // Active tab state
  const { role } = useAuth();

  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState(false);
  const openJudgeModal = () => setIsJudgeModalOpen(true);
  const closeJudgeModal = () =>setIsJudgeModalOpen(false);

  const [data, setData] = useState<{ id: string; [key: string]: any }[]>([]);
  const [project, setProject] = useState<{ id: string; [key: string]: any } | null>(null);


  const fetchEvents = async (id: string | string[] | undefined) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'artworks'));
      const events = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      const selectedProject = events.find(event => event.id === id);
      if (selectedProject) {
        setProject(selectedProject);
      }
      setData(events);
      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchEvents(id);
  }, []);

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

      <CustomModal
        isOpen={isJudgeModalOpen}
        onClose={closeJudgeModal}
        height="90%" // Custom height
      >
        <div className="modal-title-centered">
          <b>
            &nbsp;Puntuación Final (0-10)&nbsp;
          </b>
        </div>
        <div className="form-wrapper">
          <RatingForm />
        </div>
      </CustomModal>

      <div className='project-detail-wrapper'>
        <div className="project-detail-container">
          <ul className="options-menu">
            <li>⭐</li>
            <li onClick={() => {
              role === 'judge' ? openJudgeModal() : alert('Feature only for JUDGES')
            }}><b className='disabled'>🖋️ Calificar</b></li>
          </ul>
          <br />
          <br />
          <br />

          <h1>{project.title || 'Title'}</h1>
          <br />
          {project.thumbnail ? (
            <img src={project.thumbnail} alt={project.title} className='project-thumbnail-wrapper' />
          ) : (
            <img src='https://getuikit.com/v2/docs/images/placeholder_600x400.svg' alt={project.title} className='project-thumbnail-wrapper' />
          )}
          <br />
          <div>
            <br />
            <p ><b className='bolder-text'>Categoría:</b> {project?.category}</p>
            <p ><b className='bolder-text'>Compositor o Artista:</b> {project?.artist}</p>      
            <br />
            {project?.audio && (
              <div className='links-spaced'>
                <AudioPlayer src="https://file-examples.com/storage/fe46ad26fa67d4043a4b9e6/2017/11/file_example_MP3_700KB.mp3" title="Sample Track" />
              </div>
              )}
            {/* <p><b>Archivos de la Obra</b></p>
            <br /> */}

            {/* Tab Navigation */}
            {/* <div className="tabs">
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
            </div> */}

            {/* Tab Content */}
            {/* <div className="tab-content">
              {activeTab === 'document' && <DocumentEditor title={project.title} />}
              {activeTab === 'video' && (
                <div className="carousel">
                  <VideoPlayer src={videos[currentIndex].src} title={videos[currentIndex].title} />
                  <div className="controls">
                    <button onClick={prevVideo} disabled={currentIndex === 0}>⬅️ Prev</button>
                    <button onClick={nextVideo} disabled={currentIndex === videos.length - 1}>Next ➡️</button>
                  </div>
                </div>
              )}
              {activeTab === 'live' && <div>Live Content Here</div>}
            </div> */}
          </div>
        </div>

        <br />
        <hr />

        <CoreSectionJudges filterBy={project.judges} />

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
