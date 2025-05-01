import { useAuth } from "@/context/AuthContext";
import styles from '@/app/assets/styles/Nav.module.css'
import { EMPTY_USER } from '@/types/userTypes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaSignOutAlt } from "react-icons/fa"
import ChatSidebar from './ChatSidebar'
import { MdDashboardCustomize } from "react-icons/md";
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from "react";

export default function Nav() {
  const { role, authenticated, logout } = useAuth()
  const { user } = useAuth() as any
 
  const [showDropdown, setShowDropdown] = useState(false)
  const [renderDropdown, setRenderDropdown] = useState(false);

  const router = useRouter()

  if (router.pathname === '/') {
    return null
  }

  const handleLogout = () => {
    logout();
    router.push('/')
  }

  useEffect(() => {
    if (showDropdown) {
      setRenderDropdown(true);
    } else {
      const timeout = setTimeout(() => setRenderDropdown(false), 300); // matches CSS duration
      return () => clearTimeout(timeout);
    }
  }, [showDropdown]);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(`.${styles.dropdown}`) && !target.closest(`.${styles['profile-picture']}`)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`${styles.navbar} bg-gray-800 text-white`}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center">
        <Link href={`/dashboard`}>
          {authenticated && <MdDashboardCustomize color="gold" />}
        </Link>
      </div>
      <div className={`${styles['nav-list']}`}>
        {/* {authenticated && (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              <FaSignOutAlt />
            </button>
          </li>
        )} */}
        {authenticated && (
          <div className="relative">
            <button className="flex items-center gap-2 focus:outline-none" onClick={() => setShowDropdown(!showDropdown)}>
              <Image
                width={50}
                height={50}
                src={user?.profilePic || "/default-avatar.png"}
                alt="Profile Picture"
                className={styles['profile-picture']}
              />
            </button>
            

            {renderDropdown && (
              <div
                className={`${styles.dropdown} ${showDropdown ? styles.dropdownVisible : styles.dropdownHidden}`}
              >
                <label htmlFor="profile-pic" className="profile-pic-label-2">
                  <Image
                    src={user?.profilePic}
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="profile-pic"
                  />
                </label>

                <div style={{ position: 'absolute', top: '10px', right: '10px' }} >
                  <Link href="/profile" className={styles.dropdownLink}>⚙️ Ir al Perfil</Link>
                </div>

                <br />
                <br />
                <p className={styles.dropdownItem}><strong>{user?.displayName || 'Usuario'}</strong></p>
                <p className={styles.dropdownItem}>{user?.email}</p>
                <p className={styles.dropdownItem}>🛡️ Rol: <b>{role}</b></p>

                <div className={styles.dropdownActions}>
                  <br />
                  <Link href="/artworks" className={styles.dropdownLink}>
                    <Image
                      src="/artworks-icon.png"
                      alt="artworks-icon"
                      width={30}
                      height={30}
                      priority
                    />
                   Galeria Creativa</Link>
                   <br />
                   </div>
                <div className={styles.dropdownActions}>
                  <br />
                  <Link href="/events" className={styles.dropdownLink}>
                    <Image
                      src="/events-icon.png"
                      alt="events-icon"
                      width={30}
                      height={30}
                      priority
                    />
                   Festivartes</Link>
                   <br />

                </div>
                <div className={styles.dropdownActions}>
                <br />
                <Link href="/judges" className={styles.dropdownLink}>
                    <Image
                      src="/judges-icon.png"
                      alt="judges-icon"
                      width={30}
                      height={30}
                      priority
                    />
                   Jurados</Link>
                   <br />
                </div>
                <div className={styles.dropdownActions}>
                  <br />
                  <br />
                  <Link href="/events" className={styles.dropdownLink} style={{ color: 'white' }}>Cerrar Sesion</Link>
                  <button onClick={handleLogout} className={styles.logoutButton}>
                    <FaSignOutAlt /> Cerrar Sesión
                  </button>
                  <br />
                </div>
                
              </div>
            )}

          </div>
        )}

      </div>
      {/* {authenticated && <ChatSidebar />} */}
    </nav>
  )
}
