// components/ArtworkRegisterForm.tsx
import React, { useState } from "react";
import styles from "./../app/assets/styles/RegisterForm.module.css";
import { db, storage } from "./../../firebaseConfig"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import Image from "next/image";
import { useAuth } from "./../context/AuthContext";
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import Preloader from "./Preloader";
import { ARTWORK, EMPTY_ARTWORK } from "@/types/artworks.types";

interface InviteRegisterFormProps {
  closeModal: () => void;
}

const ArtworkRegisterForm: React.FC<InviteRegisterFormProps> = ({ closeModal }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [formData, setFormData] = useState<ARTWORK>(EMPTY_ARTWORK);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadArtworksPhoto = async (file: File, userId: string) => {
    try {
      setIsImageLoading(true);
      const storageRef = ref(storage, `artworks/${userId}/${file.name}`);
      await uploadBytes(storageRef, file); // Upload the file
      const downloadURL = await getDownloadURL(storageRef); // Get the download URL
      setIsImageLoading(false);    
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading image");
      setIsImageLoading(false);   
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
        toast.error("User ID is undefined. Cannot upload the image.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
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
    };

    // Create associated account in Firestore
    await setDoc(doc(db, "artworks", uuidv4()), _artwork);
    toast.success("Obra de arte registrada con éxito");
    setFormData(EMPTY_ARTWORK);
    closeModal();
    setIsLoading(false);
    window.location.reload();
  };

  return (
    <>
      <form className={`${styles.form} profile-container`} onSubmit={handleSubmit}>

        <div className="input-group">
          <label htmlFor="title">
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
        </div>

       {!isImageLoading ? (
        <>
          <div className="input-group">
            <label htmlFor="thumbnail">
              Foto o Imagen de la Obra
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              className={styles.fileInput}
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <Image
            src={formData.thumbnail}
            alt="Artwork Picture"
            width={200}
            height={200}
            className="thumbnail-register"
          />
        </>
        ) : (
          <Preloader message="Subiendo imagen..." />
        )}

        <div className="input-group">
          <label className={styles.label} htmlFor="category">
            Categoría
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
        </div>

        <div className="input-group">
          <label className={styles.label} htmlFor="artist">
            Artista o Compositor
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
        </div>

        <div className="input-group">
          <label className={styles.label} htmlFor="description">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            className={styles.textarea}
            value={formData.description}
            onChange={handleChange}
            rows={4}
          ></textarea>
        </div>

        {!isLoading ? (
          <button type="submit" className={`${styles.submitButton}`}>
            <b>Enviar Formulario</b>
          </button>
          ) : (
          <Preloader message="Subiendo obra de arte..." />
          )}
      </form>
    </>
  );
};

export default ArtworkRegisterForm;
