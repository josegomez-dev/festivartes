import React, { useState } from "react";
import styles from "./../app/assets/styles/RegisterForm.module.css";
import { useAuth } from "./../context/AuthContext";
import { db, storage } from "./../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

// define the interface for the props
interface EventRegisterFormProps {
  closeModal: () => void;
}


const EventRegisterForm: React.FC<EventRegisterFormProps> = ({ closeModal }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<{
    name: string;
    date: Date;
    description: string;
    location: string;
    price: number;
    thumbnail: string;
    upcoming: boolean;
  }>({
    name: "",
    thumbnail: '/logo2.png',
    date: new Date(),
    location: "",
    description: "",
    upcoming: false,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const uploadEventPhoto = async (file: File, userId: string) => {
    try {
      const storageRef = ref(storage, `events/${userId}/${file.name}`);
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
        uploadEventPhoto(file, user.uid).then((url) => {
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
    e.preventDefault();  
  
    if (!user) {
      console.error("User is not logged in.");
      toast.error("User is not logged in.");
      return;
    }

    const _event = {
      ...formData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: user.uid,
      upcoming: new Date(formData.date) > new Date(),
      stars: 0,
      category: "TP",
    };
    
    // Create associated account in Firestore
    await setDoc(doc(db, "events", uuidv4()), _event);
    toast.success("Evento registrado con éxito");
    closeModal();
  };

  return (
    <>
      <form className={`${styles.form} profile-container`} onSubmit={handleSubmit}>

        <div className="input-group">
          <label htmlFor="name">
            Nombre del Evento
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`${styles.input}`}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="thumbnail">
            Foto o imagen del evento
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
        </div>

        <Image
          src={formData.thumbnail}
          alt="Artwork Picture"
          className="thumbnail-register"
          width={200}
          height={200}
        />

        <div className="input-group">
          <label htmlFor="description">
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
        </div>


        <div className="input-group">
          <label className={styles.label} htmlFor="date">
            Fecha
          </label>
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
          <label htmlFor="location">
            Ubicación
          </label>
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

        <div className="input-group">
          <label htmlFor="price">
            Precio
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className={styles.input}
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={`${styles.submitButton}`}>
          <b>Enviar Formulario</b>
        </button>
      </form>
    </>
  );
};

export default EventRegisterForm;
