// ========================== IMPORTS ==========================
// Import necessary React hooks
import { useState } from "react";

// Import icons from react-icons library
import { FiImage, FiRefreshCw } from "react-icons/fi"; 
import { FaLinkedin } from "react-icons/fa";

// Import animations from Framer Motion for smooth UI interactions
import { motion } from "framer-motion";

// Import icons from Heroicons for additional UI elements
import { EnvelopeIcon, CommandLineIcon } from "@heroicons/react/24/outline";

// API endpoint for the image generation service (Update when deploying)
const API_URL = "http://localhost:8080/api/generate-image"; 

// ========================== MAIN COMPONENT ==========================
function App() {
  // ========================== STATE MANAGEMENT ==========================
  // Stores the user's input (image description)
  const [prompt, setPrompt] = useState("");
  
  // Stores the generated image URL
  const [image, setImage] = useState(null);
  
  // Loading state to prevent multiple requests
  const [isLoading, setIsLoading] = useState(false);

  // ========================== HANDLE IMAGE GENERATION ==========================
  const handleGenerate = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    
    if (!prompt.trim() || isLoading) return; // Prevent sending empty input or multiple requests

    setIsLoading(true); // Set loading state while processing
    setImage(null); // Clear previous image while new one generates

    try {
      // Send request to backend API with user prompt
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Failed to generate image");

      // Convert response to a blob (image format)
      const blob = await response.blob();
      
      // Create a temporary URL for the generated image
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl); // Update state with new image
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate image. Try again!"); // Show error message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // ========================== CLEAR IMAGE FUNCTION ==========================
  const clearImage = () => {
    setImage(null); // Remove the displayed image
    setPrompt(""); // Clear input field
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* ========================== NAVBAR ========================== */}
      <motion.nav 
  initial={{ y: -100 }} // Start position (hidden)
  animate={{ y: 0 }} // Slide down animation
  transition={{ type: "spring", stiffness: 120 }} // Smooth transition
  className="relative z-50"
>
  <div className="w-full bg-black text-white px-10 py-5 relative overflow-hidden">
    
    {/* Animated Moving Background */}
    <div className="absolute inset-0 z-0 animate-gradient bg-[radial-gradient(circle_at_center,_#000000,_#111111,_#222222)] opacity-80"></div>
    
    {/* Gradient Overlay for Depth */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/10 z-10" />

    <div className="flex items-center justify-between px-10 h-16 relative z-20">
      
      {/* App Name */}
      <motion.div 
        className="flex items-center space-x-3"
        whileHover={{ scale: 1.05 }} // Slight zoom effect on hover
      >
        <span className="text-2xl font-bold bg-clip-text tracking-wider">␥ KAREN</span>
      </motion.div>

      {/* Navbar Links */}
      <div className="flex items-center space-x-6">
        
        {/* Version Badge */}
        <motion.div
          className="hidden md:flex items-center text-sm px-3 py-1 hover:bg-white/5 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <CommandLineIcon className="w-4 h-4 mr-1" />
          <span>v 1.0.0</span>
        </motion.div>

        {/* Email Contact */}
        <motion.a
          href="mailto:your.email@example.com"
          className="border-1 hover:bg-white/5 px-3 py-1 rounded-lg flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <EnvelopeIcon className="w-5 h-5" />
          <span>Email</span>
        </motion.a>

        {/* LinkedIn Contact */}
        <motion.a
          href="https://www.linkedin.com/in/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="border-1 hover:bg-white/5 px-3 py-1 rounded-lg flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <FaLinkedin className="w-5 h-5" />
          <span>LinkedIn</span>
        </motion.a>
      </div>
    </div>
  </div>
</motion.nav>


      {/* ========================== MAIN CONTENT ========================== */}
      <div className="flex flex-col items-center justify-center p-6 flex-grow relative bg-texture">
  
  {/* Subtle Background Gradient for Depth */}
  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 opacity-60 z-0"></div>

  {/* Noise/Texture Overlay */}
  <div className="absolute inset-0 bg-noise opacity-10 z-10"></div>

  {/* Main Content */}
  <div className="relative z-20 text-center">
    <h1 className="text-3xl font-bold text-black mb-6">Text-to-Image Generator</h1>

    {/* ========================== IMAGE GENERATION FORM ========================== */}
    <form onSubmit={handleGenerate} className="w-full max-w-md flex flex-col items-center space-y-4">
      
      {/* Input Field */}
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-3 rounded-lg bg-white border border-black text-black shadow-sm"
        placeholder="Enter image description..."
        disabled={isLoading} // Disable input while generating
      />

      {/* Generate Image Button */}
      <button type="submit" className="p-3 bg-black text-white rounded-lg w-full flex items-center justify-center shadow-md">
        {isLoading ? "Generating..." : "Generate Image"} <FiImage className="ml-2" />
      </button>

      {/* ========================== DISPLAY GENERATED IMAGE ========================== */}
      {image && (
        <>
          {/* Generated Image Display */}
          <img 
            src={image} 
            alt="Generated" 
            className="mt-4 rounded-lg shadow-lg max-w-full h-auto border-2" 
          />
          
          {/* Clear Image Button */}
          <button 
            onClick={clearImage} 
            className="p-3 bg-[#ffd700] text-[#0a0a2a] rounded-lg w-full flex items-center justify-center mt-2"
          >
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


