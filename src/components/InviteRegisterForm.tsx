import React, { useState, useRef } from "react";
import styles from "./../app/assets/styles/RegisterForm.module.css";
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';

interface FormData {
  user_name: string;
  user_email: string;
  message: string;
}

interface InviteRegisterFormProps {
  closeModal: () => void;
}

const suggestedMessages = [
  "Estimado(a) [Nombre],\n\nNos encantaría contar con su experiencia como jurado en nuestro evento artístico. Su criterio sería de gran valor para nosotros.",
  "Hola [Nombre],\n\nTe extendemos una cordial invitación para formar parte del jurado. ¡Tu aporte sería fundamental para el éxito del evento!",
  "Saludos [Nombre],\n\nEstamos organizando un evento cultural y sería un honor contar contigo como jurado. ¿Te animas a participar?",
  "Querido(a) [Nombre],\n\nTu talento y trayectoria serían una gran inspiración para los participantes. ¿Te gustaría acompañarnos como jurado?",
];

const InviteRegisterForm: React.FC<InviteRegisterFormProps> = ({ closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    user_name: "",
    user_email: "",
    message: "",
  });

  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(e.target.value);

    if (selectedIndex === -1) {
      // Random message
      const randomIndex = Math.floor(Math.random() * suggestedMessages.length);
      const message = suggestedMessages[randomIndex];
      setFormData((prev) => ({
        ...prev,
        message: message.replace("[Nombre]", prev.user_name || "Jurado"),
      }));
      setSelectedMessageIndex(-1);
    } else {
      // Specific message
      const message = suggestedMessages[selectedIndex];
      setFormData((prev) => ({
        ...prev,
        message: message.replace("[Nombre]", prev.user_name || "Jurado"),
      }));
      setSelectedMessageIndex(selectedIndex);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (formRef.current) {
      emailjs.sendForm('service_vgxzzks', 'template_uxr204w', formRef.current, '7r0MFDYv8obebfCn5')
        .then(() => {
          toast.success("🎉 Invitación enviada con éxito");
          setTimeout(() => {
            setFormData({ user_name: "", user_email: "", message: "" });
            closeModal();
            setIsLoading(false);
          }, 2000);
        }, (error) => {
          console.error(error);
          toast.error("Error al enviar la invitación");
          setIsLoading(false);
        });
    }
  };

  return (
    <form ref={formRef} className={`${styles.form} profile-container`} onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="user_name">Nombre del Jurado</label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          className={styles.input}
          value={formData.user_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="user_email">Correo electrónico</label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          className={styles.input}
          value={formData.user_email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="select-message">Seleccionar mensaje sugerido</label>
        <select id="select-message" className={styles.input} onChange={handleSelectChange} value={selectedMessageIndex ?? ""}>
          <option value="">Selecciona una opción...</option>
          <option value={-1}>🎲 Mensaje aleatorio</option>
          {suggestedMessages.map((msg, index) => (
            <option key={index} value={index}>
              {msg.length > 30 ? `${msg.slice(0, 30)}...` : msg}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="message">Mensaje de Invitación</label>
        <textarea
          id="message"
          name="message"
          className={styles.textarea}
          value={formData.message}
          onChange={handleChange}
          rows={4}
          style={{ height: "150px", resize: "none" } }
        ></textarea>
      </div>

      <button type="submit" className={`${styles.submitButton} mTop-15`} disabled={isLoading}>
        <b>{isLoading ? "Enviando..." : "Enviar Formulario"}</b>
      </button>
    </form>
  );
};

export default InviteRegisterForm;
