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

const InviteRegisterForm: React.FC<InviteRegisterFormProps> = ({ closeModal }) => {
  const [formData, setFormData] = useState<FormData>({
    user_name: "",
    user_email: "",
    message: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) {
      emailjs.sendForm('service_vgxzzks', 'template_uxr204w', formRef.current, '7r0MFDYv8obebfCn5')
        .then((result) => {
          console.log(result.text);

          toast.success("🎉 Invitación enviada con éxito");
          
          setTimeout(() => {
            setFormData({
              user_name: "",
              user_email: "",
              message: "",
            });
            closeModal();
          }, 2000);
        }, (error) => {
          console.log(error.text);
        });
    }
  };
  return (
    <>
      <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>

        <label className={styles.label} htmlFor="user_name">
          Nombre del Jurado
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          className={styles.input}
          value={formData.user_name}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="user_email">
          Correo electronico
        </label>
        <input
          type="text"
          id="user_email"
          name="user_email"
          className={styles.input}
          value={formData.user_email}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="message">
          Mensaje de Invitacion
        </label>
        <textarea
          id="message"
          name="message"
          className={styles.textarea}
          value={formData.message}
          onChange={handleChange}
          rows={4}
        ></textarea>



        <button type="submit" className={`${styles.submitButton}`}>
          <b>Enviar Formulario</b>
        </button>
      </form>
    </>
  );
};

export default InviteRegisterForm;
