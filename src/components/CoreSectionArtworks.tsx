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
      <div className=''>
        <div className={`${styles.card} top-spaced`}>
          <p>
            <span className='bolder-text'>
              <RiBubbleChartFill color='gold'/> &nbsp;
              <b>Obras Artísticas &nbsp; 
                <Image
                  src="/artworks-icon.png"
                  alt="Catarsis Musical Logo"
                  width={25}
                  height={25}
                  priority
                />
              </b>
              <p className='bolder-text small-text-size'>
                 🌟 Transforma tu talento en una obra maestra.
              </p>
            </span>
          </p>
          <br />

          {data.length <= 0 ? 
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3>No hay registros de obras</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div> 
            </div> 
            : 
            <div className='overflow--big-area'>
      
              <ObjectMiniature projects={data} type={'artwork'} />
              
            </div>
          }
        </div>
      </div>
  )
}

export default CoreSectionArtworks
