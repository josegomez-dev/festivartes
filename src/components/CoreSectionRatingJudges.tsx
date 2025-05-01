import styles from '@/app/assets/styles/AdminIndex.module.css';
import ObjectMiniature from './ObjectMiniature';
import Image from 'next/image';
import { RiBubbleChartFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; 
import { ARTWORK } from '@/types/artworks.types';

const CoreSectionRatingJudges = ({  }) => {

  const [data, setData] = useState<{ id: string; [key: string]: any }[]>([]);
  const [project, setProject] = useState<ARTWORK>();

  const fetchJudgesAccounts = async () => {
    const params = new URLSearchParams(document.location.search);
    const _id = params.get('id');

    try {
        const querySnapshot = await getDocs(collection(db, 'artworks'));
        const events = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        const selectedProject = events.find(event => event.id === _id) as ARTWORK;
        if (selectedProject) {
          setProject(selectedProject as ARTWORK);          

          if (selectedProject.rates) {
            const accounts = selectedProject.rates.map((rate: any) => ({
              id: rate.judgeIdentifier,
              formData: rate.ratingForm,
              rate: rate.rateValue,
            }));

            const accountsSnapshot = await getDocs(collection(db, 'accounts'));

            const accountsData = accountsSnapshot.docs
              .map(doc => {
                return {
                  id: doc.id,
                  ...(doc.data() as { role: string, uid: string }),
                  formData: accounts.find((account) => account.id === doc.id)?.formData,
                  rate: accounts.find((account) => account.id === doc.id)?.rate,
                }
              })
              .filter((account) => account.role === 'judge');

            const filteredAccounts = accountsData.filter((account) => {
              return accounts.some((a) => {
                console.log('account', a);
                return a.id === account.uid
              });
            });
              
            setData(filteredAccounts);
          }
        }

        return events;
      } catch (error) {
        console.error('Error fetching events:', error);
        return [];
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
      <br />
      {data.length <= 0 ?
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Invita a tu Jurado Seleccionador</h3>
            <p>Agrega los datos de las personas encargadas de valorar las obras. Podrán acceder de forma segura y emitir su evaluación.</p>
          </div>
        </div>
        :
        (
          <div>
            <ObjectMiniature ratingException projects={data} type="judge" />
          </div>
        )}
    </div>
  );
}

export default CoreSectionRatingJudges
