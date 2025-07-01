import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUp, Mail, Phone } from 'lucide-react';
import { teamMembers } from './teamData';
import './Team.css';
import CustomCursor from '../../Components/Cursor/CustomCursor';

// Error Boundary Component
class TeamErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Team component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong.</h2>
          <p>We're having trouble loading the team page. Please try again later.</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Back to Top Button Component
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="back-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Card Decorations Component
const CardDecorations = () => {
  return (
    <div className="card-decorations">
      <div className="decoration hanger"></div>
      <div className="decoration thread"></div>
      <div className="decoration dress"></div>
      <div className="decoration shape shape-1"></div>
      <div className="decoration shape shape-2"></div>
      <div className="decoration shape shape-3"></div>
      <div className="decoration shape shape-4"></div>
    </div>
  );
};

// Contact Button Component
const ContactButton = ({ type, value, label }) => {
  const handleClick = () => {
    if (type === 'email') {
      window.location.href = `mailto:${value}`;
    } else if (type === 'whatsapp') {
      window.open(`https://wa.me/${value}`, '_blank');
    }
  };

  // WhatsApp SVG Icon
  const WhatsAppIcon = () => (
    <svg 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M17.6 6.31999C16.8 5.49999 15.8 4.89999 14.7 4.49999C13.6 4.09999 12.5 3.99999 11.3 4.09999C10.1 4.19999 9.00001 4.49999 8.00001 5.09999C7.00001 5.59999 6.20001 6.29999 5.50001 7.19999C4.80001 8.09999 4.30001 9.09999 4.10001 10.2C3.80001 11.3 3.90001 12.4 4.10001 13.5C4.40001 14.6 4.90001 15.7 5.70001 16.6L4.10001 20.5L8.10001 19C9.00001 19.6 10 20 11 20.2C12 20.4 13.1 20.3 14.1 20C15.1 19.7 16.1 19.2 16.9 18.5C17.7 17.8 18.4 16.9 18.9 15.9C19.4 14.9 19.6 13.8 19.6 12.7C19.6 11.6 19.3 10.5 18.8 9.49999C18.3 8.49999 17.9 7.19999 17.1 6.39999L17.6 6.31999ZM16.3 15.2C16 15.7 15.6 16 15.2 16.4C14.8 16.7 14.3 16.8 13.8 16.9C13.3 16.9 12.8 16.8 12.3 16.6C11.8 16.4 11.3 16.2 10.9 15.9L10.3 15.6L6.80001 16.9L8.10001 13.5L7.80001 12.9C7.40001 12.4 7.10001 11.9 6.90001 11.4C6.70001 10.9 6.60001 10.3 6.60001 9.79999C6.60001 9.19999 6.70001 8.69999 6.90001 8.19999C7.10001 7.69999 7.40001 7.19999 7.80001 6.79999C8.20001 6.39999 8.60001 6.09999 9.10001 5.79999C9.60001 5.49999 10.1 5.39999 10.7 5.29999C11.2 5.29999 11.8 5.29999 12.3 5.39999C12.8 5.49999 13.3 5.69999 13.8 5.99999C14.3 6.29999 14.7 6.59999 15 6.99999C15.4 7.39999 15.6 7.89999 15.8 8.39999C16 8.89999 16.1 9.49999 16.1 9.99999C16.1 10.6 16 11.1 15.8 11.6C15.6 12.2 15.5 12.6 15.1 13.1L16.3 15.2ZM14.2 12.9C14 12.8 13.8 12.8 13.6 12.7L13.2 12.6C13 12.5 12.8 12.5 12.6 12.5C12.4 12.5 12.1 12.6 11.9 12.7C11.7 12.8 11.4 13.1 11.1 13.4C10.8 13.7 10.6 14 10.3 14.2L10 14.4C9.80001 14.2 9.60001 14 9.40001 13.8C9.20001 13.6 9.00001 13.3 8.80001 13.1C8.60001 12.9 8.40001 12.6 8.20001 12.3C8.00001 12 7.90001 11.8 7.80001 11.5L7.70001 11.3C7.70001 11.1 7.70001 10.9 7.80001 10.7C7.90001 10.5 7.90001 10.3 8.00001 10.2C8.10001 10.1 8.20001 9.89999 8.30001 9.79999C8.40001 9.69999 8.50001 9.49999 8.60001 9.39999C8.70001 9.29999 8.80001 9.09999 8.80001 8.99999C8.80001 8.89999 8.80001 8.79999 8.70001 8.69999C8.60001 8.59999 8.50001 8.49999 8.40001 8.39999C8.30001 8.29999 8.20001 8.19999 8.10001 8.09999C8.00001 7.99999 7.90001 7.89999 7.80001 7.79999C7.70001 7.69999 7.60001 7.59999 7.60001 7.49999C7.50001 7.39999 7.50001 7.29999 7.50001 7.29999C7.50001 7.19999 7.50001 7.09999 7.60001 6.99999C7.70001 6.89999 7.70001 6.79999 7.80001 6.69999C7.90001 6.59999 8.00001 6.49999 8.10001 6.49999C8.20001 6.49999 8.30001 6.39999 8.40001 6.39999H8.60001C8.70001 6.39999 8.80001 6.39999 8.90001 6.39999C9.00001 6.39999 9.10001 6.39999 9.20001 6.49999C9.30001 6.59999 9.30001 6.59999 9.40001 6.69999C9.50001 6.79999 9.60001 6.89999 9.60001 6.99999C9.70001 7.09999 9.80001 7.29999 9.90001 7.39999C10 7.49999 10.1 7.69999 10.2 7.89999C10.3 8.09999 10.4 8.29999 10.5 8.49999C10.6 8.69999 10.7 8.89999 10.8 8.99999C10.9 9.19999 11 9.29999 11.1 9.39999C11.2 9.49999 11.3 9.59999 11.5 9.59999C11.7 9.59999 11.8 9.59999 11.9 9.49999C12 9.39999 12.1 9.29999 12.2 9.19999C12.3 9.09999 12.3 8.89999 12.4 8.79999C12.5 8.69999 12.5 8.49999 12.5 8.39999V8.19999C12.5 8.09999 12.5 7.99999 12.4 7.89999C12.3 7.79999 12.3 7.69999 12.2 7.59999L12 7.39999C11.9 7.29999 11.7 7.19999 11.6 7.09999C11.5 6.99999 11.3 6.89999 11.1 6.79999C10.9 6.69999 10.7 6.69999 10.5 6.59999C10.3 6.49999 10.1 6.49999 9.90001 6.49999C9.70001 6.49999 9.40001 6.49999 9.20001 6.59999C9.00001 6.69999 8.70001 6.79999 8.50001 6.89999C8.30001 6.99999 8.10001 7.19999 7.90001 7.39999C7.70001 7.59999 7.60001 7.79999 7.40001 8.09999C7.30001 8.39999 7.20001 8.69999 7.20001 8.99999C7.20001 9.29999 7.20001 9.69999 7.30001 9.99999C7.40001 10.3 7.50001 10.6 7.70001 10.9C7.90001 11.2 8.10001 11.5 8.30001 11.8C8.50001 12.1 8.80001 12.3 9.10001 12.6C9.40001 12.9 9.70001 13.1 10 13.3C10.3 13.5 10.7 13.7 11.1 13.8C11.5 13.9 11.8 14 12.2 14C12.6 14 13 13.9 13.4 13.8C13.8 13.7 14.1 13.5 14.3 13.3C14.5 13.1 14.7 12.8 14.8 12.5C14.9 12.2 14.9 11.9 14.8 11.6C14.8 11.3 14.7 11.1 14.5 10.9C14.3 10.7 14.1 10.5 13.9 10.4C13.7 10.3 13.5 10.2 13.3 10.1C13.1 10 12.9 9.99999 12.7 9.89999C12.5 9.79999 12.3 9.79999 12.2 9.79999C12.1 9.79999 11.9 9.89999 11.8 9.99999C11.7 10.1 11.6 10.2 11.5 10.4C11.4 10.6 11.4 10.7 11.5 10.9C11.6 11.1 11.7 11.2 11.8 11.3C11.9 11.4 12.1 11.5 12.3 11.6C12.5 11.7 12.7 11.7 12.9 11.7C13.1 11.7 13.3 11.7 13.5 11.6C13.7 11.5 13.8 11.5 14 11.4L14.2 12.9Z" 
        fill="white"
      />
    </svg>
  );

  return (
    <motion.button
      className={`contact-button ${type}`}
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      {type === 'email' ? <Mail size={18} /> : <WhatsAppIcon />}
      <span>{label}</span>
    </motion.button>
  );
};

