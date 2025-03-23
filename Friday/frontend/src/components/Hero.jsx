import { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import LoadingAnimation from "./LoadingAnimation";
import { SparklesIcon, PhotoIcon } from "@heroicons/react/24/outline";

const Hero = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef(null);

  const generateImage = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt first!", {
        style: {
          background: '#003554',
          color: '#E6F6FF',
        }
      });
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/generate", { prompt });
      setImage(response.data.image);
      toast.success("Image generated successfully!", {
        style: {
          background: '#003554',
          color: '#E6F6FF',
        }
      });
      // Scroll to the image after generation
      setTimeout(() => {
        imageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again.", {
        style: {
          background: '#003554',
          color: '#E6F6FF',
        }
      });
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 relative py-20"
    >
      <Toaster position="top-right" />
      {loading && <LoadingAnimation />}
      
      {/* Background Layer */}
      <div className="absolute inset-0 bg-white z-0" />
      
      {/* Dots Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(black_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 z-10" />
      
      {/* Content Layer */}
      <div className="relative z-20 w-full max-w-2xl flex flex-col items-center space-y-12">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-jarvis-primary via-jarvis-highlight to-jarvis-accent bg-clip-text">
            KAREN
          </h2>
          <p className="text-lg">Your AI-powered image generation assistant</p>
        </motion.div>

        <motion.div 
          className="w-full space-y-6 flex flex-col items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative w-full">
            <input
              type="text"
              className="w-full p-4 pl-12 rounded-lg bg-white border-2 border-jarvis-primary/30 focus:border-jarvis-primary outline-none text-black placeholder-jarvis-light/50 transition-all duration-300"
              placeholder="Describe your imagination..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <SparklesIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-jarvis-primary" />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-48 bg-white hover:bg-gray-50 px-3 py-2 border-2 border-black rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300"
            onClick={generateImage}
            disabled={loading}
          >
            <PhotoIcon className="w-5 h-5 text-black" />
            <span className="text-black">{loading ? "Generating..." : "Generate Image"}</span>
          </motion.button>
        </motion.div>
        
        {/* Image Container */}
        <div ref={imageRef} className="w-full min-h-[400px] flex items-center justify-center">
          {image && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring" }}
              className="w-full p-4 bg-white rounded-xl border border-black/20"
            >
              <motion.img 
                src={image} 
                alt="Generated" 
                className="w-full max-w-xl rounded-lg shadow-lg"
                layoutId="generated-image"
              />
              <motion.a
                href={image}
                download="jarvis-generated-image.jpg"
                className="block text-center bg-black text-white hover:bg-black/90 px-6 py-3 mt-4 rounded-lg font-semibold transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Download Image
              </motion.a>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
