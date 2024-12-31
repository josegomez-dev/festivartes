import styles from '@/app/assets/styles/AdminDashboard.module.css';

import Link from 'next/link';
import { FaUserAstronaut } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdDashboardCustomize, MdEmojiEvents } from "react-icons/md";
import { useGlobalContext } from '../context/GlobalContext'
import { BiSolidHeart } from 'react-icons/bi';
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
          <Link href={`/${role}/events`}>
            <GiPartyFlags />
          </Link>
          <Link href={`/${role}/artworks`}>
            <RiBubbleChartFill />
          </Link>
          {role === 'admin' && <Link href={`/${role}/users`}>
            <FaPersonDotsFromLine />
          </Link>}
          {role === 'admin' && <Link href={`/${role}/settings`}>
            <IoSettings />
          </Link>}
        </nav>
      </div>
  )
}

export default SidebarMenu
