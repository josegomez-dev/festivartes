// components/ChatSidebar.tsx
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

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      sender: "user",
      name: user.displayName || "Usuario",
      photoURL: user.profilePic || "/blank-profile-picture.png",
      text: newMessage,
      topic,
      timestamp: serverTimestamp(),
    });

    setNewMessage("");

    setTimeout(async () => {
      await addDoc(collection(db, "chats", chatId, "messages"), {
        sender: "bot",
        name: "Asistente Festivartes",
        photoURL: "/logo2.png",
        text: "Gracias por tu mensaje. Te responderemos lo antes posible.",
        timestamp: serverTimestamp(),
      });
    }, 1000);
  };

  const handleTopicChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTopic = e.target.value;
    //how to get the label text of the selected Topic

    setTopic(selectedTopic);

    await addDoc(collection(db, "chats", chatId, "messages"), {
      sender: "bot",
      name: "Asistente Festivartes",
      photoURL: "/logo2.png",
      text: `Vamos a conversar sobre ${topicLabels[selectedTopic] || selectedTopic}. En qué podemos ayudarte?`,
      topic: selectedTopic,
      timestamp: serverTimestamp(),
    });
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
              }`}
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
              <option value="general">General</option>
              <option value="projects">Proyectos</option>
              <option value="events">Eventos</option>
              <option value="artworks">Obras</option>
              <option value="ratings">Calificaciones</option>
              <option value="claps">Aplausos</option>
              <option value="profile">Perfil</option>
              <option value="invitations">Invitaciones</option>
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
    </>
  );
};

export default ChatSidebar;