import styles from "@/app/assets/styles/MainPage.module.css";
import Image from "next/image";
import { useEffect } from "react";

const Home = () => {

  useEffect(() => {
    redirectToLogin();
  }, []);

  const redirectToLogin = () => {
    window.location.href = '/login';
  }  

  return (
    <main className={styles.main}>
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
    </main>
  );
};

export default Home;
