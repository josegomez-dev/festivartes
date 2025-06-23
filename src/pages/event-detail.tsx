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
import CustomModal from '@/components/CustomModal';
import { ARTWORK } from '@/types/artworks.types';
import CoreSectionSelectedJudges from '@/components/CoreSectionSelectedJudges';
import { User } from '@/types/userTypes';
import RatingForm from '@/components/RatingForm';

const EventDetail = ({ }) => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter
  const { user, role } = useAuth();

  const [data, setData] = useState<EVENTS[]>([]);
  const [project, setProject] = useState<EVENTS>(EMPTY_EVENT);

  const [allArtworks, setAllArtworks] = useState<ARTWORK[]>([]);
  const [allJudges, setAllJudges] = useState<User[]>([]);

  const [localSelectedArtworks, setLocalSelectedArtworks] = useState<string[]>(project.selectedArtworks || []);
  const [localSelectedJudges, setLocalSelectedJudges] = useState<string[]>(project.selectedJudges || []);

  const [reaction, setReaction] = useState<"happy" | "sad" | null>(null);
  const [hasClapped, setHasClapped] = useState(false);

  const [selectArtworksModalOpen, setSelectArtworksModalOpen] = useState(false);
  const onCloseSelectArtworksModal = () => setSelectArtworksModalOpen(false);
  const onOpenSelectArtworksModal = () => setSelectArtworksModalOpen(true);

  const [selectJudgesModalOpen, setSelectJudgesModalOpen] = useState(false);
  const onCloseSelectJudgesModal = () => setSelectJudgesModalOpen(false);
  const onOpenSelectJudgesModal = () => setSelectJudgesModalOpen(true);

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
        ...(doc.data() as EVENTS),
        id: doc.id
      })) as EVENTS[];
      const selectedProject = events.find(event => event.id === id || event.id === _id);
      if (selectedProject) {
        setProject(selectedProject);
        setLocalSelectedArtworks(selectedProject.selectedArtworks || []);
        setLocalSelectedJudges(selectedProject.selectedJudges || []);
      }
      setData(events);
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

  const fetchAllJudges = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'accounts'));
      const accounts = querySnapshot.docs.map(doc => ({
        ...(doc.data() as User),
        id: doc.id
      }));
      const judges = accounts.filter(account => account.role === 'judge');
      setAllJudges(judges as User[]);
    } catch (error) {
      console.error('Error fetching judges:', error);
    }
  };

  useEffect(() => {
    fetchEvents(id);
    fetchAllArtworks();
    fetchAllJudges();
  }, []);

  if (!project) {
    return <div>Cargando Datos...</div>;
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

  const saveArtworksSelection = async () => {
    const docRef = doc(db, 'events', project.id);
    await updateDoc(docRef, {
      selectedArtworks: localSelectedArtworks,
    });
    onCloseSelectArtworksModal();
    toast.success('Obras seleccionadas correctamente!');
  };

  const saveJudgesSelection = async () => {
    const docRef = doc(db, 'events', project.id);
    await updateDoc(docRef, {
      selectedJudges: localSelectedJudges,
    });
    onCloseSelectJudgesModal();
    toast.success('Jurados seleccionados correctamente!');
  };

  return (
    <div className={styles['full-view']}>
      {/* <SubMenu /> */} 

      <CustomModal
        isOpen={selectArtworksModalOpen}
        onClose={onCloseSelectArtworksModal}
        height="100%" // Custom height
      >
        <div className="modal-title-centered">
            <b>
              Selección de obras para el evento
            </b>
        </div>
        <div className="form-wrapper">
          <p className='color-light-gray'>
            Selecciona las obras que deseas incluir en el evento.
          </p>
          <CoreSectionArtworks filterBy={user?.uid} allItems selectMode selectItem={item => {
            if (localSelectedArtworks.includes(item)) {
              setLocalSelectedArtworks(localSelectedArtworks.filter(artwork => artwork !== item));
            } else {
              setLocalSelectedArtworks([...localSelectedArtworks, item]);
            }
          }} />

          <CoreSectionSelectedArtworks selectedArtworks={localSelectedArtworks} />

          {localSelectedArtworks.length > 0 && (
            <>
              <hr />
              <br />
              <div className="">
                Confirmar selección de obras para el evento: 
                <ol className='selected-artworks-list'>
                  {allArtworks.map((item) => {
                    if (localSelectedArtworks.includes(item.id)) {
                      return (
                        <li key={`artwork-${item.id}`} className='selected-artwork-item'>
                          {item.title} -&nbsp;
                          <strong style={{ color: 'var(--color-orange)' }}>{item.artist}</strong> -&nbsp;
                          <span style={{ color: 'var(--color-blue)' }}>{item.type}</span>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ol>
              </div>
            </>)}
          
          <div className='modal-submit-buttons'>
            <button className={authStyles['auth-button']} onClick={saveArtworksSelection}>
              <b>Guardar selección</b>
            </button>
          </div>
        </div>
      </CustomModal>


      <CustomModal
        isOpen={selectJudgesModalOpen}
        onClose={onCloseSelectJudgesModal}
        height="100%" // Custom height
      >
        <div className="modal-title-centered">
            <b>
              Elije al jurado seleccionador
            </b>
        </div>
        <div className="form-wrapper">
          <p className='color-light-gray'>
            Selecciona los jueces que formarán parte del jurado para el evento.
          </p>
          <CoreSectionJudges filterBy={user?.uid} selectMode selectItem={item => {
            if (localSelectedJudges.includes(item)) {
              setLocalSelectedJudges(localSelectedJudges.filter(judge => judge !== item));
            } else {
              setLocalSelectedJudges([...localSelectedJudges, item]);
            }
          }} />

          <CoreSectionSelectedJudges selectedJudges={localSelectedJudges} />

          {localSelectedJudges.length > 0 && (
            <>
              <hr />
              <div className="">
                <br />
                Confirmar selección de jurados para el evento:
                <ol className='selected-artworks-list'>
                  {allJudges.map((item) => {
                    if (localSelectedJudges.includes(item.id)) {
                      return (
                        <li key={item.id} className='selected-artwork-item'>
                          <span style={{ color: 'var(--color-orange)' }}>{item.displayName}</span>&nbsp; 
                          <span style={{ color: 'var(--color-white)' }}>({item.category})</span>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ol>
              </div>
            </>)}
          
          <div className='modal-submit-buttons'>
            <button className={authStyles['auth-button']} onClick={saveJudgesSelection}>
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
              {!project.upcoming ? (
                <StarRating 
                  handleRating={handleRates} 
                  initialAverage={getFullRatingAverage()} 
                  myRating={getMyRating()}
                />
              ) : (
                <p
                  className='calendar-button'
                  onClick={() => toast.success('Agendar evento en el calendario')}
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
            <b className='font-size-title'>
            {project.name || 'Title'}
            </b>
          </h2>
          
          <img 
            src={project.thumbnail} 
            alt={project.name} 
            className='project-thumbnail-wrapper'
          />
          <br />
          <p>
            <b className='bolder-text'>&nbsp;
            &nbsp;Fecha:</b> &nbsp;
              <span style={{ animation: project.upcoming ? 'pulseGlow 1s infinite' : '', color: project.upcoming ? 'black' : '' }}>
                {`${project.date}`}
              </span>
          </p>
          <p ><b className='bolder-text'>Ubicación:</b> {project.location}</p>      
          <br />
          <p className='overflow-area'>
            {project.description}
          </p>
          {/* Add more project details as needed */}
          {role === 'admin' && (
              <>
                <br />
                <button className={authStyles['auth-button']} onClick={onOpenSelectArtworksModal}>
                  <b>¡Selecciona tus obras!</b>
                </button>
                <br />
                <button className={authStyles['auth-button']} onClick={onOpenSelectJudgesModal}>
                  <b>Elije al jurado seleccionador!</b>
                </button>
              </>)}
        </div>

        {project.selectedArtworks?.length > 0 ? (
            <CoreSectionSelectedArtworks selectedArtworks={localSelectedArtworks} />
          ) : (
            null
          )}
        {project.selectedJudges?.length > 0 ? (
            <CoreSectionSelectedJudges selectedJudges={localSelectedJudges} />
          ) : (
            null
          )}

      </div>
    </div>
  );
};

export default EventDetail;
