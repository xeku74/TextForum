import React from 'react';
import styles from './LandingPage.module.css';
import '../styles/transitions.css'; // Import transitions

const LandingPage = ({ onLogin }) => {
  return (
    <div className={styles.landingPage}>
      <header className={`${styles.header} header-animate`}>
        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>TextForum</h1>
        </div>
      </header>
      
      <main className="app-content">
        <section className={`${styles.hero} feed-animate`}>
          <div className={styles.heroContent}>
            <h2 className={`${styles.heroTitle} feed-item`}>
              Join the conversation on <span className={styles.highlight}>TextForum</span>
            </h2>
            <p className={`${styles.heroSubtitle} feed-item`}>
              A modern platform for discussions, knowledge sharing, and community building.
              Connect with others who share your interests and passions.
            </p>
            <div className={`${styles.heroCta} feed-item`}>
              <button 
                className={`${styles.primaryButton} ${styles.mobileReady}`}
                onClick={onLogin}
                role="button"
                tabIndex={0}
                aria-label="Get started"
              >
                Get started
              </button>
            </div>
          </div>
          <div className={`${styles.heroImage} feed-item`}>
            <div className={styles.mockupContainer}>
              <div className={styles.mockupFrame}>
                <div className={styles.mockupHeader}></div>
                <div className={styles.mockupSidebar}>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={styles.mockupSidebarItem}></div>
                  ))}
                </div>
                <div className={styles.mockupFeed}>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={styles.mockupPost}></div>
                  ))}
                </div>
                <div className={styles.mockupWidget}></div>
              </div>
            </div>
          </div>
        </section>
        
        <section className={`${styles.featuresSection} feed-animate`}>
          <div className={styles.featuresContainer}>
            <h2 className={`${styles.featuresHeading} feed-item`}>Why join our community?</h2>
            <div className={styles.communityHighlights}>
              <div className={`${styles.highlightCard} feed-item`}>
                <div className={styles.highlightIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className={styles.highlightTitle}>Active Communities</h3>
                <p>Join thousands of communities and find your tribe.</p>
                <a href="#" className={styles.learnMore}>Learn more →</a>
              </div>
              <div className={`${styles.highlightCard} feed-item`}>
                <div className={styles.highlightIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <h3 className={styles.highlightTitle}>Engaging Discussions</h3>
                <p>Participate in lively discussions on topics you love.</p>
                <a href="#" className={styles.learnMore}>Learn more →</a>
              </div>
              <div className={`${styles.highlightCard} feed-item`}>
                <div className={styles.highlightIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <h3 className={styles.highlightTitle}>Events & Meetups</h3>
                <p>Attend events and meet like-minded individuals.</p>
                <a href="#" className={styles.learnMore}>Learn more →</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>© 2023 TextForum. All rights reserved.</p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="#" className={styles.socialLink}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className={styles.socialLink}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className={styles.socialLink}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 