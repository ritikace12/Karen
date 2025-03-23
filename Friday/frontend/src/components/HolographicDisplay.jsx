import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

function HolographicDisplay() {
  const float = useSpring({
    from: { transform: 'translateY(0px)' },
    to: { transform: 'translateY(-10px)' },
    config: { duration: 2000 },
    loop: { reverse: true }
  });

  return (
    <div className="holographic-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="hologram-frame"
      >
        <animated.div style={float} className="hologram-content">
          <div className="hexagon-grid">
            {Array(6).fill(null).map((_, i) => (
              <motion.div
                key={i}
                className="hexagon bg-white"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          <div className="scanning-line" />
        </animated.div>
      </motion.div>
    </div>
  );
}

export default HolographicDisplay; 