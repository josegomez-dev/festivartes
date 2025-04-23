import styles from '@/app/assets/styles/AdminIndex.module.css';
import ObjectMiniature from './ObjectMiniature';
import Image from 'next/image';
import { RiBubbleChartFill } from 'react-icons/ri';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../firebaseConfig'; // update path if needed
import { useEffect, useState } from 'react';

const CoreSectionFestivartes = ({ }) => {
  const [data, setData] = useState<{ id: string; [key: string]: any }[]>([]);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'))
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
      <>
        <div className={styles.card}>
            <p>
              <span className='bolder-text'>
                <RiBubbleChartFill color='gold'/> &nbsp;
                <b>Mis Creaciones en Festivartes &nbsp; 
                
                </b>
                <p className='bolder-text small-text-size'>
                  ¡Elegí tu próximo escenario y hacé historia!
                </p>
                <br />
              </span>
            </p>
            {data.length <= 0 ? 
            <div className={styles.grid}>
                <div className={styles.card}>
                <h3>Registra tu primer Evento Calificado</h3>
                <p>Evento con jurado y reglamento.</p>
                </div> 
            </div> 
            : 
            <ObjectMiniature projects={data} type={'event'} />
            }
        </div>

        <div className={styles.card}>
            <p>
              <span className='bolder-text'>
                <RiBubbleChartFill color='gold'/> &nbsp;
                <b> Catalogo completo de Festivartes &nbsp; 
                🌍
                </b>
                <p className='bolder-text small-text-size'>
                Lleva tu evento al siguiente nivel con nuestra app.
                </p>
                <br />
              </span>
            </p>
            {data.length <= 0 ? 
            <div className={styles.grid}>
                <div className={styles.card}>
                <h3>Registra tu primer Evento Calificado</h3>
                <p>Evento con jurado y reglamento.</p>
                </div> 
            </div> 
            : 
            <div className='overflow--big-area'>
              <ObjectMiniature projects={data.concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data)} type={'event'} />
            </div>
            }
        </div>
      </>
  )
}

export default CoreSectionFestivartes
