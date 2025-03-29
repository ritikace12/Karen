import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ type: "spring", stiffness: 120 }} 
      className="relative z-50"
    >
      <div className="w-full bg-black text-white px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
            <Link to="/" className="text-2xl font-bold tracking-wider">␥ KAREN</Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.div className="flex items-center space-x-4">
              <Link to="/" className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                Home
              </Link>
              <Link to="/about" className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                About
              </Link>
              <Link to="/contact" className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                Contact
              </Link>
              <a 
                href="https://jarvis-12.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                Jarvis
              </a>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-4">
                <Link to="/" className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                  Home
                </Link>
                <Link to="/about" className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                  About
                </Link>
                <Link to="/contact" className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                  Contact
                </Link>
                <a 
                  href="https://jarvis-12.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Jarvis
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar; 