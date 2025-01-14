// components/ArtworkRegisterForm.tsx
import React, { useState } from "react";
import styles from "./../app/assets/styles/RegisterForm.module.css";

const ArtworkRegisterForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    description: "",
    year: "",
    category: "",
    image: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (e.target.files && e.target.files[0]) {
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     image: e.target.files[0],
    //   }));
    // }
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
          <b>Título de la Obra</b>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={styles.input}
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="artist">
          <b>Artista o Compositor</b>
        </label>
        <input
          type="text"
          id="artist"
          name="artist"
          className={styles.input}
          value={formData.artist}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="category">
          <b>Categoría</b>
        </label>
        <select
          id="category"
          name="category"
          className={styles.select}
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una categoría</option>
          <option value="Painting">Pintura</option>
          <option value="Sculpture">Escultura</option>
          <option value="Photography">Fotografía</option>
          <option value="Digital Art">Arte Digital</option>
          <option value="Musica">Música</option>
          <option value="Dance">Baile o Danza</option>
        </select>


        <label className={styles.label} htmlFor="image">
          <b>Foto o Imagen de la Obra</b>
        </label>
        <input
          type="file"
          id="image"
          name="image"
          className={styles.fileInput}
          accept="image/*"
          onChange={handleImageUpload}
          required
        />

        <label className={styles.label} htmlFor="description">
          <b>Descripción</b>
        </label>
        <textarea
          id="description"
          name="description"
          className={styles.textarea}
          value={formData.description}
          onChange={handleChange}
          rows={4}
        ></textarea>

        {/* <label className={styles.label} htmlFor="year">
          Year
        </label>
        <input
          type="number"
          id="year"
          name="year"
          className={styles.input}
          value={formData.year}
          onChange={handleChange}
        /> */}

        {formData.category === "Musica" ? 
        <>
          <label className={styles.label} htmlFor="image">
            <b>Secuencia o Base Rítmica</b>
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className={styles.fileInput}
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </> : null}

        <label className={styles.label} htmlFor="image">
          <b>Video</b> 
        </label>
        <input
          type="file"
          id="image"
          name="image"
          className={styles.fileInput}
          accept="image/*"
          onChange={handleImageUpload}
          required
        />

        <button type="submit" className={styles.submitButton}>
          <b>Enviar Formulario</b>
        </button>
      </form>
    </>
  );
};

export default ArtworkRegisterForm;
