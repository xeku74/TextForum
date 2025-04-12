import React, { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';
import ProfileDropdown from './ProfileDropdown';
import ChatPopup from './ChatPopup';
import UserProfile from './UserProfile';
import SearchResults from './SearchResults';
import Settings from './Settings';
import CreatePostModal from './CreatePostModal';
import NotificationsPopup from './NotificationsPopup';
import { useTheme } from '../context/ThemeContext';
import '../styles/transitions.css'; // Import transitions

const Header = ({ onNewPost, posts, users, communities, onSearch, searchQuery }) => {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotificationsPopup, setShowNotificationsPopup] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3); // Mock unread count
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const { isDarkMode, toggleTheme } = useTheme();
  
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Popular search suggestions to show when search is focused but empty
  const defaultSuggestions = [
    { text: 'javascript', type: 'suggestion' },
    { text: 'react', type: 'suggestion' },
    { text: 'web development', type: 'suggestion' },
    { text: 'css tricks', type: 'suggestion' },
    { text: 'typescript', type: 'suggestion' },
    { text: 'node.js', type: 'suggestion' },
    { text: 'programming', type: 'suggestion' },
    { text: 'frontend', type: 'suggestion' }
  ];
  
  // Mock users data if not provided
  const mockUsers = users || [
    { id: 1, username: 'alice', karma: 1245, type: 'user' },
    { id: 2, username: 'bob', karma: 876, type: 'user' },
    { id: 3, username: 'charlie', karma: 542, type: 'user' },
    { id: 4, username: 'david', karma: 1089, type: 'user' },
    { id: 5, username: 'emily', karma: 932, type: 'user' },
    { id: 6, username: 'frank', karma: 671, type: 'user' },
    { id: 7, username: 'grace', karma: 812, type: 'user' },
  ];
  
  // Mock communities data if not provided
  const mockCommunities = communities || [
    { id: 1, name: 'WebDev', members: '235K', type: 'community' },
    { id: 2, name: 'JavaScript', members: '456K', type: 'community' },
    { id: 3, name: 'ReactJS', members: '312K', type: 'community' },
    { id: 4, name: 'Programming', members: '589K', type: 'community' },
    { id: 5, name: 'UIDesign', members: '178K', type: 'community' },
    { id: 6, name: 'TypeScript', members: '187K', type: 'community' },
    { id: 7, name: 'Frontend', members: '234K', type: 'community' },
  ];
  
  // Function to focus search input when search icon is clicked
  const handleSearchIconClick = () => {
    searchInputRef.current.focus();
    
    // Always show suggestions when clicking the search icon
    setShowSearchResults(true);
    setSearchSuggestions(defaultSuggestions);
  };
  
  // Function to handle search query changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    
    // Update the main feed filter through the parent component
    if (onSearch) {
      onSearch(query);
    }
    
    // Hide search results dropdown immediately when typing begins
    if (query.length > 0) {
      setShowSearchResults(false);
    } else {
      // Only show suggestions dropdown when query is empty
      setShowSearchResults(true);
      setSearchSuggestions(defaultSuggestions);
    }
    
    // Still maintain the search suggestions and results in state for when dropdown is shown
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    // Generate search suggestions based on query
    generateSearchSuggestions(query);
    
    // Search through posts, users, and communities
    performSearch(query);
  };
  
  // Function to handle search input focus
  const handleSearchFocus = () => {
    // Always show suggestions when focusing on empty search box
    if (!localSearchQuery) {
      setShowSearchResults(true);
      setSearchSuggestions(defaultSuggestions);
    }
  };
  
  // Generate search suggestions
  const generateSearchSuggestions = (query) => {
    // Filter default suggestions that include the query
    const matchingSuggestions = defaultSuggestions
      .filter(suggestion => 
        suggestion.text.toLowerCase().includes(query.toLowerCase())
      );
    
    // Include the exact query as a suggestion if not already included
    if (query.length > 2 && !matchingSuggestions.some(s => s.text.toLowerCase() === query.toLowerCase())) {
      matchingSuggestions.unshift({ text: query, type: 'suggestion' });
    }
    
    setSearchSuggestions(matchingSuggestions);
  };
  
  // Search through posts, users, and communities
  const performSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Search through posts
    const matchingPosts = posts
      ? posts
          .filter(post => 
            post.title.toLowerCase().includes(lowerQuery) || 
            post.body.toLowerCase().includes(lowerQuery) ||
            post.author.toLowerCase().includes(lowerQuery)
          )
          .map(post => ({ ...post, type: 'post' }))
      : [];
    
    // Search through users
    const matchingUsers = mockUsers
      .filter(user => user.username.toLowerCase().includes(lowerQuery))
      .map(user => ({ ...user, type: 'user' }));
    
    // Search through communities
    const matchingCommunities = mockCommunities
      .filter(community => community.name.toLowerCase().includes(lowerQuery))
      .map(community => ({ ...community, type: 'community' }));
    
    // Combine all results
    const allResults = [
      ...matchingPosts,
      ...matchingUsers,
      ...matchingCommunities
    ];
    
    setSearchResults(allResults);
  };
  
  // Handle clicking on a search result
  const handleResultClick = (result) => {
    // In a real app, this would navigate to the selected post, user, or community
    console.log('Selected result:', result);
    
    if (result.type === 'suggestion') {
      // For suggestions, update the search query and perform search
      setLocalSearchQuery(result.text);
      if (onSearch) {
        onSearch(result.text);
      }
      // Hide dropdown after selecting a suggestion
      setShowSearchResults(false);
      performSearch(result.text);
    } else {
      // Clear search after selecting a result
      clearSearch();
      
      // TODO: Navigate to the selected item
      // For now, just log it
      alert(`Navigating to ${result.type}: ${result.type === 'post' ? result.title : result.type === 'user' ? result.username : result.name}`);
    }
  };
  
  // Clear search
  const clearSearch = () => {
    setLocalSearchQuery('');
    setShowSearchResults(false);
    setSearchResults([]);
    setSearchSuggestions([]);
    
    if (onSearch) {
      onSearch('');
    }
  };
  
  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update local search query when the prop changes
  useEffect(() => {
    if (searchQuery !== undefined && searchQuery !== localSearchQuery) {
      setLocalSearchQuery(searchQuery);
      
      // Hide search results dropdown if there's a query
      if (searchQuery.trim() !== '') {
        setShowSearchResults(false);
      }
    }
  }, [searchQuery]);

  const toggleCreatePostModal = () => {
    setShowCreatePostModal(!showCreatePostModal);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const toggleChatPopup = () => {
    setShowChatPopup(!showChatPopup);
  };

  const handleViewProfile = () => {
    setShowUserProfile(true);
    setShowProfileDropdown(false); // Close dropdown if open
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
    setShowProfileDropdown(false); // Close dropdown if open
  };

  const handleNewPost = (newPost) => {
    onNewPost(newPost);
    toggleCreatePostModal(); // Close modal after posting
  };

  // Function to show search results dropdown when clicking in the search box
  const handleSearchClick = () => {
    // Always show suggestions when clicking the search box
    setShowSearchResults(true);
    setSearchSuggestions(defaultSuggestions);
  };

  const toggleNotificationsPopup = () => {
    // Close other popups if opening notifications
    if (!showNotificationsPopup) {
      setShowProfileDropdown(false);
      setShowChatPopup(false);
    }
    setShowNotificationsPopup(!showNotificationsPopup);
    
    // Mark as read when opening the popup (in a real app, this might be an API call)
    if (!showNotificationsPopup) {
      setUnreadNotifications(0);
    }
  };

  return (
    <header className={`${styles.header} header-animate`}>
      <div className={styles.logoContainer}>
        <h1 className={styles.logo}>TextForum</h1>
      </div>

      <div className={styles.searchContainer} ref={searchContainerRef}>
        <svg 
          className={styles.searchIcon} 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleSearchIconClick}
        >
          <path d="M21 21L15.8033 15.8033M15.8033 15.8033C17.1605 14.4461 18 12.5711 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.5711 18 14.4461 17.1605 15.8033 15.8033Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input
          ref={searchInputRef}
          type="text"
          className={styles.searchInput}
          placeholder="Search TextForum" 
          value={localSearchQuery}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          onClick={handleSearchClick}
        />
        {localSearchQuery && (
          <button 
            className={styles.clearSearchButton}
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <span style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%', 
              width: '100%',
              lineHeight: 1,
              fontSize: '10px',
              fontWeight: 'bold',
              transform: 'translateY(-1px)'
            }}>×</span>
          </button>
        )}
        
        <SearchResults
          results={searchResults}
          suggestions={searchSuggestions}
          query={localSearchQuery}
          isVisible={showSearchResults}
          onPostClick={handleResultClick}
          onClearSearch={clearSearch}
          showDefaultSuggestions={!localSearchQuery}
        />
      </div>

      <div className={styles.navButtons}>
        {/* Theme Toggle Button */}
        <button 
          className={styles.themeToggleButton} 
          onClick={toggleTheme}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            // Sun icon for light mode
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M12 5V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 21V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M16.95 7.05L18.364 5.636" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M5.636 18.364L7.05 16.95" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M16.95 16.95L18.364 18.364" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M5.636 5.636L7.05 7.05" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            // Moon icon for dark mode
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
        
        {/* Message/Chat Icon */}
        <button 
          className={styles.navButton} 
          aria-label="Messages"
          title="Messages"
          onClick={toggleChatPopup}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12H16M8 8H12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.1971 3.23454 14.3397 3.65962 15.3825C3.73977 15.574 3.78938 15.8 3.78938 16.0177C3.78938 16.4978 3.63414 16.9972 3.33021 17.3938C2.63606 18.2961 2.95515 19.5516 3.95923 19.9186C5.93537 20.6669 8.41259 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* Notification Icon */}
        <button
          className={styles.navButton} 
          aria-label="Notifications"
          title="Notifications"
          onClick={toggleNotificationsPopup}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.0201 2.91992C8.71009 2.91992 6.02009 5.59992 6.02009 8.90992V11.7999C6.02009 12.4099 5.76009 13.3399 5.45009 13.8599L4.30009 15.7699C3.59009 16.9499 4.08009 18.2599 5.38009 18.6999C9.69009 20.1399 14.3401 20.1399 18.6501 18.6999C19.8601 18.2999 20.3901 16.8699 19.7301 15.7699L18.5801 13.8599C18.2801 13.3399 18.0201 12.4099 18.0201 11.7999V8.90992C18.0201 5.60992 15.3201 2.91992 12.0201 2.91992Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.8699 3.19994C13.5599 3.10994 13.2399 3.03994 12.9099 2.99994C11.9499 2.87994 11.0299 2.94994 10.1699 3.19994C10.4599 2.45994 11.1799 1.93994 12.0199 1.93994C12.8599 1.93994 13.5799 2.45994 13.8699 3.19994Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          
          {/* Notification Badge */}
          {unreadNotifications > 0 && (
            <span className={styles.navButtonBadge}>
              {unreadNotifications > 9 ? '9+' : unreadNotifications}
            </span>
          )}
        </button>
        
        {/* Create Post Button */}
        <button 
          className={styles.createButton}
          onClick={toggleCreatePostModal}
          aria-label="Create Post"
          title="Create a new post"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.plusIcon}>
            <path d="M12 4V20M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className={styles.createButtonText}>Create</span>
        </button>
        
        {/* Profile Button */}
        <button 
          className={styles.profileButton} 
          aria-label="Profile" 
          title="Profile (click to open menu, Alt+Click to view profile)"
          onClick={(e) => e.altKey ? handleViewProfile() : toggleProfileDropdown()}
        >
          <div className={styles.avatarBorder}>
            <div className={styles.avatar}></div>
          </div>
        </button>
        
        {/* Profile Dropdown */}
        {showProfileDropdown && (
          <ProfileDropdown 
            onClose={() => setShowProfileDropdown(false)}
            onViewProfile={handleViewProfile}
            onSettings={handleOpenSettings}
          />
        )}
      </div>
      
      {/* Create Post Modal */}
      <CreatePostModal 
        isOpen={showCreatePostModal} 
        onClose={toggleCreatePostModal} 
        onNewPost={handleNewPost}
      />
      
      {/* Chat Popup */}
      <ChatPopup 
        isOpen={showChatPopup} 
        onClose={toggleChatPopup} 
      />
      
      {/* Notifications Popup */}
      <NotificationsPopup
        isOpen={showNotificationsPopup}
        onClose={() => setShowNotificationsPopup(false)}
      />
      
      {/* User Profile */}
      {showUserProfile && (
        <UserProfile 
          isOpen={showUserProfile}
          onClose={() => setShowUserProfile(false)} 
        />
      )}
      
      {/* Settings */}
      {showSettings && (
        <Settings 
          isOpen={showSettings}
          onClose={() => setShowSettings(false)} 
        />
      )}
    </header>
  );
};

export default Header; 