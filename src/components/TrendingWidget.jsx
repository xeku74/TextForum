import React, { useState, useEffect } from 'react';
import styles from './TrendingWidget.module.css';
import '../styles/transitions.css';

const TrendingWidget = () => {
  const [showAll, setShowAll] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const trendingItems = [
    {
      id: 1,
      category: 'Entertainment',
      title: '#MovieReviewThread',
      description: 'Users discussing the latest releases',
      posts: '32.5K posts'
    },
    {
      id: 2,
      category: 'Trending',
      title: 'Jane Smith',
      description: 'Discussions about the recent interview',
      posts: '4,287 posts'
    },
    {
      id: 3,
      category: 'Sports',
      title: 'Championship Finals',
      description: 'Live updates and reactions',
      posts: '8,912 posts'
    },
    {
      id: 4,
      category: 'Music',
      title: '#NewAlbumDrop',
      description: 'Reactions to the surprise release',
      posts: '105K posts'
    },
    {
      id: 5,
      category: 'Technology',
      title: 'New Smartphone Release',
      description: 'Features, pricing, and comparisons',
      posts: '15.2K posts'
    },
    {
      id: 6,
      category: 'Gaming',
      title: 'E3 Announcements',
      description: 'Breaking news from game developers',
      posts: '43.1K posts'
    },
    {
      id: 7,
      category: 'Politics',
      title: 'Election Results',
      description: 'Live coverage and analysis',
      posts: '67.8K posts'
    },
    {
      id: 8,
      category: 'Science',
      title: 'Space Exploration',
      description: 'Latest discoveries from Mars rover',
      posts: '12.4K posts'
    }
  ];

  const displayItems = showAll ? trendingItems : trendingItems.slice(0, 3);

  const toggleShowAll = () => {
    setShowAll(prevState => !prevState);
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'entertainment':
        return (
          <svg className={styles.categoryIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 8H20M4 16H20M6 20L6 4M18 20L18 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'sports':
        return (
          <svg className={styles.categoryIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'music':
        return (
          <svg className={styles.categoryIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 17H5C3.89543 17 3 16.1046 3 15V15C3 13.8954 3.89543 13 5 13H9L9 17ZM9 17H19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="9" cy="17" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="19" cy="5" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'technology':
        return (
          <svg className={styles.categoryIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 2H14.5L15.5 7L18.5 9.5L23 11.5L20.5 16.5L21 22H14.5L12 17L9.5 22H3L3.5 16.5L1 11.5L5.5 9.5L8.5 7L9.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'gaming':
        return (
          <svg className={styles.categoryIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12H15M12 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'politics':
        return (
          <svg className={styles.categoryIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 21V17M4 17V5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V17M4 17H20M20 17V21M8 9H12M8 13H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'science':
        return (
          <svg className={styles.categoryIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3L15 3L12 9L15 21H9L12 9L9 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg className={styles.categoryIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  const getAnimationClass = (index) => {
    if (!isAnimated) return '';
    return '';
  };

  return (
    <div className={`${styles.widgetContainer} ${isAnimated ? 'widget-animate' : ''}`}>
      <h2 className={styles.widgetHeader}>Trending</h2>
      
      {displayItems.map((item, index) => (
        <div 
          key={item.id} 
          className={styles.trendingItem}
          style={{ 
            opacity: isAnimated ? 1 : 0,
            transition: 'opacity 0.3s ease',
            transitionDelay: `${0.1 + index * 0.1}s`
          }}
        >
          <div className={styles.category}>
            {getCategoryIcon(item.category)}
            {item.category}
          </div>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.description}>{item.description}</p>
          <div className={styles.postCount}>{item.posts}</div>
        </div>
      ))}
      
      <button 
        className={styles.showMoreButton}
        onClick={toggleShowAll}
        style={{ 
          opacity: isAnimated ? 1 : 0,
          transition: 'opacity 0.3s ease',
          transitionDelay: `${0.1 + displayItems.length * 0.1}s`
        }}
      >
        {showAll ? "Show less" : "Show more"}
      </button>
    </div>
  );
};

export default TrendingWidget; 