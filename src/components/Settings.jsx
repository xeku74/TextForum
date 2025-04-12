import React, { useState } from 'react';
import styles from './Settings.module.css';

const Settings = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('account');
  
  if (!isOpen) return null;
  
  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountTab />;
      case 'profile':
        return <ProfileTab />;
      case 'privacy':
        return <PrivacyTab />;
      case 'preferences':
        return <PreferencesTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'email':
        return <EmailTab />;
      default:
        return <AccountTab />;
    }
  };
  
  return (
    <div className={styles.settingsOverlay}>
      <div className={styles.settingsContainer}>
        <div className={styles.settingsHeader}>
          <h2 className={styles.settingsTitle}>Settings</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>
        
        <div className={styles.settingsContent}>
          <div className={styles.settingsTabs}>
            <button
              className={`${styles.tabButton} ${activeTab === 'account' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('account')}
            >
              Account
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'profile' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'privacy' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('privacy')}
            >
              Privacy
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'preferences' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              Preferences
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'notifications' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'email' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('email')}
            >
              Email
            </button>
          </div>
          
          <div className={styles.settingsTabContent}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const AccountTab = () => {
  return (
    <div>
      <h3 className={styles.sectionTitle}>General</h3>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Email address</div>
        <div className={styles.settingValue}>
          <span>yourusername@example.com</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Phone Number</div>
        <div className={styles.settingValue}>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Password</div>
        <div className={styles.settingValue}>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Gender</div>
        <div className={styles.settingValue}>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Location customization</div>
        <div className={styles.settingValue}>
          <span>Use approximate location (based on IP)</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <h3 className={styles.sectionTitle}>Account authorization</h3>
      
      <div className={styles.settingItem}>
        <div className={styles.authItem}>
          <div className={styles.authIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"></path>
              <path d="M16 19h6"></path>
              <path d="M19 16v6"></path>
            </svg>
          </div>
          <div className={styles.authInfo}>
            <div className={styles.authTitle}>Google</div>
            <div className={styles.authSubtitle}>Connect to log in to TextForum with your Google account</div>
          </div>
          <button className={styles.disconnectButton}>Disconnect</button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.authItem}>
          <div className={styles.authIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06z"></path>
              <path d="M10 2c1 .5 2 2 2 5"></path>
            </svg>
          </div>
          <div className={styles.authInfo}>
            <div className={styles.authTitle}>Apple</div>
            <div className={styles.authSubtitle}>Connect to log in to TextForum with your Apple account</div>
          </div>
          <button className={styles.connectButton}>Connect</button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.authItem}>
          <div className={styles.authIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12" y2="18"></line>
            </svg>
          </div>
          <div className={styles.authInfo}>
            <div className={styles.authTitle}>Two-factor authentication</div>
            <div className={styles.authSubtitle}>
              Lost access to your authenticator app? 
              <a href="#" className={styles.authLink}>Access your backup codes</a>
            </div>
          </div>
          <button className={styles.enableButton}>Enable</button>
        </div>
      </div>
    </div>
  );
};

const ProfileTab = () => {
  return (
    <div className={styles.tabSection}>
      <h3 className={styles.sectionTitle}>Profile Information</h3>
      <p className={styles.sectionDescription}>
        Manage your profile information and visibility
      </p>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Display name</div>
        <div className={styles.settingValue}>
          <span>YourUsername</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>About me</div>
        <div className={styles.settingValue}>
          <span>No bio added yet</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Profile picture</div>
        <div className={styles.settingValue}>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Banner image</div>
        <div className={styles.settingValue}>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Social links</div>
        <div className={styles.settingValue}>
          <span>No links added</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <h3 className={styles.sectionTitle}>Profile Preferences</h3>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Content visibility</div>
        <div className={styles.settingValue}>
          <span>Public</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.authItem}>
          <div className={styles.authIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="7" r="4" />
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            </svg>
          </div>
          <div className={styles.authInfo}>
            <div className={styles.authTitle}>Profile visibility</div>
            <div className={styles.authSubtitle}>Choose who can see your profile and activity</div>
          </div>
          <button className={styles.connectButton}>Manage</button>
        </div>
      </div>
    </div>
  );
};

const PrivacyTab = () => {
  return (
    <div className={styles.tabSection}>
      <h3 className={styles.sectionTitle}>Privacy Settings</h3>
      <p className={styles.sectionDescription}>
        Control your privacy and what data is shared
      </p>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Online status</div>
        <div className={styles.settingValue}>
          <span>Show when active</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Allow direct messages</div>
        <div className={styles.settingValue}>
          <span>From everyone</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Content visibility</div>
        <div className={styles.settingValue}>
          <span>Everyone</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <h3 className={styles.sectionTitle}>Blocked Users</h3>
      
      <div className={styles.settingItem}>
        <div className={styles.authItem}>
          <div className={styles.authIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
          </div>
          <div className={styles.authInfo}>
            <div className={styles.authTitle}>Blocked users</div>
            <div className={styles.authSubtitle}>You haven't blocked any users</div>
          </div>
          <button className={styles.disconnectButton}>Manage</button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.authItem}>
          <div className={styles.authIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className={styles.authInfo}>
            <div className={styles.authTitle}>Muted users</div>
            <div className={styles.authSubtitle}>You haven't muted any users yet</div>
          </div>
          <button className={styles.connectButton}>Manage</button>
        </div>
      </div>
    </div>
  );
};

const PreferencesTab = () => {
  return (
    <div className={styles.tabSection}>
      <h3 className={styles.sectionTitle}>Preferences</h3>
      <p className={styles.sectionDescription}>
        Customize how TextForum looks and functions for you
      </p>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Theme</div>
        <div className={styles.settingValue}>
          <span>System default</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Default feed sort</div>
        <div className={styles.settingValue}>
          <span>Hot</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Content view</div>
        <div className={styles.settingValue}>
          <span>Card view</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Autoplay media</div>
        <div className={styles.settingValue}>
          <span>On WiFi only</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Language</div>
        <div className={styles.settingValue}>
          <span>English (US)</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <h3 className={styles.sectionTitle}>Advanced Settings</h3>
      
      <div className={styles.settingItem}>
        <div className={styles.authItem}>
          <div className={styles.authIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          </div>
          <div className={styles.authInfo}>
            <div className={styles.authTitle}>Layout settings</div>
            <div className={styles.authSubtitle}>Customize the appearance of posts and comments</div>
          </div>
          <button className={styles.connectButton}>Customize</button>
        </div>
      </div>
    </div>
  );
};

const NotificationsTab = () => {
  return (
    <div className={styles.tabSection}>
      <h3 className={styles.sectionTitle}>Notification Settings</h3>
      <p className={styles.sectionDescription}>
        Manage how and when TextForum notifies you
      </p>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Push notifications</div>
        <div className={styles.settingValue}>
          <span>Enabled</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Comments on your posts</div>
        <div className={styles.settingValue}>
          <span>Enabled</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Upvotes on your content</div>
        <div className={styles.settingValue}>
          <span>Enabled</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Replies to your comments</div>
        <div className={styles.settingValue}>
          <span>Enabled</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Direct messages</div>
        <div className={styles.settingValue}>
          <span>Enabled</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <h3 className={styles.sectionTitle}>Community Notifications</h3>
      
      <div className={styles.settingItem}>
        <div className={styles.authItem}>
          <div className={styles.authIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </div>
          <div className={styles.authInfo}>
            <div className={styles.authTitle}>Trending posts</div>
            <div className={styles.authSubtitle}>Get notified about popular posts in your communities</div>
          </div>
          <button className={styles.disconnectButton}>Disable</button>
        </div>
      </div>
    </div>
  );
};

const EmailTab = () => {
  return (
    <div className={styles.tabSection}>
      <h3 className={styles.sectionTitle}>Email Preferences</h3>
      <p className={styles.sectionDescription}>
        Control what emails you receive from TextForum
      </p>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Marketing emails</div>
        <div className={styles.settingValue}>
          <span>Disabled</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Weekly digest</div>
        <div className={styles.settingValue}>
          <span>Enabled</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Activity notifications</div>
        <div className={styles.settingValue}>
          <span>Enabled</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Direct message notifications</div>
        <div className={styles.settingValue}>
          <span>Enabled</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>Community updates</div>
        <div className={styles.settingValue}>
          <span>Disabled</span>
          <button className={styles.settingAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <h3 className={styles.sectionTitle}>Email Address</h3>
      
      <div className={styles.settingItem}>
        <div className={styles.authItem}>
          <div className={styles.authIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <div className={styles.authInfo}>
            <div className={styles.authTitle}>Email verification</div>
            <div className={styles.authSubtitle}>Your email address has been verified</div>
          </div>
          <button className={styles.disconnectButton}>Change</button>
        </div>
      </div>
    </div>
  );
};

export default Settings; 