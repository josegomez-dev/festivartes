import styles from "@/app/assets/styles/MainPage.module.css";
import Image from "next/image";
import Link from "next/link";
// import { FaPlus } from 'react-icons/fa';

const Home = () => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
            <Link href="/login"> Ingresar </Link>
            <Link href="/signup"> Registrarse </Link>
        </p>
        <div>
          <a
            href="https://app.daily.dev/josegomezdev"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            José Alejandro Gómez Castro
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <div className="logo-positioning-for-mobile">
          <Image
            className={styles.logo}
            src="/logo-white.png"
            alt="Catarsis Musical Logo"
            width={340}
            height={100}
            priority
          />
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="#"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Festivartes <span>-&gt;</span>
          </h2>
          <p>
          Es una plataforma con <b>servicio premium</b> para quienes desean una experiencia artística sin
límites. Ofrece suscripciones adaptadas a diferentes tipos de usuarios: <b>personal, empresas
y entidades gubernamentales</b> como el <b>Ministerio de Educación Pública</b>.
          </p>
        </a>

        <a
          href="#"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Servicio Premium <span>-&gt;</span>
          </h2>
          <p>
          Con características
avanzadas y acceso exclusivo a eventos especiales y talleres, <b>Festivartes</b> está diseñado
para aquellos que buscan conectar profundamente con <b>el arte y la cultura</b>, aprovechando
beneficios exclusivos.
          </p>
        </a>

        <a
          href="#"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Roles <span>-&gt;</span>
          </h2>
          <p>
            <b>Administración:</b> Usuarios encargados de la gestión de la plataforma
          y sus funciones.
            <b>Jurado:</b> Participantes que califican y puntúan las obras presentadas
          en eventos.
            <b>Usuario General:</b> Subcategoría de Usuarios.

          </p>
        </a>

        <a
          href="#"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
          Obras Musicales: <b>Premiación y Evaluación</b> <span>-&gt;</span>
          </h2>
          <p>
          <b>(Calificaciones y Votaciones)</b> &nbsp;Sistema de recompensas para participantes destacados: Mecanismo para
que el jurado y el público evalúen las presentaciones.
          </p>
        </a>
      </div>
      <div className="custom-nav-spacer" />
    </main>
  )
}

export default Home