import styles from "@/app/assets/styles/MainPage.module.css";
import { time } from "console";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const Home = () => {

  useEffect(() => {
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div className="logo-positioning-for-mobile">
          <h1>Bienvenido a <b style={{ fontSize: '1.5em'}}> FESTIVARTES</b></h1>
          <Link href="/login">
              <Image
              className={styles.logo}
              src="/logo2.png"
              alt="Festivartes Main Logo"
              width={400}
              height={400}
              priority
            />
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Home
