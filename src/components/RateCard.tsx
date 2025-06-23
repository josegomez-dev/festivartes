import React, { useEffect } from 'react';
import styles from './../app/assets/styles/RateCard.module.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Image from 'next/image';

export interface Rate {
  judgeIdentifier: string;
  ratingForm: string;
  rateAt: string;
  rateValue: number;
}

interface RateCardProps {
  rates: Rate[];
}

const RateCard: React.FC<RateCardProps> = ({ rates }) => {
    
    const [allJudges, setAllJudges] = React.useState<any[]>([]);

    // fetch all accounts with 'judge' role to mach the judgeIdentifier and fetch their names and photo
    const fetchJudges = async () => {
      const querySnapshot = await getDocs(collection(db, 'accounts'));
      const events = querySnapshot.docs.map(doc => {
        const data = doc.data() as { [key: string]: any };
        return {
          ...data,
          id: doc.id,
        };
      });
      return events.filter((event: { [key: string]: any }) => event.role === 'judge');
    };

    useEffect(() => {
        const fetchData = async () => {
            const judges = await fetchJudges();
            setAllJudges(judges);
        };
        fetchData();
    }, []);


  return (
    <div className={styles.rateCardsContainer}>
      {rates.map((rate, index) => (
        <div key={index} className={styles.rateCard}>
          <div className={styles.rateHeader}>
            <Image
                src={allJudges.find(judge => judge.uid === rate.judgeIdentifier)?.profilePic || '/default-avatar.png'}
                alt="Judge Avatar"
                width={50}
                height={50}
                className={styles.judgeAvatar}
            />
            &nbsp;
            <span className={styles.judgeName}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{allJudges.find(judge => judge.uid === rate.judgeIdentifier)?.displayName || 'Unknown Judge'}</span>
          </div>
          {/* <div className={styles.rateBody}>
            <p className={styles.ratingForm}>{rate.ratingForm}</p>
          </div> */}
          <div className={styles.rateFooter}>
            <span className={styles.stars}>
              {rate.rateValue}: &nbsp;
              {rate.rateValue > 0 && (
                <span style={{ color: 'gold' }}>
                  {'★'.repeat(rate.rateValue)}
                </span>
              )}
            </span> &nbsp;
            <span className={styles.rateDate}>{new Date(rate.rateAt).toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RateCard;
