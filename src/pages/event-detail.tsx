import styles from '@/app/assets/styles/AdminIndex.module.css';
import CoreSectionArtworks from '@/components/CoreSectionArtworks';
import CoreSectionJudges from '@/components/CoreSectionJudges';
import SubMenu from '@/components/SubMenu';
import { MOCK_DATA_EVENTS } from '@/utils/constants';
import { useRouter } from 'next/router';

const EventDetail = ({ }) => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter

  const project = MOCK_DATA_EVENTS.find(p => p.id === parseInt(id as string, 10));

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['full-view']}>
      <SubMenu />

      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <div className="project-detail-container">
          <h2>{project.name}</h2>
          <br />
          Fecha &
          Clasificación
          <img src={project.thumbnail} alt={project.name} />
          <p style={{ fontSize: '11px' }}><span className='bolder-text'>Ubicación</span>: Alajuela, Parque de Grecia.</p>
          <div>
            <br />
            <b>Información del evento</b> &nbsp;
              (<span style={{ color: 'lightgreen' }}>+</span> / <span style={{ color: 'red' }}>-</span>)
              <br />
              <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ipsa, delectus sequi nobis quaerat consequuntur tempore.
            </p>
            <br />
            <p>
              <span className='bolder-text'>ENTRADA</span>:₡2000 &nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className='bolder-text'>VIP</span>: ₡10 000
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
