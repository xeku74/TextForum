import React, { useState, useEffect } from 'react';
import styles from './ExploreTab.module.css';

const ExploreTab = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    // Animation only for community cards, not headers or categories
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'all', name: 'All', icon: '🌐' },
    { id: 'tech', name: 'Technology', icon: '💻' },
    { id: 'gaming', name: 'Gaming', icon: '🎮' },
    { id: 'movies', name: 'Movies & TV', icon: '🎬' },
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'art', name: 'Art & Design', icon: '🎨' },
  ];

  const recommendedCommunities = [
    {
      id: 'webdev',
      name: 'WebDev',
      members: '235K',
      description: 'Discuss the latest in web development technologies, frameworks, and best practices.'
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      members: '456K',
      description: 'Everything related to JavaScript, from basics to advanced concepts and frameworks.'
    },
    {
      id: 'react',
      name: 'ReactJS',
      members: '312K',
      description: 'A community for React developers to share knowledge, tips, and showcase projects.'
    },
    {
      id: 'uidesign',
      name: 'UI Design',
      members: '178K',
      description: 'Share UI design inspiration, get feedback on your designs, and discuss trends.'
    },
    {
      id: 'programming',
      name: 'Programming',
      members: '589K',
      description: 'General programming discussions, questions, and problem-solving across all languages.'
    },
    {
      id: 'machinelearning',
      name: 'Machine Learning',
      members: '201K',
      description: 'Explore AI and machine learning concepts, share papers, and discuss implementations.'
    }
  ];

  const similarCommunities = [
    {
      id: 'typescript',
      name: 'TypeScript',
      members: '187K',
      description: 'TypeScript discussions, tips, and best practices for typed JavaScript development.'
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      members: '145K',
      description: 'The React framework for production - discussions, help, and project showcases.'
    },
    {
      id: 'frontend',
      name: 'Frontend',
      members: '234K',
      description: 'Everything related to frontend development, from HTML/CSS to modern frameworks.'
    },
    {
      id: 'webdesign',
      name: 'Web Design',
      members: '156K',
      description: 'Web design principles, tools, tips, and portfolio reviews.'
    },
    {
      id: 'node',
      name: 'Node.js',
      members: '213K',
      description: 'Discuss Node.js development, packages, and server-side JavaScript.'
    },
    {
      id: 'css',
      name: 'CSS',
      members: '190K',
      description: 'CSS tips, tricks, and advanced techniques for styling your web applications.'
    }
  ];

  // Helper function for content animations only
  const getAnimationProps = (index) => {
    return {
      className: '',
      style: {
        opacity: isAnimated ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
        transitionDelay: `${0.05 + index * 0.05}s`
      }
    };
  };

  return (
    // No animation classes or inline styles for the container
    <div className={styles.exploreContainer}>
      {/* No animation classes or inline styles for the title */}
      <h1 className={styles.exploreTitle}>
        Explore Communities
      </h1>
      
      {/* No animations for the categories section */}
      <div className={styles.categoriesWrapper}>
        <div className={styles.categoriesScroll}>
          {categories.map((category, index) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${activeCategory === category.name ? styles.active : ''}`}
              onClick={() => setActiveCategory(category.name)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Section titles are now visible immediately */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Recommended for you
        </h2>
        <div className={styles.communitiesGrid}>
          {recommendedCommunities.map((community, index) => {
            const animProps = getAnimationProps(index);
            return (
              <div 
                key={community.id} 
                className={styles.communityCard}
                style={animProps.style}
              >
                <div className={styles.communityHeader}>
                  <div className={styles.communityIconPlaceholder}>
                    {community.name.charAt(0)}
                  </div>
                  <div className={styles.communityInfo}>
                    <h3 className={styles.communityName}>{community.name}</h3>
                    <p className={styles.communityMembers}>{community.members} members</p>
                  </div>
                  <button className={styles.joinButton}>Join</button>
                </div>
                <p className={styles.communityDescription}>{community.description}</p>
              </div>
            );
          })}
        </div>
        <button 
          className={styles.showMoreButton}
          style={{
            opacity: isAnimated ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
            transitionDelay: `${0.1 + recommendedCommunities.length * 0.05}s`
          }}
        >
          Show more
        </button>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Similar communities
        </h2>
        <div className={styles.communitiesGrid}>
          {similarCommunities.map((community, index) => {
            const animProps = getAnimationProps(index + recommendedCommunities.length + 2);
            return (
              <div 
                key={community.id} 
                className={styles.communityCard}
                style={animProps.style}
              >
                <div className={styles.communityHeader}>
                  <div className={styles.communityIconPlaceholder}>
                    {community.name.charAt(0)}
                  </div>
                  <div className={styles.communityInfo}>
                    <h3 className={styles.communityName}>{community.name}</h3>
                    <p className={styles.communityMembers}>{community.members} members</p>
                  </div>
                  <button className={styles.joinButton}>Join</button>
                </div>
                <p className={styles.communityDescription}>{community.description}</p>
              </div>
            );
          })}
        </div>
        <button 
          className={styles.showMoreButton}
          style={{
            opacity: isAnimated ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
            transitionDelay: `${0.1 + (recommendedCommunities.length + similarCommunities.length + 2) * 0.05}s`
          }}
        >
          Show more
        </button>
      </section>
    </div>
  );
};

export default ExploreTab; 