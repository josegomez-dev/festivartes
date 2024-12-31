import styles from '@/app/assets/styles/AdminIndex.module.css';
import { MOCK_DATA_JUDGES } from '@/utils/constants';
import ProjectMiniature from './ProjectMiniature';
import { FaPersonDotsFromLine } from 'react-icons/fa6';

const CoreSectionJudges = ({ }) => {

  return (
      <>
        <div className={styles.card} style={{ marginTop: '25px' }}>
          <p>
            <span className='bolder-text'> <FaPersonDotsFromLine color='orange' /> <b>Jurado Seleccionador</b></span>
          </p>
          <br />
          <p className='bolder-text'>
            👨‍⚖️ ✨ Transparencia y excelencia: los expertos evalúan lo mejor del arte contigo 🎤 🏆
          </p> <br />
          {MOCK_DATA_JUDGES.length <= 0 ? 
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3>Invita a tu Jurado Seleccionador</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div> 
            </div> 
            : 
            <ProjectMiniature projects={MOCK_DATA_JUDGES} type="judge" />
          }
        </div>
      </>
  )
}

export default CoreSectionJudges
