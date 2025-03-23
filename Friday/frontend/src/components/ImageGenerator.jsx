import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiLoader } from 'react-icons/fi';
import axios from 'axios';

function ImageGenerator({ prompt, loading, setLoading }) {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);

  const generateImage = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('http://localhost:5001/generate', {
        prompt: prompt
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.image) {
        setGeneratedImage(response.data.image);
      } else {
        throw new Error('No image received from server');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      setError(error.message || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  // Call generateImage when prompt changes and is not empty
  useEffect(() => {
    if (prompt && prompt.trim() !== '') {
      generateImage();
    }
  }, [prompt]);

  return (
    <div className="image-generator">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="loader-container"
          >
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="loader-icon"
            >
              <FiLoader size={40} />
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
              className="progress-bar"
            />
            <motion.p
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="loading-text"
            >
              Generating your masterpiece...
            </motion.p>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="error-container"
          >
            <p className="error-text">{error}</p>
          </motion.div>
        ) : generatedImage ? (
          <motion.div
            key="image"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="generated-image-container"
          >
            <motion.img
              src={generatedImage}
              alt="Generated artwork"
              className="generated-image"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default ImageGenerator; 