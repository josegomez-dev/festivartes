import styles from '@/app/assets/styles/AdminDashboard.module.css';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import SidebarMenu from '../../components/Sidebar-menu';
import ProjectMiniature from '@/components/ProjectMiniature';
import { MOCK_DATA_EVENTS } from '@/utils/constants';
import FloatingMenuButton from '@/components/FloatingMenuButton';
import { MdEmojiEvents } from 'react-icons/md';
import { GiPartyFlags } from 'react-icons/gi';
import CoreSectionFestivartes from '@/components/CoreSectionFestivartes';
import SubMenu from '@/components/SubMenu';

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
        <CoreSectionFestivartes />

        <FloatingMenuButton />
      </div>
    </div>
  )
}
