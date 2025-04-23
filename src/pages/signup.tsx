'use client';

import { useAuth } from "@/context/AuthContext";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [isJudge, setIsJudge] = useState(false)
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return;

    const queryEmail = router.query.email as string;
    const queryRole = router.query.role as string;

    if (queryEmail) {
      setEmail(queryEmail);
      setIsJudge(queryRole === 'judge');
    }

    if (queryRole === 'judge') {
      toast.success(`🎟️ Invitación para crear una cuenta de "Jurado Seleccionador".`);
    }
  }, [router.isReady]);

  const handleSignUp = async () => {
    if (email === '' || password === '') {
      setErrorMessage('Por favor, rellena todos los campos')
      return
    }
    try {
      await signUp(email, password, isJudge)
      router.push('/onboarding')
    } catch (error) {
      setErrorMessage((error as Error).message)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="auth-container">
        <div className="auth-form">
          <h2 className="auth-title">Crea tu cuenta en <b>FESTIVARTES</b></h2>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Correo electrónico"
            className="auth-input"
            required
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="auth-input"
            required
          />
          {errorMessage !== '' && (
            <p style={{
              textAlign: 'center',
              color: 'red',
              background: 'black',
              borderRadius: '10px',
              width: '180px',
              margin: '0 auto',
              padding: '10px'
            }}>
              {errorMessage}
            </p>
          )}
          <button type="submit" onClick={handleSignUp} className="auth-button">
            Crear cuenta
          </button>
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
    </>
  )
}

export default SignUp;
