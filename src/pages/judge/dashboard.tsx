import styles from '@/app/assets/styles/AdminIndex.module.css';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import FloatingMenuButton from '@/components/FloatingMenuButton';
import ProjectMiniature from '@/components/ProjectMiniature';
import { MOCK_DATA_ARTWORKS, MOCK_DATA_JUDGES, MOCK_DATA_EVENTS } from '@/utils/constants';
import Link from 'next/link';
import { MdDashboardCustomize, MdEmojiEvents } from 'react-icons/md';
import { FaUserAstronaut } from 'react-icons/fa';
import { BiSolidHeart } from "react-icons/bi";
import { IoSettings } from 'react-icons/io5';
import SubMenu from '@/components/SubMenu';
import CoreSectionFestivartes from '@/components/CoreSectionFestivartes';
import CoreSectionArtworks from '@/components/CoreSectionArtworks';
import BannerFooter from '@/components/BannerFooter';


export default function JudgeDashboard() {
  const { role, authenticated } = useGlobalContext()

  if (role !== 'judge' || !authenticated) {
    // Redirect to login if not admin or not authenticated
    return <UnauthorizedMessage />
  }

  return (
    <div className={styles['admin-index']}>
      {/* Menu Items */}
      <SubMenu />

      <div className={styles['welcome-message']} style={{ textAlign: 'center' }}>
        Bienvenido <b>Jurado Seleccionador!</b>
        <p className={styles['slogan-text']}>
          Simplifica, automatiza y digitaliza todo tu festival artístico: registros, calificaciones y premiaciones en un solo lugar.
        </p>
      </div>
      {/* Main Content */}
      <div className={styles['main-content']}>

        <CoreSectionFestivartes />
        <br />
        <hr />
        <CoreSectionArtworks />

        <BannerFooter />
        
        <FloatingMenuButton />
      </div>
    </div>
  )
}
