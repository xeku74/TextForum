import React, { useState } from 'react';
import styles from './ChatPopup.module.css';

const ChatPopup = ({ isOpen, onClose }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
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

  // Handle selecting a chat
  const handleChatSelect = (chatId) => {
    setActiveChat(chatId);

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
    if (!messageInput.trim() || !activeChat) return;

    const currentTime = getCurrentTime();
    
    // Create a new message object
    const newMessage = {
      id: Date.now(),
      text: messageInput,
      timestamp: currentTime,
      isUser: true
    };

    // Update the messages state with the new message
    setMessages(prevMessages => ({
      ...prevMessages,
      [activeChat]: [...prevMessages[activeChat], newMessage]
    }));

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
  };

  // Get the first letter of a username for avatar placeholder
  const getInitial = (username) => {
    return username.charAt(0).toUpperCase();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.chatPopupOverlay} onClick={onClose}>
      <div className={styles.chatPopupContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.chatHeader}>
          <h3>Messages</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className={styles.chatContent}>
          {/* Chat List */}
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

          {/* Chat Messages */}
          <div className={styles.chatMessages}>
            {activeChat ? (
              <>
                <div className={styles.messagesHeader}>
                  <div className={styles.chatAvatar}>
                    <div className={styles.avatarPlaceholder}>
                      {getInitial(chats.find(chat => chat.id === activeChat)?.username || '')}
                    </div>
                  </div>
                  <div className={styles.chatUser}>
                    {chats.find(chat => chat.id === activeChat)?.username}
                  </div>
                </div>
                <div className={styles.messagesList}>
                  {messages[activeChat].map((message) => (
                    <div
                      key={message.id}
                      className={`${styles.messageItem} ${message.isUser ? styles.myMessage : styles.theirMessage}`}
                    >
                      <div className={styles.messageAvatar}>
                        <div className={styles.avatarPlaceholder}>
                          {message.isUser ? 'Me' : getInitial(chats.find(chat => chat.id === activeChat)?.username || '')}
                        </div>
                      </div>
                      <div className={styles.messageContent}>
                        <div className={styles.messageText}>{message.text}</div>
                        <div className={styles.messageTime}>{message.timestamp}</div>
                      </div>
                    </div>
                  ))}
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
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
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
        </div>
      </div>
    </div>
  );
};

export default ChatPopup; 