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
            <Link href={`/events`}>
              <GiPartyFlags style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color="orange" />
            </Link>
            <Link href={`/artworks`}>
              <RiBubbleChartFill style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color="gold" />
            </Link>
            {<Link href={`/judges`}>
              <FaPersonDotsFromLine style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color="lightgreen" />
            </Link>}
            {role === 'admin' && <Link href={`/settings`}>
            <IoSettings style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color="#32acc0" />
            </Link>}
        </div>
      </>
  )
}

export default SubMenu
