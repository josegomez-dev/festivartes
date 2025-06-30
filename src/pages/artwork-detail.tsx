// ArtworkDetail.tsx (fully updated with modular tab content)

// External imports
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';

// Firebase
import { db, storage } from '@/../firebaseConfig';

// Styles
import styles from '@/app/assets/styles/AdminIndex.module.css';
import authStyles from '@/app/assets/styles/Auth.module.css';

// Components
import CustomModal from '@/components/CustomModal';
import RatingForm from '@/components/RatingForm';
import ClapButton from '@/components/ClapButton';
import StarRating from '@/components/StarRating';
import SocialShareButton from '@/components/SocialShareButton';
import Preloader from '@/components/Preloader';
import RateCard, { Rate } from '@/components/RateCard';

// Context and types
import { useAuth } from '@/context/AuthContext';
import { ARTWORK, EMPTY_ARTWORK } from '@/types/artworks.types';

// Tab Components
import TabInfo from '@/components/artworkDetail/TabInfo';
import TabDocument from '@/components/artworkDetail/TabDocument';
import TabAudio from '@/components/artworkDetail/TabAudio';
import TabVideo from '@/components/artworkDetail/TabVideo';

const ArtworkDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, role } = useAuth();

  const [activeTab, setActiveTab] = useState<'info' | 'document' | 'audio' | 'video'>('info');
  const [data, setData] = useState<ARTWORK[]>([]);
  const [project, setProject] = useState<ARTWORK>(EMPTY_ARTWORK);
  const [loading, setLoading] = useState(false);
  const [reaction, setReaction] = useState<'happy' | 'sad' | null>(null);
  const [hasClapped, setHasClapped] = useState(false);
  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState(false);

  const clapSoundRef = useRef<HTMLAudioElement | null>(null);
  const unclapSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      const params = new URLSearchParams(document.location.search);
      const _id = params.get('id');
      const _shareLink = params.get('share-link');
      if (_shareLink) localStorage.setItem('share-link', _shareLink);
      else localStorage.removeItem('share-link');

      try {
        const snapshot = await getDocs(collection(db, 'artworks'));
        const items = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const selected = items.find((e) => e.id === id || e.id === _id);
        if (selected) setProject(selected as ARTWORK);
        setData(items as ARTWORK[]);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };
    fetchArtworks();
  }, [id]);

  const getClapCount = () => project.claps.filter((c) => c.clap).length;
  const getUserRating = () => project.stars.find((s) => s.userIdentifier === user?.uid)?.rating || 0;
  const getRatingAverage = () => project.stars.reduce((acc, s) => acc + (s.rating || 0), 0) / (project.stars.length || 1);
  const getToday = () => new Date().toLocaleDateString('es-CR');

  const handleClap = async () => {
    if (!user?.uid) return;
    setHasClapped(true);
    const docRef = doc(db, 'artworks', project.id);
    const updated = [...project.claps];
    const index = updated.findIndex((i) => i.userIdentifier === user.uid);
    if (index >= 0) updated[index].clap = !updated[index].clap;
    else updated.push({ userIdentifier: user.uid, clap: true });

    await updateDoc(docRef, { claps: updated });
    setProject((prev) => ({ ...prev, claps: updated }));

    const didClap = updated.some((c) => c.userIdentifier === user.uid && c.clap);
    (didClap ? clapSoundRef : unclapSoundRef).current?.play();
    toast[didClap ? 'success' : 'error'](`Clap ${didClap ? 'añadido' : 'eliminado'}`);
    setReaction(didClap ? 'happy' : 'sad');
    setTimeout(() => setReaction(null), 1500);
    setHasClapped(false);
  };

  const handleRates = async (rate: number) => {
    if (!user?.uid) return;
    const docRef = doc(db, 'artworks', project.id);
    const updated = [...project.stars];
    const index = updated.findIndex((i) => i.userIdentifier === user.uid);
    if (index >= 0) updated[index].rating = rate;
    else updated.push({ userIdentifier: user.uid, rating: rate });

    await updateDoc(docRef, { stars: updated });
    setProject((prev) => ({ ...prev, stars: updated }));
    toast.success('Calificación guardada exitosamente!');
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'audio' | 'video') => {
    const file = e.target.files?.[0];
    if (!file || !user?.uid || !file.type.startsWith(type)) return toast.error('Archivo no válido');

    setLoading(true);
    try {
      const path = `${type}s/${user.uid}/${file.name}`;
      const url = await getDownloadURL(await uploadBytes(ref(storage, path), file).then((snap) => snap.ref));
      await updateDoc(doc(db, 'artworks', project.id), { [type]: url });
      setProject((prev) => ({ ...prev, [type]: url }));
      toast.success(`${type === 'audio' ? 'Audio' : 'Video'} subido correctamente`);
    } catch (err) {
      toast.error(`Error subiendo ${type}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles['full-view']}>
      <audio ref={clapSoundRef} src="/sounds/spot.mp3" />
      <audio ref={unclapSoundRef} src="https://cdn.freesound.org/previews/687/687017_321967-lq.mp3" />

      <CustomModal isOpen={isJudgeModalOpen} onClose={() => setIsJudgeModalOpen(false)} height="85%">
        <div className="modal-title-centered">
          <b>Calificar Obra {project?.title && `- ${project.title}`}</b>
        </div>
        <div className="form-wrapper">
          <RatingForm closeModal={() => setIsJudgeModalOpen(false)} artworkIdentifier={project?.id} userIdentifier={user?.uid} />
        </div>
      </CustomModal>

      <div className="project-detail-wrapper">
        <div className="project-detail-container">
          <ul className="options-menu">
            <li>{hasClapped ? <Preloader message='' small /> : <ClapButton currentClaps={getClapCount()} handleClaps={handleClap} reaction={reaction} />}</li>
            <li><StarRating handleRating={handleRates} initialAverage={getRatingAverage()} myRating={getUserRating()} /></li>
            <li><SocialShareButton /></li>
          </ul>

          <div className="tabs">
            {['info', 'document', 'audio', 'video'].map((key) => (
              <button key={key} className={activeTab === key ? 'active' : ''} onClick={() => setActiveTab(key as any)}>
                {key === 'info' ? '🖼️' : key === 'document' ? '📄' : key === 'audio' ? '🔊' : '🎥'}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === 'info' && <TabInfo project={project} />}
            {activeTab === 'document' && <TabDocument project={project} getTodayDate={getToday} />}
            {activeTab === 'audio' && <TabAudio project={project} user={user} loading={loading} onUpload={handleUpload} />}
            {activeTab === 'video' && <TabVideo project={project} user={user} loading={loading} onUpload={handleUpload} />}
          </div>
        </div>

        <br />
        <hr />
        <br />

        <div className="project-detail-container">
          <h2><b className='font-size-title'>Calificaciones</b></h2>
          <div className="project-detail-header-rates">
            {project.rates?.length ? <RateCard rates={(project.rates as any[]).map((r) => ({
              judgeIdentifier: r.judgeIdentifier,
              rateAt: r.rateAt,
              rateValue: r.rateValue,
              ratingForm: typeof r.ratingForm === 'string' ? r.ratingForm : JSON.stringify(r.ratingForm),
              // Ensure all Rate properties are present
            }))} /> : <p>No hay calificaciones para esta obra.</p>}
          </div>

          {role === 'judge' && !project.rates?.some((r: any) => r.judgeIdentifier === user?.uid) && (
            <button className={authStyles['auth-button']} onClick={() => setIsJudgeModalOpen(true)}>
              <b>¡Calificar Obra!</b>
            </button>
          )}
        </div>

        <br />
        <hr />
        <br />

        <div className="project-detail-container">
          <p>Si tienes alguna duda, puedes contactarnos a través de nuestras redes sociales o por correo electrónico <a href="mailto:josegomez.dev@gmail.com">josegomez.dev@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
