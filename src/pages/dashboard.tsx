import styles from '@/app/assets/styles/AdminIndex.module.css';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import FloatingMenuButton from '@/components/FloatingMenuButton';
import CoreSectionFestivartes from '@/components/CoreSectionFestivartes';
import CoreSectionArtworks from '@/components/CoreSectionArtworks';
import CoreSectionJudges from '@/components/CoreSectionJudges';
import BannerFooter from '@/components/BannerFooter';
import SubMenu from '@/components/SubMenu';


export default function Dashboard() {
  const { role, authenticated } = useGlobalContext()

  if (!authenticated) {
    // Redirect to login if not admin or not authenticated
    return <UnauthorizedMessage />
  }

  return (
    <div className={styles['full-view']}>
      {/* Menu Items */}
      <SubMenu />

      <div className={styles['welcome-message']} style={{ textAlign: 'center' }}>
        Bievenido al <b>¡Panel Principal!</b>
        <p className={styles['slogan-text']}>
          Simplifica, automatiza y digitaliza todo tu festival cultural: registros, calificaciones y premiaciones. 
          <br /><br /> 
          <b>¡Todo en un solo lugar!</b>
        </p>
      </div>
      
      {/* Main Content */}
      <div>
        <CoreSectionFestivartes />
        <br />
        <hr />
        <CoreSectionArtworks />
        <br />
        <hr />
        <CoreSectionJudges />
        <BannerFooter />
        <FloatingMenuButton />
      </div>
    </div>
  )
}
