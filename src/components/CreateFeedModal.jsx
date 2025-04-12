import React, { useState, useEffect, useRef } from 'react';
import styles from './CreateFeedModal.module.css';

const CreateFeedModal = ({ isOpen, onClose, onCreateFeed }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [showOnProfile, setShowOnProfile] = useState(true);
  
  // Character limits
  const MAX_NAME_LENGTH = 50;
  const MAX_DESCRIPTION_LENGTH = 500;
  
  const modalRef = useRef(null);
  const nameInputRef = useRef(null);
  
  // Focus on name input when modal opens
  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      setTimeout(() => {
        nameInputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);
  
  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Key press handler (close on Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim()) {
      return;
    }
    
    // Create new feed object
    const newFeed = {
      id: `feed_${Date.now()}`, // Generate a unique ID
      name: name.trim(),
      description: description.trim(),
      isPrivate,
      showOnProfile,
      createdAt: new Date().toISOString(),
    };
    
    // Pass to parent component
    onCreateFeed(newFeed);
    
    // Reset form and close modal
    resetForm();
    onClose();
  };
  
  const resetForm = () => {
    setName('');
    setDescription('');
    setIsPrivate(false);
    setShowOnProfile(true);
  };
  
  // Don't render anything if modal is not open
  if (!isOpen) return null;
  
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Create custom feed</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Name
                <span className={styles.required}>*</span>
              </label>
              <input
                ref={nameInputRef}
                type="text"
                className={styles.inputField}
                placeholder="Enter feed name"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, MAX_NAME_LENGTH))}
                required
              />
              <div className={styles.charCount}>{name.length}/{MAX_NAME_LENGTH}</div>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Description</label>
              <textarea
                className={styles.textareaField}
                placeholder="Add an optional description"
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH))}
              />
              <div className={styles.charCount}>{description.length}/{MAX_DESCRIPTION_LENGTH}</div>
            </div>
            
            <div className={styles.toggleContainer}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Make private</div>
                <div className={styles.toggleDescription}>Only viewable by you</div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={() => setIsPrivate(!isPrivate)}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
            
            <div className={styles.toggleContainer}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Show on profile</div>
                <div className={styles.toggleDescription}>Display this feed on your profile so others can find it</div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={showOnProfile}
                  onChange={() => setShowOnProfile(!showOnProfile)}
                  disabled={isPrivate} // Can't show on profile if it's private
                />
                <span className={styles.slider}></span>
              </label>
            </div>
            
            <div className={styles.actions}>
              <button 
                type="button" 
                className={styles.cancelButton}
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={!name.trim()}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFeedModal; 