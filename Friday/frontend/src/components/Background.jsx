import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion-3d';

function Background() {
  return (
    <div className="background-container">
      <Canvas>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <motion.mesh
          animate={{
            rotateX: [0, Math.PI * 2],
            rotateY: [0, Math.PI * 2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <torusGeometry args={[9, 0.2, 16, 100]} />
          <meshStandardMaterial color="#0ff" wireframe />
        </motion.mesh>
      </Canvas>
    </div>
  );
}

export default Background; 