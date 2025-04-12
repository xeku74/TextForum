import React, { useState, useEffect } from 'react';
import styles from './CommunityView.module.css';
import Post from './Post';

const CommunityView = ({ community }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [communityInfo, setCommunityInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    // Simulate loading community info and posts
    setIsLoading(true);
    
    // Mock API call with timeout to simulate loading
    const fetchCommunityData = () => {
      setTimeout(() => {
        // Generate random mock community info
        const mockCommunityInfo = {
          id: community.id,
          name: community.label,
          description: `Welcome to ${community.label}! This is a community for people interested in ${getCommunityTopic(community.id)}.`,
          members: Math.floor(Math.random() * 100000) + 1000,
          online: Math.floor(Math.random() * 1000) + 100,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 100000000000)).toISOString(),
          rules: [
            'Be respectful and kind to others',
            'No spam or self-promotion',
            'Stay on topic',
            'Follow platform-wide rules'
          ],
          moderators: [
            'mod_leader',
            'community_builder',
            'rules_enforcer'
          ]
        };
        
        // Generate random mock posts for this community
        const mockPosts = generateMockPosts(community.id, 5);
        
        setCommunityInfo(mockCommunityInfo);
        setPosts(mockPosts);
        setIsLoading(false);
      }, 800);
    };
    
    fetchCommunityData();
    
    return () => {
      // Clean up any resources if needed
    };
  }, [community.id]);
  
  // Function to determine the community topic based on ID
  const getCommunityTopic = (communityId) => {
    const topics = {
      'news': 'current events and breaking news',
      'music': 'music of all genres and music discussion'
    };
    return topics[communityId] || 'various topics';
  };
  
  // Function to generate mock posts for a community
  const generateMockPosts = (communityId, count) => {
    const mockPosts = [];
    const topics = {
      'news': ['Political News', 'International Affairs', 'Local News', 'Science News'],
      'music': ['New Releases', 'Album Reviews', 'Concert Reviews', 'Music Theory']
    };
    
    const communityTopics = topics[communityId] || ['Discussion', 'Questions', 'Announcements', 'General'];
    
    for (let i = 0; i < count; i++) {
      const randomTopic = communityTopics[Math.floor(Math.random() * communityTopics.length)];
      mockPosts.push({
        id: `${communityId}-post-${i+1}`,
        title: `${randomTopic}: ${getRandomTitle(communityId)}`,
        author: `user_${Math.floor(Math.random() * 1000)}`,
        content: 'This is a simulated post for the community. It contains mock content that would normally be fetched from a backend API.',
        upvotes: Math.floor(Math.random() * 5000),
        comments: Math.floor(Math.random() * 200),
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        tags: [communityId, randomTopic.toLowerCase().replace(/\s+/g, '-')],
        image: Math.random() > 0.4 ? `https://source.unsplash.com/random/800x600?${communityId},${randomTopic.split(' ')[0]}` : null
      });
    }
    
    return mockPosts;
  };
  
  // Function to generate random post titles based on community
  const getRandomTitle = (communityId) => {
    const titles = {
      'news': [
        'Breaking: Major Policy Announced Today',
        'Global Summit Results in Historic Agreement',
        'Scientists Discover New Species in Amazon',
        'Local Government Announces Infrastructure Plan'
      ],
      'music': [
        'Album Review: The Latest Masterpiece from Top Artist',
        'Concert Experience: Live Show Review',
        'Interview with Rising Star in the Industry',
        'Most Anticipated Music Releases This Year'
      ]
    };
    
    const communityTitles = titles[communityId] || [
      'Interesting Discussion Topic',
      'Community Announcements and Updates',
      'General Questions and Answers',
      'Trending Topics This Week'
    ];
    
    return communityTitles[Math.floor(Math.random() * communityTitles.length)];
  };
  
  return (
    <div className={styles.communityContainer}>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading community...</p>
        </div>
      ) : (
        <>
          <div className={styles.communityHeader}>
            <div className={styles.communityBanner}>
              <div className={styles.communityIcon}>{community.label.charAt(1).toUpperCase()}</div>
            </div>
            <div className={styles.communityInfo}>
              <h1 className={styles.communityName}>{communityInfo.name}</h1>
              <p className={styles.communityDescription}>{communityInfo.description}</p>
              <div className={styles.communityStats}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{communityInfo.members.toLocaleString()}</span>
                  <span className={styles.statLabel}>Members</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{communityInfo.online.toLocaleString()}</span>
                  <span className={styles.statLabel}>Online</span>
                </div>
              </div>
            </div>
            <button className={styles.joinButton}>Join Community</button>
          </div>
          
          <div className={styles.communityTabs}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'posts' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              Posts
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'about' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
          </div>
          
          {activeTab === 'posts' ? (
            <div className={styles.postsContainer}>
              {posts.map(post => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className={styles.aboutContainer}>
              <div className={styles.aboutSection}>
                <h3 className={styles.aboutTitle}>Community Rules</h3>
                <ul className={styles.rulesList}>
                  {communityInfo.rules.map((rule, index) => (
                    <li key={index} className={styles.ruleItem}>{rule}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.aboutSection}>
                <h3 className={styles.aboutTitle}>Moderators</h3>
                <ul className={styles.modList}>
                  {communityInfo.moderators.map((mod, index) => (
                    <li key={index} className={styles.modItem}>u/{mod}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.aboutSection}>
                <h3 className={styles.aboutTitle}>Created</h3>
                <p className={styles.creationDate}>
                  {new Date(communityInfo.createdAt).toLocaleDateString(undefined, { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommunityView; 