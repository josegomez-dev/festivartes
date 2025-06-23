import styles from '@/app/assets/styles/AdminIndex.module.css';
import ObjectMiniature from './ObjectMiniature';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { ARTWORK } from '@/types/artworks.types';

interface CoreSectionArtworksProps {
  selectedArtworks?: string[];
}

const CoreSectionSelectedArtworks = ({ selectedArtworks }: CoreSectionArtworksProps) => {
  
  const [data, setData] = useState<ARTWORK[]>([]);
  const [dataFiltered, setDataFiltered] = useState<ARTWORK[]>([]);

  const [showAllData, setShowAllData] = useState(true);

  const fetchArtworks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'artworks'));
      const artworks = querySnapshot.docs.map(doc => {
        const { id, ...rest } = doc.data() as ARTWORK;
        return {
          id: doc.id,
          ...rest
        };
      });
      const filteredArtworks = artworks.filter(artwork => {
        return selectedArtworks?.includes(artwork.id);
      });
      setData(filteredArtworks);      
    } catch (error) {
      console.error('Error fetching artwork:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, [selectedArtworks]);

  return (
      <>

        {showAllData && (
          <div className={`${styles.card} `}>
          <p>
            <div className='bolder-text'>
              <p>Obras Registradas&nbsp; </p>
            </div>
          </p>
          <br />
          {data.length <= 0 ? 
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className='color-light-gray'>¡Ups! Todavía no hay obras seleccionadas</h3>
                {/* <p className='color-black'>Sube tu obra y compártela con el mundo desde aquí.</p> */}
              </div> 
            </div> 
            : 
            <div className='mTop-10'>
              <ObjectMiniature projects={data} customClass={'artworks-miniature-panel'} type={'artwork'} />              
            </div>
          }
        </div> )}
      </>
  )
}

export default CoreSectionSelectedArtworks
