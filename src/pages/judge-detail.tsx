import styles from '@/app/assets/styles/AdminIndex.module.css';
import SubMenu from '@/components/SubMenu';
import { MOCK_DATA_JUDGES } from '@/utils/constants';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../firebaseConfig';

const JudgeDetail = ({ }) => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter
  const [data, setData] = useState<{ id: string; [key: string]: any }[]>([]);
  const [project, setProject] = useState<{ id: string; [key: string]: any } | null>(null);

  const fetchEvents = async (id: string | string[] | undefined) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'judges'));
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

  // const project = MOCK_DATA_JUDGES.find(p => p.id === parseInt(id as string, 10));

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['full-view']}>
      <SubMenu />

      <div className='project-detail-wrapper'>
        <div className="project-detail-container">
          <h1>{project.name}</h1>
          <br />
          {project.thumbnail ? 
            <img src={project.thumbnail} alt={project.name} className='project-thumbnail-judge' />
          : 
            <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' alt={project.name} className='project-thumbnail-judge' /> 
          }
          <br />
          <div>
            <p><b>Información de Contacto</b></p>
            <p className='bolder-text'>
              {project?.name} | {project?.bio || 'Agrega una descripcion'}
            </p>
            <br />
            <p>
              Correo electronico:&nbsp;{project?.email || 'Agrega un correo electronico'}
            </p>
            <p>
              Telefono:&nbsp;{project?.phone || 'Agrega un numero de telefono'}
            </p>
          </div>
          {/* Add more project details as needed */}
        </div>
      </div>
    </div>
  );
};

export default JudgeDetail;
