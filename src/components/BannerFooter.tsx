import styles from '@/app/assets/styles/Auth.module.css';
import mainStyles from '@/app/assets/styles/MainPage.module.css';

const BannerFooter = ({ }) => {

  return (
      <>
        <div className={mainStyles['footer-container']}>
          <div className={mainStyles['footer-content']}>
            <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'white' }}>               
                © 2025 | <b>Festivartes</b> <br />
              Todos los derechos reservados.
            </p>
          </div>
        </div>
      </>
  )
}

export default BannerFooter
