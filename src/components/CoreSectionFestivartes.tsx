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
import { useAuth } from '@/context/AuthContext';

interface CoreSectionFestivartesProps {
  filterBy?: string;
}

const CoreSectionFestivartes = ({ filterBy }: CoreSectionFestivartesProps) => {
  const [data, setData] = useState<EVENTS[]>([]);
  const [dataFiltered, setDataFiltered] = useState<EVENTS[]>([]);

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const openEventModal = () => setIsEventModalOpen(true);
  const closeEventModal = () =>setIsEventModalOpen(false);

  const [showAllData, setShowAllData] = useState(true);
  const { role } = useAuth();
  
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
  
      const filteredEvents = events.filter(event => {
        return !event.createdBy || event.createdBy !== filterBy;
      });
      setData(filteredEvents);

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
              <h2 className='bolder-text'>Registrar Evento</h2>
              {/* <p className='color-light-gray'>Organiza y registra tu festival artístico.</p> */}
            </b>
          </div>
          <div className="form-wrapper">
            <EventRegisterForm closeModal={closeEventModal} />
          </div>
        </CustomModal>
        
        <div className={styles.card}>
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
                        src="/events-icon.png"
                        alt="events-icon"
                        width={35}
                        height={35}
                        priority
                        className='animated-icon-pulse-effect'
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

                {role === 'admin' && (
                  <div className="register-button">
                  <button className="menu-button" onClick={openEventModal}>
                    <FaCirclePlus className="floating-menu-button" />
                  </button>
                </div>)}

              </div>
            </div>
            {data.length <= 0 ? 
            <div className={styles.grid}>
                <div className={styles.card}>
                <h3 className='color-light-gray'>Registra tu primer Evento Calificado</h3>
                <p className='color-black'>Registra tu Festival Artístico Oficial.</p>
                </div> 
            </div> 
            : 
            <div className='mTop-25'>
              <ObjectMiniature projects={dataFiltered} type={'event'} />
            </div>
            }
        </div>

        {showAllData && (
          <div className={`${styles.card} text-align-left`}>
          <br />
          <button 
            onClick={() => setShowAllData(!showAllData)} 
            className='close-button-visible'
            >
            {showAllData && (
              <span style={{ background: 'orange', padding: 4, borderRadius: 6, animation: 'pulse 2s infinite'}}>
                Ocultar Eventos...
              </span>
            )}
          </button>
          {data.length <= 0 ? 
          <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className='color-light-gray'>No se han registrado eventos</h3>
                <p className='color-black'>¡Explora la app y crea el primero!</p>
              </div> 
          </div> 
          : 
          <div className='mTop-5'>
            <ObjectMiniature projects={data} customClass={'festivartes-miniature-panel'} type={'event'} />
          </div>
          }
      </div>)}
      </>
  )
}

export default CoreSectionFestivartes
