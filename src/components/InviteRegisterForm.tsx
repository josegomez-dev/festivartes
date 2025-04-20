import React, { useState } from "react";
import styles from "./../app/assets/styles/RegisterForm.module.css";

const InviteRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

        <label className={styles.label} htmlFor="name">
          Nombre del Jurado
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="email">
          Correo electronico
        </label>
        <input
          type="text"
          id="email"
          name="email"
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
          required
        />

        <button type="submit" className={`${styles.submitButton}`}>
          <b>Enviar Formulario</b>
        </button>
      </form>
    </>
  );
};

export default InviteRegisterForm;
