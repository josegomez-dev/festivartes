import styles from '@/app/assets/styles/AdminIndex.module.css';
import { MOCK_DATA_ARTWORKS } from '@/utils/constants';
import ObjectMiniature from './ObjectMiniature';
import { RiBubbleChartFill } from 'react-icons/ri';
import Image from 'next/image';

interface CoreSectionArtworksProps {
  filterBy?: any
}

const CoreSectionArtworks = ({ filterBy }: CoreSectionArtworksProps) => {
  
  const data = filterBy ? MOCK_DATA_ARTWORKS.filter(item => filterBy.includes(item.id)) : MOCK_DATA_ARTWORKS;

  return (
      <div className=''>
        <div className={`${styles.card} top-spaced`}>
          <p>
            <span className='bolder-text'>
              <RiBubbleChartFill color='gold'/> &nbsp;
              <b>Obras Artísticas &nbsp; 
                <Image
                  src="/artworks-icon.png"
                  alt="Catarsis Musical Logo"
                  width={25}
                  height={25}
                  priority
                />
              </b>
              <p className='bolder-text small-text-size'>
                 🌟 Transforma tu talento en una obra maestra.
              </p>
            </span>
          </p>
          <br />
          {data.length <= 0 ? 
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3>No hay registros de obras</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div> 
            </div> 
            : 
            <div className='overflow--big-area'>
              <ObjectMiniature projects={data} type={'artwork'} />
            </div>
          }
        </div>
      </div>
  )
}

export default CoreSectionArtworks
