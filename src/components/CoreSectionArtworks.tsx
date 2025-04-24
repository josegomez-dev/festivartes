import styles from '@/app/assets/styles/AdminIndex.module.css';
import ObjectMiniature from './ObjectMiniature';
import { RiBubbleChartFill } from 'react-icons/ri';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../firebaseConfig';
import { FaCirclePlus } from 'react-icons/fa6';
import CustomModal from './CustomModal';
import ArtworkRegisterForm from './ArtworkRegisterForm';

interface CoreSectionArtworksProps {
  filterBy?: string;
}

const CoreSectionArtworks = ({ filterBy }: CoreSectionArtworksProps) => {
  
  const [data, setData] = useState<ARTWORK[]>([]);
  const [dataFiltered, setDataFiltered] = useState<ARTWORK[]>([]);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);  
  const openUserModal = () => setIsUserModalOpen(true);
  const closeUserModal = () =>setIsUserModalOpen(false);

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
  
      setData(artworks);
      
      if (filterBy) {
        const filteredArtworks = artworks.filter(artwork => {
          return artwork.createdBy === filterBy;
        });
        setDataFiltered(filteredArtworks);
      }
    } catch (error) {
      console.error('Error fetching artwork:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

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
        <div className={`${styles.card} top-spaced`}>
          <p>
            <span className='bolder-text'>
              <RiBubbleChartFill color='gold'/> &nbsp;
              <b>Mi Galería Creativa &nbsp; 
              </b>
              <p className='bolder-text small-text-size'>
              Convertí tu inspiración <br /> en arte inmortal.
              </p>
              <br />
              <div className="register-button">
                <button className="menu-button" onClick={openUserModal}>
                  <FaCirclePlus className="floating-menu-button" />
                </button>
              </div>
            </span>
          </p>
          <br />

          {data.length <= 0 ? 
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 style={{ color: 'lightgray'}}>¿Listo para mostrar tu talento?</h3>
                <p style={{ color: 'black' }}>Tu galería aún está vacía</p>
              </div> 
            </div> 
            : 
            <div className=''>
      
              <ObjectMiniature projects={dataFiltered} type={'artwork'} />
              
            </div>
          }
        </div>

        <div className={`${styles.card} top-spaced`}>
          <p>
            <span className='bolder-text'>
              <RiBubbleChartFill color='gold'/> &nbsp;
              <b>Portafolio Artístico&nbsp; 
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
                <h3 style={{ color: 'lightgray'}}>¡Ups! Todavía no hay obras</h3>
                <p style={{ color: 'black' }}>Sube tu obra y compártela con el mundo desde aquí.</p>
              </div> 
            </div> 
            : 
            <div>
              <ObjectMiniature projects={data} type={'artwork'} />              
            </div>
          }
        </div>
      </>
  )
}

export default CoreSectionArtworks
