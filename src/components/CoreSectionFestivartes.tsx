import styles from '@/app/assets/styles/AdminIndex.module.css';
import ObjectMiniature from './ObjectMiniature';
import Image from 'next/image';
import { RiBubbleChartFill } from 'react-icons/ri';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../firebaseConfig'; // update path if needed
import { useEffect, useState } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
import CustomModal from './CustomModal';
import EventRegisterForm from './EventRegisterForm';
import { EVENTS } from '@/types/events.types';
import { AiOutlinePlus } from 'react-icons/ai';

interface CoreSectionFestivartesProps {
  filterBy?: string;
}

const CoreSectionFestivartes = ({ filterBy }: CoreSectionFestivartesProps) => {
  const [data, setData] = useState<EVENTS[]>([]);
  const [dataFiltered, setDataFiltered] = useState<EVENTS[]>([]);

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const openEventModal = () => setIsEventModalOpen(true);
  const closeEventModal = () =>setIsEventModalOpen(false);

  const [showAllData, setShowAllData] = useState(false);
  
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
        <CustomModal
          isOpen={isEventModalOpen}
          onClose={closeEventModal}
          height="80%" // Custom height
        >
          <div className="modal-title-centered">
            <b>
              <b>Anímate a descubrir <br /> tu Artista Interior</b>
            </b>
          </div>
          <div className="form-wrapper">
            <EventRegisterForm closeModal={closeEventModal} />
          </div>
        </CustomModal>
        
        <div className={styles.card}>
            <p>
              <span className='bolder-text'>
                <RiBubbleChartFill color='gold'/> &nbsp;
                
                <button 
                  onClick={() => setShowAllData(!showAllData)} 
                  style={{ 
                    position: 'absolute', 
                    left: 0, 
                    textDecoration: 'none', 
                    color: 'white', 
                    background: 'transparent',
                    border: 'none',
                  }}>
                    {showAllData ? ' Ocultar' : (
                      <>
                      <Image
                        src="/events-icon.png"
                        alt="events-icon"
                        width={35}
                        height={35}
                        priority
                        style={{ animation: 'pulseGlow 1s infinite', marginTop: '15px', marginLeft: '25px' }}
                      />
                      </>
                    )}
                </button>
                
                <b>Mis Festivartes &nbsp; 
                
                </b>
                <p className='bolder-text small-text-size'>
                  ¡Elegí tu próximo escenario y <br /> hacé historia!
                </p>
                <br />
                <br />

                <div className="register-button">
                  <button className="menu-button" onClick={openEventModal}>
                    <FaCirclePlus className="floating-menu-button" />
                  </button>
                </div>

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
            <div style={{ marginTop: '-25px' }}>
              <ObjectMiniature projects={dataFiltered} type={'event'} />
            </div>
            }
        </div>

        {showAllData && (
          <div className={styles.card}>
          <p>
            <span className='bolder-text'>
              <RiBubbleChartFill color='gold'/> &nbsp;
              <b> Catalogo de Festivartes &nbsp; 
              </b>
              <p className='bolder-text small-text-size'>
              Lleva tu evento al siguiente nivel <br /> con nuestra app.
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
          <div className='' style={{ marginTop: '-5px' }}>
            <ObjectMiniature projects={data} customClass={'festivartes-miniature-panel'} type={'event'} />
          </div>
          }
      </div>)}
      </>
  )
}

export default CoreSectionFestivartes
