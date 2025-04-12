import React from 'react';
import Post from './Post';
import styles from './Feed.module.css';
import '../styles/transitions.css';

const Feed = ({ posts, isSearching }) => {
  const noPostsMessage = isSearching 
    ? "No results found. Try different keywords." 
    : "No posts yet. Be the first to post!";

  return (
    <div className={`${styles.feedContainer} feed-animate`}>
      <h2 className={styles.feedTitle}>Feed</h2>
      
      <div className={styles.postList}>
        {posts.map((post, index) => (
          <div key={post.id} className="feed-item">
            <Post post={post} />
          </div>
        ))}
        {posts.length === 0 && (
          <div className={`${styles.noResults} feed-item`}>
            {noPostsMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed; 