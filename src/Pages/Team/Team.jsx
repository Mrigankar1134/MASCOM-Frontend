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

  return (
    <motion.button
      className={`contact-button ${type}`}
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
    >
      {type === 'email' ? <Mail size={18} /> : <Phone size={18} />}
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
        
        <div className="member-image-container">
          <img 
            src={member.image} 
            alt={member.name} 
            className="member-image" 
            loading="lazy" 
          />
          <div className="image-overlay"></div>
        </div>
        
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

  // First row: Pragya Gupta, Unnati Vikram
  // Second row: Mrigankar Sonowal, Sanat Mangal, Venkat Sai Simhadri
  const firstRowMembers = teamMembers.slice(0, 2);
  const secondRowMembers = teamMembers.slice(2, 5);

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