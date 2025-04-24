import styles from '@/app/assets/styles/Auth.module.css';
import mainStyles from '@/app/assets/styles/MainPage.module.css';
import Image from "next/image"
import Link from "next/link"

const BannerFooter = ({ }) => {

  return (
      <>
        <div className={mainStyles['footer-container']}>
          <div className={mainStyles['']}>
            {/* <p className={styles['footer-text']}>
              <Link href="/privacy">
                Política de privacidad
              </Link>
            </p>
            <p className={styles['footer-text']}>
              <Link href="/terms">
                Términos y condiciones
              </Link>
            </p>
            <p className={styles['footer-text']}>
              <Link href="/faq">
                Preguntas frecuentes
              </Link>
            </p>
            <p className={styles['footer-text']}>
              <Link href="/sitemap">
                Mapa del sitio
              </Link>
            </p>
            <p className={styles['footer-text']}>
              <Link href="/support">
                Soporte
              </Link>
            </p>
            <p className={styles['footer-text']}>
              <Link href="/pricing">
                Precios
              </Link>
            </p> */}
{/*             
            <Link className={mainStyles['center']} href={'./'}>
              <Image
                className={styles.logo}
                src="/logo2.png"
                alt="Catarsis Musical Logo"
                width={150}
                height={150}
                priority
              />
            </Link> */}
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
