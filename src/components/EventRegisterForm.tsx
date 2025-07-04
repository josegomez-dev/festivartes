import React, { useEffect, useState } from "react";
import styles from "./../app/assets/styles/RegisterForm.module.css";
import { useAuth } from "./../context/AuthContext";
import { db, storage } from "./../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { EMPTY_EVENT, EVENTS } from "@/types/events.types";
import Preloader from "./Preloader";

interface EventRegisterFormProps {
  closeModal: () => void;
  initialData?: EVENTS | null;
}

const EventRegisterForm: React.FC<EventRegisterFormProps> = ({ closeModal, initialData }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<EVENTS>(initialData || EMPTY_EVENT);
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
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const uploadEventPhoto = async (file: File, userId: string): Promise<string> => {
    try {
      setIsImageLoading(true);
      const storageRef = ref(storage, `events/${userId}/${file.name}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (error) {
      toast.error("Error al subir imagen");
      throw error;
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.uid) return toast.error("Archivo inválido o usuario no autenticado");

    try {
      const url = await uploadEventPhoto(file, user.uid);
      setFormData((prev) => ({ ...prev, thumbnail: url }));
    } catch {
      // error already handled
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Usuario no autenticado.");
      return;
    }

    setIsLoading(true);
    const eventId = isEditMode ? formData.id : uuidv4();
    const docRef = doc(db, "events", eventId);

    const newEvent: EVENTS = {
      ...formData,
      updatedAt: new Date(),
      createdBy: user.uid,
      upcoming: new Date(formData.date) > new Date(),
      ...(isEditMode ? {} : { createdAt: new Date() }),
    };

    try {
      await setDoc(docRef, newEvent, { merge: true });
      toast.success(isEditMode ? "Evento actualizado con éxito" : "Evento registrado con éxito");
      closeModal();
      window.location.reload();
    } catch (err) {
      console.error("Error al guardar el evento:", err);
      toast.error("Error al guardar el evento.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={`${styles.form} profile-container`} onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="name">Nombre del Evento</label>
        <input
          type="text"
          id="name"
          name="name"
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {!isImageLoading ? (
        <>
          <div className="input-group">
            <label htmlFor="thumbnail">Foto o imagen del evento</label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              className={styles.fileInput}
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          {formData.thumbnail && (
            <Image
              src={formData.thumbnail}
              alt="Evento"
              className="thumbnail-register"
              width={200}
              height={200}
            />
          )}
        </>
      ) : (
        <Preloader message="Subiendo imagen..." />
      )}

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

      <div className="input-group">
        <label htmlFor="date">Fecha</label>
        <input
          type="date"
          id="date"
          name="date"
          className={styles.input}
          value={formData.date.toString()}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="location">Ubicación</label>
        <input
          type="text"
          id="location"
          name="location"
          className={styles.input}
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      {!isLoading ? (
        <button type="submit" className={styles.submitButton}>
          <b>{isEditMode ? "Guardar Cambios" : "Enviar Formulario"}</b>
        </button>
      ) : (
        <Preloader message="Guardando evento..." />
      )}
    </form>
  );
};

export default EventRegisterForm;
