import styles from '@/app/assets/styles/AdminDashboard.module.css';

import Link from 'next/link';
import { FaUserAstronaut } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdDashboardCustomize, MdEmojiEvents } from "react-icons/md";

// import { useGlobalContext } from '../context/GlobalContext'

// interface SidebarMenuProps {
//   children: ReactNode
// }

// const SidebarMenu = ({ children }: SidebarMenuProps) => {
const SidebarMenu = () => {
  // const { authenticated, role } = useGlobalContext()

  return (
      <div className={styles.sidebar}>
        {/* <h2><TiThMenu /></h2> */}
        <nav>
          <Link href="/admin/dashboard">
            <MdDashboardCustomize />
          </Link>
          <Link href="/admin/events">
            <MdEmojiEvents />
          </Link>
          <Link href="/admin/users">
            <FaUserAstronaut />
          </Link>
          <Link href="/admin/settings">
            <IoSettings />
          </Link>
        </nav>
      </div>
  )
}

export default SidebarMenu
