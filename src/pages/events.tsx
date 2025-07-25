import styles from '@/app/assets/styles/AdminIndex.module.css';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useAuth } from '@/context/AuthContext';
import SidebarMenu from '@/components/Sidebar-menu';
import FloatingMenuButton from '@/components/FloatingMenuButton';
import CoreSectionFestivartes from '@/components/CoreSectionFestivartes';
import SubMenu from '@/components/SubMenu';
import BannerFooter from '@/components/BannerFooter';

export default function Events() {
  const { user, role, authenticated } = useAuth()

  if (!authenticated) {
    // Redirect to login if not admin or not authenticated
    return <UnauthorizedMessage />
  }

  return (
    <div className={styles['sidebar-menu-view']}>
      {/* Sidebar */}
      <SidebarMenu />
      {/* Main Content */}
      <div className={styles['main-content']}>
        <br />
        <SubMenu />

        <CoreSectionFestivartes filterBy={user?.uid} />

        <FloatingMenuButton mainBtn={true} />
        <BannerFooter />
      </div>
    </div>
  )
}
