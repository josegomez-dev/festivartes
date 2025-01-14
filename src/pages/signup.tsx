// pages/signup.tsx
import styles from '@/app/assets/styles/Auth.module.css';
import { useGlobalContext } from '@/context/GlobalContext';
import { EMPTY_USER } from '@/types/userTypes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SignUp = () => {
  const { setAuthenticated, setRole, setLoggedUser } = useGlobalContext()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignUp = () => {
    // Perform signup logic here (mocked)
    setRole('user')
    setAuthenticated(true)
    setLoggedUser({ ...EMPTY_USER, name, email })
    router.push('/onboarding')
  }

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="auth-container">
        <div className="auth-form">
          <h2 className="auth-title">Crea tu cuenta en <b>FESTIVARTES</b></h2>
          <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Nombre" className="auth-input" required />
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" className="auth-input" required />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="auth-input" required />
          <button type="submit" onClick={() => handleSignUp()} className="auth-button">Crear cuenta</button>
          <p className="auth-link">
          ¿Ya tienes una cuenta?
            <b>
            &nbsp;
            <Link href="/login">
              Iniciar sesión
            </Link>
            </b>
          </p>
        </div>
      </div>
      <div className={styles['main-logo-footer']}>
        <div className='limited-size-centered'>
          <p className="weekly-phrase-banner">
            “El arte no es lo que ves, sino lo que haces ver a los demás” - <b>Edgar Degas</b>
          </p>
        </div>
        <Link href={'./'}>
          <Image
            className={styles.logo}
            src="/logo2.png"
            alt="Catarsis Musical Logo"
            width={250}
            height={250}
            priority
          />
        </Link>
      </div>
    </>
  )
}

export default SignUp
