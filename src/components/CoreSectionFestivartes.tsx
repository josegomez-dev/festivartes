import styles from '@/app/assets/styles/AdminIndex.module.css';
import ObjectMiniature from './ObjectMiniature';
import Image from 'next/image';
import { RiBubbleChartFill } from 'react-icons/ri';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../firebaseConfig'; // update path if needed
import { useEffect, useState } from 'react';

interface CoreSectionFestivartesProps {
  filterBy?: any;
}

const CoreSectionFestivartes = ({ filterBy }: CoreSectionFestivartesProps) => {
  const [data, setData] = useState<EVENTS[]>([]);
  const [dataFiltered, setDataFiltered] = useState<EVENTS[]>([]);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'))
      const events = querySnapshot.docs.map(doc => {
        const { id, ...rest } = doc.data() as EVENTS;
        return {
          id: doc.id,
          ...rest
        };
      });
  
      setData(events);

      if (filterBy) {
        const filteredEvents = events.filter(event => {
          return event.createdBy === filterBy;
        });
        setDataFiltered(filteredEvents);
      }
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
                <b>Mis Festivartes &nbsp; 
                
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
                <h3 style={{ color: 'lightgray'}}>Registra tu primer Evento Calificado</h3>
                <p style={{ color: 'black' }}>Registra tu Festival Artístico Oficial.</p>
                </div> 
            </div> 
            : 
            <ObjectMiniature projects={dataFiltered} type={'event'} />
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
                <h3 style={{ color: 'lightgray'}}>No se han registrado eventos</h3>
                <p style={{ color: 'black' }}>¡Explora la app y crea el primero!</p>
                </div> 
            </div> 
            : 
            <div className='overflow--big-area'>
              <ObjectMiniature projects={data} type={'event'} />
            </div>
            }
        </div>
      </>
  )
}

export default CoreSectionFestivartes
