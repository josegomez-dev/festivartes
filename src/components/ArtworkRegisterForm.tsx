// components/ArtworkRegisterForm.tsx
import React, { useState } from "react";
import styles from "./../app/assets/styles/ArtworkRegisterForm.module.css";

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
          Título de la Obra
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
          Autoria <b> (Artista o Compositor) </b>
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

        {/* <label className={styles.label} htmlFor="category">
          Categoria ( <i><u>Evento del MEP</u></i> )
        </label>
        <select
          id="category"
          name="category"
          className={styles.select}
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una categoria</option>
          <option value="Painting">Painting</option>
          <option value="Sculpture">Sculpture</option>
          <option value="Photography">Photography</option>
          <option value="Digital Art">Digital Art</option>
        </select> */}

        <label className={styles.label} htmlFor="image">
        Detalle de la Obra <b>(Letra, Poema, Cuento, etc...)</b> <span className="highlighted-text">(PDF)</span>
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

        <label className={styles.label} htmlFor="image">
          Pista adicional <b>(Secuencia o Base Ritmica)</b> <span className="highlighted-text">(.MP3 o .MP4)</span>
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

        <label className={styles.label} htmlFor="image">
          Multimedia <b>(Foto o Imagen)</b> <span className="highlighted-text">(.JPG, .JPEG .PNG)</span>
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
          Enviar Formulario
        </button>
      </form>
    </>
  );
};

export default ArtworkRegisterForm;
