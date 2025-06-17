'use client';

import React, { useState, useRef } from 'react';
import styles from '@/app/assets/styles/MainPage.module.css';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Link from 'next/link';

const LegartesScreen = () => {
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 40 });
  const [iframeURL, setIframeURL] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHover = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

  const resetLight = () => setSpotlightPos({ x: 50, y: 40 });

  const handleOpenInIframe = (url: string) => {
    setIframeURL(url);
    window.scrollTo({ top: 800, behavior: 'smooth' }); // scroll to iframe
  };

// how to change body background color on load 
React.useEffect(() => {
    document.body.style.background = 'linear-gradient(to right, #2c3e50, #2980b9)'; // Set your desired background color
    return () => {
    document.body.style.background = ''; // Reset on unmount
    };
}, []);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.contentWrapper} style={{ marginTop: '-20px' }}>
          <section>
            <Link href="/" style={{ textDecoration: 'none' }}>
                <Image
                    className={styles.logo}
                    src="/core/legartes.png"
                    alt="Festivartes Main Logo"
                    width={150}
                    height={200}
                    priority
                />
            </Link>
            <div style={{ textAlign: 'center', marginTop: '-35px' }}>
                <h3><b style={{ fontSize: 30}}>🖼️ LEGARTES</b></h3>
                <p><strong>📜 ¡Preservamos legados culturales! 🇨🇷</strong></p> <br />
                <p>Homenajes y producciones audiovisuales de artistas, cantautores y compositores.</p> <br />
            </div>
          </section>

          <section className={styles.rowMiddle}>
            {/* Jose */}
            <div onClick={() => handleOpenInIframe('https://josegomez-dev.github.io/catarsismusical/welcome.html')}
              className={styles.columnBox}
              style={{ textDecoration: 'none', fontSize: 18, padding: 15, cursor: 'pointer' }}
              onMouseMove={handleHover}
              onMouseLeave={resetLight}
            >
              <h3><b style={{ fontSize: 30 }}>Jose Alejandro Gomez Castro</b></h3>
              <br />
              <Image
                className={styles.logo}
                src="/legartes/ale.jpg"
                alt="Jose Alejandro"
                width={150}
                height={150}
                priority
                style={{ border: '3px solid rgba(218, 165, 32, 0.6)' }}
              />
            </div>

            <div
              onClick={() => handleOpenInIframe('https://josegomez-dev.github.io/compositor-nacional/')}
              className={styles.columnBox}
              style={{ textDecoration: 'none', fontSize: 18, padding: 15, cursor: 'pointer' }}
              onMouseMove={handleHover}
              onMouseLeave={resetLight}
            >
              <h3><b style={{ fontSize: 30 }}>Alexander Flores Aguero</b></h3>
              <br />
              <Image
                className={styles.logo}
                src="/legartes/alexander.png"
                alt="Alexander"
                width={170}
                height={170}
                priority
              />
            </div>

            {/* Johnny */}
            <div onClick={() => alert('Sitio Web en construcción...')}
              className={styles.columnBox}
              style={{ textDecoration: 'none', fontSize: 18, padding: 15, cursor: 'pointer' }}
              onMouseMove={handleHover}
              onMouseLeave={resetLight}
            >
              <h3><b style={{ fontSize: 30 }}>Johnny Castro & Amigos</b></h3>
              <br />
              <Image
                className={styles.logo}
                src="/legartes/johnny.png"
                alt="Johnny"
                width={150}
                height={150}
                priority
                style={{ border: '3px solid rgba(218, 165, 32, 0.6)' }}
              />
            </div>
          </section>

          {iframeURL && (
            <section style={{ width: '100%', marginTop: '-2rem' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>🌐 Sitio Abierto</h2>
              <div style={{
                width: '100%',
                maxWidth: '100%',
                height: '600px',
                border: '2px solid goldenrod',
                borderRadius: '12px',
                overflow: 'hidden',
              }}>
                <iframe
                  src={iframeURL}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 'none' }}
                  allowFullScreen
                />
              </div>
            </section>
          )}
        </div>
      </main>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <Footer />
      </div>
    </>
  );
};

export default LegartesScreen;
