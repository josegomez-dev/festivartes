'use client';

import React, { useState, useRef } from 'react';
import styles from '@/app/assets/styles/MainPage.module.css';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Link from 'next/link';

const Home = () => {
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 40 });
  const containerRef = useRef<HTMLDivElement>(null);

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
              <h1>Bienvenid@s a este <b style={{ fontSize: 35 }}>Espacio Culutral e Interactivo</b> que brinda <b style={{ fontSize: 35 }}>Catarsis Musical.</b></h1>
              <br />  
              <p>Una experiencia artística como ninguna otra.</p>
            </div>
          </section>

          <br />
          <br />

          <section className={styles.rowMiddle}>
            
              <Link href="/login" className={styles.columnBox} style={{ textDecoration: 'none', fontSize: 18 }}>
                <div
                  onMouseMove={handleHover}
                  onMouseLeave={resetLight}
                >
                    <h3><b style={{ fontSize: 40}}>📲 FESTIVARTES</b></h3>
                    <p>Simplifica, automatiza y digitaliza todo tu festival cultural.</p>
                    <br />
                    <p><strong>¡Todo en un solo lugar!</strong></p>
                    <br />
                    <Image
                      className={styles.logo}
                      src="/core/logo2.png"
                      alt="Festivartes Main Logo"
                      width={170}
                      height={170}
                      priority
                    />
                  
                </div>
              </Link>

              <Link href="/#" className={styles.columnBox} style={{ textDecoration: 'none', fontSize: 18 }}>
                <div
                  onMouseMove={handleHover}
                  onMouseLeave={resetLight}
                >                  
                    <h3><b style={{ fontSize: 40}}>🎶 ARTISTICA</b></h3>
                    <p><strong>Lo último en cultura y arte.</strong></p> <br />
                    <p>Explora conciertos y presentaciones en vivo.</p>
                    <p>Arte visual, fotografía y mucho más.</p>
                    <br />
                    <Image
                      className={styles.logo}
                      src="/core/artistica.png"
                      alt="Festivartes Main Logo"
                      width={150}
                      height={150}
                      priority
                    />
                </div>
              </Link>
              
              <Link href="/#" className={styles.columnBox} style={{ textDecoration: 'none', fontSize: 18 }}>
                <div
                  onMouseMove={handleHover}
                  onMouseLeave={resetLight}
                >
                    <h3><b style={{ fontSize: 40}}>📜 LEGARTE</b></h3>
                    <p>Homenajes y producciones audiovisuales de artistas, cantautores y compositores.</p> <br />
                    <p><strong>Preservamos legados musicales.</strong></p>
                    <br />
                    <Image
                      className={styles.logo}
                      src="/core/legartes.png"
                      alt="Festivartes Main Logo"
                      width={150}
                      height={150}
                      priority
                    />
                </div>
              </Link>
          </section>
        </div>
      </main>

      <div style={{marginTop: '-70px', textAlign: 'center'}}>
        <Footer />
      </div>

    </>
  );
};

export default Home;
