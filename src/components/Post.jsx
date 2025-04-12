import React, { useState } from 'react';
import Comment from './Comment';
import styles from './Post.module.css';

const Post = ({ post }) => {
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(post.commentData ? post.commentData.length : post.comments);
  const [comments, setComments] = useState(post.commentData || []);
  const [newCommentText, setNewCommentText] = useState('');

  const handleUpvote = (e) => {
    e.stopPropagation(); // Prevent triggering any parent click handlers
    
    if (hasUpvoted) {
      // If already upvoted, remove upvote
      setUpvotes(upvotes - 1);
      setHasUpvoted(false);
    } else {
      // If downvoted, remove downvote first
      if (hasDownvoted) {
        setUpvotes(upvotes + 2); // +2 because we're removing a downvote (+1) and adding an upvote (+1)
        setHasDownvoted(false);
      } else {
        setUpvotes(upvotes + 1);
      }
      setHasUpvoted(true);
    }
  };

  const handleDownvote = (e) => {
    e.stopPropagation(); // Prevent triggering any parent click handlers
    
    if (hasDownvoted) {
      // If already downvoted, remove downvote
      setUpvotes(upvotes + 1);
      setHasDownvoted(false);
    } else {
      // If upvoted, remove upvote first
      if (hasUpvoted) {
        setUpvotes(upvotes - 2); // -2 because we're removing an upvote (-1) and adding a downvote (-1)
        setHasUpvoted(false);
      } else {
        setUpvotes(upvotes - 1);
      }
      setHasDownvoted(true);
    }
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    setShowComments(!showComments);
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    // In a real app, this would open share options
    alert(`Share post: ${post.title}`);
  };

  const handleAwardClick = (e) => {
    e.stopPropagation();
    // In a real app, this would open award options
    alert(`Award post: ${post.title}`);
  };

  const handlePostClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCommentSubmit = () => {
    if (!newCommentText.trim()) return;
    
    // Create a new comment
    const newComment = {
      id: Date.now(), // Use timestamp as a simple unique ID
      author: 'you', // In a real app, this would be the current user
      text: newCommentText,
      timestamp: 'just now',
      upvotes: 0
    };
    
    // Add comment to the list
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    
    // Update the count
    setCommentCount(updatedComments.length);
    
    // Clear the input
    setNewCommentText('');
  };

  return (
    <div 
      className={`${styles.postContainer} ${isExpanded ? styles.expanded : ''} ${showComments ? styles.showingComments : ''}`}
    >
      <div 
        className={styles.postContent}
        onClick={handlePostClick}
      >
        <div className={styles.postHeader}>
          Posted by u/{post.author} · {post.timestamp}
        </div>
        <h3 className={styles.postTitle}>{post.title}</h3>
        <div className={styles.postBody}>{post.body}</div>
        <div className={styles.postActions}>
          <div className={styles.voteContainer}>
            <button 
              className={`${styles.actionButton} ${styles.upvoteButton} ${hasUpvoted ? styles.upvoted : ''}`}
              onClick={handleUpvote}
              aria-label="Upvote"
            >
              <svg className={styles.voteArrow} viewBox="0 0 20 20" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3L17 14H3L10 3Z" fill="currentColor" />
              </svg>
            </button>
            <span className={`${styles.voteCount} ${hasUpvoted ? styles.upvoted : ''} ${hasDownvoted ? styles.downvoted : ''}`}>
              {upvotes}
            </span>
            <button 
              className={`${styles.actionButton} ${styles.downvoteButton} ${hasDownvoted ? styles.downvoted : ''}`}
              onClick={handleDownvote}
              aria-label="Downvote"
            >
              <svg className={styles.voteArrow} viewBox="0 0 20 20" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 17L17 6H3L10 17Z" fill="currentColor" />
              </svg>
            </button>
          </div>
          <button 
            className={`${styles.actionButton} ${showComments ? styles.active : ''}`}
            onClick={handleCommentClick}
            aria-label="Comments"
          >
            <svg className={styles.actionIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 11.5C21 16.1944 16.9706 20 12 20C10.9581 20 9.94481 19.8705 8.99212 19.6258C8.77977 19.5801 8.49053 19.5915 8.14211 19.6258C7.61147 19.6752 7.24482 19.6752 7.00656 19.6752C6.74482 19.6752 6.5 19.7419 6.19553 19.8752C4.85553 20.4252 3.5 19.8752 3 19.3752C2.5 18.8752 1.97947 17.9252 3.06947 16.2919C3.53411 15.5585 3.53411 15.0252 3.53411 14.8752C3.53411 14.5585 3.13482 13.7085 3.02149 13.4085C3.00739 13.3733 3 13.3342 3 13.3C3 13.2361 3.02149 13.1751 3.06241 13.1333C3.08085 13.1149 3.10157 13.1001 3.125 13.0885C3.12272 13.0819 3.12079 13.0753 3.11917 13.0687C3.04004 12.8944 3 12.7055 3 12.5C3 7.80558 7.02944 4 12 4C16.9706 4 21 7.80558 21 11.5Z" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className={styles.actionLabel}>{commentCount}</span>
          </button>
          <button 
            className={styles.actionButton}
            onClick={handleAwardClick}
            aria-label="Award"
          >
            <svg className={styles.actionIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" />
              <path d="M12 15V22" stroke="currentColor" strokeWidth="2" />
              <path d="M15 18H9" stroke="currentColor" strokeWidth="2" />
              <path d="M15 22H9" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className={styles.actionLabel}>Award</span>
          </button>
          <button 
            className={styles.actionButton}
            onClick={handleShareClick}
            aria-label="Share"
          >
            <svg className={styles.actionIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49M21 5C21 6.65685 19.6569 8 18 8C16.3431 8 15 6.65685 15 5C15 3.34315 16.3431 2 18 2C19.6569 2 21 3.34315 21 5ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 19C21 20.6569 19.6569 22 18 22C16.3431 22 15 20.6569 15 19C15 17.3431 16.3431 16 18 16C19.6569 16 21 17.3431 21 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={styles.actionLabel}>Share</span>
          </button>
        </div>
      </div>
      
      {showComments && (
        <div className={styles.commentsSection}>
          <div className={styles.commentsList}>
            {comments.length > 0 ? (
              comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
              ))
            ) : (
              <div className={styles.noComments}>No comments yet. Be the first to comment!</div>
            )}
          </div>
          <div className={styles.addCommentContainer}>
            <textarea 
              className={styles.addCommentInput}
              placeholder="Add a comment..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
            />
            <button 
              className={styles.addCommentButton}
              onClick={handleCommentSubmit}
              disabled={!newCommentText.trim()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.0002 11.5C21.0002 16.1944 16.9708 20 12.0002 20C10.9583 20 9.9449 19.8705 8.99221 19.6258" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 4C7.02944 4 3 7.80558 3 12.5C3 12.7055 3.00999 12.8944 3.02911 13.0687C3.33209 12.3935 3.74952 11.7654 4.33077 11.1587C4.86276 10.6037 5.55003 10.0867 6.25583 10.059C6.76168 10.0398 7.2473 10.256 7.56472 10.7365L8.12328 11.5995C8.3728 11.9871 8.7875 12.2264 9.24693 12.2264H11.3531C11.7087 12.2264 12.0002 11.9349 12.0002 11.5793C12.0002 11.2238 11.7087 10.9323 11.3531 10.9323H10.2782C9.92269 10.9323 9.63118 10.6408 9.63118 10.2853V9.44072C9.63118 9.08519 9.92269 8.79369 10.2782 8.79369H14.5223C14.8778 8.79369 15.1693 8.50219 15.1693 8.14666C15.1693 7.79113 14.8778 7.49963 14.5223 7.49963H12.6474C12.2918 7.49963 12.0003 7.20812 12.0003 6.85259C12.0003 6.49707 12.2918 6.20556 12.6474 6.20556H15.7046C16.1687 6.20556 16.6004 6.40147 16.9227 6.72379L17.7991 7.60018C19.3793 9.18039 20.2891 11.3564 20.3002 13.6395C20.3016 13.7901 20.2998 13.9399 20.2947 14.0889" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>Comment</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post; 