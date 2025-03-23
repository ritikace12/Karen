import { motion } from 'framer-motion';
import { CircleStackIcon, CommandLineIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { FaLinkedin } from 'react-icons/fa';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="relative z-50"
    >
      <div className="w-full bg-black text-white mx-auto px-6 py-5 sm:px-6 lg:px-8 relative">
        {/* Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/10 z-0" />
        
        {/* Content Layer */}
        <div className="flex items-center justify-between h-16 relative z-20">
          {/* Logo Section */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-clip-text tracking-wider">
                ␥ KAREN 
              </span>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <motion.div
              className="hidden md:flex items-center space-x-1 text-jarvis-light/70 text-sm  px-3 py-1 hover:bg-white/5 hover:border-jarvis-primary/50 transition-all duration-300 bg-black"
              whileHover={{ scale: 1.05 }}
            >
              <CommandLineIcon className="w-4 h-4 mr-1" />
              <span>v 1.0.0</span>
            </motion.div>
            <motion.button
              href="mailto:your.email@example.com"
              className="text-jarvis-light border-1 hover:text-jarvis-primary transition-all duration-300 hover:bg-white/5 px-3 py-1 rounded-lg bg-black flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <EnvelopeIcon className="w-5 h-5" />
              <span>Email</span>
            </motion.button>
            <motion.button
              href="https://www.linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-jarvis-light hover:text-jarvis-primary border-1 transition-all duration-300 hover:bg-white/5 px-3 py-1 rounded-lg bg-black flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <FaLinkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </motion.button>

          </div>
        </div>
      </div>

      {/* Animated Border */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-jarvis-primary to-transparent"
        animate={{
          opacity: [0.3, 1, 0.3],
          scaleX: [0.9, 1, 0.9]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.nav>
  );
};

export default Navbar;
  