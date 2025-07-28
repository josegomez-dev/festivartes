import { useAuth } from "@/context/AuthContext";
import styles from '@/app/assets/styles/Nav.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaSignOutAlt } from "react-icons/fa"
import { MdDashboardCustomize } from "react-icons/md";
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from './../../firebaseConfig'
import { Notification } from "@/types/notifications.types";
import ChatSidebar from "./ChatSidebar";
  
export default function Nav() {
  const { role, authenticated, logout } = useAuth()
  const { user } = useAuth() as any
 
  const [showDropdown, setShowDropdown] = useState(false)
  const [renderDropdown, setRenderDropdown] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(user?.notifications);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setShowDropdown(false);
      setShowNotifications(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

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


  if (!authenticated) {
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
              {notifications.filter(n => !n.visited).length > 0 && (
                <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                }}
                className={styles['notification-bell']}
              >
                {notifications && notifications?.filter((n: Notification) => !n.visited).length > 0 && (
                  <span className={styles['notification-badge']}>
                    {notifications.filter(n => !n.visited).length}
                  </span>
                )}
                <strong >🔔 </strong>
              </button>
              )}

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
                <div className="notification-header"> 
                  🔔 Tienes &nbsp;
                  <span className="color-orange">{notifications.filter(n => !n.visited).length}</span> 
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
            
            <Image
              width={50}
              height={50}
              // src={user?.profilePic || "/"}
              src={"/blank-profile-picture.png"}
              alt="Profile Picture"
              className={styles['profile-picture']}
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {renderDropdown && (
              <div
                className={`${styles.dropdown} ${showDropdown ? styles.dropdownVisible : styles.dropdownHidden}`}
              >
                <br />
                <br />
                <br />
                <label htmlFor="profile-pic" className="profile-pic-label-custom">
                  <Image
                    // src={user?.profilePic}
                    src={'/blank-profile-picture.png'}
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="profile-pic"
                  />
                </label>

                <div className="go-to-profile-container" >
                  <Link href="/profile" className={styles.dropdownLink}>⚙️ Ir al Perfil</Link>
                </div>


                <div className="small-text-size">
                  <p className={styles.dropdownItem} style={{ position: 'absolute', top: '50px', left: '5px' }}>
                    🛡️:&nbsp;
                    <b className="medium-text-size">{role}</b>
                  </p>
                  {/* <p className={styles.dropdownItem} style={{ position: 'absolute', top: '50px', right: '5px' }}>
                    ✅ :&nbsp;
                    <b className="medium-text-size">{user?.status}</b>
                  </p> */}
                </div>

                <br />
                {/* <p className={styles.dropdownItem}>
                  <b className="medium-text-size">{user?.type === 'normal' ? 'Usuario Regular' : user?.type}</b>
                </p> */}
                <p className={`${styles.dropdownItem} color-orange`}><strong>{user?.displayName || 'Usuario'}</strong></p>
                <p className={`${styles.dropdownItem} small-text-size`}>{user?.email}</p>
                
                <hr />
                <br />
                <Link href="/profile" className={styles.dropdownLink}>
                  <p className={`${styles.dropdownItem} link-item`}>
                    Mi Perfil
                  </p>
                </Link>
                <Link href="/activity" className={styles.dropdownLink}>
                  <p className={`${styles.dropdownItem} link-item`}>
                    Actividad
                  </p>
                </Link>
                <Link href="/onboarding" className={styles.dropdownLink}>
                  <p className={`${styles.dropdownItem} link-item`}>
                    ¿Como usar? <b>Festivartes</b>
                  </p>
                </Link>
                <div onClick={() => {
                  // this is a emergency feature for childrens to report real life issues
                  alert('Esta funcionalidad es para reportar problemas reales, no es un juego. Si tienes un problema real, por favor contacta a un adulto de confianza o a las autoridades correspondientes.');
                }} className={styles.dropdownLink}>
                  <p className={`${styles.dropdownItem} link-item`}>
                    Denunciar / Reportar ⚠️
                  </p>
                </div>
                <Link href="https://joses-organization-73.gitbook.io/festivartes/conoce-nuestro-proyecto/plataforma-en-linea" className={styles.dropdownLink}>
                  <p className={`${styles.dropdownItem} link-item`}>
                    Documentación
                  </p>
                </Link>
                <div className={styles.dropdownActions}>
                  <br />
                  {/* <p className={`${styles.dropdownLink} close-session-link `}>Cerrar Sesion</p> */}
                  <button onClick={handleLogout} className={styles.logoutButton}>
                    <FaSignOutAlt /> Cerrar Sesión
                  </button>
                  <br />
                </div>
                
              </div>
            )}

          </div>
        )}

        {authenticated && (
          <button onClick={handleLogout} className={styles.logoutButton}>
            <FaSignOutAlt /> 
          </button>
        )}

      </div>
      {authenticated && <ChatSidebar />}
    </nav>
  )
}
