import styles from '@/app/assets/styles/AdminIndex.module.css';
import { MOCK_DATA_JUDGES } from '@/utils/constants';
import ObjectMiniature from './ObjectMiniature';
import { FaPersonDotsFromLine } from 'react-icons/fa6';
import Image from 'next/image';
import { RiBubbleChartFill } from 'react-icons/ri';

const CoreSectionJudges = ({ }) => {

  return (
      <>
        <div className={`${styles.card} top-spaced`}>
          <p>
            <span className='bolder-text'> 
              <RiBubbleChartFill color='gold'/> &nbsp;
              <b>Jurado Seleccionador &nbsp;
                <Image
                  src="/judges-icon.png"
                  alt="Catarsis Musical Logo"
                  width={25}
                  height={25}
                  priority
                />
              </b>
              <p className='bolder-text small-text-size'>
                🌟 Los expertos evalúan las obras artísticas.
              </p>
            </span>
          </p>
          <br />
          {MOCK_DATA_JUDGES.length <= 0 ? 
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3>Invita a tu Jurado Seleccionador</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div> 
            </div> 
            : 
            <ObjectMiniature projects={MOCK_DATA_JUDGES} type="judge" />
          }
        </div>
      </>
  )
}

export default CoreSectionJudges
