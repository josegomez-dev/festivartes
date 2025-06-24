import styles from '@/app/assets/styles/AdminIndex.module.css';
import ObjectMiniature from './ObjectMiniature';
import Image from 'next/image';
import { RiBubbleChartFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; 
import { User } from '@/types/userTypes';
import { displayName } from 'react-quill';

interface CoreSectionJudgesProps {
  selectedJudges?: string[];
}

const CoreSectionSelectedJudges = ({ selectedJudges }: CoreSectionJudgesProps) => {

  const [data, setData] = useState<{ id: string; [key: string]: any }[]>([]);

  const fetchJudgesAccounts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'accounts'))
      // get only users account with role "judge" and it should be in selectedJudges
      const accounts = querySnapshot.docs
        .map(doc => {
          const { id, ...data } = doc.data() as User;
          return {
            id: doc.id,
            ...data
          };
        })
        .filter((account) => selectedJudges?.includes(account.id));
      // filter accounts by selectedJudges
      const filteredJudges = accounts.map(account => ({
        id: account.id,
        displayName: account.displayName,
        email: account.email,
        role: account.role,
        profilePic: account.profilePic
      }));
      setData(filteredJudges)
    } catch (error) {
      console.error('Error fetching events:', error)
      return []
    }
  }

  useEffect(() => {
    fetchJudgesAccounts()
  }, [selectedJudges]);

  return (
    <div className={`${styles.card} top-spaced`}>
      {data.length <= 0 ?
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Ups! Aún no hay jueces seleccionados</h3>
          </div>
        </div>
        :
        <ObjectMiniature projects={data} type="judge" selectMode />}
    </div>
  );
}

export default CoreSectionSelectedJudges
