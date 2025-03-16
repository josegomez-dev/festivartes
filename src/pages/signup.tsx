// pages/signup.tsx
import { useGlobalContext } from '@/context/GlobalContext';
import { useAuth } from "@/context/AuthContext";
import { EMPTY_USER } from '@/types/userTypes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SignUp = () => {
  const { setAuthenticated, setRole, setLoggedUser } = useGlobalContext()
  const { user, signUp } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const handleSignUp = async () => {
    if (name === '' || email === '' || password === '') {
      setErrorMessage('Por favor, rellena todos los campos')
      return
    }
    try {
      await signUp(email, password)      
      setRole('user')
      setAuthenticated(true)
      setLoggedUser({ ...EMPTY_USER, displayName: name, email })
      router.push('/onboarding')  
    } catch (error) {
      setErrorMessage((error as Error).message)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
      return
    }

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
          <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Nombre" className="auth-input disabled" disabled required />
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" className="auth-input disabled" disabled required />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="auth-input disabled" disabled required />
          {errorMessage !== '' && <p style={{ textAlign: 'center', color: 'red', background: 'black', borderRadius: '10px', width: '180px', margin: '0 auto', padding: '10px' }}>
            {errorMessage}
          </p>}
          <button type="submit" onClick={() => handleSignUp()} className="auth-button disabled" disabled>Crear cuenta</button>
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

export default SignUp
