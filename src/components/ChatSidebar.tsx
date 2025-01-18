import React, { useState } from "react";
import styles from "./../app/assets/styles/ChatSidebar.module.css";

const ChatSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className={styles.chatToggle} onClick={toggleChat}>
        <b>Festivartes</b> <span className="">CHAT</span>
      </button>
      <div className={`${styles.chatSidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.chatHeader}>
          <h2><b>Festivartes</b> <span className="small-text-size">CHAT</span></h2>
          <button onClick={toggleChat} className={styles.closeButton}>
            ✖
          </button>
        </div>
        <div className={styles.chatContent}>
          {/* Replace this with your chat messages */}
          <p>Bienvenido, <b>Jose</b> al Chat General.</p>
        </div>
        <div className={styles.chatInput}>
          <input type="text" placeholder="Type a message..." />
          <button>Send</button>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
