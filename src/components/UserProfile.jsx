import React, { useState } from 'react';
import styles from './UserProfile.module.css';
import Post from './Post';
import AvatarEditorModal from './AvatarEditorModal';

const UserProfile = ({ isOpen, onClose, username = "YourUsername" }) => {
  // Tabs for the profile
  const [activeTab, setActiveTab] = useState('posts');
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);
  const [avatar, setAvatar] = useState(null);
  
  // Mock user data - in a real app this would come from props or an API
  const userData = {
    username: username,
    postKarma: 102,
    commentKarma: 288,
    cakeDay: "Apr 29, 2020",
    achievements: [
      { id: 1, name: "Banana Aficionado", iconColor: "#ffd700" },
      { id: 2, name: "Banana Enthusiast", iconColor: "#ffd700" },
      { id: 3, name: "Banana Baby", iconColor: "#ffd700" }
    ],
    goldEarned: 0
  };

  // Mock posts made by the user
  const userPosts = [
    {
      id: 101,
      author: username,
      title: "New to Outlier - Got Flagged for Multiple Accounts",
      body: "I was really excited to start working with Outlier and today was supposed to be my first official day. But right before I could even begin, I got a message saying my account was flagged for having multiple accounts... which honestly ruined my day. Just to be clear, this is the only account I'm using. I'm completely new to Outlier.",
      timestamp: '4d ago',
      upvotes: 56,
      comments: 8,
      commentData: [
        {
          id: 1001,
          author: 'fishfishfish313',
          text: 'That\'s unusual. Have you tried contacting support?',
          timestamp: '4d ago',
          upvotes: 12
        },
        {
          id: 1002,
          author: 'Impressive_Novel_265',
          text: 'The same thing happened to me last month. Did you get an email response yet?',
          timestamp: '4d ago',
          upvotes: 8
        }
      ]
    },
    {
      id: 102,
      author: username,
      title: "What's your favorite programming language and why?",
      body: "I've been learning several languages over the past year and I'm curious what everyone's favorite is and why. Mine is currently Python because of its readability and versatility.",
      timestamp: '2w ago',
      upvotes: 42,
      comments: 15,
      commentData: []
    }
  ];

  // Mock comments made by the user
  const userComments = [
    {
      id: 201,
      postTitle: "Thoughts on React?",
      postAuthor: "bob",
      text: "I got an initial response from the support hope it gets resolved soon!",
      timestamp: '3d ago',
      upvotes: 24
    },
    {
      id: 202,
      postTitle: "Need help with CSS",
      postAuthor: "charlie",
      text: "As I said, I don't have multiple accounts. What I think happened is when I first got to know Outlier, I tried to login and know whats it about, so while logging in I had given my mobile number, and now on this fully onboarded account the same mobile number is used, so that redundancy might be the reason I'm getting this popup.",
      timestamp: '4d ago',
      upvotes: 15
    }
  ];

  // Saved posts by the user
  const savedPosts = [
    {
      id: 301,
      author: "grace",
      title: "How do you manage state in complex React applications?",
      body: "I'm working on a complex application and useState/useReducer are getting unwieldy. Looking for opinions on Redux, Zustand, Jotai, Recoil, etc. What do you use?",
      timestamp: '1d ago',
      upvotes: 72,
      comments: 18,
      commentData: []
    }
  ];

  const handleAvatarEdit = () => {
    setShowAvatarEditor(true);
  };

  const handleAvatarSave = (newAvatar) => {
    setAvatar(newAvatar);
    setShowAvatarEditor(false);
  };

  // Function to render the avatar based on the current state
  const renderAvatar = () => {
    if (avatar) {
      if (avatar.type === 'initial') {
        return (
          <div 
            className={styles.avatarPlaceholder} 
            style={{ backgroundColor: avatar.data.color }}
          >
            {avatar.data.initial}
          </div>
        );
      } else {
        return (
          <div className={styles.avatarImage}>
            <img src={avatar.data.url} alt={`${username}'s avatar`} />
          </div>
        );
      }
    }

    return (
      <div className={styles.avatarPlaceholder}>
        {userData.username.charAt(0).toUpperCase()}
      </div>
    );
  };

  if (!isOpen) return null;

  // Render different content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div className={styles.postsContainer}>
            {userPosts.length > 0 ? (
              userPosts.map(post => <Post key={post.id} post={post} />)
            ) : (
              <div className={styles.emptyState}>No posts yet</div>
            )}
          </div>
        );
      case 'comments':
        return (
          <div className={styles.commentsContainer}>
            {userComments.length > 0 ? (
              userComments.map(comment => (
                <div key={comment.id} className={styles.commentItem}>
                  <div className={styles.commentHeader}>
                    <span className={styles.commentOn}>Comment on </span>
                    <span className={styles.postTitle}>{comment.postTitle}</span>
                    <span className={styles.commentBy}> by u/{comment.postAuthor}</span>
                    <span className={styles.commentTime}> • {comment.timestamp}</span>
                  </div>
                  <div className={styles.commentText}>{comment.text}</div>
                  <div className={styles.commentFooter}>
                    <div className={styles.upvotes}>
                      <svg className={styles.upvoteIcon} viewBox="0 0 20 20" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L17 14H3L10 3Z" fill="currentColor" />
                      </svg>
                      {comment.upvotes}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>No comments yet</div>
            )}
          </div>
        );
      case 'saved':
        return (
          <div className={styles.savedContainer}>
            {savedPosts.length > 0 ? (
              savedPosts.map(post => <Post key={post.id} post={post} />)
            ) : (
              <div className={styles.emptyState}>No saved posts yet</div>
            )}
          </div>
        );
      case 'hidden':
        return <div className={styles.emptyState}>Hidden posts will appear here</div>;
      case 'upvoted':
        return <div className={styles.emptyState}>Upvoted content will appear here</div>;
      case 'downvoted':
        return <div className={styles.emptyState}>Downvoted content will appear here</div>;
      default:
        return <div className={styles.emptyState}>Select a tab to view content</div>;
    }
  };

  return (
    <div className={styles.profileOverlay} onClick={onClose}>
      <div className={styles.profileContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.profileHeader}>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className={styles.headerContent}>
            <div className={styles.userAvatarContainer}>
              <div className={styles.userAvatar}>
                {renderAvatar()}
              </div>
              <button 
                className={styles.editAvatarButton}
                onClick={handleAvatarEdit}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 4L20 7.5M18.25 5.75L9 15M16.5 4L6 14.5L4 20L9.5 18L20 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Edit
              </button>
            </div>
            <h2 className={styles.username}>u/{userData.username}</h2>
          </div>

          <div className={styles.userStats}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{userData.postKarma}</div>
              <div className={styles.statLabel}>Post karma</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{userData.commentKarma}</div>
              <div className={styles.statLabel}>Comment karma</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{userData.cakeDay}</div>
              <div className={styles.statLabel}>Cake day</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{userData.goldEarned}</div>
              <div className={styles.statLabel}>Gold earned</div>
            </div>
          </div>

          <div className={styles.achievements}>
            <h3 className={styles.achievementsTitle}>ACHIEVEMENTS</h3>
            <div className={styles.achievementsList}>
              {userData.achievements.map(achievement => (
                <div key={achievement.id} className={styles.achievementItem}>
                  <div className={styles.achievementIcon} style={{backgroundColor: achievement.iconColor}}>
                    🏆
                  </div>
                  <div className={styles.achievementName}>{achievement.name}</div>
                </div>
              ))}
              <button className={styles.viewAllButton}>View All</button>
            </div>
          </div>
        </div>

        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'posts' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'comments' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('comments')}
          >
            Comments
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'saved' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            Saved
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'hidden' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('hidden')}
          >
            Hidden
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'upvoted' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('upvoted')}
          >
            Upvoted
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'downvoted' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('downvoted')}
          >
            Downvoted
          </button>
        </div>

        <div className={styles.tabContent}>
          {renderTabContent()}
        </div>
      </div>
      
      <AvatarEditorModal 
        isOpen={showAvatarEditor} 
        onClose={() => setShowAvatarEditor(false)}
        onSave={handleAvatarSave}
        currentAvatar={avatar}
      />
    </div>
  );
};

export default UserProfile; 