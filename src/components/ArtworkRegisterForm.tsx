import React, { useEffect, useState } from "react";
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

interface ArtworkRegisterFormProps {
  closeModal: () => void;
  initialData?: ARTWORK | null;
}

const categoryIcons: Record<string, string> = {
  literatura: "/icons/icons-literature.png",
  feria: "/icons/icons-feria.png",
  escultura: "/icons/icons-sculture.png",
  fotografia: "/icons/icons-photography.png",
  arte_digital: "/icons/icons-digital.png",
  musica: "/icons/icons-music.png",
  baile: "/icons/icons-dance.png",
};

const ArtworkRegisterForm: React.FC<ArtworkRegisterFormProps> = ({ closeModal, initialData }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ARTWORK>(initialData || EMPTY_ARTWORK);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const isEditMode = Boolean(initialData?.id);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      toast.error("Error subiendo imagen");
      throw error;
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.uid) return toast.error("Archivo inválido o usuario no autenticado");

    try {
      const url = await uploadArtworksPhoto(file, user.uid);
      setFormData((prev) => ({ ...prev, thumbnail: url }));
    } catch {
      // handled inside upload
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Usuario no autenticado");

    setIsLoading(true);
    const artworkId = isEditMode ? formData.id : uuidv4();
    const docRef = doc(db, "artworks", artworkId);

    const artworkData = {
      ...formData,
      updatedAt: new Date(),
      createdBy: user.uid,
      ...(isEditMode ? {} : { createdAt: new Date() }),
    };

    try {
      await setDoc(docRef, artworkData, { merge: true });
      toast.success(isEditMode ? "Obra actualizada con éxito" : "Obra registrada con éxito");
      setFormData(EMPTY_ARTWORK);
      closeModal();
    } catch (error) {
      console.error("Error guardando la obra:", error);
      toast.error("Error al guardar la obra");
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
        <Image
          src={formData.thumbnail}
          alt="Artwork"
          width={200}
          height={200}
          className="thumbnail-register"
        />
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
            <option value="literatura">Literatura</option>
            <option value="feria">Feria Científica</option>
            <option value="escultura">Escultura</option>
            <option value="fotografia">Fotografía</option>
            <option value="arte_digital">Arte Digital</option>
            <option value="musica">Música</option>
            <option value="baile">Baile o Danza</option>
          </select>
        </div>
      </div>

      <div className="input-group mTop-30">
        {categoryIcons[formData.category] && (
          <Image
            src={categoryIcons[formData.category]}
            width={50}
            height={50}
            className="judges-badge badge-white"
            alt={`Ícono de ${formData.category}`}
            style={{ top: "-130px", position: "absolute" }}
          />
        )}
      </div>

      <div className="input-group">
        <label htmlFor="artist">Artista/Grupo</label>
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
        {isLoading ? <Preloader message={isEditMode ? "Actualizando..." : "Subiendo obra..."} /> : <b>{isEditMode ? "Guardar Cambios" : "Enviar Formulario"}</b>}
      </button>
    </form>
  );
};

export default ArtworkRegisterForm;
