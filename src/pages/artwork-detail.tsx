import styles from '@/app/assets/styles/AdminIndex.module.css';
import CoreSectionFestivartes from '@/components/CoreSectionFestivartes';
import ProjectMiniature from '@/components/ProjectMiniature';
import SubMenu from '@/components/SubMenu';
import { MOCK_DATA_ARTWORKS, MOCK_DATA_EVENTS } from '@/utils/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaUserAstronaut } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { MdDashboardCustomize, MdEmojiEvents } from 'react-icons/md';

const ArtworkDetail = ({ }) => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter

  const project = MOCK_DATA_ARTWORKS.find(p => p.id === parseInt(id));

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
          <div>
            <p><b>Categoria de la Obra</b></p>
            <p className='bolder-text'>
              Cantautor Solista Nacional (Inedito)
            </p> 
            <br />
            <hr />
            <br />
            <p><b>Multimedia</b></p>
            <p>
              <span className='bolder-text'>Audio (MP3)</span>: /domain/audios/item/234 <br />
              <span className='bolder-text'>Video (MP4)</span>: /domain/videos/item/234 <br />
              <span className='bolder-text'>Letra (PDF)</span>: /domain/lyrcs/item/234 <br />
              <span className='bolder-text'>Partituras (PDF)</span>: /domain/tabs/item/234
            </p>
            <br />
            <hr />
            <p>
              <br />
              <b>Letra & Musica</b>
                <p><span className='bolder-text'>Musica</span>: Jose Alejandro Gomez Castro</p>
                <p><span className='bolder-text'>Letra</span>: Jose Alejandro Gomez Castro</p>
                <p><span className='bolder-text'>Interpretacion</span>: <a href="">@alegomez.cr</a></p>
                <p><span className='bolder-text'>Produccion</span>: Catarsis Musical Studio</p>
            </p>
            <br />
          </div>
          
          <CoreSectionFestivartes />
          {/* Add more project details as needed */}
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
