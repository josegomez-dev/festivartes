import styles from '@/app/assets/styles/AdminIndex.module.css';
import { MOCK_DATA_EVENTS } from '@/utils/constants';
import { ReactNode } from 'react'
import { GiPartyFlags } from 'react-icons/gi';
import ProjectMiniature from './ProjectMiniature';

const CoreSectionFestivartes = ({ }) => {

  return (
      <>
        <div className={styles.card} style={{ marginTop: '25px' }}>
            <p>
            <span className='bolder-text'><GiPartyFlags color='orange' /> &nbsp;<b>Festivartes</b></span>
            </p>
            <br />
            <p className='bolder-text'>
            🎭 ✨ Lleva tu arte al siguiente nivel con nuestra app revolucionaria 🎶 📚
            </p> <br />
            {MOCK_DATA_EVENTS.length <= 0 ? 
            <div className={styles.grid}>
                <div className={styles.card}>
                <h3>Registra tu primer Evento Calificado</h3>
                <p>Evento con jurado y reglamento.</p>
                </div> 
            </div> 
            : 
            <ProjectMiniature projects={MOCK_DATA_EVENTS} type={'event'} />
            }
        </div>
      </>
  )
}

export default CoreSectionFestivartes
