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
          <p ><b className='bolder-text'>Fecha</b>: {project.date}</p>
          <p ><b className='bolder-text'>Ubicación</b>: {project.location}</p>      
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
      </div>

      <br />
      <hr />

      <CoreSectionJudges filterBy={project.judges} />

      <br />
      <hr />

      <CoreSectionArtworks filterBy={project.artworks} />

    </div>
  );
};

export default EventDetail;
