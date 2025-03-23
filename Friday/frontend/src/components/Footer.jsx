import { motion } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/24/solid';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="relative mt-auto py-6"
    >
      {/* Top Border */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-jarvis-primary to-transparent"
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

      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Powered by Section */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-jarvis-light">Powered by</span>
            <span className='text-black'>PORTGAS</span> <span className='text-teal-500'>U!</span>

          </motion.div>

        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
  