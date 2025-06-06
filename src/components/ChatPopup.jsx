import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatPopup.module.css';

const ChatPopup = ({ isOpen, onClose }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Define messages state first, before using it in useEffect
  const [chats, setChats] = useState([
    {
      id: 1,
      username: 'JohnDoe',
      lastMessage: 'Hey, how are you doing?',
      timestamp: '10:30 AM',
      unread: true,
    },
    {
      id: 2,
      username: 'JaneSmith',
      lastMessage: 'That post was really interesting!',
      timestamp: '9:15 AM',
      unread: false,
    },
    {
      id: 3,
      username: 'AlexJohnson',
      lastMessage: 'When is the meetup?',
      timestamp: 'Yesterday',
      unread: true,
    },
    {
      id: 4,
      username: 'SamanthaWilliams',
      lastMessage: 'Thanks for your help!',
      timestamp: 'Yesterday',
      unread: false,
    },
    {
      id: 5,
      username: 'MikeBrown',
      lastMessage: 'Did you see the latest announcement?',
      timestamp: 'Monday',
      unread: false,
    },
  ]);

  // Mock data for messages in a chat
  const [messages, setMessages] = useState({
    1: [
      { id: 1, text: 'Hey there!', timestamp: '10:25 AM', isUser: false },
      { id: 2, text: 'Hey, how are you doing?', timestamp: '10:30 AM', isUser: true },
    ],
    2: [
      { id: 1, text: 'I really enjoyed your post about data structures.', timestamp: '9:10 AM', isUser: false },
      { id: 2, text: 'That post was really interesting!', timestamp: '9:15 AM', isUser: true },
      { id: 3, text: 'Do you have any other resources on the topic?', timestamp: '9:16 AM', isUser: false },
    ],
    3: [
      { id: 1, text: 'We should organize a community meetup.', timestamp: 'Yesterday', isUser: false },
      { id: 2, text: 'When is the meetup?', timestamp: 'Yesterday', isUser: true },
    ],
    4: [
      { id: 1, text: 'I was stuck with that problem for hours. Your solution was perfect!', timestamp: 'Yesterday', isUser: false },
      { id: 2, text: 'Thanks for your help!', timestamp: 'Yesterday', isUser: true },
    ],
    5: [
      { id: 1, text: 'Have you checked the forum lately?', timestamp: 'Monday', isUser: false },
      { id: 2, text: 'There are some important changes coming.', timestamp: 'Monday', isUser: false },
      { id: 3, text: 'Did you see the latest announcement?', timestamp: 'Monday', isUser: true },
    ],
  });
  
  // Check if we're on a mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    checkIfMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current && activeChat && messages[activeChat]) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat, messages, messagesEndRef]);

  // Handle selecting a chat
  const handleChatSelect = (chatId) => {
    setActiveChat(chatId);

    // Initialize messages array if it doesn't exist for this chat
    if (!messages[chatId]) {
      setMessages(prevMessages => ({
        ...prevMessages,
        [chatId]: []
      }));
    }

    // Mark as read when selected
    setChats(chats.map(chat => 
      chat.id === chatId ? { ...chat, unread: false } : chat
    ));
  };

  // Get current timestamp
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    // Make sure we have all required data
    if (!messageInput.trim() || !activeChat || !messages || !messages[activeChat]) {
      return;
    }

    try {
      const currentTime = getCurrentTime();
      
      // Create a new message object
      const newMessage = {
        id: Date.now(),
        text: messageInput,
        timestamp: currentTime,
        isUser: true
      };

      // Update the messages state with the new message
      setMessages(prevMessages => {
        // Safety check for the active chat
        if (!prevMessages[activeChat]) {
          // Initialize the chat if it doesn't exist
          return {
            ...prevMessages,
            [activeChat]: [newMessage]
          };
        }
        
        return {
          ...prevMessages,
          [activeChat]: [...prevMessages[activeChat], newMessage]
        };
      });

      // Update the chat preview with the last message
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === activeChat 
            ? { ...chat, lastMessage: messageInput, timestamp: currentTime } 
            : chat
        )
      );

      // Clear the input
      setMessageInput('');
    } catch (error) {
      console.error("Error sending message:", error);
      // Could add user-facing error feedback here
    }
  };

  // Get the first letter of a username for avatar placeholder
  const getInitial = (username) => {
    return username.charAt(0).toUpperCase();
  };

  // Handle going back to chat list on mobile
  const handleBackToList = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setActiveChat(null);
  };

  // Get current theme info for styling
  const isDarkMode = document.documentElement.classList.contains('dark-theme');
  
  // Determine mobile view (smaller than 768px)
  const isMobileView = window.innerWidth <= 768;

  if (!isOpen) return null;

  // Determine if we should show chat list on mobile
  // On mobile: only show chat list if no active chat is selected
  const showChatList = !isMobile || (isMobile && !activeChat);
  
  // On mobile: only show messages if an active chat is selected
  const showMessages = !isMobile || (isMobile && activeChat);

  return (
    <div className={styles.chatPopupOverlay} onClick={onClose}>
      <div className={styles.chatPopupContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.chatHeader}>
          <h3>
            {activeChat && isMobile && chats.find(chat => chat.id === activeChat) 
              ? chats.find(chat => chat.id === activeChat).username 
              : 'Messages'}
          </h3>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className={styles.chatContent}>
          {/* Chat List - conditionally shown on mobile */}
          {showChatList && (
            <div className={styles.chatList}>
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`${styles.chatItem} ${activeChat === chat.id ? styles.active : ''} ${chat.unread ? styles.unread : ''}`}
                  onClick={() => handleChatSelect(chat.id)}
                >
                  <div className={styles.chatAvatar}>
                    <div className={styles.avatarPlaceholder}>
                      {getInitial(chat.username)}
                    </div>
                  </div>
                  <div className={styles.chatInfo}>
                    <div className={styles.chatUser}>{chat.username}</div>
                    <div className={styles.chatLastMessage}>{chat.lastMessage}</div>
                  </div>
                  <div className={styles.chatMeta}>
                    <div className={styles.chatTime}>{chat.timestamp}</div>
                    {chat.unread && <div className={styles.unreadIndicator}></div>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Chat Messages - conditionally shown on mobile */}
          {showMessages && (
            <div className={styles.chatMessages}>
              {activeChat && messages && messages[activeChat] ? (
                <>
                  <div 
                    className={styles.messagesHeader}
                    onClick={isMobile ? handleBackToList : undefined}
                  >
                    {/* Safely find the active chat user */}
                    {(() => {
                      const activeUser = chats.find(chat => chat.id === activeChat);
                      return (
                        <>
                          <div className={styles.chatAvatar}>
                            <div className={styles.avatarPlaceholder}>
                              {activeUser ? getInitial(activeUser.username) : '?'}
                            </div>
                          </div>
                          <div className={styles.chatUser}>
                            {activeUser ? activeUser.username : 'Unknown User'}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  <div className={styles.messagesList}>
                    {messages[activeChat].map((message) => {
                      // Find the active chat user safely
                      const activeUser = chats.find(chat => chat.id === activeChat);
                      const userInitial = activeUser ? getInitial(activeUser.username) : '?';
                      
                      return (
                        <div
                          key={message.id}
                          className={`${styles.messageItem} ${message.isUser ? styles.myMessage : styles.theirMessage}`}
                        >
                          <div className={styles.messageAvatar}>
                            <div className={styles.avatarPlaceholder}>
                              {message.isUser ? 'Me' : userInitial}
                            </div>
                          </div>
                          <div className={styles.messageContent}>
                            <div className={styles.messageText}>{message.text}</div>
                            <div className={styles.messageTime}>{message.timestamp}</div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                  <form className={styles.messageInput} onSubmit={handleSendMessage}>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <button
                      type="submit"
                      className={styles.sendButton}
                      disabled={!messageInput.trim()}
                      aria-label="Send message"
                    >
                      {window.innerWidth <= 768 ? (
                        // Modern paper plane icon for mobile
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        // Original icon for desktop
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className={styles.noActiveChat}>
                  <div className={styles.noActiveChatIcon}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 12H16M8 8H12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.1971 3.23454 14.3397 3.65962 15.3825C3.73977 15.574 3.78938 15.8 3.78938 16.0177C3.78938 16.4978 3.63414 16.9972 3.33021 17.3938C2.63606 18.2961 2.95515 19.5516 3.95923 19.9186C5.93537 20.6669 8.41259 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>Select a conversation to start messaging</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPopup; 