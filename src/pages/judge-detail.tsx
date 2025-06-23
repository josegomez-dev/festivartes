"use client";

import styles from "@/app/assets/styles/AdminIndex.module.css";
import SubMenu from "@/components/SubMenu";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Adjust the path as necessary
import { User } from "@/types/userTypes";

const JudgeDetail = () => {
  const router = useRouter();
  const { id } = router.query;              // ← /admin/judges?id=abc   OR  /admin/judges/abc (if dynamic route)

  const [profile, setProfile]   = useState<User | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error,   setError]     = useState<string | null>(null);

  // ─────────────────────────────────────────────────────────────
  // Fetch once the param is available on the client
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!router.isReady || !id) return;     // wait for hydration / param

    const fetchJudge = async (judgeId: string) => {
      try {
        const snapshot  = await getDocs(collection(db, "accounts"));
        const judges    = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() } as User))
          .filter((u) => u.role === "judge");

        const found = judges.find((u) => u.id === judgeId);
        setProfile(found ?? null);
      } catch (e) {
        console.error(e);
        setError("No se pudo obtener la información del juez.");
      } finally {
        setLoading(false);
      }
    };

    fetchJudge(Array.isArray(id) ? id[0] : id);
  }, [router.isReady, id]);

  // ─────────────────────────────────────────────────────────────
  // UI states
  // ─────────────────────────────────────────────────────────────
  if (loading)  return <div>Loading…</div>;
  if (error)    return <div>{error}</div>;
  if (!profile) return <div>No se encontró el juez.</div>;

  return (
    <div className={styles["full-view"]}>
      <SubMenu />

      <div className="project-detail-wrapper">
        <div className="project-detail-container">
          <h1><b className="font-size-3rem">{profile.displayName}</b></h1>
          <p className="bolder-text">
            {profile.displayName} | {profile.bio || "Agrega una descripción"}
          </p>

          <br />

          <img
            src={
              profile.profilePic ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt={profile.displayName}
            className="project-thumbnail-judge"
          />

          <br />

          <div>
            <p><b>Email:</b> {profile.email}</p>
            <p><b>Teléfono:</b> {profile.phone}</p>
            <p><b>Ubicación:</b> {profile.location}</p>
            <p><b>Dirección:</b> {profile.address}</p>
            <p><b>Sitio web:</b> {profile.website}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgeDetail;
