import styles from '@/app/assets/styles/AdminIndex.module.css';
import SubMenu from '@/components/SubMenu';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../firebaseConfig';

const JudgeDetail = ({ }) => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter
  const [data, setData] = useState<{ id: string; [key: string]: any }[]>([]);
  const [profile, setProfile] = useState<{ id: string; [key: string]: any } | null>(null);

  const fetchJudge = async (id: string | string[] | undefined) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'accounts'))
      // get only users account with role "judge"
      const accounts = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...(doc.data() as { role: string })
        }))
        .filter((account) => account.role === 'judge');
      const selectedJudge = accounts.find(account => account.id === id);
      if (selectedJudge) {
        setProfile(selectedJudge);
      }
      setData(accounts);
      return accounts;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchJudge(id);
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['full-view']}>
      <SubMenu />

      <div className='project-detail-wrapper'>
        <div className="project-detail-container">
          <h1><b className='font-size-3rem'>{profile.displayName}</b></h1>          
          <p className='bolder-text'>
            {profile?.name} | {profile?.bio || 'Agrega una descripcion'}
          </p>
          <br />

          {profile.thumbnail || profile.profilePic ? 
            <img src={profile.thumbnail || profile.profilePic} alt={profile.name} className='project-thumbnail-wrapper' />
          : 
            <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' alt={profile.name} className='project-thumbnail-judge' /> 
          }
          <br />

          <div>
            <p ><b className='bolder-text'>Email:</b> {profile.email}</p>
            <p ><b className='bolder-text'>Teléfono:</b> {profile.phone}</p>      
            <p ><b className='bolder-text'>Ubicación:</b> {profile.address}</p>      
            <p ><b className='bolder-text'>Dirección:</b> {profile.location}</p>      
            <p ><b className='bolder-text'>Sitio web:</b> {profile.website}</p>      
          </div>
          {/* Add more project details as needed */}
        </div>
      </div>
    </div>
  );
};

export default JudgeDetail;
