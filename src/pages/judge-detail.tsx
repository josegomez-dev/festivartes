import styles from '@/app/assets/styles/AdminIndex.module.css';
import SubMenu from '@/components/SubMenu';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../firebaseConfig';

const JudgeDetail = ({ }) => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter
  const [data, setData] = useState<{ id: string; [key: string]: any }[]>([]);
  const [project, setProject] = useState<{ id: string; [key: string]: any } | null>(null);

  const fetchJudge = async (id: string | string[] | undefined) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'accounts'))
      // get only users account with role "judge"
      const accounts = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...(doc.data() as { role: string })
        }))
        .filter((account) => account.role === 'judge');
      const selectedProject = accounts.find(account => account.id === id);
      if (selectedProject) {
        setProject(selectedProject);
      }
      setData(accounts);
      return accounts;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchJudge(id);
  }, []);

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
          {project.thumbnail || project.profilePic ? 
            <img src={project.thumbnail || project.profilePic} alt={project.name} className='project-thumbnail-judge' />
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
              Correo electronico: <br /> {project?.email || 'Agrega un correo electronico'}
            </p>
            <br />
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
