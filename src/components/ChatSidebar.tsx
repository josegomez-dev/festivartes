import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";

const ChatSidebar = () => {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "admin", text: `Bienvenido(a), ${user?.displayName} al Chat General.` },
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
      const botReply = { sender: "bot", text: "Gracias por tu mensaje, te responderemos pronto." };
      setMessages((prevMessages) => [...prevMessages, botReply]);
    }, 1000);
  };

  return (
    <>
      <button className={'chatToggle'} onClick={toggleChat}>
        <b>Festivartes</b> <span>CHAT</span>
      </button>
      <div className={`chatSidebar ${isOpen ? 'open' : ""}`}>
        <div className={'chatHeader'}>
          <h2>
            <b>Festivartes</b> <span className="small-text-size">CHAT</span>
          </h2>
          <button onClick={toggleChat} className={'closeButton'}>
            ✖
          </button>
        </div>
        <div className={'chatContent'}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${msg.sender === "me" ? 'myMessage' : msg.sender === "me" ? 'botMessage' : 'adminMessage'}`}
            >
              <b>{msg.sender === "me" ? "Tú" : msg.sender === "bot" ? "Bot" : "Admin"}:</b> {msg.text}
            </div>
          ))}
        </div>
        <div className={'chatInput'}>
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
