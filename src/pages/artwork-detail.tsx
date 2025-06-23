import styles from '@/app/assets/styles/AdminIndex.module.css';
import registerForm from '@/app/assets/styles/RegisterForm.module.css';
import { useRouter } from 'next/router';
import AudioPlayer from "@/components/AudioPlayer";
import VideoPlayer from "@/components/VideoPlayer";
import DocumentEditor from "@/components/DocumentEditor";
import { use, useEffect, useRef, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from './../../firebaseConfig';
import CustomModal from '@/components/CustomModal';
import { useAuth } from '@/context/AuthContext';
import RatingForm from '@/components/RatingForm';
import ClapButton from '@/components/ClapButton';
import StarRating from '@/components/StarRating';
import SocialShareButton from '@/components/SocialShareButton';
import toast from 'react-hot-toast';
import { ARTWORK, EMPTY_ARTWORK } from '@/types/artworks.types';
import Preloader from '@/components/Preloader';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import CoreSectionRatingJudges from '@/components/CoreSectionRatingJudges';

const ArtworkDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter

  const [activeTab, setActiveTab] = useState('info'); // Active tab state
  const { user, role } = useAuth();

  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState(false);
  const openJudgeModal = () => setIsJudgeModalOpen(true);
  const closeJudgeModal = () =>setIsJudgeModalOpen(false);

  const [data, setData] = useState<ARTWORK[]>([]);
  const [project, setProject] = useState<ARTWORK>(EMPTY_ARTWORK);

  const [loading, setLoading] = useState(false);

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

  const uploadAudioFile = async (file: File, userId: string) => {
    try {
      const storageRef = ref(storage, `audios/${userId}/${file.name}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading audio:", error);
      toast.error("Error uploading audio");
      throw error;
    }
  };

  const uploadVideoFile = async (file: File, userId: string) => {
    try {
      const storageRef = ref(storage, `videos/${userId}/${file.name}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Error uploading video");
      throw error;
    }
  };
  
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }
    if (file && file.type.startsWith("audio/")) {
      if (user?.uid) {
        setLoading(true);
        uploadVideoFile(file, user.uid).then((url) => {
          const docRef = doc(db, 'artworks', project.id);
          updateDoc(docRef, { audio: url });
          setProject((prev) => ({ ...prev, audio: url }));
          setLoading(false);
          toast.success("Audio uploaded successfully!");
        }).catch((error) => {
          setLoading(false);
          console.error("Error uploading audio:", error);
          toast.error("Error uploading audio");
        });
      } else {
        toast.error("User ID is undefined. Cannot upload the audio.");
      }
    } else {
      toast.error("Please select a valid audio file.");
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }
    if (file && file.type.startsWith("video/")) {
      if (user?.uid) {
        setLoading(true);
        uploadAudioFile(file, user.uid).then((url) => {
          const docRef = doc(db, 'artworks', project.id);
          updateDoc(docRef, { video: url });
          setProject((prev) => ({ ...prev, video: url }));
          setLoading(false);
          toast.success("Video uploaded successfully!");
        }).catch((error) => {
          setLoading(false);
          console.error("Error uploading video:", error);
          toast.error("Error uploading video");
        });
      } else {
        toast.error("User ID is undefined. Cannot upload the video.");
      }
    } else {
      toast.error("Please select a valid video file.");
    }
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
          <RatingForm closeModal={closeJudgeModal} artworkIdentifier={project?.id} userIdentifier={user?.uid} />
        </div>
      </CustomModal>



      <div className="project-detail-wrapper">
        <div className="project-detail-container">
          <ul className="options-menu">
            <li>
              {hasClapped ? (
                <div className='clap-button-preloader'>
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
            {/* <button
              className={activeTab === 'live' ? 'active' : ''}
              onClick={() => handleTabClick('live')}
            >
              ⏺️
            </button> */}
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'audio' && (
              <>
                <h2>
                  <b className='font-size-title'>
                    {project.title || 'Title'}
                  </b>
                </h2>
                <br />
                {user?.uid && project.audio ? (
                  <>
                      {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="project-thumbnail-wrapper"
                        style={{ width: '100%' }}
                      />
                    ) : (
                      <img
                        src="https://getuikit.com/v2/docs/images/placeholder_600x400.svg"
                        alt={project.title}
                        className="project-thumbnail-wrapper"
                      />
                    )}
                  </>
                ) : (
                  <>
                    <p className='disabled small-text-size'>
                      No hay audio disponible para esta obra de arte.
                    </p>
                    <p>
                      <b className='bolder-text'>¡Subí el audio de tu obra de arte!</b>
                    </p>
                  </>
                )}
                <br />
                <br />

                {loading ? (
                  <Preloader message='🎵 Cargando audio... Estamos ajustando el sonido para ofrecerte la mejor calidad.' small />
                ) : (
                  <>
                    <br />
                    <div className="input-group margin-0-auto" >
                      <label htmlFor="audio">
                        Subir archivo de audio
                      </label>
                      <input
                        type="file"
                        id="audio"
                        name="audio"
                        className={styles.fileInput}
                        accept="audio/*" 
                        onChange={handleAudioUpload}
                      />
                    </div>
                  
                    <br />
                    <br />

                    <div className={`links-spaced ${project.audio ? '' : 'disabled'}`}>
                      <AudioPlayer
                        src={user?.uid ? project.audio : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}
                        // title={'Audio'}
                      />
                    </div>
                  </>
                  )}
                </>
            )}

            {activeTab === 'info' && (
              <>
                <h2>
                  <b className='font-size-title'>
                    {project.title || 'Title'}
                  </b>
                </h2>
                <br />
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
                  <div style={{ width: '300px', margin: '0 auto', color: 'lightgray'  }}>
                    <p className='project-info-small-text'>
                      🔐: 
                      <span style={{ color: project?.privacy === 'public' ? 'orange' : 'white' }}> &nbsp;
                        {project?.privacy === 'public' ? 'Público' : 'Privado'}
                      </span>
                    </p>
                  </div>
                  <p ><b className='bolder-text'>Artista:</b> {project.artist}</p>      
                  <p ><b className='bolder-text'>Categoria:</b> {project.category}</p>      
                  <br />
                  <p className="overflow-area">{project?.description}</p>
                </div>
              </>
            )}

            {activeTab === 'document' && (
              <>
                <DocumentEditor
                  title={project.title || 'Título de la Obra'}
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

            {activeTab === 'video' && (
              <>
                {loading ? (
                  <Preloader message='🎥 ¡Luces, cámara… casi acción! Preparando tu video…' small />
                ) : (
                  <>
                    <h2>
                      <b className='font-size-title'>
                        {project.title || 'Title'}
                      </b>
                    </h2>
                    <br />
                    
                    {user?.uid && project.video ? (
                      <VideoPlayer
                      src={user?.uid ? project.video : "https://file-examples.com/storage/fe46ad26fa67d4043a4b9e6/2017/04/file_example_MP4_480_1_5MG.mp4"}
                      // title={user?.uid ? project.title || 'Title' : "Video de la Obra de Arte"}
                    />
                    ) : (
                      <>
                        <p className='disabled small-text-size'>
                          No hay video disponible para esta obra de arte.
                        </p>
                        <p>
                          <b className='bolder-text'>¡Subí el video de tu obra de arte!</b>
                        </p>
                      </>
                    )}
                    
                    <br />
                    <br />
                    <div className="input-group margin-0-auto" >
                      <label htmlFor="video">
                        Subir video de la obra de arte
                      </label>
                      <input
                        type="file"
                        id="video"
                        name="video"
                        className={styles.fileInput}
                        accept="video/*" 
                        onChange={handleVideoUpload}
                      />
                    </div>
                  </>
                )}

  
                
              </>
            )}

            {activeTab === 'live' && (
              <div>
                Live Content Here
              </div>
            )}
          </div>
        </div>
        
        {/* {role === 'admin' && (
          <CoreSectionRatingJudges />
        )} */}

        <br />
        <br />
        <br />
        <br />
        <br />

      </div>

    </div>
  );
};

export default ArtworkDetail;
