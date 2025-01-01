import styles from '@/app/assets/styles/AdminIndex.module.css';
import CoreSectionFestivartes from '@/components/CoreSectionFestivartes';
import ProjectMiniature from '@/components/ObjectMiniature';
import SubMenu from '@/components/SubMenu';
import { MOCK_DATA_EVENTS, MOCK_DATA_JUDGES } from '@/utils/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaUserAstronaut } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { MdDashboardCustomize, MdEmojiEvents } from 'react-icons/md';

const JudgeDetail = ({ }) => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter

  const project = MOCK_DATA_JUDGES.find(p => p.id === parseInt(id as string, 10));

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

          <CoreSectionFestivartes />
          {/* Add more project details as needed */}
        </div>
      </div>
    </div>
  );
};

export default JudgeDetail;
