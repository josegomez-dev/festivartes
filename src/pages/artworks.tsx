import styles from '@/app/assets/styles/AdminIndex.module.css';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import SidebarMenu from '@/components/Sidebar-menu';
import FloatingMenuButton from '@/components/FloatingMenuButton';
import CoreSectionArtworks from '@/components/CoreSectionArtworks';
import SubMenu from '@/components/SubMenu';
import { MOCK_DATA_ARTWORKS } from '@/utils/constants';

export default function Artworks() {
  const { role, authenticated } = useGlobalContext()

  const myArtworks = MOCK_DATA_ARTWORKS.filter(item => item.author === 123);
  const myArtworkIds = myArtworks.map(item => item.id);

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

        <CoreSectionArtworks filterBy={myArtworkIds} />

        <FloatingMenuButton />
      </div>
    </div>
  )
}
