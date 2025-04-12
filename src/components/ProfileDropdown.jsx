import React, { useState } from 'react';
import styles from './ProfileDropdown.module.css';
import UserProfile from './UserProfile';

const ProfileDropdown = ({ onClose, onViewProfile, onSettings }) => {
  const [showUserProfile, setShowUserProfile] = useState(false);
  
  const handleViewProfile = () => {
    if (onViewProfile) {
      // If parent provides a handler, use it
      onViewProfile();
      onClose();
    } else {
      // Otherwise handle internally
      setShowUserProfile(true);
      onClose();
    }
  };

  const handleOpenSettings = () => {
    if (onSettings) {
      onSettings();
      onClose();
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.dropdown}>
        <div className={styles.arrowUp}></div>
        <div className={styles.topLabel}>Open profile menu</div>
        
        <div className={styles.menuSection}>
          <div className={styles.menuItem} onClick={handleViewProfile}>
            <div className={styles.menuIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 21V19C4 17.9391 4.42143 16.9217 5.17157 16.1716C5.92172 15.4214 6.93913 15 8 15H16C17.0609 15 18.0783 15.4214 18.8284 16.1716C19.5786 16.9217 20 17.9391 20 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.menuContent}>
              <div className={styles.menuTitle}>View Profile</div>
              <div className={styles.menuSubtitle}>u/YourUsername</div>
            </div>
          </div>
        </div>

        <div className={styles.menuDivider}></div>

        <div className={styles.menuSection}>
          <div className={styles.menuItem}>
            <div className={styles.menuIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 9.00001V7.20001C21 5.20001 20 4.00001 17.2 4.00001H6.8C4 4.00001 3 5.20001 3 7.20001V18.4C3 20.4 4 21.6 6.8 21.6H17.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 8.00001H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 18.5V14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 15.5L16 18.5L13 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.menuTitle}>Log Out</div>
          </div>
        </div>

        <div className={styles.menuDivider}></div>

        <div className={styles.menuSection}>
          <div className={styles.menuItem}>
            <div className={styles.menuIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 11H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 15H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.menuTitle}>Advertise on TextForum</div>
          </div>

          <div className={styles.menuItem}>
            <div className={styles.menuIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.8 21H10.2C9.53726 21 9 20.4627 9 19.8V18.6H10.8V19.8H13.2V18.6L17.4 15L13.2 11.4V12.6H10.8V11.4L6.6 15L10.8 18.6V19.8H9V18.6C9.0002 18.4418 8.96788 18.2856 8.90497 18.1414C8.84205 17.9971 8.75012 17.8681 8.6334 17.7618L4.4334 14.1618C4.3088 14.0482 4.20983 13.9096 4.14299 13.7553C4.07615 13.601 4.04309 13.4343 4.04627 13.2666C4.04944 13.0989 4.08878 12.9337 4.16154 12.7823C4.2343 12.6309 4.33843 12.4964 4.4676 12.3882L8.6676 8.7882C8.78432 8.68195 8.93094 8.60007 9.0943 8.55016C9.25767 8.50026 9.43047 8.48358 9.6 8.5V3C9.6 2.33726 10.1373 1.8 10.8 1.8H13.2C13.8627 1.8 14.4 2.33726 14.4 3V8.5C14.5695 8.48358 14.7423 8.50026 14.9057 8.55016C15.0691 8.60007 15.2157 8.68195 15.3324 8.7882L19.5324 12.3882C19.6616 12.4964 19.7657 12.6309 19.8385 12.7823C19.9112 12.9337 19.9506 13.0989 19.9537 13.2666C19.9569 13.4343 19.9239 13.601 19.857 13.7553C19.7902 13.9096 19.6912 14.0482 19.5666 14.1618L15.3666 17.7618C15.2499 17.8681 15.158 17.9971 15.095 18.1414C15.0321 18.2856 14.9998 18.4418 15 18.6V19.8C15 20.4627 14.4627 21 13.8 21ZM10.8 10.2H13.2C13.8627 10.2 14.4 10.7373 14.4 11.4V13.896L16.8 15L14.4 16.104V16.8C14.4 17.4627 13.8627 18 13.2 18H10.8C10.1373 18 9.6 17.4627 9.6 16.8V16.104L7.2 15L9.6 13.896V11.4C9.6 10.7373 10.1373 10.2 10.8 10.2ZM13.2 3H10.8V7.8H13.2V3Z" fill="currentColor"/>
              </svg>
            </div>
            <div className={styles.menuContent}>
              <div className={styles.menuTitle}>Try TextForum Pro</div>
              <div className={styles.betaTag}>BETA</div>
            </div>
          </div>
        </div>

        <div className={styles.menuDivider}></div>

        <div className={styles.menuSection}>
          <div className={styles.menuItem} onClick={handleOpenSettings}>
            <div className={styles.menuIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.menuTitle}>Settings</div>
          </div>
        </div>

        <div className={styles.menuDivider}></div>

        <div className={styles.menuSection}>
          <div className={styles.menuItem}>
            <div className={styles.menuIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.menuTitle}>Premium</div>
          </div>
        </div>
      </div>
      
      {!onViewProfile && showUserProfile && 
        <UserProfile 
          isOpen={showUserProfile} 
          onClose={() => setShowUserProfile(false)} 
          username="YourUsername"
        />
      }
    </>
  );
};

export default ProfileDropdown; 