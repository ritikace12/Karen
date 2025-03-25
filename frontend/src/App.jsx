// ========================== IMPORTS ==========================
import { useState } from "react";
import { FiImage, FiRefreshCw } from "react-icons/fi"; 
import { FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { EnvelopeIcon, CommandLineIcon } from "@heroicons/react/24/outline";

// API endpoint: Adjusts based on environment
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/generate-image"; 

// ========================== MAIN COMPONENT ==========================
function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setImage(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Failed to generate image");

      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate image. Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPrompt("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 120 }} className="relative z-50">
        <div className="w-full bg-black text-white px-10 py-5 relative">
          <div className="flex items-center justify-between px-10 h-16">
            <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
              <span className="text-2xl font-bold tracking-wider">␥ KAREN</span>
            </motion.div>
            <div className="flex items-center space-x-6">
              <motion.a href="mailto:your.email@example.com" className="px-3 py-1 rounded-lg flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                <EnvelopeIcon className="w-5 h-5" />
                <span>Email</span>
              </motion.a>
              <motion.a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-lg flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                <FaLinkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center p-6 flex-grow relative bg-texture">
        <div className="relative text-center">
          <h1 className="text-3xl font-bold text-black mb-6">Text-to-Image Generator</h1>
          <form onSubmit={handleGenerate} className="w-full max-w-md flex flex-col items-center space-y-4">
            <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full p-3 rounded-lg border border-black text-black shadow-sm" placeholder="Enter image description..." disabled={isLoading} />
            <button type="submit" className="p-3 bg-black text-white rounded-lg w-full flex items-center justify-center shadow-md">
              {isLoading ? "Generating..." : "Generate Image"} <FiImage className="ml-2" />
            </button>
            {image && (
              <>
                <img src={image} alt="Generated" className="mt-4 rounded-lg shadow-lg max-w-full h-auto border-2" />
                <button onClick={clearImage} className="p-3 bg-[#ffd700] text-[#0a0a2a] rounded-lg w-full flex items-center justify-center mt-2">
                  Clear <FiRefreshCw className="ml-2" />
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

