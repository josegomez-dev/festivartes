import styles from '@/app/assets/styles/AdminDashboard.module.css';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import SidebarMenu from '../../components/Sidebar-menu';
import ProjectMiniature from '@/components/ProjectMiniature';
import { MOCK_DATA_JUDGES } from '@/utils/constants';


export default function AdminUsers() {
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
            <b>Jurados Invitados</b>
          </p>
          
          <div className={styles.card} style={{ marginTop: '25px' }}>
            <p>
              Lista de todos mis jurados invitados.
            </p>
            <br />
            <ProjectMiniature projects={MOCK_DATA_JUDGES} type="judge" />
          </div>
            
        </div>
      </div>
    </div>
  )
}
