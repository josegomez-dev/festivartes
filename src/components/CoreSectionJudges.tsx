import styles from '@/app/assets/styles/AdminIndex.module.css';
import { MOCK_DATA_JUDGES } from '@/utils/constants';
import ObjectMiniature from './ObjectMiniature';
import Image from 'next/image';
import { RiBubbleChartFill } from 'react-icons/ri';

interface CoreSectionJudgesProps {
  filterBy?: any
}

const CoreSectionJudges = ({ filterBy }: CoreSectionJudgesProps) => {
  
  const data = filterBy ? MOCK_DATA_JUDGES.filter(item => filterBy.includes(item.id)) : MOCK_DATA_JUDGES;

  return (
    <div className={`${styles.card} top-spaced`}>
      <p>
        <span className='bolder-text'>
          <RiBubbleChartFill color='gold' /> &nbsp;
          <b>Jurado Seleccionador &nbsp;
            <Image
              src="/judges-icon.png"
              alt="Catarsis Musical Logo"
              width={25}
              height={25}
              priority />
          </b>
          <p className='bolder-text small-text-size'>
            🌟 Los expertos evalúan las obras artísticas.
          </p>
        </span>
      </p>
      <br />
      {data.length <= 0 ?
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Invita a tu Jurado Seleccionador</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        :
        <ObjectMiniature projects={data} type="judge" />}
    </div>
  );
}

export default CoreSectionJudges
