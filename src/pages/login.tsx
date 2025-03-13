import styles from '@/app/assets/styles/Auth.module.css';
import { useGlobalContext } from '@/context/GlobalContext';
import { EMPTY_USER } from '@/types/userTypes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const { setAuthenticated, setRole, setLoggedUser } = useGlobalContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (document.body.classList.contains('prevent-scroll')) {
      document.body.classList.remove('prevent-scroll');
    }
  }, []);

  const handleLogin = () => {
    // Perform authentication logic here (mocked)
    let role = ''
    if (email === 'admin') {
      role = 'admin'
    } else if (email === 'judge') {
      role = 'judge'
    } else {
      role = 'user'
    }
    setRole(role);
    setLoggedUser({ 
      ...EMPTY_USER, 
      email,
    });
    setAuthenticated(true);
    router.push('/dashboard');
  }

  return (
    <>
      <br />
      <br />
      <br />
      <div className="auth-container">
        <div className="auth-form">
          <h2 className="auth-title">Bienvenido a <b>FESTIVARTES</b></h2>
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" className="auth-input" required />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="auth-input" required />
          <button type="submit" onClick={() => handleLogin()} className="auth-button">Iniciar sesión</button>
          <p className="auth-link">
          ¿No tienes una cuenta?
            <b> &nbsp;
            <Link href="/signup">
              Regístrate
            </Link>
            </b>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
