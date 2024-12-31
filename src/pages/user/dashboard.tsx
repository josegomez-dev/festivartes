import styles from '@/app/assets/styles/UserIndex.module.css';
import BannerFooter from '@/components/BannerFooter';
import CoreSectionArtworks from '@/components/CoreSectionArtworks';
import CoreSectionFestivartes from '@/components/CoreSectionFestivartes';
import FloatingMenuButton from '@/components/FloatingMenuButton';
import ProjectMiniature from '@/components/ProjectMiniature';
import SubMenu from '@/components/SubMenu';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import { MOCK_DATA_ARTWORKS, MOCK_DATA_EVENTS } from '@/utils/constants';
import { MdEmojiEvents } from 'react-icons/md';

const UserHome = () => {
  const { role, authenticated } = useGlobalContext()

  if (role !== 'user' || !authenticated) {
    return <UnauthorizedMessage />
  }

  return (
    <>
      <div className={styles['user-index']}>
        <SubMenu />


        <div className={styles['welcome-message']}>
            <p>
              Hola, <b>Jose Alejandro!</b>
            </p>
            <b style={{ fontSize: '20px' }}>
              Animate a descubrir tu artista interior.
            </b>
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
    </>
  )
}

export default UserHome
