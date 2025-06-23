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
  allItems?: boolean;
  selectMode?: boolean;
  selectItem?: (artworkIdentifier: string) => void;
}

const CoreSectionArtworks = ({ filterBy, allItems, selectMode, selectItem }: CoreSectionArtworksProps) => {
  
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
        
      if (!selectMode) {
        const filteredArtworks = artworks.filter(artwork => {
          return !artwork.createdBy || artwork.createdBy !== filterBy;
        });
        setData(filteredArtworks);
      } else {
        setData(artworks);
      }
      
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
            <b>
              <h2 className='bolder-text'>Registrar Obra</h2>
              <p className='color-light-gray'>Sube tu obra y compártela con el mundo.</p>
            </b>
          </div>
          <div className="form-wrapper">
            <ArtworkRegisterForm closeModal={closeUserModal} />
          </div>
        </CustomModal>
        
        {!allItems && (
          <div className={`${styles.card}`}>
          <div>
            <div className='bolder-text'>
              <RiBubbleChartFill color='gold'/> &nbsp;
              
              <button 
                onClick={() => setShowAllData(!showAllData)} 
                className='close-button-not-visible'
              >
                {!showAllData && (
                  <> &nbsp;
                  {/* <span className='close-button-not-visible-text'>Ver Todos</span> */}
                   <br />
                    <Image
                      src="/artworks-icon.png"
                      alt="artworks-icon"
                      width={35}
                      height={35}
                      priority
                      className='animated-icon-pulse-effect'
                    />
                  </>
                )}
              </button>

              <b>Mi Galería Creativa &nbsp; 
              </b>
              <p className='bolder-text small-text-size'>
              Convertí tu inspiración <br /> en arte inmortal.
              </p>
              <div className="register-button">
                <button className="menu-button" onClick={openUserModal}>
                  <FaCirclePlus className="floating-menu-button" />
                </button>
              </div>
            </div>
          </div>

          {data.length <= 0 ? 
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className='color-light-gray'>¿Listo para mostrar tu talento?</h3>
                <p className='color-black'>Tu galería aún está vacía</p>
              </div> 
            </div> 
            : 
            <div className=''>
              <ObjectMiniature projects={dataFiltered} type={'artwork'} />              
            </div>
          }
          
        </div> )}

        {showAllData && (
          <div className={`${styles.card} text-align-left`}>
          <br />
          <button 
            onClick={() => setShowAllData(!showAllData)} 
            className='close-button-visible'
          >
            {showAllData && !allItems && (
              <span style={{ background: 'orange', padding: 4, borderRadius: 6, animation: 'pulse 2s infinite'}}>
                Ocultar Obras de Arte
              </span>
            )}
          </button>
          {data.length <= 0 ? 
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className='color-light-gray'>¡Ups! Todavía no hay obras</h3>
                <p className='color-black'>Sube tu obra y compártela con el mundo desde aquí.</p>
              </div> 
            </div> 
            : 
            <div className='mTop-10'>
              <ObjectMiniature projects={data} customClass={'artworks-miniature-panel'} type={'artwork'} selectMode={selectMode} selectItem={selectItem} />              
            </div>
          }
        </div> )}
      </>
  )
}

export default CoreSectionArtworks
