import styles from '@/app/assets/styles/Auth.module.css';
import mainStyles from '@/app/assets/styles/MainPage.module.css';

const BannerFooter = ({ }) => {

  return (
      <>
        <div className={mainStyles['footer-container']}>
          <br />
          <div className={mainStyles['footer-content']}>
            <p className={mainStyles['footer-text']}>               
                © 2025 | <b>Festivartes</b> <br />
              Todos los derechos reservados.
            </p>
          </div>
        </div>
      </>
  )
}

export default BannerFooter
