import styles from '@/app/assets/styles/AdminIndex.module.css';
import ProjectMiniature from '@/components/ProjectMiniature';
import { MOCK_DATA_ARTWORKS, MOCK_DATA_EVENTS, MOCK_DATA_JUDGES } from '@/utils/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiSolidHeart } from 'react-icons/bi';
import { FaUserAstronaut } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { MdDashboardCustomize, MdEmojiEvents } from 'react-icons/md';

const EventDetail = ({ }) => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter

  const project = MOCK_DATA_EVENTS.find(p => p.id === parseInt(id));

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['admin-index']}>
      <div className={styles['quick-links']} style={{ marginTop: '-50px'}}>
        {/* <Link href="/admin/dashboard">
          <MdDashboardCustomize />
        </Link> */}
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
          <div style={{ textAlign: 'left' }}>
            <p>
              <b>Tipo de evento</b>
              <ul>
                <li>Publico | Para toda la familia</li>
                <li>Entrada: c2000</li>
              </ul>
              <br />
            </p>
            <hr />
            <p>
            <br />
              <b>Contacto</b>
              <ul>
                <li><span className='bolder-text'>Fecha</span>: 02 de Febrero.</li>
                <li><span className='bolder-text'>Ubicacion</span>Ubicacion: Alajuela, Parque de Grecia.</li>
                <li><span className='bolder-text'>Horario</span>: 12md</li>
                <li><span className='bolder-text'>Cupo Limitado</span>: SI o NO</li>
                <li><span className='bolder-text'>Reserva</span>: SI o NO</li>
              </ul> 
              <br />
              <hr />
              <br />
              <b>Contacto de Agente</b>
              <ul>
                <li className='bolder-text'>Jhon Doe | Agente de Festivartes</li>
                <li>jhon.doe@festivartes.com</li>
                <li>+506 8888-8888</li>
              </ul> 
            </p>            
          </div>
          {/* Add more project details as needed */}
        </div>
      </div>

      <hr />

      <div className={styles.card} style={{ marginTop: '25px' }}>
        <p>
          <span className='bolder-text'><FaUserAstronaut /> Jurado Seleccionador</span>
        </p>
        <br />
        {MOCK_DATA_JUDGES.length <= 0 ? 
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>Invita a tu Jurado Seleccionador</h3>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div> 
          </div> 
          : 
          <ProjectMiniature projects={MOCK_DATA_JUDGES} type="judge" />
        }
      </div>

       <br />
        <hr />

        <div className={styles.card} style={{ marginTop: '25px' }}>
          <p>
            <span className='bolder-text'><BiSolidHeart/> Obras Registradas</span>
          </p>
          <br />
          {MOCK_DATA_ARTWORKS.length <= 0 ? 
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3>No hay registros de obras</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div> 
            </div> 
            : 
            <ProjectMiniature projects={MOCK_DATA_ARTWORKS} type={'artwork'} />
          }
        </div>

    </div>
  );
};

export default EventDetail;
