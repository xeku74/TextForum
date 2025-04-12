import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import ExploreTab from './components/ExploreTab';
import TrendingWidget from './components/TrendingWidget';
import LandingPage from './components/LandingPage';
import CustomFeedView from './components/CustomFeedView';
import CommunityView from './components/CommunityView';
// import Widgets from './components/Widgets'; // Placeholder for later
import { ThemeProvider } from './context/ThemeContext';
import styles from './App.module.css'; // We'll create this CSS module next
import './styles/transitions.css'; // Import transitions

function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      author: 'alice', 
      title: 'First post here!', 
      body: 'Just trying out this new text forum. Looks cool!', 
      timestamp: '2h ago', 
      upvotes: 15, 
      comments: 3,
      commentData: [
        {
          id: 101,
          author: 'bob',
          text: 'Welcome to the forum! Hope you enjoy your time here.',
          timestamp: '1h ago',
          upvotes: 5
        },
        {
          id: 102,
          author: 'charlie',
          text: 'Nice to have you here. What topics are you interested in?',
          timestamp: '45m ago',
          upvotes: 3
        },
        {
          id: 103,
          author: 'david',
          text: 'This is definitely better than the old forum!',
          timestamp: '30m ago',
          upvotes: 2
        }
      ]
    },
    { 
      id: 2, 
      author: 'bob', 
      title: 'Thoughts on React?', 
      body: 'I find React really useful for building UIs like this.\n\nWhat do you all think?', 
      timestamp: '1h ago', 
      upvotes: 28, 
      comments: 5,
      commentData: [
        {
          id: 201,
          author: 'alice',
          text: 'I love React! The component structure makes it easy to reuse code.',
          timestamp: '55m ago',
          upvotes: 8,
          replies: [
            {
              id: 2011,
              author: 'bob',
              text: 'Agreed! Hooks have been a game changer too.',
              timestamp: '50m ago',
              upvotes: 4
            }
          ]
        },
        {
          id: 202,
          author: 'emily',
          text: 'I prefer Vue for smaller projects, but React scales better for larger applications.',
          timestamp: '45m ago',
          upvotes: 6
        },
        {
          id: 203,
          author: 'frank',
          text: 'The ecosystem is what makes React great. So many libraries!',
          timestamp: '30m ago',
          upvotes: 5
        },
        {
          id: 204,
          author: 'grace',
          text: 'Have you tried React with TypeScript? It\'s awesome!',
          timestamp: '25m ago',
          upvotes: 7
        },
        {
          id: 205,
          author: 'henry',
          text: 'React Native is a game changer if you need mobile apps too.',
          timestamp: '20m ago',
          upvotes: 4
        }
      ]
    },
    { 
      id: 3, 
      author: 'charlie', 
      title: 'Need help with CSS', 
      body: 'Struggling to center a div. Any tips?', 
      timestamp: '30m ago', 
      upvotes: 5, 
      comments: 3,
      commentData: [
        {
          id: 301,
          author: 'david',
          text: 'Try using display: flex; justify-content: center; align-items: center; on the parent element.',
          timestamp: '25m ago',
          upvotes: 9
        },
        {
          id: 302,
          author: 'emily',
          text: 'Another option is to use margin: 0 auto; if you want to center horizontally with a fixed width.',
          timestamp: '20m ago',
          upvotes: 7
        },
        {
          id: 303,
          author: 'frank',
          text: 'CSS Grid is also a good solution: place-items: center',
          timestamp: '15m ago',
          upvotes: 6
        }
      ]
    },
    {
      id: 4,
      author: 'david',
      title: 'Best JavaScript frameworks in 2023?',
      body: 'I\'m starting a new project and trying to decide on a framework. Currently considering React, Vue, Angular, and Svelte.\n\nWhat are your experiences with these? Any recommendations?',
      timestamp: '4h ago',
      upvotes: 42,
      comments: 7,
      commentData: [
        {
          id: 401,
          author: 'emily',
          text: 'Svelte has been amazing for our team. Much less boilerplate compared to React.',
          timestamp: '3h ago',
          upvotes: 12
        },
        {
          id: 402,
          author: 'frank',
          text: 'I still prefer React for larger projects - the ecosystem is unmatched.',
          timestamp: '2h ago',
          upvotes: 9,
          replies: [
            {
              id: 4021,
              author: 'grace',
              text: 'Agreed, especially with Next.js for full-stack applications.',
              timestamp: '1h ago',
              upvotes: 5
            }
          ]
        },
        {
          id: 403,
          author: 'alice',
          text: 'Vue 3 is worth considering. Great docs and easier learning curve.',
          timestamp: '2h ago',
          upvotes: 8
        },
        {
          id: 404,
          author: 'henry',
          text: 'Angular if you need something very structured and have a large team.',
          timestamp: '1h ago',
          upvotes: 4
        }
      ]
    },
    {
      id: 5,
      author: 'emily',
      title: 'Favorite VS Code extensions for web development?',
      body: 'Looking to upgrade my VS Code setup. What extensions do you find most helpful for web development?',
      timestamp: '6h ago',
      upvotes: 31,
      comments: 4,
      commentData: [
        {
          id: 501,
          author: 'frank',
          text: 'ESLint, Prettier, GitLens, and Path Intellisense are my must-haves.',
          timestamp: '5h ago',
          upvotes: 14
        },
        {
          id: 502,
          author: 'grace',
          text: 'I can\'t live without Live Server and Bracket Pair Colorizer.',
          timestamp: '4h ago',
          upvotes: 10
        },
        {
          id: 503,
          author: 'henry',
          text: 'Auto Rename Tag and CSS Peek are incredibly useful for front-end work.',
          timestamp: '3h ago',
          upvotes: 8
        },
        {
          id: 504,
          author: 'ivan',
          text: 'If you use TypeScript, the TypeScript Error Translator is a lifesaver.',
          timestamp: '2h ago',
          upvotes: 6
        }
      ]
    },
    {
      id: 6,
      author: 'grace',
      title: 'How do you manage state in complex React applications?',
      body: 'I\'m working on a complex application and useState/useReducer are getting unwieldy. Looking for opinions on Redux, Zustand, Jotai, Recoil, etc. What do you use?',
      timestamp: '1d ago',
      upvotes: 56,
      comments: 6,
      commentData: [
        {
          id: 601,
          author: 'frank',
          text: 'Zustand is the sweet spot for me - simpler than Redux but powerful enough for complex apps.',
          timestamp: '23h ago',
          upvotes: 17
        },
        {
          id: 602,
          author: 'alice',
          text: 'Context API with useReducer is sufficient for many apps without bringing in external libraries.',
          timestamp: '22h ago',
          upvotes: 12,
          replies: [
            {
              id: 6021,
              author: 'david',
              text: 'Performance can be an issue with Context if you\'re not careful with re-renders though.',
              timestamp: '21h ago',
              upvotes: 8
            }
          ]
        },
        {
          id: 603,
          author: 'ivan',
          text: 'Redux Toolkit has improved the Redux experience immensely. Much less boilerplate now.',
          timestamp: '20h ago',
          upvotes: 11
        }
      ]
    },
    {
      id: 7,
      author: 'jackson',
      title: 'Just adopted a new puppy!',
      body: 'Meet Max, my new Golden Retriever puppy! He\'s 8 weeks old and already stealing hearts. Any tips for first-time dog owners? I want to make sure he grows up happy and healthy.',
      timestamp: '3h ago',
      upvotes: 89,
      comments: 8,
      commentData: [
        {
          id: 701,
          author: 'sophia',
          text: 'Consistency is key with training! Set a routine early and stick to it.',
          timestamp: '2h 45m ago',
          upvotes: 15
        },
        {
          id: 702,
          author: 'olivia',
          text: 'Socialize him early with different people, environments and other vaccinated dogs!',
          timestamp: '2h 30m ago',
          upvotes: 12
        },
        {
          id: 703,
          author: 'noah',
          text: 'He\'s adorable! Remember to puppy-proof your house. They chew EVERYTHING.',
          timestamp: '2h ago',
          upvotes: 10,
          replies: [
            {
              id: 7031,
              author: 'jackson',
              text: 'Already learned that the hard way with my phone charger! 😅',
              timestamp: '1h 45m ago',
              upvotes: 7
            }
          ]
        },
        {
          id: 704,
          author: 'emma',
          text: 'Quality food makes a huge difference. I recommend checking out r/PuppyNutrition for food advice.',
          timestamp: '1h 30m ago',
          upvotes: 9
        }
      ]
    },
    {
      id: 8,
      author: 'liam',
      title: 'Would you rather work 4 days/10 hours or 5 days/8 hours?',
      body: 'My company is considering changing our work week structure and asked for employee input. Which schedule would you prefer and why?',
      timestamp: '5h ago',
      upvotes: 73,
      comments: 10,
      commentData: [
        {
          id: 801,
          author: 'ava',
          text: '4/10 all day! That extra day off is worth so much for mental health and personal projects.',
          timestamp: '4h 30m ago',
          upvotes: 24
        },
        {
          id: 802,
          author: 'william',
          text: 'I\'ve done both, and personally prefer 5/8. After 8 hours my productivity drops significantly.',
          timestamp: '4h ago',
          upvotes: 18
        },
        {
          id: 803,
          author: 'mia',
          text: '4/10 is great if your work allows deep focus. 5/8 might be better for customer-facing roles.',
          timestamp: '3h 45m ago',
          upvotes: 15
        },
        {
          id: 804,
          author: 'ethan',
          text: 'Why not 4/8? Companies with 32-hour work weeks report similar productivity but happier employees!',
          timestamp: '3h 30m ago',
          upvotes: 43,
          replies: [
            {
              id: 8041,
              author: 'liam',
              text: 'I wish! Maybe I should bring that up as an option too 😂',
              timestamp: '3h ago',
              upvotes: 22
            }
          ]
        }
      ]
    },
    {
      id: 9,
      author: 'olivia',
      title: 'TIL: Coffee grounds are great for your garden',
      body: 'Instead of throwing away your used coffee grounds, sprinkle them in your garden. They add nitrogen to the soil, attract earthworms, and can help repel some pests naturally. Just discovered this and my tomato plants are thriving!',
      timestamp: '8h ago',
      upvotes: 45,
      comments: 6,
      commentData: [
        {
          id: 901,
          author: 'elijah',
          text: 'They\'re especially good for acid-loving plants like blueberries and azaleas!',
          timestamp: '7h ago',
          upvotes: 12
        },
        {
          id: 902,
          author: 'amelia',
          text: 'I use them in my compost bin too. Helps balance out the green materials nicely.',
          timestamp: '6h 30m ago',
          upvotes: 8
        },
        {
          id: 903,
          author: 'benjamin',
          text: 'Just make sure not to add too much at once - moderation is key!',
          timestamp: '6h ago',
          upvotes: 6
        }
      ]
    },
    {
      id: 10,
      author: 'noah',
      title: 'Anyone here tried mechanical keyboards? Worth the hype?',
      body: 'Been seeing a lot about mechanical keyboards lately and wondering if they\'re worth investing in. I do a lot of typing for work and currently use the standard keyboard that came with my computer. Would love to hear experiences!',
      timestamp: '10h ago',
      upvotes: 38,
      comments: 7,
      commentData: [
        {
          id: 1001,
          author: 'sophia',
          text: 'Absolutely worth it if you type a lot. Get a switch tester first to figure out what type you prefer (clicky, tactile, linear).',
          timestamp: '9h ago',
          upvotes: 14
        },
        {
          id: 1002,
          author: 'william',
          text: 'Changed my life for coding. Just be prepared to fall down a very expensive rabbit hole of customization!',
          timestamp: '8h 30m ago',
          upvotes: 11
        },
        {
          id: 1003,
          author: 'mia',
          text: 'If you work in a shared space, maybe avoid the loud clicky ones (Blue switches). Your coworkers will thank you.',
          timestamp: '8h ago',
          upvotes: 10,
          replies: [
            {
              id: 10031,
              author: 'noah',
              text: 'Good point! I work from home but have video calls often.',
              timestamp: '7h 45m ago',
              upvotes: 5
            }
          ]
        },
        {
          id: 1004,
          author: 'charlotte',
          text: 'For ergonomics, consider a split keyboard design like the Ergodox or Kinesis. Great for wrist health!',
          timestamp: '7h ago',
          upvotes: 8
        }
      ]
    },
    {
      id: 11,
      author: 'ethan',
      title: 'What are you currently reading?',
      body: `Looking for book recommendations! I just finished "Project Hail Mary" by Andy Weir and loved it. What book are you currently reading or recently finished that you'd recommend?`,
      timestamp: '14h ago',
      upvotes: 62,
      comments: 9,
      commentData: [
        {
          id: 1101,
          author: 'ava',
          text: '"The Midnight Library" by Matt Haig - makes you think about all the different paths your life could take.',
          timestamp: '13h ago',
          upvotes: 18
        },
        {
          id: 1102,
          author: 'benjamin',
          text: 'If you liked Project Hail Mary, check out "Children of Time" by Adrian Tchaikovsky. Amazing sci-fi with a unique perspective.',
          timestamp: '12h ago',
          upvotes: 15
        },
        {
          id: 1103,
          author: 'amelia',
          text: 'Currently reading "Educated" by Tara Westover. Incredible memoir about self-education and breaking away from a difficult upbringing.',
          timestamp: '11h ago',
          upvotes: 12
        }
      ]
    },
    {
      id: 12,
      author: 'isabella',
      title: 'Made homemade pasta for the first time!',
      body: 'Finally tried making pasta from scratch - just flour and eggs! It was much easier than I expected and tasted amazing. Added a simple marinara sauce with fresh basil. Anyone else enjoy making foods from scratch that most people buy prepared?',
      timestamp: '1d ago',
      upvotes: 104,
      comments: 8,
      commentData: [
        {
          id: 1201,
          author: 'james',
          text: 'Homemade bread is my thing - once you try it, store-bought never tastes the same!',
          timestamp: '23h ago',
          upvotes: 21
        },
        {
          id: 1202,
          author: 'emma',
          text: 'I make my own yogurt! Super easy with an Instant Pot and so much better than store-bought.',
          timestamp: '22h ago',
          upvotes: 16
        },
        {
          id: 1203,
          author: 'henry',
          text: 'Nice! Did you use a pasta machine or roll it by hand?',
          timestamp: '21h ago',
          upvotes: 8,
          replies: [
            {
              id: 12031,
              author: 'isabella',
              text: 'By hand this time! Planning to get a machine if I keep doing it regularly.',
              timestamp: '20h ago',
              upvotes: 7
            }
          ]
        }
      ]
    }
  ]);

  // Check if search is active
  const isSearching = searchQuery.trim() !== '';

  // Filter posts based on search query
  const filteredPosts = isSearching
    ? posts.filter(post => {
        const query = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(query) ||
          post.body.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
        );
      })
    : posts;

  // Add a new post to the posts array
  const handleNewPost = (newPost) => {
    // Add the new post to the beginning of the posts array
    setPosts(prevPosts => [newPost, ...prevPosts]);
    
    // If we're not on the feed tab, switch to it to see the new post
    if (activeTab !== 'feed') {
      setActiveTab('feed');
    }
    
    // Clear search if it's active
    if (searchQuery) {
      setSearchQuery('');
    }
  };

  // Handle search query
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle login/signup
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // Reset selections if navigating to main tabs
    if (tab === 'feed' || tab === 'explore') {
      setSelectedFeed(null);
      setSelectedCommunity(null);
    }
  };

  // Function to handle custom feed selection
  const handleFeedSelect = (feed) => {
    setSelectedFeed(feed);
    setSelectedCommunity(null);
    setActiveTab('custom-feed');
  };

  // Function to handle community selection
  const handleCommunitySelect = (community) => {
    setSelectedCommunity(community);
    setSelectedFeed(null);
    setActiveTab('community');
  };

  // Render landing page if not logged in
  if (!isLoggedIn) {
    return (
      <ThemeProvider>
        <LandingPage onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  // Otherwise render the main app
  return (
    <ThemeProvider>
      {!isLoggedIn ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        <div className={styles.app}>
          <Header 
            onNewPost={handleNewPost}
            posts={posts}
            onSearch={handleSearch}
            searchQuery={searchQuery}
          />
          <div className={`${styles.appContainer} app-content`}>
            {/* Sidebar */}
            <div className={styles.sidebarContainer}>
              <Sidebar 
                activeTab={activeTab} 
                setActiveTab={handleTabChange}
                onFeedSelect={handleFeedSelect}
                onCommunitySelect={handleCommunitySelect}
                selectedFeed={selectedFeed}
                selectedCommunity={selectedCommunity}
              />
            </div>
            
            {/* Center Content */}
            <div className={styles.centerContainer}>
              <div className={styles.feedWrapper}>
                {activeTab === 'feed' && (
                  <>
                    {searchQuery && (
                      <div className={styles.searchMessage}>
                        Showing results for "{searchQuery}"
                      </div>
                    )}
                    <Feed 
                      posts={filteredPosts}
                      isSearching={!!searchQuery}
                    />
                  </>
                )}
                {activeTab === 'explore' && <ExploreTab />}
                {activeTab === 'custom-feed' && selectedFeed && (
                  <CustomFeedView feed={selectedFeed} />
                )}
                {activeTab === 'community' && selectedCommunity && (
                  <CommunityView community={selectedCommunity} />
                )}
              </div>
            </div>
            
            {/* Widgets (right sidebar) */}
            <div className={styles.widgetsContainer}>
              <TrendingWidget />
            </div>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
