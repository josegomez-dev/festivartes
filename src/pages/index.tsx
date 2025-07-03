'use client';

import React, { useState, useRef } from 'react';
import styles from '@/app/assets/styles/MainPage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { RiBubbleChartFill } from 'react-icons/ri';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

const Home = () => {
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 40 });
  const containerRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();
  const router = useRouter();

  const handleHover = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

  const resetLight = () => {
    setSpotlightPos({ x: 50, y: 40 }); // Default center position
  };

  // If the user is logged in, redirect to the dashboard
  if (user) {
    router.push('/dashboard');
    return null; // Prevent rendering the rest of the component
  }

  return (
    <>
      <main className={styles.main}>
        <div
          className={styles.artisticBackground}
          ref={containerRef}
          style={{
            '--spotlight-x': `${spotlightPos.x}%`,
            '--spotlight-y': `${spotlightPos.y}%`,
          } as React.CSSProperties}
        >
          <div className={styles.movingLight}></div>
          <div className={styles.movingLight}></div>
          <div className={styles.movingLight}></div>
          <div className={styles.movingLight}></div>
          <div className={styles.movingLight}></div>
          <div className={styles.mainStageLight}></div>
          <div className={styles.flash}></div>
          <div className={styles.paparazzi}></div>
        </div>

        <div className={styles.contentWrapper} style={{ marginTop: '-20px' }}>
          <section>
            <Image
              className={styles.logo}
              src="/catarsismusical.png"
              alt="Festivartes Main Logo"
              width={150}
              height={200}
              priority
            />
            <div style={{ textAlign: 'center', marginTop: '-35px' }}>
              <b>Catarsis Musical</b>
              <p>Bienvenid@s a este Espacio Culutral e Interactivo.</p>
            </div>
          </section>

          <br />
          <br />

          <section className={styles.rowMiddle}>

              <Link href="/login" className={styles.columnBox} style={{ textDecoration: 'none', fontSize: 15 }}>
                <div
                  onMouseMove={handleHover}
                  onMouseLeave={resetLight}
                >
                    <h3><b style={{ fontSize: 30}}>
                      <RiBubbleChartFill color='gold' />
                       FESTIVARTES</b></h3>
                    <p><strong>📲 ¡Todo en un solo lugar! 💻</strong></p>
                    <br />
                    <p>Simplifica, automatiza y digitaliza todo tu festival cultural.</p>
                    <br />
                    <br />
                    <Image
                      className={styles.logo}
                      src="/core/logo2.png"
                      alt="Festivartes Main Logo"
                      width={130}
                      height={130}
                      priority
                      style={{ marginTop: '-25px', marginBottom: '-20px' }}
                    />
                  
                </div>
              </Link>
            
              <Link target="_blank" href="https://joses-organization-73.gitbook.io/festivartes" className={styles.columnBox} style={{ textDecoration: 'none', fontSize: 15 }}>
                <div
                  onMouseMove={handleHover}
                  onMouseLeave={resetLight}
                >
                    <h3><b style={{ fontSize: 30}}>
                      <RiBubbleChartFill color='gold' />
                       DOCUMENTACION OFICIAL</b>
                    </h3>
                    <p>
                    <strong>📚 ¡Todo lo que necesitas saber! 📖</strong>
                    </p>
                    <br />
                    <p>
                      Explora nuestra documentación oficial para conocer todas las funcionalidades y guías de uso.
                    </p>
                    <br />
                    <br />
                    <Image
                      className={styles.logo}
                      src="/core/legartes.png"
                      alt="Festivartes Main Logo"
                      width={100}
                      height={100}
                      priority
                      style={{ marginTop: '-25px', marginBottom: '-20px' }}
                    />
                  
                </div>
              </Link>

              {/* <Link href="/legartes" className={styles.columnBox} style={{ textDecoration: 'none', fontSize: 15 }}>
                <div
                  onMouseMove={handleHover}
                  onMouseLeave={resetLight}
                >
                    <h3><b style={{ fontSize: 30}}>🖼️ LEGARTES</b></h3>
                    <p><strong>📜 ¡Preservamos legados culturales! 🇨🇷</strong></p> <br />
                    <p>Homenajes y producciones audiovisuales de artistas, cantautores y compositores.</p> <br />
                    <br />
                    <br />
                    <Image
                      className={styles.logo}
                      src="/core/legartes.png"
                      alt="Festivartes Main Logo"
                      width={150}
                      height={150}
                      priority
                      style={{ marginTop: '-40px', marginBottom: '-20px' }}
                    />
                </div>
              </Link> */}
          </section>
          <p>Creado por: <b><a target='_blank' href="https://www.linkedin.com/in/josealejandrogomezcastro/">Jose Alejandro Gomez Castro</a></b></p>
        </div>
      </main>

    </>
  );
};

export default Home;
