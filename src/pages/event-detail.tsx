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

      <div className='project-detail-wrapper'>
        <div className="project-detail-container">
          <h2>{project.name}</h2>
          <br />
          <img 
            src={project.thumbnail} 
            alt={project.name} 
            className='project-thumbnail-wrapper'
          />
          <br />


          <p style={{ fontSize: '12px' }}><b className='bolder-text'>Fecha</b>: 25 de Enero, 2025.</p>
          <p style={{ fontSize: '12px' }}><b className='bolder-text'>Ubicación</b>: Alajuela, Parque de Grecia.</p>
          {/* <p style={{ fontSize: '11px' }}><b className='bolder-text'>Categoria</b>: Circuital</p>
          <p style={{ fontSize: '11px' }}><b className='bolder-text'>Clasificación</b>: OPEN</p> */}

          <br />
          <p style={{ background: 'white', borderRadius: '12px', color: '#32acc0', border: '1px solid rgba(255, 255, 255, 0.2)', width: '100%', maxWidth: '300px', margin: '0 auto', height: '80px', overflowY: 'scroll', padding: '5px 10px', fontSize: '12px' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quam vero aspernatur temporibus distinctio quae enim, accusamus atque, reiciendis harum aliquid quisquam accusantium, tempora autem quibusdam commodi iure corrupti sequi!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas praesentium dicta rem numquam aut maiores molestiae aspernatur eaque suscipit maxime, aliquid tempora, facere laborum autem, officiis est nostrum vero cum.
          </p>

          <div>
            <br />
            <p>
              <span className='bolder-text'>ENTRADA</span>:₡2000 &nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className='bolder-text'>VIP</span>: ₡10 000
            </p>
          </div>
          {/* Add more project details as needed */}
        </div>
      </div>

      <br />
      <hr />

      <CoreSectionJudges />

      <br />
      <hr />

      <CoreSectionArtworks />

    </div>
  );
};

export default EventDetail;
