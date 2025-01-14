import styles from '@/app/assets/styles/AdminIndex.module.css';
import SubMenu from '@/components/SubMenu';
import { MOCK_DATA_ARTWORKS } from '@/utils/constants';
import { useRouter } from 'next/router';
import { IoIosMusicalNotes } from "react-icons/io";
import { FaVideo } from "react-icons/fa6";
import { MdOutlineMenuBook } from "react-icons/md";

const ArtworkDetail = ({ }) => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter

  const project = MOCK_DATA_ARTWORKS.find(p => p.id === parseInt(id as string, 10));

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
            <img src={project.thumbnail} alt={project.name} className='project-thumbnail-wrapper' />
          : 
            <img src='https://getuikit.com/v2/docs/images/placeholder_600x400.svg' alt={project.name} className='project-thumbnail-wrapper' />
          }
          <br />
          <div>
            <p><b>Categoría de la Obra</b></p>
            <p className='bolder-text'>
              Cantautor Solista
            </p> 
            <br />
            <hr />
            <br />
            <p><b>Archivos de la Obra</b> (PDF)</p>
            <p className='links-spaced'>
              <MdOutlineMenuBook /> : <a href="#" className='artwork-links'>route</a>
            </p>
            <p className='links-spaced'>
              <IoIosMusicalNotes /> : <a href="#" className='artwork-links'>route</a>
            </p>
            <p className='links-spaced'>
              <FaVideo /> : <a href="#" className='artwork-links'>route</a>
            </p>
            <br />
            <hr />
            <p>
              <br />
              <b>Letra & Música</b>
              <p>Jose Alejandro Gomez Castro</p>
            </p>
            <br />
          </div>
          
          {/* Add more project details as needed */}
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
