import styles from '@/app/assets/styles/AdminIndex.module.css';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useAuth } from '@/context/AuthContext';
import FloatingMenuButton from '@/components/FloatingMenuButton';
import CoreSectionFestivartes from '@/components/CoreSectionFestivartes';
import CoreSectionArtworks from '@/components/CoreSectionArtworks';
import CoreSectionJudges from '@/components/CoreSectionJudges';
import BannerFooter from '@/components/BannerFooter';
import SubMenu from '@/components/SubMenu';
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/Footer';

export default function Dashboard() {
  const { user, role, authenticated } = useAuth()

  if (!authenticated) {
    // Redirect to login if not admin or not authenticated
    return <UnauthorizedMessage />
  }

  return (
    <div className={styles['full-view']}>
      {/* Menu Items */}
      <SubMenu />
      <div className={styles['welcome-message']}>
        Bienvenido al <b>¡Panel Principal!</b>
        <p className={styles['slogan-text']}>
          Simplifica, automatiza y digitaliza todo tu festival cultural: registros, calificaciones y premiaciones. 
          <br /><br /> 
          <b className='drop-shadow'>¡Todo en un solo lugar!</b>
        </p>
      </div>
      
      {/* Main Content */}
      <div>
        <CoreSectionArtworks filterBy={user?.uid} />
        <hr />
        <CoreSectionFestivartes filterBy={user?.uid} />
        <hr />
        <CoreSectionJudges filterBy={user?.uid} />

        <FloatingMenuButton mainBtn={true} />

        <Footer />
      </div>
    </div>
  )
}
