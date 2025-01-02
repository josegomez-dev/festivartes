import styles from '@/app/assets/styles/Nav.module.css'
import { useGlobalContext } from '@/context/GlobalContext'
import { EMPTY_USER } from '@/types/userTypes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaSignOutAlt } from "react-icons/fa"

export default function Nav() {
  const { role, authenticated, setAuthenticated, setRole, loggedUser, setLoggedUser } = useGlobalContext()
  const router = useRouter()

  const handleLogout = () => {
    setAuthenticated(false)
    setRole('user') // Reset the role to default
    setLoggedUser(EMPTY_USER)
    router.push('/')
  }

  return (
    <nav className={`${styles.navbar} bg-gray-800 text-white`}>
    <div className="flex items-center">
      {authenticated && <Link href={`/dashboard`}>
        <div className="logo-container">
          <Image
            style={{ position: 'absolute', top: '2px', filter: 'drop-shadow(0 0 0.3rem black)' }}
            src="/logo2.png"
            alt="Catarsis Musical Logo"
            width={80}
            height={80}
            priority
          />
        </div>
      </Link>}
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
            <Link href="/signup">Registrarse</Link>
          </li>
          <li className={styles['nav-link']}>
            <Link href="/login">Ingresar</Link>
          </li>
        </>
      ) : (
        <>
          &nbsp; <b style={{ position: 'absolute', top: '5px', right: '85px', fontSize: '18px' }}>{role}</b> &nbsp;
          <li className={styles['']}>
          <Link href="/profile">
              <Image
                src="data:image/jpeg;base64,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"
                alt="Profile Picture"
                className={styles['profile-picture']}
                width={50}
                height={50}
                style={{ position: 'absolute', right: '45px', top: '25px', borderRadius: '50%', filter: 'drop-shadow(0 0 0.3rem black)' }}
              />             
            </Link>
          </li>
        </>
      )}
    </ul>
  </nav>
  )
}
