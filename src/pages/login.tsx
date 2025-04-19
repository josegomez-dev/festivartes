"use client"; // Required for Next.js App Router

import { useGlobalContext } from '@/context/GlobalContext';
import { useAuth } from "@/context/AuthContext";
import { EMPTY_USER } from '@/types/userTypes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { use, useEffect, useRef, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
  const { setAuthenticated, setRole } = useGlobalContext();
  const { user, signInWithGoogle, signIn, logout, resetPassword } = useAuth();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Playback failed:", error);
      });
    }
  };

  useEffect(() => {
    // logout();
    // if (document.body.classList.contains('prevent-scroll')) {
    //   document.body.classList.remove('prevent-scroll');
    // }
  }, []);

  const handleLogin = async () => {

    if (email === '' || password === '') {
      setErrorMessage('Por favor, rellena todos los campos');
      return;
    }

    try {
      const response = await signIn(email, password);
      console.log(response);
      setRole('user');
      setAuthenticated(true);
      playAudio();
      router.push('/dashboard');
    }
    catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred');
      }
      setTimeout(() => {
        setErrorMessage('');
      }
      , 3000);
    }    
  }

  if (user) {
    setAuthenticated(true);
    playAudio();
    router.push('/dashboard');
  }

  return (
    <>
      <div style={{ display: 'none'}}>
        <audio ref={audioRef} src="https://cdn.freesound.org/previews/784/784433_4468658-lq.mp3" />
        <button id="playBtn" onClick={playAudio}>Play</button>
      </div>
      <div className="auth-container">
        <div className="auth-form">
          <h2 className="auth-title">Bienvenido a <b>FESTIVARTES</b></h2>
          {/* <b style={{ textAlign: 'center' }}>{user?.displayName}</b> */}
          <br />
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" className="auth-input" required />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="auth-input" required />
          {errorMessage !== '' && <p style={{ textAlign: 'center', color: 'red', background: 'black', borderRadius: '10px', width: '180px', margin: '0 auto', padding: '10px' }}>
            {errorMessage}
          </p>}
          <br />
          <button type="submit" onClick={() => handleLogin()} className="auth-button">Iniciar sesión</button>
          <a onClick={() => {
            email !== '' ? resetPassword(email) : setErrorMessage('Por favor, ingresa tu correo electrónico');
            alert('Si el correo electrónico existe, se enviará un enlace para restablecer la contraseña');
          }}>
            <p className='auth-link' style={{ color: 'orange' }}>
              ¿Olvidaste tu contraseña?
            </p>
          </a>
          <br />
          <p>
            Tambien puedes usar el boton de <strong>Google</strong> para acceder a la plataforma. <br /> 
          </p>

          {!user && (
            <>
              <div className="external-logins">
                <div className='google-login'>
                  <FaGoogle style={{ marginTop: '8px' }} onClick={async () => {
                    await signInWithGoogle();
                    setRole('user');
                    setAuthenticated(true);
                    playAudio();
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
