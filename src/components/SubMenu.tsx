import styles from '@/app/assets/styles/AdminIndex.module.css';
import Image from 'next/image';
import Link from 'next/link';

const SubMenu = ({ }) => {
  return (
      <>
        <div className={styles['quick-links']}>
            <Link href={`/artworks`}>
                <Image
                  src="/artworks-icon.png"
                  alt="Catarsis Musical Logo"
                  width={50}
                  height={50}
                  priority
                />
            </Link>
            
            <Link href={`/events`}>  
              <Image
                src="/events-icon.png"
                alt="Catarsis Musical Logo"
                width={50}
                height={50}
                priority
              />
            </Link>
            
            {<Link href={`/judges`}>
              <Image
                src="/judges-icon.png"
                alt="Catarsis Musical Logo"
                width={50}
                height={50}
                priority
              />
            </Link>}
        </div>
      </>
  )
}

export default SubMenu
