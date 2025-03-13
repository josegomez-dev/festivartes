import React, { useState } from "react";
import styles from "./../app/assets/styles/ChatSidebar.module.css";

const ChatSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "admin", text: "Bienvenido, Jose al Chat General." },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = { sender: "me", text: newMessage };
    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Simulate a bot response
    setTimeout(() => {
      const botReply = { sender: "bot", text: "Gracias por tu mensaje, te responderemos pronto. 🤖" };
      setMessages((prevMessages) => [...prevMessages, botReply]);
    }, 1000);
  };

  return (
    <>
      <button className={styles.chatToggle} onClick={toggleChat}>
        <b>Festivartes</b> <span>CHAT</span>
      </button>
      <div className={`${styles.chatSidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.chatHeader}>
          <h2>
            <b>Festivartes</b> <span className="small-text-size">CHAT</span>
          </h2>
          <button onClick={toggleChat} className={styles.closeButton}>
            ✖
          </button>
        </div>
        <div className={styles.chatContent}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.chatMessage} ${msg.sender === "me" ? styles.myMessage : msg.sender === "bot" ? styles.botMessage : styles.adminMessage}`}
            >
              <b>{msg.sender === "me" ? "Tú" : msg.sender === "bot" ? "Bot" : "Admin"}:</b> {msg.text}
            </div>
          ))}
        </div>
        <div className={styles.chatInput}>
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
