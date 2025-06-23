// components/ArtworkRegisterForm.tsx
import React, { useState } from "react";
import styles from "./../app/assets/styles/RegisterForm.module.css";
import { db, storage } from "./../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import Image from "next/image";
import { useAuth } from "./../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import Preloader from "./Preloader";
import { ARTWORK, EMPTY_ARTWORK } from "@/types/artworks.types";

interface InviteRegisterFormProps {
  closeModal: () => void;
}

const categoryIcons: Record<string, string> = {
  escultura: "/icons-sculture.png",
  fotografia: "/icons-photography.png",
  arte_digital: "/icons-digital.png",
  musica: "/icons-music.png",
  baile: "/icons-dance.png",
};

const ArtworkRegisterForm: React.FC<InviteRegisterFormProps> = ({ closeModal }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ARTWORK>(EMPTY_ARTWORK);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const uploadArtworksPhoto = async (file: File, userId: string): Promise<string> => {
    try {
      setIsImageLoading(true);
      const storageRef = ref(storage, `artworks/${userId}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Error uploading image");
      throw error;
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.uid) return toast.error("Invalid file or user not logged in.");
    try {
      const url = await uploadArtworksPhoto(file, user.uid);
      setFormData(prev => ({ ...prev, thumbnail: url }));
    } catch {
      // Error handled in uploadArtworksPhoto
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("User is not logged in.");

    setIsLoading(true);
    const artworkData = {
      ...formData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: user.uid,
    };

    try {
      await setDoc(doc(db, "artworks", uuidv4()), artworkData);
      toast.success("Obra de arte registrada con éxito");
      setFormData(EMPTY_ARTWORK);
      closeModal();
      window.location.reload(); // optional, can be removed if modal rerenders list
    } catch (error) {
      console.error("Error saving artwork:", error);
      toast.error("Error al registrar la obra");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={`${styles.form} profile-container`} onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="title">Título de la Obra</label>
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

      <div className="input-group">
        <label htmlFor="thumbnail">Foto o Imagen de la Obra</label>
        <input
          type="file"
          id="thumbnail"
          className={styles.fileInput}
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      {isImageLoading ? (
        <Preloader message="Subiendo imagen..." />
      ) : formData.thumbnail ? (
        <Image src={formData.thumbnail} alt="Artwork" width={200} height={200} className="thumbnail-register" />
      ) : null}

      <div className={styles.artworkCategory}>
        <div className="input-group">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            name="category"
            className={styles.select}
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="escultura">Escultura</option>
            <option value="fotografia">Fotografía</option>
            <option value="arte_digital">Arte Digital</option>
            <option value="musica">Música</option>
            <option value="baile">Baile o Danza</option>
          </select>
        </div>
      </div>
      <br />
      <div className="input-group mTop-30">
        {categoryIcons[formData.category] && (
          <Image
            src={categoryIcons[formData.category]}
            width={50}
            height={50}
            className="judges-badge badge-white"
            alt={`Ícono de ${formData.category}`}
            style={{ top: "-130px", position: 'absolute' }}
          />
        )}
      </div>
      <div className="input-group">
        <label htmlFor="artist">Artista o Compositor</label>
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
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          className={styles.textarea}
          value={formData.description}
          onChange={handleChange}
          rows={4}
        ></textarea>
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading || isImageLoading}
      >
        {isLoading ? <Preloader message="Subiendo obra de arte..." /> : <b>Enviar Formulario</b>}
      </button>
    </form>
  );
};

export default ArtworkRegisterForm;
