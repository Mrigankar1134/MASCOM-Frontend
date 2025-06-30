import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// Mock background image - replace with your actual image
import SponsorBG from '../../assets/Sponsors.jpg';

// Enhanced animated text with scroll-based reveals
const AnimatedText = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number; }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      } : {}}
      className={className}
    >
      {children}
    </motion.div>
  );
};


const SponsorCard = ({ sponsor, index, size = "medium" }: { sponsor: any; index: number; size?: 'large' | 'medium' | 'small'; }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.95]);

  const sizeClasses = {
    large: "w-80 h-48 md:w-96 md:h-56",
    medium: "w-64 h-40 md:w-72 md:h-44",
    small: "w-full aspect-square"
  };

  // Logo size classes based on card size
  const logoSizeClasses: Record<string, string> = {
    large:  "max-w-56 max-h-28 md:max-w-72 md:max-h-56",
    medium: "max-w-44 max-h-22 md:max-w-48 md:max-h-40",
    small:  "max-w-32 max-h-16 md:max-w-38 md:max-h-34"
  };
  // Generate unique animated shapes based on sponsor name
  const getShapePattern = (sponsorName: string, cardSize: 'large' | 'medium' | 'small') => {
    const hash = sponsorName.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    const patterns = [
      // Pattern 1: Floating circles
      Array.from({ length: cardSize === 'large' ? 8 : cardSize === 'medium' ? 6 : 4 }, (_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full"
          style={{
            left: `${15 + (i * 12)}%`,
            top: `${20 + Math.sin(i) * 20}%`,
          }}
          animate={isHovered ? {
            scale: [1, 1.5, 1],
            rotate: [0, 360],
            x: [0, Math.sin(i) * 20, 0],
            y: [0, Math.cos(i) * 15, 0],
          } : {
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 2 + (i * 0.2),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1
          }}
        />
      )),

      // Pattern 2: Geometric triangles
      Array.from({ length: cardSize === 'large' ? 6 : cardSize === 'medium' ? 4 : 3 }, (_, i) => (
        <motion.div
          key={`triangle-${i}`}
          className="absolute border-l-2 border-r-2 border-b-2 border-transparent"
          style={{
            borderBottomColor: `rgba(${100 + i * 20}, ${150 + i * 15}, 255, 0.3)`,
            width: 0,
            height: 0,
            borderLeftWidth: '6px',
            borderRightWidth: '6px',
            borderBottomWidth: '10px',
            left: `${25 + (i * 15)}%`,
            top: `${30 + (i * 8)}%`,
          }}
          animate={isHovered ? {
            rotate: [0, 120, 240, 360],
            scale: [1, 1.3, 0.8, 1],
            x: [0, 10, -10, 0],
          } : {
            rotate: [0, 90, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3 + (i * 0.3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15
          }}
        />
      )),

      // Pattern 3: Pulsing squares
      Array.from({ length: cardSize === 'large' ? 9 : cardSize === 'medium' ? 6 : 4 }, (_, i) => (
        <motion.div
          key={`square-${i}`}
          className="absolute w-3 h-3 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-sm"
          style={{
            left: `${10 + (i % 3) * 25}%`,
            top: `${15 + Math.floor(i / 3) * 20}%`,
          }}
          animate={isHovered ? {
            scale: [1, 1.8, 0.6, 1],
            rotate: [0, 45, 90, 135, 180],
            borderRadius: ["2px", "50%", "2px"],
            x: [0, Math.sin(i) * 15, 0],
            y: [0, Math.cos(i) * 15, 0],
          } : {
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2.5 + (i * 0.2),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1
          }}
        />
      )),

      // Pattern 4: Spiral dots
      Array.from({ length: cardSize === 'large' ? 12 : cardSize === 'medium' ? 8 : 6 }, (_, i) => {
        const angle = (i / (cardSize === 'large' ? 12 : cardSize === 'medium' ? 8 : 6)) * Math.PI * 2;
        const radius = 20 + (i * 2);
        return (
          <motion.div
            key={`spiral-${i}`}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-green-400/40 to-teal-400/40 rounded-full"
            style={{
              left: `${50 + Math.cos(angle) * radius}%`,
              top: `${50 + Math.sin(angle) * radius}%`,
            }}
            animate={isHovered ? {
              scale: [1, 2, 1],
              rotate: [0, 360],
              x: [0, Math.cos(angle + Math.PI) * 10, 0],
              y: [0, Math.sin(angle + Math.PI) * 10, 0],
            } : {
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 3 + (i * 0.1),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05
            }}
          />
        );
      }),

      // Pattern 5: Wave lines
      Array.from({ length: cardSize === 'large' ? 5 : cardSize === 'medium' ? 4 : 3 }, (_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute h-0.5 bg-gradient-to-r from-pink-400/30 via-rose-400/30 to-pink-400/30 rounded-full"
          style={{
            width: `${30 + i * 5}%`,
            left: `${10}%`,
            top: `${25 + i * 15}%`,
          }}
          animate={isHovered ? {
            scaleX: [1, 1.5, 0.8, 1],
            scaleY: [1, 3, 1],
            x: [0, 20, -10, 0],
            rotateZ: [0, 5, -5, 0],
          } : {
            scaleX: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 2.8 + (i * 0.2),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2
          }}
        />
      ))
    ];

    return patterns[hash % patterns.length];
  };

  // Enhanced logo rendering function
  const renderLogo = () => {
    // 1) If sponsor provided any non-empty logo (string URL or imported), and no error
    if (sponsor.logo && !imageError) {
      return (
        <img
          src={sponsor.logo}
          alt={sponsor.fullName || sponsor.name || 'Sponsor logo'}
          className={`${logoSizeClasses[size]} object-contain transition-all duration-500 
            group-hover:scale-110 filter drop-shadow-sm`}
          onError={() => setImageError(true)}
          onLoad={() => setImageError(false)}
        />
      );
    }
    // 2) If sponsor provided a logoUrl and no previous error
    if (sponsor.logoUrl && !imageError) {
      return (
        <img
          src={sponsor.logoUrl}
          alt={sponsor.fullName || sponsor.name || 'Sponsor logo'}
          className={`${logoSizeClasses[size]} object-contain transition-all duration-500 
            group-hover:scale-110 filter drop-shadow-sm`}
          onError={() => setImageError(true)}
          onLoad={() => setImageError(false)}
        />
      );
    }
    // Fallback to styled text logo
    return (
      <div className={`${logoSizeClasses[size]} flex items-center justify-center transition-all duration-500 group-hover:scale-110`}>
        <span className={`text-slate-800 font-bold text-center leading-tight ${
          size === 'large' ? 'text-2xl md:text-3xl' : 
          size === 'medium' ? 'text-lg md:text-xl' : 
          'text-sm md:text-base'
        }`}>
          {sponsor.displayName || sponsor.name || 'Logo'}
        </span>
      </div>
    );
  };

  return (
    <motion.div
      ref={ref}
      style={{ y, scale }}
      initial={{ opacity: 0, rotateY: -15 }}
      animate={isInView ? {
        opacity: 1,
        rotateY: 0,
        transition: {
          duration: 0.7,
          delay: index * 0.1,
          ease: "easeOut"
        }
      } : {}}
      className="text-center group cursor-pointer perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`${sizeClasses[size]} bg-white/95 backdrop-blur-sm rounded-2xl 
          flex items-center justify-center p-6
          shadow-xl border border-white/20 transition-all duration-500 relative overflow-hidden
          hover:scale-105 hover:shadow-2xl hover:bg-white/100`}
        whileHover={{
          y: -8,
          rotateY: 5,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated background shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {getShapePattern(sponsor.name || sponsor.fullName || 'default', size)}

          {/* Additional hover-triggered effects */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-purple-400/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHovered ? {
              opacity: 1,
              scale: 1,
              rotate: [0, 5, -5, 0]
            } : {
              opacity: 0,
              scale: 0.8
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Corner sparkles on hover */}
          {isHovered && [
            { top: '10%', left: '10%' },
            { top: '10%', right: '10%' },
            { bottom: '10%', left: '10%' },
            { bottom: '10%', right: '10%' },
          ].map((pos, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={pos}
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: [0, 1.5, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>

        {/* Main sponsor logo */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          {renderLogo()}
        </div>

        {/* Subtle glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-purple-400/0 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={isHovered ? {
            opacity: [0, 1, 0],
            scale: [0.9, 1.1, 0.9]
          } : { opacity: 0 }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {sponsor.fullName && (
        <motion.p
          className="text-white/80 text-sm font-light mt-3 transition-all duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 10,
            color: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.8)"
          }}
          transition={{ delay: (index * 0.1) + 0.4, duration: 0.5 }}
        >
          {sponsor.fullName}
        </motion.p>
      )}
    </motion.div>
  );
};

// Enhanced decorative line with scroll animations
const AnimatedLine = ({ delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const width = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center mb-12"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay, duration: 0.8 }}
    >
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-20"
        style={{ scaleX: width }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: delay + 0.2, duration: 1.2 }}
      />
      <motion.span
        className="mx-6 text-yellow-400 font-medium text-lg tracking-[0.3em]"
        initial={{ opacity: 0, letterSpacing: "0.1em" }}
        animate={isInView ? { opacity: 1, letterSpacing: "0.3em" } : {}}
        transition={{ delay: delay + 0.5, duration: 0.8 }}
      >
        SPONSORS & PARTNERS
      </motion.span>
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-20"
        style={{ scaleX: width }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: delay + 0.2, duration: 1.2 }}
      />
    </motion.div>
  );
};

// Scroll progress indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

// Floating elements that move with scroll
const FloatingElement = ({ children, className, scrollRange = [0, 1], yRange = [0, -100] }: { children?: React.ReactNode; className: string; scrollRange?: number[]; yRange?: number[]; }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, scrollRange, yRange);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function KillerSponsorsPage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Use scrollYProgress to create a scroll-based animation value
  // Define opacity for scroll animation
  const opacityValue = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  
  // Define the ScrollAnimatedElement component inside the Sponsors component
  const ScrollAnimatedElement = () => (
    <motion.div style={{ opacity: opacityValue }} className="scroll-animated-element">
      {/* Content that changes opacity based on scroll */}
      <h3>Scroll to see animation effect</h3>
    </motion.div>
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Enhanced loading state
    setTimeout(() => setIsLoaded(true), 500);

    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Updated sponsor data with proper logo structure
  const titleSponsor = { 
    name: "Title Sponsor", logo: '../../assets/Sponsors/Khadi.png', // Use imported logo
    fullName: "Khadi India",
    displayName: "KHADI INDIA" // Fallback display name
  };
  
  const coSponsors = [
    { 
      name: "Co-Sponsor 1", 
      logoUrl: "../../assets/Sponsors/UBI.png", // Add actual logo paths
      fullName: "Union Bank of India",
      displayName: "UNION BANK OF INDIA"
    },
    { 
      name: "Co-Sponsor 2", 
      logoUrl: "../../assets/Sponsors/CBI.png", // Add actual logo paths
      fullName: "Central Bank of India",
      displayName: "CENTRAL BANK OF INDIA"
    }
  ];
  
  const partners = [
    { 
      name: "Banking Partner", 
      logoUrl: "../../assets/Sponsors/BOB.png", // Add actual logo paths
      fullName: "Bank of Baroda",
      displayName: "BANK OF BARODA"
    },
    { 
      name: "Music Streaming Partner", 
      logoUrl: "../../assets/Sponsors/JioS.png", // Add actual logo paths
      fullName: "Jio Saavn",
      displayName: "JIO SAAVN"
    },
    { 
      name: "Tech & Lifestyle Partner", 
      logoUrl: "../../assets/Sponsors/Zebronics.png", // Add actual logo paths
      fullName: "Zebronics",
      displayName: "ZEBRONICS"
    },
    { 
      name: "Radio Partner", 
      logoUrl: "../../assets/Sponsors/redfm.png", // Add actual logo paths
      fullName: "Red FM",
      displayName: "RED FM"
    },
    { 
      name: "Travel Partner", 
      logoUrl: "../../assets/Sponsors/AbhiBus.png", // Add actual logo paths
      fullName: "AbhiBus",
      displayName: "ABHIBUS"
    },
    { 
      name: "Hospitality Partner", 
      logoUrl: "../../assets/Sponsors/Sarovar.png", // Add actual logo paths
      fullName: "Sarovar Premiere",
      displayName: "SAROVAR PREMIERE"
    },
    { 
      name: "Vacation Partner", 
      logoUrl: "../../assets/Sponsors/Ease.png", // Add actual logo paths
      fullName: "EaseMyTrip",
      displayName: "EASEMYTRIP"
    },
    { 
      name: "Poker Partner", 
      logoUrl: "../../assets/Sponsors/Adda.png", // Add actual logo paths
      fullName: "Adda 52",
      displayName: "ADDA 52"
    },
    { 
      name: "Bath & BodyCare Partner", 
      logoUrl: "../../assets/Sponsors/pbl.png", // Add actual logo paths
      fullName: "Plum Body Lovin",
      displayName: "PLUM BODY LOVIN"
    },
    { 
      name: "Adventure Partner", 
      logoUrl: "../../assets/Sponsors/Skylark.png", // Add actual logo paths
      fullName: "Skylark School of Paragliding",
      displayName: "SKYLARK"
    },
    { 
      name: "Fooding Partner", 
      logoUrl: "../../assets/Sponsors/Tryst.png", // Add actual logo paths
      fullName: "Tryst Cafe",
      displayName: "TRYST CAFE"
    },
    { 
      name: "Medical Partner", 
      logoUrl: "../../assets/Sponsors/amandeep.png", // Add actual logo paths
      fullName: "Amandeep Group of Hospitals",
      displayName: "AMANDEEP GROUP OF HOSPITALS"
    },
    { 
      name: "Fooding Partner", 
      logoUrl: "../../assets/Sponsors/UV.png", // Add actual logo paths
      fullName: "UV Foods",
      displayName: "UV FOODS"
    },
    { 
      name: "Loistic Partner", 
      logoUrl: "../../assets/Sponsors/VXpress.png", // Add actual logo paths
      fullName: "V-Xpress",
      displayName: "V-XPRESS"
    },
    { 
      name: "Aroma Partner", 
      logoUrl: "../../assets/Sponsors/Shyam.png", // Add actual logo paths
      fullName: "Shyam Ji Perfumers",
      displayName: "SHYAM JI PERFUMERS"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      <ScrollProgress />

      {/* Enhanced Custom Cursor */}
      <motion.div
        className="fixed w-6 h-6 bg-white rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: cursorPosition.x - 12,
          y: cursorPosition.y - 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed w-2 h-2 bg-yellow-400 rounded-full pointer-events-none z-50"
        animate={{
          x: cursorPosition.x - 4,
          y: cursorPosition.y - 4,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
      />

      {/* Static Background - No Movement */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-attachment-fixed"
        style={{
          backgroundImage: `
            linear-gradient(135deg, 
              rgba(0, 0, 0, 0.4) 0%, 
              rgba(0, 0, 0, 0.7) 60%, 
              rgba(0, 0, 0, 0.9) 100%
            ),
            url(${SponsorBG})
          `
        }}
      />

      {/* Dynamic animated overlay */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          background: [
            "linear-gradient(135deg, rgba(59, 130, 246, 0.2), transparent, rgba(147, 51, 234, 0.2))",
            "linear-gradient(225deg, rgba(147, 51, 234, 0.2), transparent, rgba(59, 130, 246, 0.2))",
            "linear-gradient(135deg, rgba(59, 130, 246, 0.2), transparent, rgba(147, 51, 234, 0.2))"
          ]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating background elements */}
      <FloatingElement
        className="absolute top-1/4 left-10 w-2 h-2 bg-yellow-400/30 rounded-full"
        yRange={[0, -200]}
      />
      <FloatingElement
        className="absolute top-1/3 right-20 w-3 h-3 bg-blue-400/20 rounded-full"
        yRange={[0, -150]}
        scrollRange={[0.2, 0.8]}
      />
      
      {/* Add the ScrollAnimatedElement to use the opacity variable */}
      <ScrollAnimatedElement
      />
      <FloatingElement
        className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-purple-400/15 rounded-full"
        yRange={[0, -100]}
        scrollRange={[0.3, 0.9]}
      />

      {/* Enhanced Loading Animation */}
      <motion.div
        className="fixed inset-0 z-40 bg-black flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ pointerEvents: isLoaded ? 'none' : 'auto' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            className="text-white text-3xl font-light tracking-[0.5em] mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            OUR SUPPORTERS
          </motion.div>
          <motion.div
            className="w-32 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>
      </motion.div>

      {/* Main Content with Enhanced Scroll Animations */}
      <motion.div
        className="relative z-10 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        {/* Hero Section - Static Position */}
        <div className="pt-32 pb-20 px-6 text-center">
          <AnimatedText
            className="text-6xl md:text-8xl lg:text-9xl font-light text-white mb-8 tracking-wide"
            delay={0.2}
          >
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Our Supporters
            </motion.span>
          </AnimatedText>

          <AnimatedLine delay={1.2} />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Title Sponsor Section with Enhanced Animations */}
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatedText
              className="text-2xl md:text-4xl font-light text-white mb-8 tracking-wider"
              delay={0.3}
            >
              <motion.span
                initial={{ backgroundSize: "0% 2px" }}
                whileInView={{ backgroundSize: "100% 2px" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1 }}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-no-repeat bg-bottom"
              >
                Aarunya 9.0: Powered by Our Sponsors & Partners
              </motion.span>
            </AnimatedText>

            <AnimatedText
              className="text-yellow-400 text-2xl md:text-3xl font-medium mb-16 tracking-wide"
              delay={0.6}
            >
              {titleSponsor.name}
            </AnimatedText>

            <div className="flex justify-center">
              <SponsorCard sponsor={titleSponsor} index={0} size="large" />
            </div>
          </motion.div>

          {/* Co-Sponsors Section with Staggered Animation */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatedText
              className="text-3xl md:text-4xl font-light text-white text-center mb-16 tracking-wide"
              delay={0.2}
            >
              Co-Sponsors
            </AnimatedText>
            <motion.div
              className="flex justify-center gap-12 flex-wrap"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
            >
              {coSponsors.map((sponsor, index) => (
                <SponsorCard
                  key={sponsor.name}
                  sponsor={sponsor}
                  index={index}
                  size="medium"
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Partners Section with Grid Animation */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatedText
              className="text-2xl md:text-3xl font-light text-white text-center mb-16 tracking-wide"
              delay={0.2}
            >
              Partners
            </AnimatedText>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 max-w-6xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
            >
              {partners.map((partner, index) => (
                <SponsorCard
                  key={partner.name}
                  sponsor={partner}
                  index={index}
                  size="small"
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        * {
          cursor: none !important;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}