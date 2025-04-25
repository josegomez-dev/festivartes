import styles from '@/app/assets/styles/AdminIndex.module.css';
import registerForm from '@/app/assets/styles/RegisterForm.module.css';
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
import ClapButton from '@/components/ClapButton';
import StarRating from '@/components/StarRating';
import SocialShareButton from '@/components/SocialShareButton';
import toast from 'react-hot-toast';

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
          <b>&nbsp;Puntuación Final (0-10)&nbsp;</b>
        </div>
        <div className="form-wrapper">
          <RatingForm />
        </div>
      </CustomModal>


      <div className="project-detail-wrapper">
        <div className="project-detail-container">
          <ul className="options-menu">
            <li><ClapButton /></li>
            <li><StarRating /></li>
            <li><SocialShareButton /></li>
          </ul>

          <br />
          <br />
          <br />
          <br />
          <br />

          {/* Tab Navigation */}
          <div className="tabs">
            <button
              className={activeTab === 'info' ? 'active' : ''}
              onClick={() => handleTabClick('info')}
            >
              🖼️
            </button>
            <button
              className={activeTab === 'document' ? 'active' : ''}
              onClick={() => handleTabClick('document')}
            >
              📄
            </button>
            <button
              className={activeTab === 'audio' ? 'active' : ''}
              onClick={() => handleTabClick('audio')}
            >
              🔊
            </button>
            <button
              className={activeTab === 'video' ? 'active' : ''}
              onClick={() => handleTabClick('video')}
            >
              🎥
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
            {activeTab === 'audio' && (
              <>
                <h2><b>🔊 Reproductor de Audio</b></h2>
                <br />
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="project-thumbnail-wrapper"
                    style={{ width: '120px' }}
                  />
                ) : (
                  <img
                    src="https://getuikit.com/v2/docs/images/placeholder_600x400.svg"
                    alt={project.title}
                    className="project-thumbnail-wrapper"
                  />
                )}
                <br />
                <br />
                <div className="links-spaced">
                  <AudioPlayer
                    src="https://file-examples.com/storage/fe46ad26fa67d4043a4b9e6/2017/11/file_example_MP3_700KB.mp3"
                    title="Sample Track"
                  />
                </div>
              </>
            )}

            {activeTab === 'info' && (
              <>
                <h1>
                  <b style={{ fontSize: '3rem' }}>{project.title || 'Title'}</b>
                </h1>
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="project-thumbnail-wrapper"
                  />
                ) : (
                  <img
                    src="https://getuikit.com/v2/docs/images/placeholder_600x400.svg"
                    alt={project.title}
                    className="project-thumbnail-wrapper"
                  />
                )}
                <div>
                  <p><b className="bolder-text">Categoría:</b> {project?.category}</p>
                  <p><b className="bolder-text">Compositor o Artista:</b> {project?.artist}</p>
                  <br />
                  <p className="overflow-area">{project?.description}</p>
                  <br />
                </div>
                <button
                  className={registerForm['submitButton']}
                  onClick={() => {
                    role === 'judge'
                      ? openJudgeModal()
                      : toast.error('No tienes permisos para calificar esta obra de arte');
                  }}
                >
                  <b>🖋️ Calificar Obra de Arte</b>
                </button>
              </>
            )}

            {activeTab === 'document' && (
              <>
                <DocumentEditor
                  title="Editor de Documentos"
                  placeholder="Empieza a escribir tu historia aquí..."
                  readOnly={false}
                  onSave={(content) => console.log('Saving:', content)}
                  theme="snow"
                  height="500px"
                />
                <button className={registerForm['submitButton']}>
                  💾 <b>Guardar Documento</b>
                </button>
              </>
            )}

            {activeTab === 'video' && (
              <>
                <h2><b>🔊 Reproductor de Video</b></h2>
                <br />
                <div className="carousel">
                <VideoPlayer
                  src={videos[currentIndex].src}
                  title={videos[currentIndex].title}
                />
                <div className="controls">
                  <button
                    onClick={prevVideo}
                    disabled={currentIndex === 0}
                  >
                    ⬅️ Prev
                  </button>
                  <button
                    onClick={nextVideo}
                    disabled={currentIndex === videos.length - 1}
                  >
                    Next ➡️
                  </button>
                </div>
              </div>
              </>
            )}

            {activeTab === 'live' && (
              <div>
                Live Content Here
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab Styles */}
      <style jsx>{`
        .tabs {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        .tabs button {
          padding: 5px 10px;
          font-size: 16px;
          cursor: pointer;
          border: 1px solid #ccc;
          border-radius: 5px;
          background: linear-gradient(135deg, #2c5364, #203a43, #0f2027);
          backdrop-filter: blur(100px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
        }
        .tabs button:hover {
          transition: all 0.5s;
          background: orange;
        }
        .tabs button.active {
          transition: all 0.5s;
          transform: scale(1.15);
          background: orange;
          color: white;
        }
        .tab-content {
          padding: 10px 0;
          border-radius: 5px;
          height: 100%;
          min-height: 350px;
          width: 100%;
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
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default ArtworkDetail;
