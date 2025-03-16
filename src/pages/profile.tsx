import { useAuth } from "@/context/AuthContext";
import styles from '@/app/assets/styles/AdminIndex.module.css';
import authStyles from '@/app/assets/styles/Auth.module.css';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import { useState } from 'react';
import { FaFacebook, FaInstagramSquare, FaTiktok, FaYoutube, FaPinterestSquare, FaMedium, FaLinkedin, FaGithub, FaDiscord, FaSoundcloud } from "react-icons/fa";
import Image from "next/image";

export default function Profile() {
  const { role, authenticated } = useGlobalContext();
  const { user } = useAuth();
  
  if (!authenticated) {
    return <UnauthorizedMessage />;
  }

  const [profile, setProfile] = useState({
    displayName: user?.displayName,
    email: user?.email,
    // password: '********',
    role: 'user',
    profilePic: '/blank-profile-picture.png', // Default profile picture
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

  const requestRoleChange = () => {
    alert('Role change requested');
  };
  
  return (
    <div className={styles['full-view']}>
      <div className="profile-container">
        <label htmlFor="profile-pic" className="profile-pic-label">
          <Image
            src={profile.profilePic}
            alt="Profile Picture"
            width={100}
            height={100}
            className="profile-pic"
          />
          <input id="profile-pic" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </label>

        <div className="input-group">
          <label>Display Name</label>
          <input type="text" name="displayName" value={profile.displayName || ''} onChange={handleInputChange} />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" name="email" value={profile.email || ''} onChange={handleInputChange} />
        </div>

        {/* <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" value={profile.password} disabled className="disabled" />
        </div> */}

        <div className="input-group">
          <label>Role</label>
          <button onClick={requestRoleChange} className="role-change-button">Request Role Change</button>
          <input style={{maxWidth: '125px'}} type="text" name="role" value={profile.role} disabled className="disabled" />
          {/* <select name="role" value={profile.role} onChange={handleInputChange}>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Moderator">Moderator</option>
          </select> */}
        </div>

        <br />

        <button className={authStyles['auth-button']}>Save Changes</button>
      </div>
    </div>
  );
}
