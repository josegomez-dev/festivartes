import styles from '@/app/assets/styles/AdminIndex.module.css';
import CoreSectionArtworks from '@/components/CoreSectionArtworks';
import CoreSectionJudges from '@/components/CoreSectionJudges';
import authStyles from '@/app/assets/styles/Auth.module.css';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './../../firebaseConfig';
import { useAuth } from '@/context/AuthContext';
import StarRating from '@/components/StarRating';
import ClapButton from '@/components/ClapButton';
import SocialShareButton from '@/components/SocialShareButton';
import { EMPTY_EVENT, EVENTS } from '@/types/events.types';
import { toast } from 'react-hot-toast';
import Preloader from '@/components/Preloader';
import CoreSectionSelectedArtworks from '@/components/CoreSectionSelectedArtworks';
import Image from 'next/image';
import CustomModal from '@/components/CustomModal';
import { ARTWORK } from '@/types/artworks.types';

const EventDetail = ({ }) => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter
  const { user, role } = useAuth();

  const [data, setData] = useState<EVENTS[]>([]);
  const [project, setProject] = useState<EVENTS>(EMPTY_EVENT);

  const [allArtworks, setAllArtworks] = useState<ARTWORK[]>([]);

  const [localSelectedArtworks, setLocalSelectedArtworks] = useState<string[]>([]);

  const [reaction, setReaction] = useState<"happy" | "sad" | null>(null);
  const [hasClapped, setHasClapped] = useState(false);

  const [selectArtworksModalOpen, setSelectArtworksModalOpen] = useState(false);
  const onCloseSelectArtworksModal = () => setSelectArtworksModalOpen(false);
  const onOpenSelectArtworksModal = () => setSelectArtworksModalOpen(true);

  const clapSoundRef = useRef<HTMLAudioElement | null>(null);
  const unclapSoundRef = useRef<HTMLAudioElement | null>(null);

  const fetchEvents = async (id: string | string[] | undefined) => {
    const params = new URLSearchParams(document.location.search);
    const _id = params.get('id');
    const _shareLink = params.get('share-link');
 
    if (_shareLink) {
      localStorage.setItem('share-link', _shareLink);
    } else {
      localStorage.removeItem('share-link');
    }

    try {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const events = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      const selectedProject = events.find(event => event.id === id || event.id === _id); ;
      if (selectedProject) {
        setProject(selectedProject as EVENTS);
      }
      setData(events as EVENTS[]);
      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  };

  const fetchAllArtworks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'artworks'));
      const artworks = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setAllArtworks(artworks as ARTWORK[]);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    }
  };

  useEffect(() => {
    fetchEvents(id);
    fetchAllArtworks();
  }, []);

  if (!project) {
    return <div>Loading...</div>;
  }

  const getCurrentClaps = () => {
    let counter = 0;
    if (project && project.claps) {
      project.claps.forEach((item) => {
        if (item.clap) {
          counter++;
        }
      });
    }
    return counter;
  };

  const getCurrentRating = () => {
    let rate = 0;
    project.stars.forEach((item) => {
      if (item.rating) {
        rate += item.rating;
      }
    });
    return rate;
  };

  const handleClap = async () => {
    setHasClapped(true);
    const docRef = doc(db, 'events', project.id);
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
    const docRef = doc(db, 'events', project.id);
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

  return (
    <div className={styles['full-view']}>
      {/* <SubMenu /> */}

      <CustomModal
        isOpen={selectArtworksModalOpen}
        onClose={onCloseSelectArtworksModal}
        height="85%" // Custom height
      >
        <div className="modal-title-centered">
            <b>Selecciona las obras</b>
        </div>
        <div className="form-wrapper">
          En esta seccion podrás seleccionar las obras que deseas exhibir en el evento.
          <CoreSectionArtworks filterBy={user?.uid} allItems selectMode selectItem={item => {
            if (localSelectedArtworks.includes(item)) {
              setLocalSelectedArtworks(localSelectedArtworks.filter(artwork => artwork !== item));
            } else {
              setLocalSelectedArtworks([...localSelectedArtworks, item]);
            }
          }} />

          <CoreSectionSelectedArtworks selectedArtworks={localSelectedArtworks} />

          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {allArtworks.map((item) => {
              if (localSelectedArtworks.includes(item.id)) {
                return (
                  <li key={item.id} style={{ fontSize: '0.8rem', marginBottom: '10px' }}>
                    {item.title} - {item.artist} - {item.type}
                  </li>
                );
              }
              return null;
            })}
          </ul>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button className={authStyles['auth-button']} onClick={onCloseSelectArtworksModal}>
              <b>Guardar selección</b>
            </button>
          </div>
        </div>
      </CustomModal>

      <audio ref={clapSoundRef} src="/sounds/spot.mp3" />
      <audio ref={unclapSoundRef} src="https://cdn.freesound.org/previews/687/687017_321967-lq.mp3" />

      <div className='project-detail-wrapper'>
        <div className="project-detail-container">
          
          <ul className="options-menu event-position">
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
              {!project.upcoming ? (
                <StarRating 
                  handleRating={handleRates} 
                  initialAverage={getFullRatingAverage()} 
                  myRating={getMyRating()}
                />
              ) : (
                <p
                  style={{ cursor: 'pointer', textAlign: 'center', marginTop: '20px' }}
                  onClick={() => toast.error('No puedes calificar un evento que aún no ha ocurrido.')}
                >
                  <b>⏰ Agendar</b>
                </p>
              )}
            </li>
            <li>
              <SocialShareButton />
            </li>
          </ul>
          <br />
          <br />
          <br />
          <br />
          <br />

          <h2>
            <b style={{ fontSize: '3rem' }}>
            {project.name || 'Title'}
            </b>
            <div>
              <Image
                src="/artworks-icon.png"
                alt="artworks-icon"
                width={35}
                height={35}
                priority />
                <span>{project.selectedArtworks?.length || 0}</span>
            </div>
          </h2>
          
           <br />
          {/*
          <p>
            {project.price <= 0 ? 
              <span className='bolder-text price-text'>Entrada libre y para toda la familia.</span> : 
              <span className='bolder-text price-text'>Costo de la entrada: ₡{project.price}</span>
            } 
          </p>
          <br /> */}
          <img 
            src={project.thumbnail} 
            alt={project.name} 
            className='project-thumbnail-wrapper'
          />
          <br />
          {/* <p ><b className='bolder-text'>Fecha:</b> {project.date}</p> */}
          <p ><b className='bolder-text'>Ubicación:</b> {project.location}</p>      
          <br />
          <p className='overflow-area'>
            {project.description}
          </p>
          {/* <LikeDislike /> */}
          {/* Add more project details as needed */}
        </div>

        {/* <br />
        <hr />

        <CoreSectionJudges /> */}

        {project.selectedArtworks?.length > 0 ? (
            <CoreSectionSelectedArtworks selectedArtworks={project?.selectedArtworks} />
          ) : (
            <>
            <br />
            <br />
              <button className={authStyles['auth-button']} style={{  marginLeft: '165px', width: '300px', animation: 'pulseGlow 1s infinite' }} onClick={onOpenSelectArtworksModal}>
                <b>¡Selecciona tus obras!</b>
              </button>
            </>
          )}

      </div>
    </div>
  );
};

export default EventDetail;
