import styles from '@/app/assets/styles/AdminIndex.module.css';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import FloatingMenuButton from '@/components/FloatingMenuButton';
import ProjectMiniature from '@/components/ProjectMiniature';
import { MOCK_DATA_ARTWORKS, MOCK_DATA_JUDGES, MOCK_DATA_EVENTS } from '@/utils/constants';
import Link from 'next/link';
import { MdDashboardCustomize, MdEmojiEvents } from 'react-icons/md';
import { FaUserAstronaut } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';


export default function AdminDashboard() {
  const { role, authenticated } = useGlobalContext()

  if (role !== 'admin' || !authenticated) {
    // Redirect to login if not admin or not authenticated
    return <UnauthorizedMessage />
  }

  return (
    <div className={styles['admin-index']}>
      {/* Menu Items */}
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
      <div className={styles['welcome-message']} style={{ textAlign: 'center' }}>
        Welcome to your <b>Dashboard!</b>
      </div>
      {/* Main Content */}
      <div className={styles['main-content']}>

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

        <br />
        <hr />

        <div className={styles.card} style={{ marginTop: '25px' }}>
          <p>
            Lista de todos los <span className='bolder-text'>jurados invitados</span>.
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
            Lista de todas las <span className='bolder-text'>obras creadas</span>.
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
        
        <FloatingMenuButton />
      </div>
    </div>
  )
}
