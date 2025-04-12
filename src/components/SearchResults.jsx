import React from 'react';
import styles from './SearchResults.module.css';

const SearchResults = ({ results, suggestions, query, isVisible, onPostClick, onClearSearch }) => {
  // Don't render anything if not visible or no query
  if (!isVisible || !query) return null;
  
  // Group the results by type (posts, users, communities)
  const postResults = results.filter(result => result.type === 'post');
  const userResults = results.filter(result => result.type === 'user');
  const communityResults = results.filter(result => result.type === 'community');
  
  return (
    <div className={styles.searchResultsContainer}>
      {query && suggestions.length > 0 && (
        <div className={styles.suggestionsSection}>
          <h3 className={styles.sectionTitle}>Suggestions</h3>
          <ul className={styles.suggestionsList}>
            {suggestions.map((suggestion, index) => (
              <li 
                key={`suggestion-${index}`} 
                className={styles.suggestionItem}
                onClick={() => onPostClick(suggestion)}
              >
                <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15.8033 15.8033M15.8033 15.8033C17.1605 14.4461 18 12.5711 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.5711 18 14.4461 17.1605 15.8033 15.8033Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{suggestion.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Results sections - only show each section if there are results of that type */}
      {query && (
        <div className={styles.resultsContainer}>
          {postResults.length > 0 && (
            <div className={styles.resultsSection}>
              <h3 className={styles.sectionTitle}>Posts</h3>
              <ul className={styles.resultsList}>
                {postResults.map(post => (
                  <li 
                    key={`post-${post.id}`} 
                    className={styles.resultItem}
                    onClick={() => onPostClick(post)}
                  >
                    <div className={styles.resultContent}>
                      <h4 className={styles.resultTitle}>
                        {post.title}
                      </h4>
                      <p className={styles.resultMeta}>
                        Posted by u/{post.author} • {post.timestamp}
                      </p>
                      <p className={styles.resultBody}>
                        {post.body.length > 120 ? `${post.body.substring(0, 120)}...` : post.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {userResults.length > 0 && (
            <div className={styles.resultsSection}>
              <h3 className={styles.sectionTitle}>Users</h3>
              <ul className={styles.resultsList}>
                {userResults.map(user => (
                  <li 
                    key={`user-${user.id}`} 
                    className={styles.resultItem}
                    onClick={() => onPostClick(user)}
                  >
                    <div className={styles.userResult}>
                      <div className={styles.userAvatar}>
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className={styles.resultTitle}>u/{user.username}</h4>
                        <p className={styles.resultMeta}>{user.karma} karma</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {communityResults.length > 0 && (
            <div className={styles.resultsSection}>
              <h3 className={styles.sectionTitle}>Communities</h3>
              <ul className={styles.resultsList}>
                {communityResults.map(community => (
                  <li 
                    key={`community-${community.id}`} 
                    className={styles.resultItem}
                    onClick={() => onPostClick(community)}
                  >
                    <div className={styles.communityResult}>
                      <div className={styles.communityIcon}>
                        {community.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className={styles.resultTitle}>r/{community.name}</h4>
                        <p className={styles.resultMeta}>{community.members} members</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {postResults.length === 0 && userResults.length === 0 && communityResults.length === 0 && (
            <div className={styles.noResults}>
              <p>No results found for "{query}"</p>
              <p className={styles.noResultsTip}>
                Try different keywords or check your spelling
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Clear search button */}
      {isVisible && query && (
        <button 
          className={styles.clearButton}
          onClick={onClearSearch}
        >
          Clear search
        </button>
      )}
    </div>
  );
};

export default SearchResults; 