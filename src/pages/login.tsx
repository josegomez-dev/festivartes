"use client"; // Required for Next.js App Router

import { useAuth } from "@/context/AuthContext";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const LoginPage = () => {
  const { user, signInWithGoogle, signIn, resetPassword } = useAuth();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    if (email === '' || password === '') {
      setErrorMessage('Por favor, rellena todos los campos');
      toast.error("Por favor, rellena todos los campos");
      return;
    }

    try {
      await signIn(email, password);
      toast.success("🎉 Bienvenido a FESTIVARTES");
      router.push('/dashboard');
    }
    catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        toast.error(error.message);
      } else {
        setErrorMessage('An unknown error occurred');
        toast.error("An unknown error occurred");
      }
      setTimeout(() => {
        setErrorMessage('');
      }
      , 3000);
    }
  }

  if (user) {
    router.push('/dashboard');
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="auth-container">
        <div className="auth-form space-around">
          <h2 className="auth-title">Bienvenido a <b>FESTIVARTES</b></h2>
          <br />
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" className="auth-input" required />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="auth-input" required />
          {errorMessage !== '' && 
          <p className="error-message">
            {errorMessage}
          </p>}
          <br />
          <button type="submit" onClick={() => handleLogin()} className="auth-button">Iniciar sesión</button>
          <br />
          <p className="reset-password-link" onClick={() => {
            email !== '' ? resetPassword(email) : setErrorMessage('Por favor, ingresa tu correo electrónico');
            toast.success("Si el correo electrónico existe, se enviará un enlace para restablecer la contraseña");
          }}>
            <span className="forgot-password-link">
              ¿Olvidaste tu contraseña?
            </span>
          </p>
          <br />
          <p>
            Tambien puedes usar el boton de <strong>Google</strong> para acceder a la plataforma. <br /> 
          </p>

          {!user && (
            <>
              <div className="external-logins">
                <div className='google-login'>
                  <FaGoogle className="mTop8" onClick={async () => {
                    await signInWithGoogle();
                    router.push('/dashboard');
                  }} />
                </div>
              </div>
            </>
          )}
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
