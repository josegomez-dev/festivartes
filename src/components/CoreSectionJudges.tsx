import styles from '@/app/assets/styles/AdminIndex.module.css';
import ObjectMiniature from './ObjectMiniature';
import Image from 'next/image';
import { RiBubbleChartFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../firebaseConfig'; 

interface CoreSectionJudgesProps {
  filterBy?: any
}

const CoreSectionJudges = ({ filterBy }: CoreSectionJudgesProps) => {

  const [data, setData] = useState<{ id: string; [key: string]: any }[]>([]);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'judges'))
      const events = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setData(events);
      return events
    } catch (error) {
      console.error('Error fetching events:', error)
      return []
    }
  }

  useEffect(() => {
    fetchEvents()
  }, []);

  return (
    <div className={`${styles.card} top-spaced`}>
      <p>
        <span className='bolder-text'>
          <RiBubbleChartFill color='gold' /> &nbsp;
          <b>Jurado Seleccionador &nbsp;
            <Image
              src="/judges-icon.png"
              alt="Catarsis Musical Logo"
              width={25}
              height={25}
              priority />
          </b>
          <p className='bolder-text small-text-size'>
            🌟 Los expertos evalúan las obras artísticas.
          </p>
        </span>
      </p>
      <br />
      {data.length <= 0 ?
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Invita a tu Jurado Seleccionador</h3>
            <p>Agrega los datos de las personas encargadas de valorar las obras. Podrán acceder de forma segura y emitir su evaluación.</p>
          </div>
        </div>
        :
        <ObjectMiniature projects={data} type="judge" />}
    </div>
  );
}

export default CoreSectionJudges
