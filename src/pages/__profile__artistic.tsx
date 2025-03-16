import stylesChat from "./../app/assets/styles/ChatSidebar.module.css";
import { useAuth } from "@/context/AuthContext";
import styles from '@/app/assets/styles/AdminIndex.module.css';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import { useState } from 'react';
import { FaFacebook, FaInstagramSquare, FaTiktok, FaYoutube, FaPinterestSquare, FaMedium, FaLinkedin, FaGithub, FaDiscord, FaSoundcloud } from "react-icons/fa";

export default function __ProfileTmp() {
  const { role, authenticated } = useGlobalContext();
  const { user } = useAuth();
  
  if (!authenticated) {
    return <UnauthorizedMessage />;
  }

  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  interface SocialLinks {
    facebook: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    pinterest: string;
    medium: string;
    linkedin: string;
    discord: string;
    github: string;
    soundcloud: string;
  }

  const [profile, setProfile] = useState<{
    name: string;
    bio: string;
    image: string;
    socialLinks: SocialLinks;
  }>({
    name: user?.displayName || "Set your name",
    bio: "Musician & Software Engineer",
    image: "", 
    socialLinks: {
      facebook: "https://www.facebook.com/alegomez.cr",
      instagram: "https://www.instagram.com/alegomez.cr/",
      tiktok: "https://www.tiktok.com/@musiqueandola",
      youtube: "https://www.youtube.com/@musiqueandola",
      pinterest: "https://cz.pinterest.com/josegomezdev/",
      medium: "https://josegomezdev.medium.com/",
      linkedin: "https://www.linkedin.com/in/josealejandrogomezcastro/",
      discord: "#",
      github: "https://github.com/josegomez-dev",
      soundcloud: "https://soundcloud.com/musiqueandola",
    },
  });

  const handleToggle = () => setIsActive((prev) => !prev);
  const handleEditToggle = () => setIsEditing((prev) => !prev);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }));
  };

  return (
    <div className={styles['full-view']}>
      <div className={`pCard_card ${isActive ? 'pCard_on' : ''}`}> 
        <div className="pCard_up">
            <button style={{ marginRight: '-250px' }} onClick={handleEditToggle}>
                <b>{isEditing ? "Save" : "Edit"}</b>
            </button>
          <div className="pCard_text">
            {isEditing ? (
              <div className="pCard_edit_inputs">
                <input type="text" name="name" value={profile.name} onChange={handleChange} /> <br />
                <input type="text" name="bio" value={profile.bio} onChange={handleChange} />
              </div>
            ) : (
              <>
                <h2>{profile.name}</h2>
                <p>{profile.bio}</p>
              </>
            )}
          </div>
          <div className="pCard_add" onClick={handleToggle}>
            <i className={`fa ${isActive ? "fa-minus" : "fa-plus"}`}></i>
          </div>
        </div>
        <div className="pCard_down">
          <div>
            <p>Artworks</p>
            <p>12</p>
          </div>
          <div>
            <p>Views</p>
            <p>21,579</p>
          </div>
          <div>
            <p>Likes</p>
            <p>1,976</p>
          </div>
        </div>
        <div className="pCard_back">
          <p>See My Latest Work Here</p>
          <div className='social-media-icons'>
            {Object.entries(profile.socialLinks).map(([key, link]) => (
              <a key={key} href={link} target="_blank" rel="noopener noreferrer">
                {key === "facebook" && <FaFacebook className='fa-2x fa-fw' color='blue' />}
                {key === "instagram" && <FaInstagramSquare className='fa-2x fa-fw' color='pink' />}
                {key === "tiktok" && <FaTiktok className='fa-2x fa-fw' color='black' />}
                {key === "youtube" && <FaYoutube className='fa-2x fa-fw' color='red' />}
                {key === "pinterest" && <FaPinterestSquare className='fa-2x fa-fw' color='red' />}
                {key === "medium" && <FaMedium className='fa-2x fa-fw' color='black' />}
                {key === "linkedin" && <FaLinkedin className='fa-2x fa-fw' color='blue' />}
                {key === "discord" && <FaDiscord className='fa-2x fa-fw' color='darkpurple' />}
                {key === "github" && <FaGithub className='fa-2x fa-fw' color='black' />}
                {key === "soundcloud" && <FaSoundcloud className='fa-2x fa-fw' color='orange' />}
              </a>
            ))}
          </div>
          <p>Follow Me!</p>
          {/* {isEditing && (
            <div className="pCard_edit_inputs">
              {Object.keys(profile.socialLinks).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  value={profile.socialLinks[key as keyof SocialLinks]}
                  onChange={handleSocialChange}
                  placeholder={`Enter ${key} link`}
                />
              ))}
            </div>
          )} */}
          
        </div>

      </div>
    </div>
  );
}
