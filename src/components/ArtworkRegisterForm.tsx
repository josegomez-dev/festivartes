// components/ArtworkRegisterForm.tsx
import React, { useState } from "react";
import styles from "./../app/assets/styles/RegisterForm.module.css";
import { db, storage } from "./../../firebaseConfig"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import Image from "next/image";
import { useAuth } from "./../context/AuthContext";
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';

const ArtworkRegisterForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState<{
    title: string;
    artist: string;
    description: string;
    category: string;
    thumbnail: string;
  }>({
    title: "",
    artist: "",
    description: "",
    category: "",
    thumbnail: '/logo2.png',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadArtworksPhoto = async (file: File, userId: string) => {
    try {
      const storageRef = ref(storage, `artworks/${userId}/${file.name}`);
      await uploadBytes(storageRef, file); // Upload the file
      const downloadURL = await getDownloadURL(storageRef); // Get the download URL
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading image");
      throw error;
    }
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (user?.uid) {
        uploadArtworksPhoto(file, user.uid).then((url) => {
          setFormData((prevData) => ({
            ...prevData,
            thumbnail: url,
          }));
        }).catch((error) => {
          console.error("Error uploading image:", error);
          toast.error("Error uploading image");
        });
      } else {
        console.error("User ID is undefined. Cannot upload the image.");
      }
    }    
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      console.error("User is not logged in.");
      toast.error("User is not logged in.");
      return;
    }

    const _artwork = {
      ...formData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: user.uid,
      stars: 0,
    };

    // Create associated account in Firestore
    await setDoc(doc(db, "artworks", uuidv4()), _artwork);
    toast.success("Obra de arte registrada con éxito");
    setFormData({
      title: "",
      artist: "",
      description: "",
      category: "",
      thumbnail: '/logo2.png',
    });
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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


        <label className={styles.label} htmlFor="thumbnail">
          <b>Foto o Imagen de la Obra</b>
          <Image
            src={formData.thumbnail}
            alt="Artwork Picture"
            width={100}
            height={100}
          />
        </label>
        <input
          type="file"
          id="thumbnail"
          name="thumbnail"
          className={styles.fileInput}
          accept="image/*"
          onChange={handleImageUpload}
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
          <option value="pintura">Pintura</option>
          <option value="escultura">Escultura</option>
          <option value="fotografia">Fotografía</option>
          <option value="arte_digital">Arte Digital</option>
          <option value="musica">Música</option>
          <option value="baile">Baile o Danza</option>
        </select>


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

        <button type="submit" className={`${styles.submitButton}`}>
          <b>Enviar Formulario</b>
        </button>
      </form>
    </>
  );
};

export default ArtworkRegisterForm;
