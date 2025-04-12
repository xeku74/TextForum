import React, { useState, useEffect } from 'react';
import styles from './CreatePostModal.module.css';

const CreatePostModal = ({ isOpen, onClose, onNewPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(!title.trim() || !body.trim());
  }, [title, body]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setBody('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isButtonDisabled) return;

    // Show submitting state
    setIsSubmitting(true);

    // Simulate a small delay for the animation
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        author: 'currentUser', // Placeholder
        timestamp: 'Just now',
        title: title,
        body: body,
        upvotes: 0,
        comments: 0,
        commentData: []
      };

      onNewPost(newPost);
      
      // Reset form and close modal
      setTitle('');
      setBody('');
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOutsideClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Create Post</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.modalBody}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.inputField}
                maxLength={300}
                disabled={isSubmitting}
              />
            </div>
            <div className={styles.formGroup}>
              <textarea
                placeholder="What's on your mind?"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className={styles.textareaField}
                rows={6}
                disabled={isSubmitting}
              />
            </div>
            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.postButton}
                disabled={isButtonDisabled || isSubmitting}
              >
                {isSubmitting && <span className={styles.loadingSpinner}></span>}
                {isSubmitting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal; 