import styles from "@/app/assets/styles/MainPage.module.css";
import authStyles from "@/app/assets/styles/Auth.module.css";
import mainStyles from "@/app/assets/styles/AdminIndex.module.css";
import Image from "next/image";
import { useEffect, useRef } from "react";

const Home = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Playback failed:", error);
      });
    }
  };

  useEffect(() => {
    redirectToLogin();
    document.body.classList.add('prevent-scroll');
  }, []);

  const redirectToLogin = () => {
    playAudio();
    setTimeout(() => {
      window.location.href = '/login';
    }
    , 1000);
  }

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div className="logo-positioning-for-mobile">
          <div style={{ display: 'none' }}>
            <audio ref={audioRef} src="https://cdn.freesound.org/previews/784/784433_4468658-lq.mp3" />
            <button id="playBtn" onClick={playAudio}>Play</button>
          </div>
          <h2>Bienvenido a <b style={{ fontSize: '1.8em'}}> FESTIVARTES</b></h2>
          <br />
          <p className={mainStyles['slogan-text']}>
            Simplifica, automatiza y digitaliza todo tu festival cultural: registros, calificaciones y premiaciones. 
            <br /><br /> 
            <b style={{ filter: 'drop-shadow(0 0 0.2rem black)' }}>¡Todo en un solo lugar!</b>
          </p>
          <div>
            <Image
              className={styles.logo}
              src="/logo2.png"
              alt="Festivartes Main Logo"
              width={300}
              height={300}
              priority
            />
          </div>
          {/* <div onClick={redirectToLogin}>
            <button className={authStyles['auth-button']}>Comenzar</button>
          </div> */}
        </div>
      </div>
    </main>
  )
}

export default Home
