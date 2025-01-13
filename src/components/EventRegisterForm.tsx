import React, { useState } from "react";
import styles from "./../app/assets/styles/RegisterForm.module.css";
import YesOrNoQuestionForm from "./YesOrNoQuestionForm";

const EventRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    picture: null,
    description: "",
    date: "",
    location: "",
    priceNormal: "",
    priceVIP: "",
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
          Nombre del Evento
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

        <label className={styles.label} htmlFor="image">
          Foto o imagen
        </label>
        <input
          type="file"
          id="image"
          name="image"
          className={styles.fileInput}
          accept="image/*"
          //onChange={handleImageUpload}
          required
        />

        <label className={styles.label} htmlFor="description">
          Descripcion
        </label>
        <textarea
          id="description"
          name="description"
          className={styles.textarea}
          value={formData.description}
          onChange={handleChange}
          rows={4}
        ></textarea>


        <label className={styles.label} htmlFor="artist">
          Fecha
        </label>
        <input
          type="text"
          id="artist"
          name="artist"
          className={styles.input}
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="artist">
          Ubicacion
        </label>
        <input
          type="text"
          id="artist"
          name="artist"
          className={styles.input}
          value={formData.location}
          onChange={handleChange}
          required
        />

        <button type="submit" className={styles.submitButton}>
          <b>Enviar Formulario</b>
        </button>
      </form>
    </>
  );
};

export default EventRegisterForm;
