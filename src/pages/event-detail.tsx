import styles from '@/app/assets/styles/AdminIndex.module.css';
import CoreSectionArtworks from '@/components/CoreSectionArtworks';
import CoreSectionJudges from '@/components/CoreSectionJudges';
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

const EventDetail = ({ }) => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter
  const { user, role } = useAuth();

  const [data, setData] = useState<EVENTS[]>([]);
  const [project, setProject] = useState<EVENTS>(EMPTY_EVENT);

  const [reaction, setReaction] = useState<"happy" | "sad" | null>(null);
  const [hasClapped, setHasClapped] = useState(false);

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

  useEffect(() => {
    fetchEvents(id);
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
                  <b>⏰ Guardar en el Calendario</b>
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

          <p>
            {project.price <= 0 ? 
              <span className='bolder-text price-text'>Entrada libre y para toda la familia.</span> : 
              <span className='bolder-text price-text'>Costo de la entrada: ₡{project.price}</span>
            } 
          </p>
          <br />
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

        <CoreSectionSelectedArtworks selectedArtworks={project?.selectedArtworks} />

      </div>
    </div>
  );
};

export default EventDetail;
