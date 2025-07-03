'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { collection, getDocs } from 'firebase/firestore';

import styles from '../app/assets/styles/RegisterForm.module.css';
import { useAuth } from '@/context/AuthContext';
import { db } from '../../firebaseConfig';

const SignUp = () => {
  const { signUp } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isJudge, setIsJudge] = useState(false);

  // Handles query params and checks if judge is already registered
  useEffect(() => {
    if (!router.isReady) return;

    const queryEmail = router.query.email as string;
    const queryRole = router.query.role as string;
    const queryName = router.query.name as string;

    if (queryEmail) {
      setEmail(queryEmail);
      setName(queryName);
      setIsJudge(queryRole === 'judge');

      if (queryRole === 'judge') {
        const checkIfJudgeRegistered = async () => {
          const accountsRef = collection(db, 'accounts');
          const querySnapshot = await getDocs(accountsRef);

          const alreadyRegistered = querySnapshot.docs.some(doc => {
            const data = doc.data();
            return data.email === queryEmail && data.role === 'judge';
          });

          if (alreadyRegistered) {
            toast.error('Ya tienes una cuenta como jurado. Por favor, inicia sesión.');
            router.push('/login');
          } else {
            toast.success('🎟️ Invitación para crear una cuenta de "Jurado Seleccionador".');
          }
        };

        checkIfJudgeRegistered();
      }
    }
  }, [router.isReady]);

  const handleSignUp = async () => {
    if (!email || !password) {
      setErrorMessage('Por favor, rellena todos los campos');
      return;
    }

    try {
      await signUp(email, password, isJudge, name, category);
      toast.success('¡Cuenta creada con éxito! 🎉');
      router.push('/onboarding');
    } catch (error) {
      setErrorMessage((error as Error).message);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const renderCategoryBadge = () => {
    const icons: Record<string, string> = {
      arte: '/icons/icons-digital.png',
      musica: '/icons/icons-music.png',
      baile: '/icons/icons-dance.png',
      literature: '/icons/icons-literature.png',
    };

    return category && icons[category] ? (
      <Image
        width={50}
        height={50}
        src={icons[category]}
        alt={`Icono ${category}`}
        className="judges-badge badge-white"
        style={{ marginRight: '25px' }}
      />
    ) : null;
  };

  const renderCategorySelector = () => (
    <div className="input-group">
      <label className={styles.label} htmlFor="category">Categoría</label>
      <select
        id="category"
        name="category"
        className={styles.select}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Selecciona una categoría</option>
        <option value="arte">Arte</option>
        <option value="musica">Música</option>
        <option value="baile">Baile o Danza</option>
        <option value="literature">Literatura</option>
      </select>
    </div>
  );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="auth-container">
        <div className="auth-form space-around">
          <h2 className="auth-title">
            Crea tu cuenta en <b>FESTIVARTES</b>
          </h2>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre completo"
            className="auth-input"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="auth-input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="auth-input"
            required
          />

          {router.query.email && (
            <div className="input-group-custom-wrapper">
              {renderCategoryBadge()}
              {renderCategorySelector()}
            </div>
          )}

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" onClick={handleSignUp} className="auth-button">
            {isJudge ? 'Crear cuenta como 👨‍⚖️ Jurado' : 'Crear cuenta'}
          </button>

          <p className="auth-link">
            ¿Ya tienes una cuenta?&nbsp;
            <b>
              <Link href="/login">Iniciar sesión</Link>
            </b>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
