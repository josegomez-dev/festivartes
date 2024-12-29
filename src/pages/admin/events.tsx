import styles from '@/app/assets/styles/AdminDashboard.module.css';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import SidebarMenu from '../../components/Sidebar-menu';
import ProjectMiniature from '@/components/ProjectMiniature';
import { MOCK_DATA_EVENTS } from '@/utils/constants';
import FloatingMenuButton from '@/components/FloatingMenuButton';
import Link from 'next/link';
import { MdDashboardCustomize, MdEmojiEvents } from 'react-icons/md';
import { FaUserAstronaut } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';

export default function AdminEvents() {
  const { role, authenticated } = useGlobalContext()

  if (role !== 'admin' || !authenticated) {
    // Redirect to login if not admin or not authenticated
    return <UnauthorizedMessage />
  }

  return (
    <div className={styles['admin-dashboard']}>
      {/* Sidebar */}
      <SidebarMenu />
      {/* Main Content */}
      <div className={styles['main-content']}>

        <div>
          <p style={{ textAlign: 'center' }}>
            <b>Mis Eventos</b>
          </p>

          <div className={styles.card} style={{ marginTop: '25px' }}>
            <p>
              Eventos Calificados.
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
              <ProjectMiniature projects={MOCK_DATA_EVENTS.filter(p => p.type == 'qualified')} type="event" />
            }
          </div>
          
          <br />
          <hr />
          <br />

          <div className={styles.card} style={{ marginTop: '25px' }}>
            <p>
              Eventos regulares.
            </p>
            <br />
            {MOCK_DATA_EVENTS.length <= 0 ? 
              <div className={styles.grid}>
                <div className={styles.card}>
                  <h3>Registra tu primer Evento Regular</h3>
                  <p>Evento sencillo.</p>
                </div> 
              </div> 
              : 
              <ProjectMiniature projects={MOCK_DATA_EVENTS.filter(p => p.type == 'regular')} type="event" />
            }
          </div>
        </div>

        <FloatingMenuButton />
      </div>
    </div>
  )
}
