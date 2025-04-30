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
import { ARTWORK } from '@/types/artworks.types';
// import react icons
import { AiOutlinePlus } from 'react-icons/ai';
interface CoreSectionArtworksProps {
  filterBy?: string;
}

const CoreSectionArtworks = ({ filterBy }: CoreSectionArtworksProps) => {
  
  const [data, setData] = useState<ARTWORK[]>([]);
  const [dataFiltered, setDataFiltered] = useState<ARTWORK[]>([]);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);  
  const openUserModal = () => setIsUserModalOpen(true);
  const closeUserModal = () =>setIsUserModalOpen(false);

  const [showAllData, setShowAllData] = useState(false);

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
        <div className={`${styles.card}`}>
          <p>
            <span className='bolder-text'>
              <RiBubbleChartFill color='gold'/> &nbsp;
              
              <button 
                onClick={() => setShowAllData(!showAllData)} 
                style={{ 
                  position: 'absolute', 
                  left: 0, 
                  fontSize: '0.8rem', 
                  textDecoration: 'none', 
                  color: 'white', 
                  background: 'orange', 
                  padding: '5px', 
                  borderTopRightRadius: '10px',
                  borderBottomRightRadius: '10px',
                  borderBottom: '1px solid orange', 
                  borderRight: '1px solid orange', 
                  borderTop: '1px solid orange'
                }}>
                {showAllData ? ' Ocultar' : (
                  <Image
                    src="/artworks-icon.png"
                    alt="events-icon"
                    width={25}
                    height={25}
                    priority
                  />
                )}
              </button>

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

          {data.length <= 0 ? 
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 style={{ color: 'lightgray'}}>¿Listo para mostrar tu talento?</h3>
                <p style={{ color: 'black' }}>Tu galería aún está vacía</p>
              </div> 
            </div> 
            : 
            <div style={{ marginTop: '-5px' }}>
      
              <ObjectMiniature projects={dataFiltered} type={'artwork'} />
              
            </div>
          }
        </div>

        {showAllData && (
          <div className={`${styles.card} `}>
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
            <div style={{ marginTop: '-10px' }}>
              <ObjectMiniature projects={data} customClass={'artworks-miniature-panel'} type={'artwork'} />              
            </div>
          }
        </div> )}
      </>
  )
}

export default CoreSectionArtworks
