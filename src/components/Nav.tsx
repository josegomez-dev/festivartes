import { useAuth } from "@/context/AuthContext";
import styles from '@/app/assets/styles/Nav.module.css'
import { EMPTY_USER } from '@/types/userTypes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaSignOutAlt } from "react-icons/fa"
import ChatSidebar from './ChatSidebar'
import { MdDashboardCustomize } from "react-icons/md";

export default function Nav() {
  const { role, authenticated, logout } = useAuth()
  const { user } = useAuth() as any
 
  const router = useRouter()

  if (router.pathname === '/') {
    return null
  }

  const handleLogout = () => {
    logout();
    router.push('/')
  }

  return (
    <nav className={`${styles.navbar} bg-gray-800 text-white`}>
      <div className="flex items-center">
        <Link href={`/dashboard`}>
          {authenticated && <MdDashboardCustomize color="gold" />}
        </Link>
      </div>
      <ul className={`${styles['nav-list']} flex-row-reverse`}>
        {authenticated && (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              <FaSignOutAlt />
            </button>
          </li>
        )}
        {!authenticated ? (
          <>
            <li className={styles['nav-link']}>
              <Link href="/signup">Crear Cuenta</Link>
            </li>
            <li className={styles['nav-link']}>
              <Link href="/login">Iniciar sesión</Link>
            </li>
          </>
        ) : (
          <>
            &nbsp; <b className={styles['profile-role']}>{role}</b> &nbsp;
            <li className={styles['']}>
              <Link href="/profile">
                  <Image
                    width={50} 
                    height={50} 
                    src={user?.profilePic}
                    alt="Profile Picture"
                    className={styles['profile-picture']}
                />
              </Link>
            </li>
          </>
        )}
      </ul>
      {authenticated && <ChatSidebar />}
    </nav>
  )
}
