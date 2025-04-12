import React, { useState, useEffect } from 'react';
import styles from './CreatePost.module.css';

const CreatePost = ({ onNewPost }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Check if form is valid whenever title or body changes
    useEffect(() => {
        setIsButtonDisabled(!title.trim() || !body.trim());
    }, [title, body]);

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
            };

            onNewPost(newPost);
            
            // Show success feedback
            setShowSuccess(true);
            
            // Reset form
            setTitle('');
            setBody('');
            setIsSubmitting(false);
            
            // Hide success message after a delay
            setTimeout(() => {
                setShowSuccess(false);
            }, 2000);
        }, 500);
    };

    return (
        <div className={`${styles.createPostContainer} ${isSubmitting ? styles.submitting : ''} ${showSuccess ? styles.success : ''}`}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.createPostInput}
                    maxLength={300} // Example limit
                    disabled={isSubmitting}
                />
                <textarea
                    placeholder="What's on your mind?"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className={styles.createPostInput}
                    rows={4} // Start with a few rows
                    disabled={isSubmitting}
                />
                <div className={styles.buttonContainer}>
                    {showSuccess && (
                        <span className={styles.successMessage}>Post created successfully!</span>
                    )}
                    <button
                        type="submit"
                        className={`${styles.createPostButton} ${isButtonDisabled ? styles.disabled : ''} ${isSubmitting ? styles.submitting : ''}`}
                        disabled={isButtonDisabled || isSubmitting}
                    >
                        {isSubmitting ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePost; 