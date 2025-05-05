import styles from '@/app/assets/styles/AdminIndex.module.css';
import ObjectMiniature from './ObjectMiniature';
import { RiBubbleChartFill } from 'react-icons/ri';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import CustomModal from './CustomModal';
import ArtworkRegisterForm from './ArtworkRegisterForm';
import { ARTWORK } from '@/types/artworks.types';

interface CoreSectionArtworksProps {
  selectedArtworks?: string[];
}

const CoreSectionSelectedArtworks = ({ selectedArtworks }: CoreSectionArtworksProps) => {
  
  const [data, setData] = useState<ARTWORK[]>([]);
  const [dataFiltered, setDataFiltered] = useState<ARTWORK[]>([]);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);  
  const openUserModal = () => setIsUserModalOpen(true);
  const closeUserModal = () =>setIsUserModalOpen(false);

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
        <CustomModal
          isOpen={isUserModalOpen}
          onClose={closeUserModal}
          height="85%" // Custom height
        >
          <div className="modal-title-centered">
              <b>Anímate a descubrir <br /> tu Artista Interior</b>
          </div>
          <div className="form-wrapper">
            <ArtworkRegisterForm closeModal={closeUserModal} />
          </div>
        </CustomModal>
    

        {showAllData && (
          <div className={`${styles.card} `}>
          <p>
            <span className='bolder-text'>
              <div style={{ left: '20px', position: 'absolute'}}>
                <RiBubbleChartFill color='gold'/> &nbsp;
                <b>Obras registradas para el Evento&nbsp; </b>
              </div>
            </span>
          </p>
          <br />
          <br />
          <br />
          {data.length <= 0 ? 
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 style={{ color: 'lightgray'}}>¡Ups! Todavía no hay obras</h3>
                <p style={{ color: 'black' }}>Sube tu obra y compártela con el mundo desde aquí.</p>
              </div> 
            </div> 
            : 
            <div style={{ marginTop: '-10px' }}>
              <ObjectMiniature projects={data} customClass={'artworks-miniature-panel'} type={'artwork'} selectMode />              
            </div>
          }
        </div> )}
      </>
  )
}

export default CoreSectionSelectedArtworks
