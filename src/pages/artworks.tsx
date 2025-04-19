import styles from '@/app/assets/styles/AdminIndex.module.css';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import SidebarMenu from '@/components/Sidebar-menu';
import FloatingMenuButton from '@/components/FloatingMenuButton';
import CoreSectionArtworks from '@/components/CoreSectionArtworks';
import SubMenu from '@/components/SubMenu';

export default function Artworks() {
  const { role, authenticated } = useGlobalContext()

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
        <br />
        <br />
        <SubMenu />

        <CoreSectionArtworks />

        <FloatingMenuButton />
      </div>
    </div>
  )
}
