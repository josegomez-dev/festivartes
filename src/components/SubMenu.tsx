import styles from '@/app/assets/styles/AdminIndex.module.css';
import { useGlobalContext } from '@/context/GlobalContext';
import Link from 'next/link';
import { FaPersonDotsFromLine } from 'react-icons/fa6';
import { GiPartyFlags } from 'react-icons/gi';
import { IoSettings } from 'react-icons/io5';
import { RiBubbleChartFill } from 'react-icons/ri';

const SubMenu = ({ }) => {
  const { role } = useGlobalContext();

  return (
      <>
        <div className={styles['quick-links']} style={{ marginTop: '-50px'}}>
            <Link href={`/${role}/events`}>
              <GiPartyFlags color="black" />
            </Link>
            <Link href={`/${role}/artworks`}>
              <RiBubbleChartFill color="black" />
            </Link>
            {role === 'admin' && <Link href={`/${role}/users`}>
              <FaPersonDotsFromLine color="black" />
            </Link>}
            {role === 'admin' && <Link href={`/${role}/settings`}>
            <IoSettings color="black" />
            </Link>}
        </div>
      </>
  )
}

export default SubMenu