// Social Button Component
const SocialButton = ({ type, url }) => {
  const handleClick = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <motion.button
      className={`social-button ${type}`}
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`${type} profile`}
    >
      <div className="social-icon"></div>
    </motion.button>
  );
};

// Team Member Component
const TeamMember = ({ member }) => {
  return (
    <motion.div
      className="team-member"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="member-card">
        <CardDecorations />
        
        {/* Glowing border effect */}
        <div className="card-glow"></div>
        
        {/* Image container with exact aspect ratio */}
        <div className="member-image-container">
          <img 
            src={member.image} 
            alt={member.name} 
            className="member-image" 
            loading="lazy" 
          />
          <div className="image-overlay"></div>
          
          {/* Decorative corner elements */}
          <div className="image-corner top-left"></div>
          <div className="image-corner top-right"></div>
          <div className="image-corner bottom-left"></div>
          <div className="image-corner bottom-right"></div>
          
          {/* Floating particles */}
          <div className="particles">
            <div className="particle p1"></div>
            <div className="particle p2"></div>
            <div className="particle p3"></div>
          </div>
        </div>
        
        <div className="member-info">
          <h3 className="member-name">{member.name}</h3>
          
          <div className="contact-buttons">
            <ContactButton 
              type="email" 
              value={member.email} 
              label="Mail Me" 
            />
            <ContactButton 
              type="whatsapp" 
              value={member.whatsapp} 
              label="WhatsApp Me" 
            />
          </div>
          
          <div className="social-buttons">
            <SocialButton type="linkedin" url={member.linkedin} />
            <SocialButton type="instagram" url={member.instagram} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Team Component
const Team = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smoother transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  // First row: Pragya Gupta, Unnati Vikram, Venkat Sai Simhadri
  // Second row: Mrigankar Sonowal, Sanat Mangal
  const firstRowMembers = [
    teamMembers[0], // Pragya
    teamMembers[1], // Unnati
    teamMembers[4]  // Venkat
  ];
  const secondRowMembers = [
    teamMembers[2], // Mrigankar
    teamMembers[3]  // Sanat
  ];

  return (
    <>
    <CustomCursor
        size={32}
        color="rgba(51, 51, 51, 0.52)"
        borderColor="rgba(255, 255, 255, 0.5)"
        blur={true}
        zIndex={9999}
      />
    <TeamErrorBoundary>
      <div className="team-page">
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : (
          <>
            <motion.button
              className="back-button"
              onClick={handleBack}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </motion.button>

            <motion.div
              className="team-header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="team-title">Our Team</h1>
              <div className="team-subtitle">Meet the creative minds behind MASCOM</div>
            </motion.div>

            <div className="team-grid">
              <div className="team-row first-row">
                {firstRowMembers.map((member, index) => (
                  <TeamMember key={index} member={member} />
                ))}
              </div>
              
              <div className="team-row second-row">
                {secondRowMembers.map((member, index) => (
                  <TeamMember key={index + 2} member={member} />
                ))}
              </div>
            </div>

            <BackToTopButton />
          </>
        )}
      </div>
    </TeamErrorBoundary>
    </>
  );
};

export default Team;