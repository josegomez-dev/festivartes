"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { User } from "@/types/userTypes";

const topicLabels: { [key: string]: string } = {
  general: "General",
  projects: "Proyectos",
  events: "Eventos",
  artworks: "Obras",
  ratings: "Calificaciones",
  claps: "Aplausos",
  profile: "Perfil",
  invitations: "Invitaciones",
};

const ChatSidebar = () => {
  const { user } = useAuth() as { user: User | null };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [topic, setTopic] = useState("general");
  const [hasUnread, setHasUnread] = useState(false);

  const chatId = user?.uid ?? "guest";

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const chatDocRef = doc(db, "chats", chatId);

    const unsub = onSnapshot(chatDocRef, (docSnap) => {
      const data = docSnap.data();
      if (data?.hasUnread) {
        setHasUnread(true);
      } else {
        setHasUnread(false);
      }
    });

    return () => unsub();
  }, [user]);

  useEffect(() => {
    if (!user || !isOpen) return;

    // Mark chat as read when user opens chat
    const markAsRead = async () => {
      await setDoc(doc(db, "chats", chatId), { hasUnread: false }, { merge: true });
    };

    markAsRead();
  }, [isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    const userMessage = {
      sender: "user",
      name: user.displayName || "Usuario",
      photoURL: user.profilePic || "/blank-profile-picture.png",
      text: newMessage,
      topic,
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(db, "chats", chatId, "messages"), userMessage);

    await setDoc(doc(db, "chats", chatId), {
      hasUnread: true,
      lastMessageTimestamp: new Date(),
    }, { merge: true });

    setNewMessage("");

    // Simulated auto-reply (frontend only)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `auto-reply-${Date.now()}`,
          sender: "bot",
          name: "Asistente Festivartes",
          photoURL: "/logo2.png",
          text: "Gracias por tu mensaje. Te responderemos lo antes posible.",
          topic,
          timestamp: { seconds: Date.now() / 1000 },
          isTemp: true,
        },
      ]);
    }, 1000);
  };

  const handleTopicChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTopic = e.target.value;
    setTopic(selectedTopic);

    await addDoc(collection(db, "chats", chatId, "messages"), {
      sender: "bot",
      name: "Asistente Festivartes",
      photoURL: "/logo2.png",
      text: `Vamos a conversar sobre ${topicLabels[selectedTopic] || selectedTopic}. ¿En qué podemos ayudarte?`,
      topic: selectedTopic,
      timestamp: serverTimestamp(),
    });

    await setDoc(doc(db, "chats", chatId), {
      hasUnread: true,
      lastMessageTimestamp: new Date(),
    }, { merge: true });
  };

  const deleteMessage = async (messageId: string) => {
    try {
      await deleteDoc(doc(db, "chats", chatId, "messages", messageId));
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  const clearConversation = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "chats", chatId, "messages"));
      const deletePromises = querySnapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error clearing conversation:", error);
    }
  };

  return (
    <>
      <button className="chatToggle" onClick={toggleChat}>
        <b>Festivartes</b> <span>CHAT</span>
        {hasUnread && <span className="unreadBadge">●</span>}
      </button>

      <div className={`chatSidebar ${isOpen ? "open" : ""}`}>
        <div className="chatHeader">
          <h2>
            <b>Festivartes</b> <span className="small-text-size">CHAT</span>
          </h2>
          <button onClick={toggleChat} className="closeButton">✖</button>
        </div>

        <div className="chatContent">
          {messages.map((msg, index) => (
            <div
              key={msg.id || index}
              className={`messageItem ${
                msg.sender === "user"
                  ? "myMessage"
                  : msg.sender === "bot"
                  ? "botMessage"
                  : "adminMessage"
              } ${msg.isTemp ? "tempMessage" : ""}`}
            >
              <div className="messageHeader">
                <img
                  src={msg.photoURL || "https://via.placeholder.com/40"}
                  alt="avatar"
                  className="avatar"
                  style={{ width: "40px", height: "40px" }}
                />
                <span className="senderName">{msg.name || msg.sender}</span>
              </div>
              <div className="messageBody">
                <span>{msg.text}</span>
                {msg.topic && <div className="msg-topic">📌 {topicLabels[msg.topic]}</div>}
              </div>
              {msg.sender === "user" && (
                <button
                  className="deleteBtn"
                  onClick={() => deleteMessage(msg.id)}
                >
                  🗑️
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="chatInput">
          <div className="chatActionsTop">
            <select
              className="chatTopicSelect"
              value={topic}
              onChange={handleTopicChange}
            >
              {Object.entries(topicLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <button onClick={clearConversation} className="clearBtn">
              🧹 Limpiar
            </button>
          </div>

          <div className="chatMessageRow">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="chatInputField"
            />
            <button onClick={sendMessage} className="sendBtn">
              🚀 Enviar
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .unreadBadge {
          margin-left: 8px;
          background: red;
          color: white;
          padding: 0 6px;
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: bold;
        }
        .tempMessage {
          opacity: 0.7;
          font-style: italic;
        }
      `}</style>
    </>
  );
};

export default ChatSidebar;
