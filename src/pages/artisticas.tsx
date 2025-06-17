'use client';

import React, { useState, useRef } from 'react';
import styles from '@/app/assets/styles/MainPage.module.css';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Link from 'next/link';

const ArtistiacasScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHover = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
  };
  
  // how to change body background color on load 
  React.useEffect(() => {
    document.body.style.background = 'linear-gradient(to right, #F11712, #0099F7)'; // Set your desired background color
    return () => {
      document.body.style.background = ''; // Reset on unmount
    };
  }, []);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.contentWrapper} style={{ marginTop: '-10px' }}>
          <section>
            <Link href="/" style={{ textDecoration: 'none' }}>
                <Image
                    className={styles.logo}
                    src="/core/artistica.png"
                    alt="Festivartes Main Logo"
                    width={200}
                    height={200}
                    priority
                />
            </Link>
            <div style={{ textAlign: 'center' }}>
              <h3><b style={{ fontSize: 30}}>▶️ ARTISTICAS</b></h3>
              <p><strong>🎶 ¡Lo último en cultura y arte! 🎨</strong></p> <br />
              <p>Explora conciertos y presentaciones en vivo.</p>
              <p>Arte visual, fotografía y mucho más.</p>
            </div>
          </section>

          <br />

          <hr style={{width: '100%'}} />
          <br />

          <h3><b>Centro de Cultura Jose Figuerres Ferrer 2025</b> | San Ramon.
              <Image
                className={styles.logo}
                src="/artistica/artemediodia/1.png"
                alt="Jose Alejandro"
                width={100}
                height={100}
                priority
                style={{ borderRadius: '50%' }}
              />
          </h3>  
          <br />

          <section className={styles.rowMiddle}>
            <div onClick={() => alert('https://josegomez-dev.github.io/catarsismusical/welcome.html')}
              className={styles.columnBox}
              style={{ textDecoration: 'none', fontSize: 18, padding: 15, cursor: 'pointer' }}
              onMouseMove={handleHover}
            >
              <h3><b style={{ fontSize: 30 }}>La Vaca Lola</b></h3>
              <br />
              <br />
              <br />
              <video
                  className={styles.video}
                  controls
                  src="/artistica/artemediodia/4.MOV"
                  style={{
                    width: '250px',
                    height: '250px',
                    marginTop: '-60px',
                    border: '3px solid rgba(218, 165, 32, 0.6)'
                  }}
                />
            </div>

            <div
              onClick={() => alert('https://josegomez-dev.github.io/compositor-nacional/')}
              className={styles.columnBox}
              style={{ textDecoration: 'none', fontSize: 18, padding: 15, cursor: 'pointer' }}
              onMouseMove={handleHover}
            >
              <div className={styles.iframeContainer}>
                <h3><b style={{ fontSize: 30 }}>Arte al medio dia</b></h3>
                <br />
                <br />
                <br />
                <video
                  className={styles.video}
                  controls
                  src="/artistica/artemediodia/3.MOV"
                  style={{
                    width: '250px',
                    height: '250px',
                    marginTop: '-60px',
                    border: '3px solid rgba(218, 165, 32, 0.6)'
                  }}
                />
              </div>
            </div>

            <div onClick={() => alert('Sitio Web en construcción...')}
              className={styles.columnBox}
              style={{ textDecoration: 'none', fontSize: 18, padding: 15, cursor: 'pointer' }}
              onMouseMove={handleHover}
            >
              <h3><b style={{ fontSize: 30 }}>Concierto en Vivo</b></h3>
              <br />
              <Image
                className={styles.logo}
                src="/artistica/artemediodia/2.jpeg"
                alt="Johnny"
                width={200}
                height={150}
                priority
                style={{ border: '3px solid rgba(218, 165, 32, 0.6)' }}
              />
            </div>
          </section>

          <hr style={{width: '100%'}} />
          <br />
          <h3><b>Festival de las Artes 2025</b> | Escuela Simon Bolivar.</h3>
          <br />

          <section className={styles.rowMiddle}>
            <div onClick={() => alert('https://josegomez-dev.github.io/catarsismusical/welcome.html')}
              className={styles.columnBox}
              style={{ textDecoration: 'none', fontSize: 18, padding: 15, cursor: 'pointer' }}
              onMouseMove={handleHover}
            >
              <h3><b style={{ fontSize: 30 }}>Festivartes APP</b></h3>
              <br />
              <Image
                className={styles.logo}
                src="/artistica/simon/1.png"
                alt="Jose Alejandro"
                width={200}
                height={250}
                priority
                                style={{ border: '3px solid rgba(218, 165, 32, 0.6)' }}
              />
            </div>

            <div
              onClick={() => alert('https://josegomez-dev.github.io/compositor-nacional/')}
              className={styles.columnBox}
              style={{ textDecoration: 'none', fontSize: 18, padding: 15, cursor: 'pointer' }}
              onMouseMove={handleHover}
            >
              <h3><b style={{ fontSize: 30 }}>Presentacion Banda Original</b></h3>
              <br />
              <br />
              <Image
                className={styles.logo}
                src="/artistica/simon/2.jpeg"
                alt="Alexander"
                width={250}
                height={200}
                priority
                                style={{ border: '3px solid rgba(218, 165, 32, 0.6)' }}
              />
            </div>

            <div onClick={() => alert('Sitio Web en construcción...')}
              className={styles.columnBox}
              style={{ textDecoration: 'none', fontSize: 18, padding: 15, cursor: 'pointer' }}
              onMouseMove={handleHover}
            >
              <h3><b style={{ fontSize: 30 }}>Banda Instrumentos Reciclados</b></h3>
              <br />
              <br />
              <Image
                className={styles.logo}
                src="/artistica/simon/3.jpeg"
                alt="Johnasdasny"
                width={250}
                height={200}
                priority
                                style={{ border: '3px solid rgba(218, 165, 32, 0.6)' }}
              />
            </div>
          </section>
          
          <hr style={{width: '100%'}} />
          <br />
          <h3><b>Banda Generaciones Griegas</b> | Grecia.</h3>
          <br />

          <section className={styles.rowMiddle}>
            <div onClick={() => alert('https://josegomez-dev.github.io/catarsismusical/welcome.html')}
              className={styles.columnBox}
              style={{ textDecoration: 'none', fontSize: 18, padding: 15, cursor: 'pointer' }}
              onMouseMove={handleHover}
            >
              <h3><b style={{ fontSize: 30 }}>Michael Jackson & Guns N' Roses</b></h3>
              <br />
              <Image
                className={styles.logo}
                src="/artistica/generaciones/1.jpg"
                alt="Jose Alejandroasd"
                width={250}
                height={200}
                priority
                                style={{ border: '3px solid rgba(218, 165, 32, 0.6)' }}
              />
            </div>

            <div
              onClick={() => alert('https://josegomez-dev.github.io/compositor-nacional/')}
              className={styles.columnBox}
              style={{ textDecoration: 'none', fontSize: 18, padding: 15, cursor: 'pointer' }}
              onMouseMove={handleHover}
            >
              <h3><b style={{ fontSize: 30 }}>Soy Tico Banda Folkclorico</b></h3>
              <br />
              <Image
                className={styles.logo}
                src="/artistica/generaciones/2.jpg"
                alt="Alexander"
                width={150}
                height={200}
                priority
                                style={{ border: '3px solid rgba(218, 165, 32, 0.6)' }}
              />
            </div>

            <div onClick={() => alert('Sitio Web en construcción...')}
              className={styles.columnBox}
              style={{ textDecoration: 'none', fontSize: 18, padding: 15, cursor: 'pointer' }}
              onMouseMove={handleHover}
            >
              <h3><b style={{ fontSize: 30 }}>Ashley Castro en Vivo</b></h3>
              <br />
              <Image
                className={styles.logo}
                src="/artistica/generaciones/3.jpg"
                alt="Johnny"
                width={150}
                height={200}
                priority
                style={{ border: '3px solid rgba(218, 165, 32, 0.6)' }}
              />
            </div>
          </section>

          <hr style={{width: '100%'}} />
          <br />

          <h3><b>Colegio Experimental en Barrio Latino</b> | Grecia.</h3>  
          <br />

          <section className={styles.rowMiddle}>
            <div onClick={() => alert('https://josegomez-dev.github.io/catarsismusical/welcome.html')}
              className={styles.columnBox}
              style={{ textDecoration: 'none', fontSize: 18, padding: 15, cursor: 'pointer' }}
              onMouseMove={handleHover}
            >
              <h3><b style={{ fontSize: 30 }}>Liceo Experimental de Grecia</b></h3>
              <br />
              <Image
                  alt='asd'
                  width={250}
                  height={200}
                  className={styles.video}
                  src="/artistica/experimental/1.png"
                  style={{
                    border: '3px solid rgba(218, 165, 32, 0.6)'
                  }}
                />
            </div>

            <div
              onClick={() => alert('https://josegomez-dev.github.io/compositor-nacional/')}
              className={styles.columnBox}
              style={{ textDecoration: 'none', fontSize: 18, padding: 15, cursor: 'pointer' }}
              onMouseMove={handleHover}
            >
              <div className={styles.iframeContainer}>
                <h3><b style={{ fontSize: 30 }}>We Will Rock You</b></h3>
                <br />
                <br />
                <br />
                <video
                  className={styles.video}
                  controls
                  src="/artistica/experimental/3.MOV"
                  style={{
                    width: '250px',
                    height: '250px',
                    marginTop: '-60px',
                    border: '3px solid rgba(218, 165, 32, 0.6)'
                  }}
                />
              </div>
            </div>

            <div onClick={() => alert('Sitio Web en construcción...')}
              className={styles.columnBox}
              style={{ textDecoration: 'none', fontSize: 18, padding: 15, cursor: 'pointer' }}
              onMouseMove={handleHover}
            >
              <h3><b style={{ fontSize: 30 }}>Presentacion Teatro</b></h3>
              <br />
              <Image
                className={styles.logo}
                src="/artistica/experimental/2.png"
                alt="Johnny"
                width={250}
                height={200}
                priority
                style={{ border: '3px solid rgba(218, 165, 32, 0.6)' }}
              />
            </div>
          </section>

        </div>
      </main>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <Footer />
      </div>
    </>
  );
};

export default ArtistiacasScreen;
