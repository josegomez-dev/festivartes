import { useState } from "react";
import styles from '@/app/assets/styles/AdminIndex.module.css';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import SidebarMenu from '@/components/Sidebar-menu';
import SubMenu from '@/components/SubMenu';

export default function Settings() {
  const { role, authenticated } = useGlobalContext();
  const [activeTab, setActiveTab] = useState("general");
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState(true);

  if (!authenticated) {
    return <UnauthorizedMessage />;
  }

  return (
    <div className={styles['sidebar-menu-view']}>
      <SidebarMenu />
      <div className={styles['main-content']}>
        <br />
        <br />
        <br />
        <SubMenu />
        <div className={styles.grid}>
          <h3>Settings</h3>
          <div className={styles['settings-container']}>
            <div className={styles['settings-sidebar']}>
              <button 
                className={`${styles['tab-button']} ${activeTab === "general" ? styles['active'] : ''}`}
                onClick={() => setActiveTab("general")}
              >General</button>
              <button 
                className={`${styles['tab-button']} ${activeTab === "notifications" ? styles['active'] : ''}`}
                onClick={() => setActiveTab("notifications")}
              >Notifications</button>
            </div>
            <div className={styles['settings-content']}>
              {activeTab === "general" && (
                <div>
                  <h4>General Settings</h4>
                  <div className={styles['setting-item']}>
                    <label>Theme&nbsp;</label>
                    <button 
                      className={darkMode ? styles['dark-mode'] : styles['light-mode']}
                      onClick={() => setDarkMode(!darkMode)}
                    >
                      {darkMode ? "🌙 " : "☀️"}
                    </button>
                  </div>
                </div>
              )}
              {activeTab === "notifications" && (
                <div>
                  <h4>Notification Settings</h4>
                  <label className={styles['setting-item']}>
                    <input 
                      type="checkbox" 
                      checked={notifications} 
                      onChange={() => setNotifications(!notifications)}
                    />
                    Enable Notifications
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}