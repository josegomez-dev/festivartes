import styles from '@/app/assets/styles/AdminIndex.module.css';
import registerForm from '@/app/assets/styles/RegisterForm.module.css';
import { useRouter } from 'next/router';
import AudioPlayer from "@/components/AudioPlayer";
import VideoPlayer from "@/components/VideoPlayer";
import DocumentEditor from "@/components/DocumentEditor";
import { useEffect, useRef, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from './../../firebaseConfig';
import CustomModal from '@/components/CustomModal';
import { useAuth } from '@/context/AuthContext';
import RatingForm from '@/components/RatingForm';
import ClapButton from '@/components/ClapButton';
import StarRating from '@/components/StarRating';
import SocialShareButton from '@/components/SocialShareButton';
import toast from 'react-hot-toast';
import { ARTWORK, EMPTY_ARTWORK } from '@/types/artworks.types';
import Preloader from '@/components/Preloader';

const videos = [
  { id: 1, title: "Video 1", src: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" },
  { id: 2, title: "Video 2", src: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" },
];

const ArtworkDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('info'); // Active tab state
  const { user, role } = useAuth();

  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState(false);
  const openJudgeModal = () => setIsJudgeModalOpen(true);
  const closeJudgeModal = () =>setIsJudgeModalOpen(false);

  const [data, setData] = useState<ARTWORK[]>([]);
  const [project, setProject] = useState<ARTWORK>(EMPTY_ARTWORK);

  const [reaction, setReaction] = useState<"happy" | "sad" | null>(null);
  const [hasClapped, setHasClapped] = useState(false);

  const clapSoundRef = useRef<HTMLAudioElement | null>(null);
  const unclapSoundRef = useRef<HTMLAudioElement | null>(null);

  const fetchArtworks = async (id: string | string[] | undefined) => {
    const params = new URLSearchParams(document.location.search);
    const _id = params.get('id');
    const _shareLink = params.get('share-link');
 
    if (_shareLink) {
      localStorage.setItem('share-link', _shareLink);
    } else {
      localStorage.removeItem('share-link');
    }
    
    try {
      const querySnapshot = await getDocs(collection(db, 'artworks'));
      const events = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      const selectedProject = events.find(event => event.id === id || event.id === _id);
      if (selectedProject) {
        setProject(selectedProject as ARTWORK);
      }
      setData(events as ARTWORK[]);
      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchArtworks(id);
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

  const getCurrentClaps = () => {
    let counter = 0;
    project.claps.forEach((item) => {
      if (item.clap) {
        counter++;
      }
    });
    return counter;
  };

  const handleClap = async () => {
    setHasClapped(true);
    const docRef = doc(db, 'artworks', project.id);

    const updatedClaps = project.claps.map((item) => {
      if (item.userIdentifier === user?.uid) {
        return { ...item, clap: !item.clap }; // Toggle the clap state
      } 
      return item;
    });

    if (!updatedClaps.some((item) => item.userIdentifier === user?.uid)) {
      updatedClaps.push({ userIdentifier: user?.uid || '', clap: true });
    }

    await updateDoc(docRef, {
      claps: updatedClaps,
    });

    setProject((prevProject) => ({
      ...prevProject,
      claps: updatedClaps as { userIdentifier: string; clap: boolean; }[],
    }));

    const hasClapped = updatedClaps.some((item) => item.userIdentifier === user?.uid && item.clap);
    if (hasClapped) {
      if (clapSoundRef.current) {
        clapSoundRef.current.play();
      }
      setReaction("happy");
      toast.success('Clap added successfully!');
    } else {
      if (unclapSoundRef.current) {
        unclapSoundRef.current.play();
      }
      setReaction("sad");
      toast.error('Clap removed successfully!');
    }

    setTimeout(() => setReaction(null), 1500); // Hide face after 1.5s
    setHasClapped(false);
  };

  const handleRates = async (rate: number) => {
    const docRef = doc(db, 'artworks', project.id);
    const updatedStars = project.stars.map((item) => {
      if (item.userIdentifier === user?.uid) {
        return { ...item, rating: rate }; // Update the rating
      } 
      return item;
    });

    if (!updatedStars.some((item) => item.userIdentifier === user?.uid)) {
      updatedStars.push({ userIdentifier: user?.uid || '', rating: rate });
    }

    await updateDoc(docRef, {
      stars: updatedStars,
    });

    setProject((prevProject) => ({
      ...prevProject,
      stars: updatedStars as { userIdentifier: string; rating: number; }[],
    }));

    toast.success('Rating added successfully!');
  };  

  const getFullRatingAverage = () => {
    const totalStars = project.stars.length;
    const totalRating = project.stars.reduce((acc, item) => acc + (item.rating || 0), 0);
    const average = totalStars > 0 ? totalRating / totalStars : 0;
    return average;
  };

  const getMyRating = () => {
    const myRating = project.stars.find((item) => item.userIdentifier === user?.uid);
    return myRating ? myRating.rating : 0;
  };
  
  const getTodayDate = () => {
    const now = new Date();
    const formatted = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getFullYear()}`;  
    return formatted;
  }

  return (
    <div className={styles['full-view']}>
      {/* <SubMenu /> */}
      <audio ref={clapSoundRef} src="/sounds/spot.mp3" />
      <audio ref={unclapSoundRef} src="https://cdn.freesound.org/previews/687/687017_321967-lq.mp3" />

      <CustomModal
        isOpen={isJudgeModalOpen}
        onClose={closeJudgeModal}
        height="80%" // Custom height
      >
        <div className="form-wrapper">
          <RatingForm />
        </div>
      </CustomModal>

      {project?.audio && (
        <div className="links-spaced" style={{ width: '100%', margin: '0 auto', position: 'fixed', bottom: '0px', left: '50%', right: '50%', transform: 'translateX(-50%)', zIndex: 30,  }}>
        <AudioPlayer
          src="https://file-examples.com/storage/fe46ad26fa67d4043a4b9e6/2017/11/file_example_MP3_700KB.mp3"
          title={`Escucha [${project.title}]`}
        />
      </div>
      )}


      <div className="project-detail-wrapper">
        <div className="project-detail-container">
          <ul className="options-menu">
            <li>
              {hasClapped ? (
                <div style={{ textAlign: 'center', position: 'relative', width: '50px' }}>
                  <Preloader message='' small />
                </div>
                ) : (
                  <ClapButton 
                    currentClaps={getCurrentClaps()} 
                    handleClaps={handleClap} 
                    reaction={reaction} 
                  />  
                )}
            </li>
            <li>
              <StarRating 
                handleRating={handleRates} 
                initialAverage={getFullRatingAverage()} 
                myRating={getMyRating()}
              />
            </li>
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
            {/* <button
              className={activeTab === 'audio' ? 'active' : ''}
              onClick={() => handleTabClick('audio')}
            >
              🔊
            </button> */}
            {/* <button
              className={activeTab === 'video' ? 'active' : ''}
              onClick={() => handleTabClick('video')}
            >
              🎥
            </button> */}
            {/* <button
              className={activeTab === 'live' ? 'active' : ''}
              onClick={() => handleTabClick('live')}
            >
              LIVE
            </button> */}
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* {activeTab === 'audio' && (
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
            )} */}

            {activeTab === 'info' && (
              <>
                <h1>
                  <b style={{ fontSize: '3rem' }}>{project.title || 'Title'}</b>
                </h1>
                <br />
                <div className="input-group" style={{ margin: '0 auto'}}>
                  <label htmlFor="thumbnail">
                    Subir archivo mp3 de la obra de arte
                  </label>
                  <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    className={styles.fileInput}
                    accept="image/*"
                    //onChange={handleImageUpload}
                  />
                </div>
                <br />
                <div style={{ width: '300px', margin: '0 auto', color: 'lightgray'  }}>
                  <p style={{ fontSize: '12px' }}>
                  🎨: {project?.category} 
                  &nbsp;
                  &nbsp;
                  👨🏻‍🎤: {project?.artist}
                  </p>
                </div>
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
                  <br />
                  <p className="overflow-area">{project?.description}</p>
                </div>

                {project?.audio && (
                  <>
                    <br />
                    <br />
                  </>
                )}
                
                {role === 'judge' && (
                  <>
                    <br />
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

              </>
            )}

            {activeTab === 'document' && (
              <>
                <DocumentEditor
                  title="Editor de Documentos"
                  placeholder="Empieza a escribir tu historia aquí..."
                  readOnly={false}
                  // onSave={(content) => console.log('Saving:', content)}
                  theme="snow"
                  height="500px"
                  artworkIdentifier={project.id}
                  initialContent={project.document || `
                      <h1>
                        <b>${project.title || 'Título de la Obra'}</b>
                      </h1>
                      <br/>
                      <p>Descripción: ${project.description}</p>
                      <br/>
                      <p>🎨 Esta es una obra de arte creada por <b>${project.artist}</b>.</p>
                      <p>📅 Fecha: ${getTodayDate()}</p>
                    `}
                />
              </>
            )}

            {/* {activeTab === 'video' && (
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
            )} */}

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
