// src/components/Sidebar.jsx
import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import CreateFeedModal from './CreateFeedModal';

const Sidebar = ({ 
  activeTab, 
  setActiveTab, 
  onFeedSelect, 
  onCommunitySelect, 
  selectedFeed, 
  selectedCommunity 
}) => {
  const [showCreateFeedModal, setShowCreateFeedModal] = useState(false);
  const [customFeeds, setCustomFeeds] = useState([
    { id: 'tech', label: 'r/TechTalks' },
    { id: 'pets', label: 'r/PetLovers' },
    { id: 'gaming', label: 'r/GamingHub' },
    { id: 'coding', label: 'r/CodeNinjas' },
    { id: 'travel', label: 'r/Travelers' }
  ]);

  // Navigation items with icons
  const navItems = [
    {
      id: 'feed',
      label: 'Home',
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9.5L12 4L21 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.2398 7.75977L14.1198 14.1198L7.75977 16.2398L9.87977 9.87977L16.2398 7.75977Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  // Communities list
  const communities = [
    { id: 'news', label: 'r/DailyNews' },
    { id: 'music', label: 'r/MusicLovers' }
  ];

  const handleNavClick = (tabId, e) => {
    e.preventDefault();
    setActiveTab(tabId);
  };

  const handleFeedClick = (feed, e) => {
    e.preventDefault();
    onFeedSelect(feed);
  };

  const handleCommunityClick = (community, e) => {
    e.preventDefault();
    onCommunitySelect(community);
  };

  const handleCreateFeed = (newFeed) => {
    // Format the new feed to match existing feed structure
    const formattedFeed = {
      id: newFeed.id,
      label: newFeed.name,
      description: newFeed.description,
      isPrivate: newFeed.isPrivate,
      showOnProfile: newFeed.showOnProfile
    };
    
    // Add new feed to list
    setCustomFeeds([...customFeeds, formattedFeed]);
    
    // Select the newly created feed
    onFeedSelect(formattedFeed);
    
    // You could save this to localStorage or a backend here
    console.log('Created new feed:', formattedFeed);
  };

  return (
    <div className={styles.sidebarContainer}>
      {/* Main Navigation */}
      {navItems.map((item, index) => (
        <a 
          key={item.id} 
          href={`#${item.id}`} 
          className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
          onClick={(e) => handleNavClick(item.id, e)}
          style={{ animationDelay: `${0.15 + index * 0.1}s` }}
        >
          {item.icon}
          {item.label}
        </a>
      ))}
      
      {/* Create Feed Button */}
      <button 
        className={styles.createButton}
        onClick={() => setShowCreateFeedModal(true)}
        style={{ animationDelay: '0.2s' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Create a custom feed
      </button>
      
      {/* Custom Feeds Section */}
      <div className={styles.sectionTitle} style={{ animationDelay: '0.4s' }}>Custom Feeds</div>
      {customFeeds.map((feed, index) => (
        <a 
          key={feed.id} 
          href={`#${feed.id}`} 
          className={`${styles.navItem} ${selectedFeed?.id === feed.id ? styles.active : ''}`}
          title={feed.description || feed.label}
          style={{ animationDelay: `${0.45 + index * 0.08}s` }}
          onClick={(e) => handleFeedClick(feed, e)}
        >
          <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5313 7.46863L14.4687 13.5313C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5313L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {feed.label}
          {feed.isPrivate && (
            <span className={styles.privateIndicator} title="Private feed">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          )}
        </a>
      ))}
      
      {/* Communities Section */}
      <div className={styles.sectionTitle} style={{ animationDelay: `${0.45 + customFeeds.length * 0.08 + 0.1}s` }}>Communities</div>
      {communities.map((community, index) => (
        <a 
          key={community.id} 
          href={`#${community.id}`} 
          className={`${styles.navItem} ${selectedCommunity?.id === community.id ? styles.active : ''}`}
          style={{ animationDelay: `${0.45 + customFeeds.length * 0.08 + 0.15 + index * 0.08}s` }}
          onClick={(e) => handleCommunityClick(community, e)}
        >
          <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 20L17 4M17 4L13 8M17 4L21 8M7 4V20M7 20L3 16M7 20L11 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {community.label}
        </a>
      ))}
      
      {/* Create Feed Modal */}
      <CreateFeedModal 
        isOpen={showCreateFeedModal}
        onClose={() => setShowCreateFeedModal(false)}
        onCreateFeed={handleCreateFeed}
      />
    </div>
  );
};

export default Sidebar; 