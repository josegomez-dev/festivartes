import styles from '@/app/assets/styles/AdminIndex.module.css';
import ProjectMiniature from '@/components/ProjectMiniature';
import { MOCK_DATA_EVENTS, MOCK_DATA_JUDGES } from '@/utils/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaUserAstronaut } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { MdDashboardCustomize, MdEmojiEvents } from 'react-icons/md';

const JudgeDetail = ({ }) => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter

  const project = MOCK_DATA_JUDGES.find(p => p.id === parseInt(id));

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['admin-index']}>
      <div className={styles['quick-links']} style={{ marginTop: '-50px'}}>
        <Link href="/admin/dashboard">
          <MdDashboardCustomize />
        </Link>
        <Link href="/admin/events">
          <MdEmojiEvents />
        </Link>
        <Link href="/admin/users">
          <FaUserAstronaut />
        </Link>
        <Link href="/admin/settings">
          <IoSettings />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <div className="project-detail-container">
          <h1>{project.name}</h1>
          <br />
          <img src={project.thumbnail} alt={project.name} />
          <br />
          <br />
          <div>
            <p><b>Informacion de Contacto</b></p>
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

          <div className={styles.card} style={{ marginTop: '25px' }}>
            <p>
              Lista de todos los <span className='bolder-text'>eventos registrados</span>.
            </p>
            <br />
            {MOCK_DATA_EVENTS.length <= 0 ? 
              <div className={styles.grid}>
                <div className={styles.card}>
                  <h3>Registra tu primer Evento Calificado</h3>
                  <p>Evento con jurado y reglamento.</p>
                </div> 
              </div> 
              : 
              <ProjectMiniature projects={MOCK_DATA_EVENTS} type={'event'} />
            }
          </div>
          {/* Add more project details as needed */}
        </div>
      </div>
    </div>
  );
};

export default JudgeDetail;
