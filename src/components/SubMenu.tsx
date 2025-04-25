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
                  alt="artworks-icon"
                  width={50}
                  height={50}
                  priority
                />
            </Link>
            
            <Link href={`/events`}>  
              <Image
                src="/events-icon.png"
                alt="events-icon"
                width={50}
                height={50}
                priority
              />
            </Link>
            
            {<Link href={`/judges`}>
              <Image
                src="/judges-icon.png"
                alt="judges-icon"
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
