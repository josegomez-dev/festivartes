import styles from "@/app/assets/styles/MainPage.module.css";
import register_styles from "./../app/assets/styles/RegisterForm.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const musicalQuotes = [
  "Canta lo que el alma no sabe decir.",
  "Toda herida guarda una canción.",
  "Componer es recordar lo que aún no ha pasado.",
  "Una melodía puede sostener un corazón.",
  "El arte nace donde el dolor se vuelve luz.",
  "Cada silencio es parte de la música.",
  "Escribir canciones es hablar con el universo.",
  "La emoción es la tinta del compositor.",
  "El arte es un refugio donde la verdad no teme ser vista.",
  "Una canción sincera vale más que mil palabras sabias."
];


const Home = () => {
  const [currentQuote, setCurrentQuote] = useState(musicalQuotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * musicalQuotes.length);
      setCurrentQuote(musicalQuotes[randomIndex]);
      redirectToLogin();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const redirectToLogin = () => {
    window.location.href = '/login';
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * musicalQuotes.length);
      setCurrentQuote(musicalQuotes[randomIndex]);
    }, 6000); // Matches CSS timing
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <main className={styles.main}>

      <div key={currentQuote} className={styles.quote}>
        {currentQuote}
      </div>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/logo2.png"
          alt="Festivartes Main Logo"
          width={300}
          height={300}
          priority
        />
      </div>
      <div className={styles.center}>
        <h1 className={styles.title}><b style={{fontSize: '1.3em'}}>¡Bienvenido a Festivartes!</b></h1>
        <br />
        <p className={styles.description}>
          ¡Explora, crea y comparte tu pasión por la música!
        </p>

        <button
          id="start-button"
          style={{
            left: 0,
            right: 0,
            margin: '50px auto',
            width: '100%',
            maxWidth: '300px',
            height: '80px',
            zIndex: 999,
          }}
          className={`${register_styles.submitButton}`}
        >
          <b>Comenzar</b>
        </button>

        </div>
    </main>
  );
};

export default Home;
