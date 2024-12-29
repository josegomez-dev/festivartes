import styles from '@/app/assets/styles/Auth.module.css';
import { useGlobalContext } from '@/context/GlobalContext';
import { EMPTY_USER } from '@/types/userTypes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const LoginPage = () => {
  const { setAuthenticated, setRole, setLoggedUser } = useGlobalContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = () => {
    // Perform authentication logic here (mocked)
    if (email === 'admin@example.com') {
      setRole('admin')
      router.push('/admin/dashboard')
    } else {
      setRole('user')
      router.push('/user/dashboard')
    }
    setLoggedUser({ ...EMPTY_USER, email })
    setAuthenticated(true)
  }

  return (
    <>
      <div className="auth-container">
        <div className="auth-form">
          <h2 className="auth-title">Bienvenido a Festivartes</h2>
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="auth-input" required />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="auth-input" required />
          <button type="submit" onClick={() => handleLogin()} className="auth-button">Ingresar</button>
          <p className="auth-link">
            <b>
            No tienes una cuenta? &nbsp;
            <Link href="/signup">
              Registrarse
            </Link>
            </b>
          </p>
          <article className={styles['btw-text-tip']}>
            <p>
              Use admin@example.com - <b>Admin View</b>
            </p>
            <p>
              or any other to - <b>General User</b>
            </p>
          </article>
        </div>
      </div>
      <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center', padding: '0 25px', marginTop: '-100px' }}>
        <p className="weekly-phrase-banner">
          “El arte no es lo que ves, sino lo que haces ver a los demás” - <b>Edgar Degas</b>
        </p>
      </div>
      <div className={styles.center} style={{ marginTop: '50px', textAlign: 'center' }}>
        <Image
          className={styles.logo}
          src="/logo-white.png"
          alt="Catarsis Musical Logo"
          width={340}
          height={100}
          priority
        />
      </div>
    </>
  );
};

export default LoginPage;
