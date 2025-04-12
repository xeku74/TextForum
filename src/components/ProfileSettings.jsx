import React, { useState } from 'react';
import AvatarEditorModal from './AvatarEditorModal';
import styles from './ProfileSettings.module.css';

const ProfileSettings = ({ user, onUpdateProfile }) => {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [bio, setBio] = useState(user?.bio || '');

  const handleSaveAvatar = (avatarUrl) => {
    setAvatar(avatarUrl);
    // You would typically update this in your backend as well
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedProfile = {
      ...user,
      avatar,
      displayName,
      bio
    };
    
    onUpdateProfile(updatedProfile);
  };

  return (
    <div className={styles.profileSettingsContainer}>
      <h2 className={styles.settingsTitle}>Profile Settings</h2>
      
      <form onSubmit={handleSubmit} className={styles.settingsForm}>
        <div className={styles.avatarSection}>
          <div className={styles.avatarContainer}>
            {avatar ? (
              <img 
                src={avatar} 
                alt="User avatar" 
                className={styles.avatarImage} 
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {displayName.charAt(0) || user?.email?.charAt(0) || '?'}
              </div>
            )}
          </div>
          
          <button 
            type="button" 
            className={styles.changeAvatarButton}
            onClick={() => setIsAvatarModalOpen(true)}
          >
            Change Avatar
          </button>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="displayName" className={styles.formLabel}>Display Name</label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className={styles.formInput}
            placeholder="How you want to be known"
            maxLength={50}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="bio" className={styles.formLabel}>Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={styles.formTextarea}
            placeholder="Tell us a bit about yourself"
            rows={4}
            maxLength={300}
          />
          <div className={styles.charCount}>
            {bio.length}/300
          </div>
        </div>
        
        <div className={styles.formButtons}>
          <button type="submit" className={styles.saveButton}>
            Save Changes
          </button>
        </div>
      </form>
      
      <AvatarEditorModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onSave={handleSaveAvatar}
        currentAvatar={avatar}
      />
    </div>
  );
};

export default ProfileSettings; 