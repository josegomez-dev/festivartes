import styles from '@/app/assets/styles/AdminIndex.module.css';
import CoreSectionArtworks from '@/components/CoreSectionArtworks';
import CoreSectionJudges from '@/components/CoreSectionJudges';
import SubMenu from '@/components/SubMenu';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../firebaseConfig';
import CustomModal from '@/components/CustomModal';
import RatingForm from '@/components/RatingForm';

const EventDetail = ({ }) => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter
  const [data, setData] = useState<{ id: string; [key: string]: any }[]>([]);
  const [project, setProject] = useState<{ id: string; [key: string]: any } | null>(null);

  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState(false);
  const openJudgeModal = () => setIsJudgeModalOpen(true);
  const closeJudgeModal = () =>setIsJudgeModalOpen(false);


  const fetchEvents = async (id: string | string[] | undefined) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'));
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
          <ul className="options-menu event-position">
            <li>⭐</li>
            <li onClick={openJudgeModal}>👤</li>
          </ul>
          <br />
          <br />
          <br />
          <h2>{project.name || 'Title'}</h2>
          <br />
          <img 
            src={project.thumbnail} 
            alt={project.name} 
            className='project-thumbnail-wrapper'
          />
          <br />
          <p ><b className='bolder-text'>Fecha:</b> {project.date}</p>
          <p ><b className='bolder-text'>Ubicación:</b> {project.location}</p>      
          <br />
          <p className='overflow-area'>
            {project.description}
          </p>
          <div>
            <br />
            <p>
              {project.price <= 0 ? 
                <span className='bolder-text price-text'>Entrada libre y para toda la familia.</span> : 
                <span className='bolder-text price-text'>Costo de la entrada: ₡{project.price}</span>
              } 
            </p>
          </div>
          {/* Add more project details as needed */}
        </div>

        <br />
        <hr />

        <CoreSectionJudges filterBy={project.judges} />

        <br />
        <hr />

        <CoreSectionArtworks filterBy={project.artworks} />

      </div>
    </div>
  );
};

export default EventDetail;
