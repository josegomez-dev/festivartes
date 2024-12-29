import styles from '@/app/assets/styles/AdminDashboard.module.css';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import SidebarMenu from '../../components/Sidebar-menu';


export default function AdminSettings() {
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
        <div className={styles.grid}>
          <h3>Settings</h3>
        </div>
      </div>
    </div>
  )
}
