import styles from '@/app/assets/styles/AdminIndex.module.css';
import SubMenu from '@/components/SubMenu';
import { MOCK_DATA_JUDGES } from '@/utils/constants';
import { useRouter } from 'next/router';

const JudgeDetail = ({ }) => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter

  const project = MOCK_DATA_JUDGES.find(p => p.id === parseInt(id as string, 10));

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
              Jose Alejandro Gomez Castro | Software Engineer, Creative Technologist & Musician
            </p>
            <br />
            <hr />
            <br />
            <p>
              <span className='bolder-text'>Bio:</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, vero iusto eaque placeat eos sapiente labore esse excepturi qui consectetur.
            </p>
            <br />
            <hr />
            <br />
            <ul>
              <li>josegomez.dev@gmail.com</li>
              <li>+506 6240 29 74</li>
            </ul>
          </div>

          {/* Add more project details as needed */}
        </div>
      </div>
    </div>
  );
};

export default JudgeDetail;
