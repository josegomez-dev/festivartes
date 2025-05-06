'use client';
import styles from "./../app/assets/styles/RegisterForm.module.css";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
  const { signUp } = useAuth()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [category, setCategory] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  const [isJudge, setIsJudge] = useState(false)

  useEffect(() => {
    if (!router.isReady) return;

    const queryEmail = router.query.email as string;
    const queryRole = router.query.role as string;
    const queryName = router.query.name as string;

    if (queryEmail) {
      setEmail(queryEmail);
      setName(queryName);
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
      await signUp(email, password, isJudge, name, category)
      toast.success('¡Cuenta creada con éxito! 🎉')
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
        <div className="auth-form space-around">
          <h2 className="auth-title">Crea tu cuenta en <b>FESTIVARTES</b></h2>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Nombre completo"
            className="auth-input"
            required
          />
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
          <br />
          {router.query.email && (
            <div className="input-group-custom-wrapper">
              <div className="input-group mTop-30">
                {category === "" && (
                  <div>
                    <Image
                      width={50}
                      height={50}
                      className='judges-badge' 
                      src="/logo2.png" 
                      alt="" 
                    />
                  </div>
                  )}
                {category === "escultura" && (
                  <div>
                    <Image
                      width={50}
                      height={50}
                      className='judges-badge badge-white' 
                      src="/icons-sculture.png" 
                      alt="" 
                    />
                  </div>
                  )}
                {category === "fotografia" && (
                  <div>
                    <Image
                      width={50}
                      height={50}
                      className='judges-badge badge-white' 
                      src="/icons-photography.png" 
                      alt="" 
                    />
                  </div>
                  )}
                {category === "arte_digital" && (
                  <div>
                    <Image
                      width={50}
                      height={50}
                      className='judges-badge badge-white' 
                      src="/icons-digital.png" 
                      alt="" 
                    />
                  </div>
                  )}
                {category === "musica" && (
                  <div>
                    <Image
                      width={50}
                      height={50}
                      className='judges-badge badge-white' 
                      src="/icons-music.png" 
                      alt="" 
                    />
                  </div>
                  )}
                {category === "baile" && (
                  <div>
                    <Image
                      width={50}
                      height={50}
                      className='judges-badge badge-white' 
                      src="/icons-dance.png" 
                      alt="" 
                    />
                  </div>
                  )}
            </div>
  
  
  
            <div className="input-group">
              <div className="input-group">
                <label className={styles.label} htmlFor="category">
                  Categoría
                </label>
                <select
                  id="category"
                  name="category"
                  className={styles.select}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="escultura">Escultura</option>
                  <option value="fotografia">Fotografía</option>
                  <option value="arte_digital">Arte Digital</option>
                  <option value="musica">Música</option>
                  <option value="baile">Baile o Danza</option>
                </select>
              </div>
            </div>
  
          </div>          
          )}
          {errorMessage !== '' && (
            <p className="error-message">
              {errorMessage}
            </p>
          )}
          <button type="submit" onClick={handleSignUp} className="auth-button">
            {isJudge ? 'Crear cuenta como 👨‍⚖️ Jurado' : 'Crear cuenta'}
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
