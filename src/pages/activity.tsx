"use client";

import React, { useEffect, useState } from "react";
import styles from '@/app/assets/styles/AdminIndex.module.css';
import activityStyles from "@/app/assets/styles/Activity.module.css";
import { useAuth } from "@/context/AuthContext";
import { ARTWORK } from "@/types/artworks.types";
import { EVENTS } from "@/types/events.types";
import { db } from "@/../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import dynamic from "next/dynamic";
import FloatingMenuButton from '@/components/FloatingMenuButton';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import Footer from "@/components/Footer";

const Bar = dynamic(() => import("react-chartjs-2").then(mod => mod.Bar), { ssr: false });
const Line = dynamic(() => import("react-chartjs-2").then(mod => mod.Line), { ssr: false });
const Pie = dynamic(() => import("react-chartjs-2").then(mod => mod.Pie), { ssr: false });

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

export default function ActivityDashboard() {
  const { user, role, authenticated } = useAuth();
  const [artworks, setArtworks] = useState<ARTWORK[]>([]);
  const [events, setEvents] = useState<EVENTS[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const artworksRef = collection(db, "artworks");
      const eventsRef = collection(db, "events");

      const qArtworks = query(artworksRef, where("createdBy", "==", user.uid));
      const qEvents = query(eventsRef, where("createdBy", "==", user.uid));

      const [artworksSnap, eventsSnap] = await Promise.all([
        getDocs(qArtworks),
        getDocs(qEvents)
      ]);

      setArtworks(artworksSnap.docs.map(doc => doc.data() as ARTWORK));
      setEvents(eventsSnap.docs.map(doc => doc.data() as EVENTS));
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const simulatedGraphData = {
    labels: ["Enero", "Feb", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "Obras creadas",
        data: [1, 3, 2, 5, artworks.length, artworks.length + 1],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Eventos registrados",
        data: [0, 1, 2, events.length, 1, 3],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const averageRatingData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Calificación promedio mensual",
        data: [4.0, 4.95, 4.0, 3.51, 3.65, 4.92],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const participationData = {
    labels: ["🧑‍🤝‍🧑", "👨‍⚖️", "👩🏼‍🏫"],
    datasets: [
      {
        label: "Usuarios activos",
        data: [46, 10, 7],
        backgroundColor: [
          "rgba(255, 205, 86, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 99, 132, 0.7)"
        ],
        borderColor: [
          "rgba(255, 205, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  if (!authenticated) {
    return <UnauthorizedMessage />;
  }

  return (
    <div className={styles["sidebar-menu-view"]}>
      {/* <SidebarMenu /> */}

      <div className={styles["main-content"]}>
        <div className={activityStyles.container}>
          <h1>📊 Actividad General</h1> 
          <p>
            Nombre del usuario: <strong>{user?.displayName || user?.email}</strong>
            <br />
          </p>
          <hr />
          <b>Festivartes</b>
          <br />
          <br />
          {loading ? (
            <p>Cargando datos...</p>
          ) : (
            <>
              <div className={activityStyles.sections}>
                  <section className={activityStyles.card}>
                    <h2><b>🎨 Obras Creadas</b></h2>
                    <ul>
                      {artworks.map((art, idx) => (
                        <li key={idx}><strong>{art.title}</strong> ({art.category})</li>
                      ))}
                    </ul>
                  </section>
  
                  <section className={activityStyles.card}>
                    <h2><b>🎭 Eventos Creados</b></h2>
                    <ul>
                      {events.map((ev, idx) => (
                        <li key={idx}><strong>{ev.name}</strong> — {ev.description}</li>
                      ))}
                    </ul>
                  </section>
  
                  {["judge", "admin"].includes(role) && (
                    <section className={activityStyles.card}>
                      <h2><b>⭐ Calificaciones dadas</b></h2>
                      <p>Próximamente: Mostrar obras evaluadas por este juez/admin</p>
                    </section>
                  )}
              </div>

              <div className={activityStyles.chartsGrid}>
                <div>
                  <h2><b>📈 Obras & Eventos</b></h2>
                  <div className={activityStyles.chart}>
                    <Bar data={simulatedGraphData} options={chartOptions} />
                  </div>
                </div>

                <div>
                  <h2><b>📉 Calificaciones promedio</b></h2>
                  <div className={activityStyles.chart}>
                    <Line data={averageRatingData} options={chartOptions} />
                  </div>
                </div>

                <div>
                  <h2><b>📉 Participación de Usuarios</b></h2>
                  <div className={activityStyles.chart}>
                    <Pie data={participationData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <FloatingMenuButton mainBtn={true} />
        <Footer />
      </div>
    </div>
  );
}