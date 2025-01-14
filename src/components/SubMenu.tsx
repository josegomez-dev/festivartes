import styles from '@/app/assets/styles/AdminIndex.module.css';
import { useGlobalContext } from '@/context/GlobalContext';
import Image from 'next/image';
import Link from 'next/link';

const SubMenu = ({ }) => {
  const { role } = useGlobalContext();

  return (
      <>
        <div className={styles['quick-links']}>
            <Link href={`/events`}>
              <Image
                src="/events-icon.png"
                alt="Catarsis Musical Logo"
                width={50}
                height={50}
                priority
              />
            </Link>
            <Link href={`/artworks`}>
              <Image
                src="/artwork-icon.png"
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
