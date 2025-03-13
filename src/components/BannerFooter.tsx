import styles from '@/app/assets/styles/Auth.module.css';
import mainStyles from '@/app/assets/styles/MainPage.module.css';
import Image from "next/image"
import Link from "next/link"

const BannerFooter = ({ }) => {

  return (
      <>
        <div className={mainStyles['center']}>
          <div className={mainStyles['footer-container']}>
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
            
            <Link className={mainStyles['center']} href={'./'}>
              <Image
                className={styles.logo}
                src="/logo2.png"
                alt="Catarsis Musical Logo"
                width={250}
                height={250}
                priority
              />
            </Link>
            <p style={{ marginTop: '-50px', textAlign: 'center' }} className={`${styles['footer-text']}`}>
              Desarrollado por <b>Jose A. Gomez C.</b> <br /><br />
              © 2025 Catarsis Musical. <br /> 
              Todos los derechos reservados.
            </p>
          </div>
        </div>
      </>
  )
}

export default BannerFooter
