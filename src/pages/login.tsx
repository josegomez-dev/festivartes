"use client"; // Required for Next.js App Router

import { useGlobalContext } from '@/context/GlobalContext';
import { useAuth } from "@/context/AuthContext";
import { EMPTY_USER } from '@/types/userTypes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { use, useEffect, useRef, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
  const { setAuthenticated, setRole, setLoggedUser, loggedUser } = useGlobalContext();
  const { user, signInWithGoogle, signIn, logout } = useAuth();
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
    logout();
    if (document.body.classList.contains('prevent-scroll')) {
      document.body.classList.remove('prevent-scroll');
    }
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
      setLoggedUser({ 
        ...EMPTY_USER, 
        email,
      });
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

  const _userEmail = user?.email
  const _userDisplayName = user?.displayName
  
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div style={{ display: 'none' }}>
        <audio ref={audioRef} src="https://cdn.freesound.org/previews/784/784433_4468658-lq.mp3" />
        <button id="playBtn" onClick={playAudio}>Play</button>
      </div>
      <div className="auth-container">
        <div className="auth-form">
          <h2 className="auth-title">Bienvenido a <b>FESTIVARTES</b></h2>
          <p>
            Please use <strong>google login</strong> to access the platform. <br /> 
          </p>
          <b style={{ textAlign: 'center' }}>{user?.displayName}</b>
          <br />
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" className="auth-input disabled" disabled required />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="auth-input disabled" disabled required />
          {errorMessage !== '' && <p style={{ textAlign: 'center', color: 'red', background: 'black', borderRadius: '10px', width: '180px', margin: '0 auto', padding: '10px' }}>
            {errorMessage}
          </p>}
          <br />
          <button type="submit" onClick={() => handleLogin()} className="auth-button disabled" disabled>Iniciar sesión</button>
          <br />
          {!user && (
            <>
              <div className="external-logins">
                <div className='google-login'>
                  <FaGoogle style={{ marginTop: '8px' }} onClick={async () => {
                    await signInWithGoogle();
                    setRole('user');
                    setLoggedUser({
                      ...EMPTY_USER,
                      email: _userEmail || '',
                      displayName: _userDisplayName || '',
                    });
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
