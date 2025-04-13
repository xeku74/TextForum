import React from 'react';
import styles from './MobileNavBar.module.css';

const MobileNavBar = ({ activeTab, onTabChange, onCreatePost }) => {
  return (
    <div className={styles.mobileNavBar}>
      <button 
        className={`${styles.navButton} ${activeTab === 'feed' ? styles.active : ''}`}
        onClick={() => onTabChange('feed')}
      >
        <div className={styles.iconWrapper}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <span>Home</span>
      </button>
      
      <button 
        className={styles.createButton}
        onClick={onCreatePost}
      >
        <div className={styles.createIconWrapper}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
        <span>Create</span>
      </button>
      
      <button 
        className={`${styles.navButton} ${activeTab === 'explore' ? styles.active : ''}`}
        onClick={() => onTabChange('explore')}
      >
        <div className={styles.iconWrapper}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
          </svg>
        </div>
        <span>Explore</span>
      </button>
    </div>
  );
};

export default MobileNavBar; 