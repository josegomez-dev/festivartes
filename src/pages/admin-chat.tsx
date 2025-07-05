"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/../firebaseConfig";
import { User } from "@/types/userTypes";
import { useAuth } from "@/context/AuthContext";

interface Message {
  id: string;
  sender: string;
  name: string;
  photoURL: string;
  text: string;
  topic: string;
  timestamp: any;
}

interface ChatStatus {
  status: string;
  unreadCount: number;
}

const topicLabels: Record<string, string> = {
  general: "General",
  projects: "Proyectos",
  events: "Eventos",
  artworks: "Obras",
  ratings: "Calificaciones",
  claps: "Aplausos",
  profile: "Perfil",
  invitations: "Invitaciones",
};

export default function AdminChatPanel() {
  const { authenticated, role } = useAuth();
  const [chatUsers, setChatUsers] = useState<User[]>([]);
  const [chatStatuses, setChatStatuses] = useState<Record<string, ChatStatus>>({});
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchUsersWithChats = async () => {
      const chatSnapshot = await getDocs(collection(db, "chats"));
      const chatIds = chatSnapshot.docs.map((doc) => doc.id);

      const accountSnapshot = await getDocs(collection(db, "accounts"));
      const users: User[] = accountSnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...(doc.data() as Omit<User, "uid">),
      }));

      const statuses: Record<string, ChatStatus> = {};
      for (const chatDoc of chatSnapshot.docs) {
        const data = chatDoc.data();
        statuses[chatDoc.id] = {
          status: data.status || "pending",
          unreadCount: data.unreadCount || 0,
        };
      }

      users.sort((a, b) => {
        const unreadA = statuses[a.uid]?.unreadCount || 0;
        const unreadB = statuses[b.uid]?.unreadCount || 0;
        return unreadB - unreadA;
      });

      setChatUsers(users);
      setChatStatuses(statuses);
    };

    if (role === "admin") fetchUsersWithChats();
  }, [role]);

  useEffect(() => {
    if (!selectedUserId) return;

    const q = query(
      collection(db, "chats", selectedUserId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Message)
      );
      setMessages(msgs);

      // Reset unread count when viewing
      setDoc(doc(db, "chats", selectedUserId), { unreadCount: 0 }, { merge: true });
    });

    return () => unsubscribe();
  }, [selectedUserId]);

  if (!authenticated || role !== "admin") {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#fff" }}>
        <p>🔒 Acceso denegado. Solo para administradores.</p>
        <a href="/" style={{ color: "#32acc0", fontWeight: "bold" }}>Volver al Inicio</a>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "2rem auto",
      padding: "1rem",
      borderRadius: "16px",
      background: "rgba(0,0,0,0.3)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.2)",
      boxShadow: "0 0 20px rgba(0,0,0,0.2)",
      color: "#fff",
      transition: "all 0.3s ease-in-out"
    }}>
      <h2 style={{ textAlign: "center", fontSize: "1.8rem", marginBottom: "1rem" }}>💬 Panel de Mensajería</h2>

      <div style={{ display: "flex", flexDirection: "row", gap: "1rem", flexWrap: "wrap" }}>
        {/* Sidebar */}
        <aside style={{
          flex: "0 0 280px",
          maxHeight: "600px",
          overflowY: "auto",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "12px",
          padding: "1rem",
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <h3 style={{ marginBottom: "0.8rem", fontSize: "1.2rem" }}>👥 Usuarios</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {chatUsers.map((user) => {
              const status = chatStatuses[user.uid]?.status || "pending";
              const unread = chatStatuses[user.uid]?.unreadCount || 0;
              return (
                <li
                  key={user.uid}
                  onClick={() => setSelectedUserId(user.uid)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    marginBottom: "8px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    background: selectedUserId === user.uid
                      ? "linear-gradient(45deg, #32acc0, orange)"
                      : "rgba(255,255,255,0.05)",
                    border: selectedUserId === user.uid
                      ? "2px solid var(--color-orange)"
                      : "1px solid rgba(255,255,255,0.1)",
                    transition: "all 0.2s"
                  }}>
                  <span>{user.displayName || user.email}</span>
                  <span>
                    {status === "active" && <span style={{ color: "lime" }}>🟢</span>}
                    {unread > 0 && <span style={{ marginLeft: 8, color: "gold" }}>({unread})</span>}
                  </span>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Chat Panel */}
        <section style={{ flex: 1, minWidth: "300px" }}>
          {selectedUserId ? (
            <>
              <h3 style={{ marginBottom: "1rem", fontSize: "1.3rem" }}>
                🧑‍💻 Conversación con: <code style={{ color: "#32acc0" }}>{chatUsers.find((u) => u.uid === selectedUserId)?.displayName || selectedUserId}</code>
              </h3>
              <div style={{ maxHeight: "400px", overflowY: "auto", marginBottom: "1rem", background: "rgba(255,255,255,0.05)", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                {messages.map((msg) => (
                  <div key={msg.id} style={{
                    background: msg.sender === "admin"
                      ? "linear-gradient(to right, #32acc0, orange)"
                      : "rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    padding: "0.8rem",
                    marginBottom: "0.8rem"
                  }}>
                    <strong>{msg.name}</strong> ({msg.sender})<br />
                    <small>📌 {topicLabels[msg.topic]}</small>
                    <p>{msg.text}</p>
                    <small>{new Date(msg.timestamp?.toDate?.() || Date.now()).toLocaleString()}</small>
                  </div>
                ))}
              </div>
              <AdminReplyBox userId={selectedUserId} chatStatuses={chatStatuses} />
            </>
          ) : <p style={{ padding: "1rem", fontStyle: "italic" }}>Selecciona un usuario para ver el chat.</p>}
        </section>
      </div>
    </div>
  );
}

function AdminReplyBox({ userId, chatStatuses }: { userId: string, chatStatuses: Record<string, ChatStatus> }) {
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("general");
  const { user } = useAuth();

  const handleSend = async () => {
    if (!message.trim() || !user) return;

    await addDoc(collection(db, "chats", userId, "messages"), {
      sender: user.uid,
      name: user.displayName || user.email || "Usuario",
      text: message,
      topic,
      timestamp: serverTimestamp(),
    });

    await setDoc(doc(db, "chats", userId), {
      status: "active",
      unreadCount: (chatStatuses[userId]?.unreadCount || 0) + 1,
      lastUpdated: serverTimestamp(),
    }, { merge: true });

    setMessage("");
  };

  return (
    <div style={{ background: "rgba(255,255,255,0.05)", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "0.5rem" }}>
        <select value={topic} onChange={(e) => setTopic(e.target.value)} style={{ flex: 1, padding: "6px", borderRadius: "6px", border: "1px solid #ccc" }}>
          {Object.entries(topicLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu respuesta..."
          style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}
        />
        <button
          onClick={handleSend}
          style={{ padding: "10px 16px", background: "#32acc0", border: "none", color: "white", fontWeight: "bold", borderRadius: "6px", cursor: "pointer" }}
        >📤</button>
      </div>
    </div>
  );
}
