import { useAuth } from "@/context/AuthContext";
import styles from '@/app/assets/styles/Nav.module.css'
import { EMPTY_USER } from '@/types/userTypes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaSignOutAlt } from "react-icons/fa"
import ChatSidebar from './ChatSidebar'
import { MdDashboardCustomize } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast'
import { use, useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { doc, setDoc } from "firebase/firestore";
import { db } from './../../firebaseConfig'
interface Notification {
  id: number;
  text: string;
  link: string;
  visited: boolean;
}
  
export default function Nav() {
  const { role, authenticated, logout } = useAuth()
  const { user } = useAuth() as any
 
  const [showDropdown, setShowDropdown] = useState(false)
  const [renderDropdown, setRenderDropdown] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(user?.notifications);

  const router = useRouter()

  const handleNotificationClick = (id: number) => {
    alert(`Notificación: ${notifications.find((n) => n.id === id)?.text}`);

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, visited: true } : n
      )
    );
    const updatedNotifications = notifications.map((n) =>
      n.id === id ? { ...n, visited: true } : n
    );
    setNotifications(updatedNotifications);

    const notificationRef = doc(db, "accounts", user.uid);
    setDoc(notificationRef, { notifications: updatedNotifications }, { merge: true })
    setShowNotifications(false);
  };


  const handleLogout = () => {
    logout();
    router.push('/');
  }

  useEffect(() => {
      // update notifications state when user changes
      if (user) {
        setNotifications(user.notifications);
      } else {
        setNotifications([]);
      }
  }, [user]);

  useEffect(() => {

    if (showDropdown) {
      setRenderDropdown(true);
    } else {
      const timeout = setTimeout(() => setRenderDropdown(false), 300); // matches CSS duration
      return () => clearTimeout(timeout);
    }
  }, [showDropdown]);

  // Handle outside click to close notifications too
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      !target.closest(`.${styles.dropdown}`) &&
      !target.closest(`.${styles['profile-picture']}`) &&
      !target.closest(`.${styles['notification-bell']}`)
    ) {
      setShowDropdown(false);
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  if (router.pathname === '/') {
    return null
  }
  
  return (
    <nav className={`${styles.navbar} bg-gray-800 text-white`}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center">
        <Link href={`/dashboard`}>
          {authenticated && <MdDashboardCustomize color="gold" />}
        </Link>
      </div>
      <div className={`${styles['nav-list']}`}>
        {!authenticated && (
          <>
            <li className={styles['nav-link']}>
              <Link href="/login">Iniciar sesión</Link>
            </li>
            <li className={styles['nav-link']}>
              <Link href="/signup">Registrarse</Link>
            </li>
          </>
          )}

          {authenticated && (
            <div className="relative mr-4">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                }}
                className={styles['notification-bell']}
                style={{ animation: 'pulseGlow 1.5s ease-in-out infinite', position: 'absolute', top: '35px', right: '100px', cursor: 'pointer' }}
              >
                {notifications && notifications?.filter((n: Notification) => !n.visited).length > 0 && (
                  <span className={styles['notification-badge']}>
                    {notifications.filter(n => !n.visited).length}
                  </span>
                )}
                <strong >🔔 </strong>
              </button>

            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            
            {showNotifications && (
              <div className={styles['notification-dropdown']}>
                <div style={{ position: 'fixed', background: 'linear-gradient(135deg, #2c5364, #203a43, #0f2027)', padding: '10px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', color: 'white', marginTop: '-10px', marginLeft: '-10px', width: '320px' }}> 
                  🔔 Tienes &nbsp;
                  <span style={{ color: 'orange'}}>{notifications.filter(n => !n.visited).length}</span> 
                  &nbsp;
                  notificaciones sin leer...
                </div>
                <br />
                <br />
                <ul>
                  {notifications.map((note) => (
                    <li key={note.id}>
                      <Link
                        href={note.link}
                        onClick={() => handleNotificationClick(note.id)}
                        style={{ opacity: note.visited ? 0.3 : 1, fontSize: '14px' }}
                      >
                        {note.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>          
          )}

        {authenticated && (
          <div className="relative">
            <button className="flex items-center gap-2 focus:outline-none" style={{ cursor: 'pointer' }} onClick={() => setShowDropdown(!showDropdown)}>
              <Image
                width={50}
                height={50}
                src={user?.profilePic || "/default-avatar.png"}
                alt="Profile Picture"
                className={styles['profile-picture']}
              />
                <button onClick={handleLogout} className={styles.logoutButton}>
                  <FaSignOutAlt />
                </button>
            </button>
            

            {renderDropdown && (
              <div
                className={`${styles.dropdown} ${showDropdown ? styles.dropdownVisible : styles.dropdownHidden}`}
              >
                <br />
                <br />
                <br />
                <label htmlFor="profile-pic" style={{ textAlign: 'center', cursor: 'pointer', margin: '0 auto', left: '0px', right: '0px', display: 'block' }}>
                  <Image
                    src={user?.profilePic}
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="profile-pic"
                  />
                </label>

                <div style={{ position: 'absolute', top: '0px', right: '0px', borderTopRightRadius: '10px', borderTopLeftRadius: '10px', padding: '10px',  background: 'linear-gradient(135deg, #2c5364, #203a43, #0f2027)', width: '100%' }} >
                  <Link href="/profile" className={styles.dropdownLink}>⚙️ Ir al Perfil</Link>
                </div>

                <br />
                <p className={styles.dropdownItem}><strong>{user?.displayName || 'Usuario'}</strong></p>
                <p className={styles.dropdownItem}>{user?.email}</p>
                <p className={styles.dropdownItem}>🛡️ Rol: <b>{role}</b></p>

                <div className={styles.dropdownActions}>
                  <br />
                  <p className={styles.dropdownLink} style={{ color: 'white', textDecoration: 'none' }}>Cerrar Sesion</p>
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
      {authenticated && <ChatSidebar />}
    </nav>
  )
}
