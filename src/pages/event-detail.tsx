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
          <p ><b className='bolder-text'>Fecha</b>: 25 de Enero, 2025.</p>
          <p ><b className='bolder-text'>Ubicación</b>: Alajuela, Parque de Grecia.</p>      
          <br />
          <p className='overflow-area'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quam vero aspernatur temporibus distinctio quae enim, accusamus atque, reiciendis harum aliquid quisquam accusantium, tempora autem quibusdam commodi iure corrupti sequi!
          </p>
          <div>
            <br />
            <p>
              <span className='bolder-text price-text'>COSTO DE LA ENTRADA</span>: ₡2000
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
