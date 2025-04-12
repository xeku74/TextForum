import React, { useState } from 'react';
import styles from './Comment.module.css';

const Comment = ({ comment }) => {
  const [upvotes, setUpvotes] = useState(comment.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  
  const handleUpvote = (e) => {
    e.stopPropagation();
    
    if (hasUpvoted) {
      setUpvotes(upvotes - 1);
      setHasUpvoted(false);
    } else {
      if (hasDownvoted) {
        setUpvotes(upvotes + 2);
        setHasDownvoted(false);
      } else {
        setUpvotes(upvotes + 1);
      }
      setHasUpvoted(true);
    }
  };

  const handleDownvote = (e) => {
    e.stopPropagation();
    
    if (hasDownvoted) {
      setUpvotes(upvotes + 1);
      setHasDownvoted(false);
    } else {
      if (hasUpvoted) {
        setUpvotes(upvotes - 2);
        setHasUpvoted(false);
      } else {
        setUpvotes(upvotes - 1);
      }
      setHasDownvoted(true);
    }
  };

  const handleReply = (e) => {
    e.stopPropagation();
    alert(`Reply to ${comment.author}'s comment`);
  };

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        <span className={styles.commentAuthor}>u/{comment.author}</span>
        <span className={styles.commentTime}>{comment.timestamp}</span>
      </div>
      
      <div className={styles.commentContent}>
        {comment.text}
      </div>
      
      <div className={styles.commentActions}>
        <div className={styles.voteContainer}>
          <button 
            className={`${styles.voteButton} ${hasUpvoted ? styles.upvoted : ''}`}
            onClick={handleUpvote}
            aria-label="Upvote"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8l-9 9h18l-9-9z" fill="currentColor" />
            </svg>
          </button>
          
          <span className={`${styles.voteCount} ${hasUpvoted ? styles.upvoted : ''} ${hasDownvoted ? styles.downvoted : ''}`}>
            {upvotes}
          </span>
          
          <button 
            className={`${styles.voteButton} ${hasDownvoted ? styles.downvoted : ''}`}
            onClick={handleDownvote}
            aria-label="Downvote"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16l9-9H3l9 9z" fill="currentColor" />
            </svg>
          </button>
        </div>
        
        <button 
          className={styles.replyButton}
          onClick={handleReply}
        >
          Reply
        </button>
      </div>
      
      {comment.replies && comment.replies.length > 0 && (
        <div className={styles.replies}>
          {comment.replies.map(reply => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment; 