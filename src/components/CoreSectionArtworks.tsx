import styles from '@/app/assets/styles/AdminIndex.module.css';
import ObjectMiniature from './ObjectMiniature';
import { RiBubbleChartFill } from 'react-icons/ri';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../firebaseConfig';

interface CoreSectionArtworksProps {
  filterBy?: any
}

const CoreSectionArtworks = ({ filterBy }: CoreSectionArtworksProps) => {
  
  const [data, setData] = useState<{ id: string; [key: string]: any }[]>([]);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'artworks'))
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
        <div className={`${styles.card} top-spaced`}>
          <p>
            <span className='bolder-text'>
              <RiBubbleChartFill color='gold'/> &nbsp;
              <b>Mi Galería Creativa &nbsp; 
              </b>
              <p className='bolder-text small-text-size'>
              Convertí tu inspiración en arte inmortal.
              </p>
            </span>
          </p>
          <br />

          {data.length <= 0 ? 
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3>¡Ups! No hay obras registradas</h3>
                <p>Aún no se han registrado obras en esta cuenta. Cuando se agregue una, aparecerá aquí automáticamente.</p>
              </div> 
            </div> 
            : 
            <div className=''>
      
              <ObjectMiniature projects={data} type={'artwork'} />
              
            </div>
          }
        </div>

        <div className={`${styles.card} top-spaced`}>
          <p>
            <span className='bolder-text'>
              <RiBubbleChartFill color='gold'/> &nbsp;
              <b>Portafolio Artístico&nbsp; 
              🌍
              </b>
              <p className='bolder-text small-text-size'>
              Dale vida a tus ideas, compártelas con el mundo.
              </p>
            </span>
          </p>
          <br />

          {data.length <= 0 ? 
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3>¡Ups! No hay obras registradas</h3>
                <p>Aún no se han registrado obras en esta cuenta. Cuando se agregue una, aparecerá aquí automáticamente.</p>
              </div> 
            </div> 
            : 
            <div className='overflow--big-area'>
      
              <ObjectMiniature projects={data.concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data)} type={'artwork'} />
              
            </div>
          }
        </div>
      </>
  )
}

export default CoreSectionArtworks
