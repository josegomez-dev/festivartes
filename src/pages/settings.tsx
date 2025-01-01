import styles from '@/app/assets/styles/AdminDashboard.module.css';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import SidebarMenu from '@/components/Sidebar-menu';
import SubMenu from '@/components/SubMenu';


export default function Settings() {
  const { role, authenticated } = useGlobalContext()

  console.log(role);
  if (!authenticated) {
    // Redirect to login if not admin or not authenticated
    return <UnauthorizedMessage />
  }

  return (
    <div className={styles['admin-dashboard']}>
      {/* Sidebar */}
      <SidebarMenu />
      {/* Main Content */}
      <div className={styles['main-content']}>
        <br />
        <br />
        <br />
        <SubMenu />

        <div className={styles.grid}>
          <h3>Settings</h3>
        </div>
      </div>
    </div>
  )
}
