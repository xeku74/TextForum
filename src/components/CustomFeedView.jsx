import React, { useState, useEffect } from 'react';
import styles from './CustomFeedView.module.css';
import Post from './Post';

const CustomFeedView = ({ feed }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading posts for the selected feed
    setIsLoading(true);
    
    // Mock API call with timeout to simulate loading
    const fetchPosts = () => {
      setTimeout(() => {
        // Generate random mock posts for this feed
        const mockPosts = generateMockPosts(feed.id, 5);
        setPosts(mockPosts);
        setIsLoading(false);
      }, 800);
    };
    
    fetchPosts();
    
    return () => {
      // Clean up any resources if needed
    };
  }, [feed.id]);
  
  // Function to generate mock posts for a feed
  const generateMockPosts = (feedId, count) => {
    const mockPosts = [];
    const topics = {
      'tech': ['New AI breakthrough', 'WWDC 2023 Recap', 'The Future of Blockchain', 'Web Development Trends'],
      'pets': ['Cutest Dog Breeds', 'Cat Care Tips', 'Exotic Pet Guide', 'Pet Adoption Stories'],
      'gaming': ['Latest Console Review', 'Upcoming Game Releases', 'E-sports Tournament Results', 'Game Dev Stories'],
      'coding': ['JavaScript Framework Comparison', 'Coding Best Practices', 'Open Source Contributions', 'ML Algorithms'],
      'travel': ['Hidden Gems in Europe', 'Budget Travel Tips', 'Travel Photography', 'Adventure Destinations'],
      'news': ['Breaking News', 'Global Affairs', 'Policy Changes', 'Economic Updates'],
      'music': ['Album Reviews', 'Concert Experiences', 'Artist Interviews', 'Music Theory']
    };
    
    const feedTopics = topics[feedId] || ['General Discussion', 'Random Topics', 'Community Chat', 'Announcements'];
    
    for (let i = 0; i < count; i++) {
      const randomTopic = feedTopics[Math.floor(Math.random() * feedTopics.length)];
      mockPosts.push({
        id: `${feedId}-post-${i+1}`,
        title: `${randomTopic} #${Math.floor(Math.random() * 100) + 1}`,
        author: `user_${Math.floor(Math.random() * 1000)}`,
        content: 'This is a simulated post for the custom feed. It contains mock content that would normally be fetched from a backend API.',
        upvotes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 50),
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        tags: [feedId, randomTopic.toLowerCase().replace(/\s+/g, '-')],
        image: Math.random() > 0.6 ? `https://source.unsplash.com/random/800x600?${feedId},${randomTopic.split(' ')[0]}` : null
      });
    }
    
    return mockPosts;
  };
  
  return (
    <div className={styles.customFeedContainer}>
      <div className={styles.feedHeader}>
        <h1 className={styles.feedTitle}>{feed.label}</h1>
        {feed.description && <p className={styles.feedDescription}>{feed.description}</p>}
        {feed.isPrivate && (
          <div className={styles.privateBadge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Private Feed
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading posts...</p>
        </div>
      ) : (
        <div className={styles.postsContainer}>
          {posts.length > 0 ? (
            posts.map(post => (
              <Post key={post.id} post={post} />
            ))
          ) : (
            <div className={styles.emptyState}>
              <h3>No posts yet</h3>
              <p>Be the first to post in this feed!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomFeedView; 