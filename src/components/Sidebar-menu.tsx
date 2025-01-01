import styles from '@/app/assets/styles/AdminDashboard.module.css';

import Link from 'next/link';
import { IoSettings } from "react-icons/io5";
import { useGlobalContext } from '../context/GlobalContext'
import { FaPersonDotsFromLine } from 'react-icons/fa6';
import { GiPartyFlags } from 'react-icons/gi';
import { RiBubbleChartFill } from 'react-icons/ri';

// interface SidebarMenuProps {
//   children: ReactNode
// }

// const SidebarMenu = ({ children }: SidebarMenuProps) => {
const SidebarMenu = () => {
  const { role } = useGlobalContext()

  return (
      <div className={styles.sidebar}>
        {/* <h2><TiThMenu /></h2> */}
        <nav>
          <Link href={`/events`}>
            <GiPartyFlags style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color='orange' />
          </Link>
          <Link href={`/artworks`}>
            <RiBubbleChartFill style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color='gold' />
          </Link>
          {role === 'admin' && <Link href={`/judges`}>
            <FaPersonDotsFromLine style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color='lightgreen' />
          </Link>}
          {role === 'admin' && <Link href={`/settings`}>
            <IoSettings style={{ filter: 'drop-shadow(0 0 0.2rem black)' }} color='#32acc0' />
          </Link>}
        </nav>
      </div>
  )
}

export default SidebarMenu
