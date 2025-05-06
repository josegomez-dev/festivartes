import { useAuth } from "@/context/AuthContext";
import styles from '@/app/assets/styles/AdminIndex.module.css';
import authStyles from '@/app/assets/styles/Auth.module.css';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useEffect, useState } from 'react';
import { FaFacebook, FaInstagramSquare, FaTiktok, FaYoutube, FaPinterestSquare, FaMedium, FaLinkedin, FaGithub, FaDiscord, FaSoundcloud } from "react-icons/fa";
import Image from "next/image";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, storage } from "./../../firebaseConfig"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { EMPTY_USER } from "@/types/userTypes";
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, role, authenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [accountData, setAccountData] = useState({
    ...EMPTY_USER,
    uid: user?.uid,
    userId: user?.uid,
    email: user?.email,
    role: role,
    displayName: user?.displayName,
    profilePic: user?.photoURL || user?.photoURL || '/logo2.png',
  });

  useEffect(() => {
    const fetchAccountData = async () => {
      if (user) {
        const accountRef = doc(db, "accounts", user.uid);
        const accountDoc = await getDoc(accountRef);
        if (accountDoc.exists()) {
          setAccountData(accountDoc.data() as typeof accountData);
        } else {
          console.log("No such document!");
          toast.error("No account data found.");
        }
        setLoading(false);
      }
    }; 
    fetchAccountData();   
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const uploadProfilePhoto = async (file: File, userId: string) => {
    try {
      const storageRef = ref(storage, `profile_pictures/${userId}`);
      await uploadBytes(storageRef, file); // Upload the file
  
      const url = await getDownloadURL(storageRef); // Get the public URL
      return url;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading image");
      throw error;
    }
  };

  const handleImageChange = async (file: File) => {
    if (!user || !user.uid) {
      console.error("Error: User is not authenticated or UID is undefined.");
      toast.error("User is not authenticated.");
      return;
    }
    const url = await uploadProfilePhoto(file, user.uid); 

    setAccountData((prevState) => ({
      ...prevState,
      profilePic: url,
    }));

    await updateDoc(doc(db, "accounts", user.uid), {
      profilePic: url,
      updatedAt: new Date(),
    });
    toast.success("Profile picture updated successfully.");
  };

  if (!authenticated || !user) {
    return <UnauthorizedMessage />;
  }

  const requestRoleChange = () => {
    toast.success("Role change requested");
  };

  const handleSaveChanges = async () => {
    try {
      if (!accountData.uid) {
        console.error("Error: User UID is undefined.");
        toast.error("User UID is undefined.");
        return;
      }
      const accountRef = doc(db, "accounts", accountData.uid);
      await updateDoc(accountRef, accountData);
      toast.success("Account updated successfully.");
    } catch (error) {
      console.error("Error updating account:", error);
    }
  }
  

  //return if not find the user
  if (!user) {
    return <UnauthorizedMessage />;
  }

  return (
    <div className={styles['full-view']} >
      <div className="profile-container">
        <label htmlFor="profile-pic" className="profile-pic-label">
          <Image
            src={accountData?.profilePic}
            alt="Profile Picture"
            width={100}
            height={100}
            className="profile-pic"
          />
          <br />
          <br />
          <input
            id="profile-pic"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleImageChange(file);
              }
            }}
          />
        </label>

        <div className="input-group">
          <label>Rol de Usuario <span className="color-orange">*</span></label>
          <input type="text" name="role" value={accountData.role} disabled className="disabled" />
          {/* <select name="role" value={profile.role} onChange={handleInputChange}>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Moderator">Moderator</option>
          </select> */}
        </div>

        <div className="input-group">
          <label>Nombre <span className="color-orange">*</span></label>
          <input type="text" name="displayName" value={accountData.displayName || ''} onChange={handleInputChange} />
        </div>

        <div className="input-group">
          <label>Correo electronico <span className="color-orange">*</span></label>
          <input type="email" name="email" value={accountData.email || ''} onChange={handleInputChange} />
        </div>

        <div className="input-group">
          <label>Bio <span className="color-orange">*</span></label>
          <input type="tel" name="phone" value={accountData.bio || ''} onChange={handleInputChange} />
        </div>

        {/* <div className="input-group">
          <label>Redes Sociales</label>
          <div className="social-media-icons">
            <FaFacebook /> &nbsp;
            <FaInstagramSquare /> &nbsp;
            <FaTiktok /> &nbsp;
            <FaYoutube /> &nbsp;
            <FaPinterestSquare /> &nbsp;
            <FaMedium /> &nbsp;
            <FaLinkedin /> &nbsp;
            <FaGithub /> &nbsp;
            <FaDiscord /> &nbsp;
            <FaSoundcloud />
          </div>
          <input type="text" name="socialMedia" value={profile.socialMedia || ''} onChange={handleInputChange} placeholder="Facebook, Instagram, etc." />
        </div> */}

        <div className="input-group">
          <label>Ubicación <span className="color-orange">*</span></label>
          <input type="text" name="location" value={accountData.location || ''} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label>Dirección</label>
          <input type="text" name="address" value={accountData.address || ''} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label>Teléfono </label>
          <input type="tel" name="phone" value={accountData.phone || ''} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label>Website</label>
          <input type="url" name="website" value={accountData.website || ''} onChange={handleInputChange} />
        </div>  

        <br />

        <button className={`${authStyles['auth-button']}`} onClick={handleSaveChanges}>
          <b>Guardar Cambios</b>
         </button>
      </div>
    </div>
  );
}
