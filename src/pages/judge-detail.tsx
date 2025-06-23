import styles from '@/app/assets/styles/AdminIndex.module.css';
import SubMenu from '@/components/SubMenu';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../firebaseConfig';
import { User } from '@/types/userTypes';

const JudgeDetail = ({ }) => {
  const params = new URLSearchParams(document.location.search);
  const id = params.get('id');
  const [profile, setProfile] = useState<User | null>(null);

  const fetchJudge = async (id: string | string[] | undefined) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'accounts'))
      // get only users account with role "judge"
      const accounts = querySnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            uid: data.uid ?? doc.id,
            displayName: data.displayName ?? '',
            email: data.email ?? '',
            bio: data.bio ?? '',
            phone: data.phone ?? '',
            address: data.address ?? '',
            location: data.location ?? '',
            website: data.website ?? '',
            name: data.name ?? '',
            role: data.role ?? '',
            thumbnail: data.thumbnail ?? '',
            profilePic: data.profilePic ?? '',
            // Provide default values for all required User fields
            type: data.type ?? '',
            status: data.status ?? '',
            notifications: data.notifications ?? [],
            category: data.category ?? '',
            createdAt: data.createdAt ?? null,
            // add other User fields as needed, with fallback defaults
          } as unknown as User;
        })
        .filter((account) => account.role === 'judge');
      // alert('accounts: ' + JSON.stringify(accounts));
      const selectedJudge = accounts.find(account => account.id === id);
      if (selectedJudge) {
        setProfile(selectedJudge);
      }
      return accounts;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchJudge(id ?? undefined);
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
            {profile?.displayName} | {profile?.bio || 'Agrega una descripcion'}
          </p>
          <br />

          {profile.profilePic ? 
            <img src={profile.profilePic} alt={profile.displayName} className='project-thumbnail-wrapper' />
          : 
            <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' alt={profile.displayName} className='project-thumbnail-judge' /> 
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
