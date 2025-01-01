import styles from '@/app/assets/styles/AdminIndex.module.css';
import CoreSectionArtworks from '@/components/CoreSectionArtworks';
import CoreSectionJudges from '@/components/CoreSectionJudges';
import ProjectMiniature from '@/components/ObjectMiniature';
import SubMenu from '@/components/SubMenu';
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

  const project = MOCK_DATA_EVENTS.find(p => p.id === parseInt(id as string, 10));

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['admin-index']}>
      <SubMenu />

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

      <CoreSectionJudges />

      <br />
      <hr />

      <CoreSectionArtworks />

    </div>
  );
};

export default EventDetail;
