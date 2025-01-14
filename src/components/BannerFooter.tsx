import styles from '@/app/assets/styles/Auth.module.css';
import Image from "next/image"
import Link from "next/link"

const BannerFooter = ({ }) => {

  return (
      <>
        <div className="limited-size-centered">
          <br />
          <p className='bolder-text'>¡Transforma la magia del arte con tecnología! 🖋️ 🎨 🎶 ✨</p>
          <Link href={'./'}>
            <Image
              className={styles.logo}
              src="/logo2.png"
              alt="Catarsis Musical Logo"
              width={250}
              height={250}
              priority
            />
          </Link>
        </div>
      </>
  )
}

export default BannerFooter
