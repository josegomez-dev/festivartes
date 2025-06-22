import styles from '@/app/assets/styles/AdminIndex.module.css';
import ObjectMiniature from './ObjectMiniature';
import Image from 'next/image';
import { RiBubbleChartFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../firebaseConfig'; 

interface CoreSectionJudgesProps {
  filterBy?: any;
  selectMode?: boolean;
  selectItem?: (artworkIdentifier: string) => void;
}

const CoreSectionJudges = ({ filterBy, selectMode, selectItem }: CoreSectionJudgesProps) => {

  const [data, setData] = useState<{ id: string; [key: string]: any }[]>([]);

  const fetchJudgesAccounts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'accounts'))
      // get only users account with role "judge"
      const accounts = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...(doc.data() as { role: string })
        }))
        .filter((account) => account.role === 'judge')
      setData(accounts) 
      return accounts
    } catch (error) {
      console.error('Error fetching events:', error)
      return []
    }
  }

  useEffect(() => {
    fetchJudgesAccounts()
  }, []);

  return (
    <div className={`${styles.card} top-spaced`}>
      <p>
        <span className='bolder-text'>
          <RiBubbleChartFill color='gold' /> &nbsp;
          <b>Jurado Seleccionador &nbsp;
            <Image
              src="/judges-icon.png"
              alt="judges-icon"
              width={25}
              height={25}
              priority />
          </b>
          <p className='bolder-text small-text-size'>
            🌟 Los expertos evalúan las obras artísticas.
          </p>
        </span>
      </p>  
      {data.length <= 0 ?
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Invita a tu Jurado Seleccionador</h3>
            <p className='color-black'>Podrán acceder de forma segura y emitir su evaluación.</p>
          </div>
        </div>
        :
        <ObjectMiniature projects={data} type="judge" selectMode={selectMode} selectItem={selectItem} />}
    </div>
  );
}

export default CoreSectionJudges
