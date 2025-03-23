import { motion } from 'framer-motion';

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative w-full max-w-[300px] aspect-square">
        {/* Outer Ring */}
        <motion.div
          className="w-full h-full rounded-full border-4 border-white/30"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner Ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-3/4 h-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-teal-500/50"
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Center Pulse */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        
        {/* Loading Text */}
        <motion.div
          className="absolute -bottom-12 mt-4 left-1/2 -translate-x-1/2 text-white font-mono text-lg tracking-wider"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          GENERATING
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingAnimation; 