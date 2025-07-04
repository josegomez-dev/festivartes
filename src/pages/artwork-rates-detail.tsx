"use client";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ARTWORK } from '@/types/artworks.types';
import { RATE } from '@/types/rate.types';
import { db } from '@/../firebaseConfig';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import activityStyles from '@/app/assets/styles/Activity.module.css';
import { useAuth } from '@/context/AuthContext';
import Footer from '@/components/Footer';

// Helper component to display judge name asynchronously
const AsyncJudgeName = ({ judgeId, getJudgeName }: { judgeId: string, getJudgeName: (id: string) => Promise<string> }) => {
  const [name, setName] = useState<string>('Cargando...');
  useEffect(() => {
    let mounted = true;
    getJudgeName(judgeId).then((n) => { if (mounted) setName(n); });
    return () => { mounted = false; };
  }, [judgeId, getJudgeName]);
  return <span>{name}</span>;
};

const ArtworkRatesDetail = () => {
  const { user, authenticated, role } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const [project, setProject] = useState<ARTWORK | null>(null);
  const [rates, setRates] = useState<RATE[]>([]);

  useEffect(() => {
    const fetchArtwork = async () => {
      const snapshot = await getDocs(collection(db, 'artworks'));
      const items = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as ARTWORK[];
      const selected = items.find((art) => art.id === id);
      if (selected) {
        setProject(selected);
        setRates(
          (selected.rates || []).map((rate: any) => ({
            judgeIdentifier: rate.judgeIdentifier || rate.userIdentifier || '',
            rateAt: rate.rateAt || '',
            rateValue: rate.rateValue ?? 0,
            ratingForm: rate.ratingForm,
          })) as RATE[]
        );
      }
    };

    if (id) fetchArtwork();
  }, [id]);

    const getJudgeName = async (judgeId: string) => {
        if (!user) return 'No Encontrado';
        // fetch the judge document and get displayName
        const accountsRef = collection(db, 'accounts');
        const judgeDocRef = doc(accountsRef, judgeId);
        const judgeSnap = await getDoc(judgeDocRef);
        const judgeData = judgeSnap.exists() ? judgeSnap.data() : null;
        return judgeData?.displayName || 'No Encontrado';
    };

  return (
    <div>
      <div className={activityStyles.container}>
        <h1>📋 Detalle de Calificaciones</h1>
        <br />
        {project ? (
          <>

            <div style={{ width: '100%', maxWidth: '600px', background: 'linear-gradient(0deg, var(--color-blue), var(--color-orange))', textAlign: 'justify', margin: '0 auto', padding: '10px', borderRadius: '8px', color: 'var(--color-white)' }}>
                <p><b>Título:</b> {project.title}</p>
                <p><b>Descripción:</b> {project.description}</p>
                <p><b>Categoría:</b> {project.category}</p>
                <p><b>Estado:</b> {project.status}</p>
                <p><b>Calificaciones totales:</b> {rates.length}</p>
                <p><b>Valoración promedio:</b> {rates.length > 0 ?
                    (rates.reduce((acc, rate) => acc + rate.rateValue, 0) / rates.length).toFixed(2)
                    : 'N/A'}</p>
            </div> 
            <br />

            {rates.length > 0 ? (
              <div>
                {rates.map((rate, idx) => {
                  const ratingForm =
                    typeof rate.ratingForm === 'string'
                      ? JSON.parse(rate.ratingForm)
                      : rate.ratingForm;

                  return (
                    <div key={idx} className={activityStyles.card} style={{ marginBottom: '20px', padding: '20px', backdropFilter: 'blur(200px)' }}>
                      <h3>⭐ Calificación por: <AsyncJudgeName judgeId={rate.judgeIdentifier} getJudgeName={getJudgeName} /></h3>
                      <p><strong>Puntaje:</strong> {rate.rateValue} pts</p>
                      <p><strong>Fecha:</strong> {new Date(rate.rateAt).toLocaleDateString()}</p>
                      <br />
                      {Array.isArray(ratingForm) && ratingForm.map((section, i) => (
                        <div key={i} style={{ marginBottom: '20px' }}>
                          <hr />
                          <br />
                          <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                            <b>{section.sectionTitle}</b>
                          </h4>
                          <ul style={{ paddingLeft: '20px' }}>
                            {section.items.map((item: any, j: number) => (
                              <li key={j}>
                                <p><strong>{item.label}</strong></p>
                                <p style={{ textAlign: 'center' }}>{item.checked ? 'Sí ✅' : 'No ❌'} {item.comments && `| Comentario: ${item.comments}`}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No hay calificaciones disponibles para esta obra.</p>
            )}
          </>
        ) : (
          <p>Cargando información de la obra...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ArtworkRatesDetail;
