import styles from '@/app/assets/styles/AdminIndex.module.css';
import { MOCK_DATA_ARTWORKS } from '@/utils/constants';
import ObjectMiniature from './ObjectMiniature';
import { RiBubbleChartFill } from 'react-icons/ri';

const CoreSectionArtworks = ({ }) => {

  return (
      <>
        <div className={styles.card} style={{ marginTop: '25px' }}>
          <p>
            <span className='bolder-text'><RiBubbleChartFill color='gold'/> 
              <b>Obras Artísticas</b>
              <p className='bolder-text' style={{ fontSize: '12px' }}>
                🎨 🌟 Descubre, comparte y transforma tu talento en una obra maestra 🌍 🖌️
              </p>
            </span>
          </p>
          <br />
          {MOCK_DATA_ARTWORKS.length <= 0 ? 
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3>No hay registros de obras</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div> 
            </div> 
            : 
            <ObjectMiniature projects={MOCK_DATA_ARTWORKS} type={'artwork'} />
          }
        </div>
      </>
  )
}

export default CoreSectionArtworks
