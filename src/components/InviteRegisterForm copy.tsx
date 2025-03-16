import React, { useState } from "react";
import styles from "./../app/assets/styles/RegisterForm.module.css";

const InviteRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    picture: null,
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add logic to send data to the backend or state management system
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>

        <label className={styles.label} htmlFor="title">
          Nombre del Jurado
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="title">
          Correo electronico
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="title">
          Telefono
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="description">
          Mensaje de Invitacion
        </label>
        <textarea
          id="description"
          name="description"
          className={styles.textarea}
          value={formData.description}
          onChange={handleChange}
          rows={4}
        ></textarea>

        <button type="submit" className={`${styles.submitButton} disabled`} disabled>
          <b>Enviar Formulario</b>
        </button>
      </form>
    </>
  );
};

export default InviteRegisterForm;
