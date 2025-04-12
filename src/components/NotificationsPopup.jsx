import React, { useState, useEffect, useRef } from 'react';
import styles from './NotificationsPopup.module.css';

const NotificationsPopup = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('notifications');
  const popupRef = useRef(null);
  
  // Mock notifications data for demonstration
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'post_reply',
      username: 'CodeMaster',
      avatar: 'CM',
      content: 'replied to your post in r/outlier_ai',
      message: 'Did you have multiple accounts, though?',
      time: '4d',
      isUnread: true,
      source: 'r/outlier_ai'
    },
    {
      id: 2,
      type: 'comment_reply',
      username: 'DevGuru',
      avatar: 'DG',
      content: 'replied to your comment in r/programming',
      message: 'That\'s great 👍',
      time: '4d',
      isUnread: true,
      source: 'r/programming'
    },
    {
      id: 3,
      type: 'upvote',
      username: 'system',
      content: '1st upvote!',
      message: 'Go see your comment on r/coding: "New to Coding – Go..."',
      time: '4d',
      isUnread: false,
      source: 'r/coding'
    },
    {
      id: 4,
      type: 'post_reply',
      username: 'TechWizard',
      avatar: 'TW',
      content: 'replied to your post in r/webdev',
      message: 'We can\'t help you, but they have a strict policy due to scammers creating and selling multiple...',
      time: '4d',
      isUnread: false,
      source: 'r/webdev'
    },
    {
      id: 5,
      type: 'moderation',
      username: 'AutoModerator',
      avatar: '🤖',
      content: 'replied to your post in r/TechTalks',
      message: 'Welcome to r/TechTalks, largest Tech Community online. You must earn at least 3 comment karma...',
      time: 'Jan 17',
      isUnread: false,
      source: 'r/TechTalks'
    },
    {
      id: 6,
      type: 'comment_reply',
      username: 'ProgrammingPro',
      avatar: 'PP',
      content: 'replied to your comment in r/javascript',
      message: 'Okay sir',
      time: 'Dec 29',
      isUnread: false,
      source: 'r/javascript'
    },
    {
      id: 7,
      type: 'comment_reply',
      username: 'FrontendDev',
      avatar: 'FD',
      content: 'replied to your comment in r/css',
      message: 'Oh well I don\'t play online games yk',
      time: 'Dec 28',
      isUnread: false,
      source: 'r/css'
    }
  ]);
  
  const [messages, setMessages] = useState([
    {
      id: 101,
      username: 'TextForumAdmin',
      avatar: '👑',
      content: 'Welcome to TextForum!',
      message: 'Thanks for joining our community. Feel free to explore and participate in discussions that interest you!',
      time: '1d',
      isUnread: true
    },
    {
      id: 102,
      username: 'CodeNinja',
      avatar: 'CN',
      content: 'Sent you a direct message',
      message: 'Hey, I saw your post about React hooks. Would love to discuss more about custom hooks!',
      time: '3d',
      isUnread: false
    },
    {
      id: 103,
      username: 'UXDesigner',
      avatar: 'UX',
      content: 'Sent you a direct message',
      message: 'Thanks for the UI feedback! Really helpful.',
      time: 'Jan 10',
      isUnread: false
    }
  ]);

  // Close the popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Key press handler (close on Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Function to mark all as read
  const markAllAsRead = () => {
    if (activeTab === 'notifications') {
      setNotifications(notifications.map(n => ({ ...n, isUnread: false })));
    } else {
      setMessages(messages.map(m => ({ ...m, isUnread: false })));
    }
  };

  // Function to mark a single notification as read
  const markAsRead = (id) => {
    if (activeTab === 'notifications') {
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, isUnread: false } : n
      ));
    } else {
      setMessages(messages.map(m => 
        m.id === id ? { ...m, isUnread: false } : m
      ));
    }
  };

  const getActiveItems = () => {
    return activeTab === 'notifications' ? notifications : messages;
  };

  const getUnreadCount = (items) => {
    return items.filter(item => item.isUnread).length;
  };

  const renderEmptyState = () => (
    <div className={styles.emptyState}>
      <div className={styles.emptyStateIcon}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.1971 3.23454 14.3397 3.65962 15.3825C3.73977 15.574 3.78938 15.8 3.78938 16.0177C3.78938 16.4978 3.63414 16.9972 3.33021 17.3938C2.63606 18.2961 2.95515 19.5516 3.95923 19.9186C5.93537 20.6669 8.41259 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M15 12H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <h3 className={styles.emptyStateTitle}>No {activeTab === 'notifications' ? 'notifications' : 'messages'} yet</h3>
      <p className={styles.emptyStateText}>
        {activeTab === 'notifications' 
          ? 'Notifications will appear here when you receive replies, mentions, or upvotes.' 
          : 'Messages will appear here when users send you direct messages.'}
      </p>
    </div>
  );

  const renderNotificationAvatar = (item) => {
    if (item.avatar) {
      return (
        <div className={`${styles.notificationAvatar} ${item.username === 'system' || item.username === 'AutoModerator' || item.username === 'TextForumAdmin' ? styles.systemAvatar : ''}`}>
          {item.avatar}
        </div>
      );
    }
    
    return (
      <div className={styles.notificationAvatar}>
        {item.username.substring(0, 2).toUpperCase()}
      </div>
    );
  };

  return (
    <div className={styles.notificationsOverlay}>
      <div className={styles.notificationsContainer} ref={popupRef}>
        <div className={styles.header}>
          <h2 className={styles.title}>Notifications</h2>
          <button className={styles.settings} title="Notification settings">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.4 15C19.1277 15.6151 19.2583 16.3255 19.73 16.83L19.79 16.89C20.1227 17.2227 20.3156 17.6681 20.3301 18.1349C20.3446 18.6018 20.1797 19.0582 19.8683 19.4101C19.5569 19.7621 19.1233 19.9766 18.6583 20.0132C18.1934 20.0498 17.7344 19.9062 17.37 19.61L17.31 19.56C16.8043 19.0806 16.091 18.9551 15.4789 19.2339C14.8668 19.5127 14.4823 20.1551 14.5 20.83V21C14.5 21.5304 14.2893 22.0391 13.9142 22.4142C13.5391 22.7893 13.0304 23 12.5 23C11.9696 23 11.4609 22.7893 11.0858 22.4142C10.7107 22.0391 10.5 21.5304 10.5 21V20.94C10.5102 20.2643 10.1172 19.6233 9.5 19.35C8.8828 19.0767 8.16954 19.2083 7.66 19.69L7.6 19.75C7.2356 20.0462 6.77658 20.1898 6.31165 20.1532C5.84673 20.1166 5.41309 19.9021 5.10168 19.5501C4.79028 19.1982 4.62541 18.7418 4.63991 18.2749C4.6544 17.8081 4.84726 17.3627 5.18 17.03L5.24 16.97C5.71167 16.4694 5.8423 15.7599 5.57 15.145C5.3123 14.54 4.69318 14.1511 4.02 14.15H4C3.46957 14.15 2.96086 13.9393 2.58579 13.5642C2.21071 13.1891 2 12.6804 2 12.15C2 11.6196 2.21071 11.1109 2.58579 10.7358C2.96086 10.3607 3.46957 10.15 4 10.15H4.06C4.73583 10.1554 5.3493 9.77159 5.62 9.17C5.89071 8.55442 5.76008 7.84494 5.29 7.34L5.23 7.28C4.89726 6.94731 4.7044 6.50191 4.68991 6.03509C4.67541 5.56828 4.84028 5.11183 5.15168 4.75987C5.46309 4.40792 5.89673 4.19343 6.36165 4.15683C6.82658 4.12023 7.2856 4.26381 7.65 4.56L7.71 4.62C8.21567 5.09937 8.92898 5.22481 9.54 4.95C10.1627 4.67311 10.5468 4.02905 10.53 3.35V3.29C10.53 2.75957 10.7407 2.25086 11.1158 1.87579C11.4909 1.50071 11.9996 1.29 12.53 1.29C13.0604 1.29 13.5691 1.50071 13.9442 1.87579C14.3193 2.25086 14.53 2.75957 14.53 3.29V3.35C14.5177 4.02905 14.9018 4.67311 15.5245 4.95C16.1355 5.22481 16.8488 5.09937 17.3545 4.62L17.4145 4.56C17.7789 4.26381 18.2379 4.12023 18.7028 4.15683C19.1678 4.19343 19.6014 4.40792 19.9128 4.75987C20.2242 5.11183 20.3891 5.56828 20.3746 6.03509C20.3601 6.50191 20.1672 6.94731 19.8345 7.28L19.7745 7.34C19.3044 7.84494 19.1738 8.55442 19.4445 9.17C19.7152 9.77159 20.3287 10.1554 21.0045 10.15H21.0645C21.5949 10.15 22.1036 10.3607 22.4787 10.7358C22.8538 11.1109 23.0645 11.6196 23.0645 12.15C23.0645 12.6804 22.8538 13.1891 22.4787 13.5642C22.1036 13.9393 21.5949 14.15 21.0645 14.15H21.0045C20.3287 14.1511 19.7152 14.54 19.4445 15.145L19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className={styles.tabs}>
          <div 
            className={`${styles.tab} ${activeTab === 'notifications' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </div>
          <div 
            className={`${styles.tab} ${activeTab === 'messages' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Messages
          </div>
        </div>
        
        <div className={styles.content}>
          {getActiveItems().length === 0 ? (
            renderEmptyState()
          ) : (
            <ul className={styles.notificationList}>
              {getActiveItems().map(item => (
                <li 
                  key={item.id} 
                  className={`${styles.notificationItem} ${item.isUnread ? styles.unread : ''}`}
                  onClick={() => markAsRead(item.id)}
                >
                  {renderNotificationAvatar(item)}
                  
                  <div className={styles.notificationContent}>
                    <div className={styles.notificationText}>
                      <strong>{item.username}</strong> {item.content}
                    </div>
                    <div className={styles.notificationText}>
                      {item.message}
                    </div>
                    <div className={styles.notificationMeta}>
                      <span className={styles.notificationTime}>{item.time}</span>
                      {item.source && (
                        <span className={styles.notificationSource}>{item.source}</span>
                      )}
                    </div>
                  </div>
                  
                  {activeTab === 'messages' && (
                    <button className={styles.actionButton} title="Reply">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                  
                  <button className={styles.menuButton}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {getActiveItems().length > 0 && (
          <div className={styles.footer}>
            <button className={styles.markAllButton} onClick={markAllAsRead}>
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPopup; 