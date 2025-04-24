import styles from '@/app/assets/styles/Auth.module.css';
import mainStyles from '@/app/assets/styles/MainPage.module.css';

const BannerFooter = ({ }) => {

  return (
      <>
        <div className={mainStyles['footer-container']}>
          <div className={mainStyles['footer-content']}>
            <p style={{ textAlign: 'center' }} className={`${styles['footer-text']}`}>
              Desarrollado por <a style={{ textDecoration: 'none' }} target='_blank' href="https://www.linkedin.com/in/josealejandrogomezcastro/"><b>Jose Alejandro Gomez Castro</b></a> <br /><br />
              © 2025 <a style={{ textDecoration: 'none', fontSize: '1rem', color: 'goldenrod' }} target='_blank' href="https://josegomez-dev.github.io/catarsismusical/">Catarsis Musical</a> <br /> 
              Todos los derechos reservados.
            </p>
          </div>
        </div>
      </>
  )
}

export default BannerFooter
