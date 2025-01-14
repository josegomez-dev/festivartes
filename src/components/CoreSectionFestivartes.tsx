import styles from '@/app/assets/styles/AdminIndex.module.css';
import { MOCK_DATA_EVENTS } from '@/utils/constants';
import { GiPartyFlags } from 'react-icons/gi';
import ObjectMiniature from './ObjectMiniature';
import Image from 'next/image';
import { RiBubbleChartFill } from 'react-icons/ri';

const CoreSectionFestivartes = ({ }) => {

  return (
      <>
        <div className={styles.card}>
            <p>
              <span className='bolder-text'>
                <RiBubbleChartFill color='gold'/> &nbsp;
                <b>Festivartes &nbsp; 
                  <Image
                    src="/events-icon.png"
                    alt="Catarsis Musical Logo"
                    width={35}
                    height={35}
                    priority
                  />
                </b>
                <p className='bolder-text small-text-size'>
                  🌟 Lleva tu arte al siguiente nivel con nuestra app.
                </p>
                <br />
              </span>
            </p>
            {MOCK_DATA_EVENTS.length <= 0 ? 
            <div className={styles.grid}>
                <div className={styles.card}>
                <h3>Registra tu primer Evento Calificado</h3>
                <p>Evento con jurado y reglamento.</p>
                </div> 
            </div> 
            : 
            <ObjectMiniature projects={MOCK_DATA_EVENTS} type={'event'} />
            }
        </div>
      </>
  )
}

export default CoreSectionFestivartes
