// ========================== IMPORTS ==========================
import { useState } from "react";
import { FiImage, FiRefreshCw, FiDownload } from "react-icons/fi"; 
import { FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";

// ✅ Set API URL correctly
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/generate-image"; 

// Home component with image generation functionality
const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  // ✅ Added error state

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setImage(null);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
      
      // Scroll to the image after generation
      setTimeout(() => {
        const imageElement = document.getElementById('generated-image');
        if (imageElement) {
          imageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } catch (error) {
      console.error("❌ Error:", error);
      setError("Failed to generate image. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!image) return;
    
    const link = document.createElement('a');
    link.href = image;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearImage = () => {
    setImage(null);
    setPrompt("");
    setError(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 flex-grow relative pb-20">
      <div className="absolute inset-0 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] -z-10"></div>
      <div className="relative text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Text-to-Image Generator</h1>
        <form onSubmit={handleGenerate} className="w-full flex flex-col items-center space-y-4">
          <input 
            type="text" 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
            className="w-full p-4 rounded-lg border border-gray-300 text-gray-900 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent bg-white" 
            placeholder="Enter image description..." 
            disabled={isLoading} 
          />
          <button 
            type="submit" 
            className={`p-4 rounded-lg w-full flex items-center justify-center shadow-md text-lg ${
              isLoading ? "bg-gray-500" : "bg-black text-white hover:bg-gray-800 transition-colors"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Image"} <FiImage className="ml-2" />
          </button>

          {error && <p className="text-red-600 font-medium">{error}</p>}

          {image && (
            <div id="generated-image" className="mt-8 space-y-4">
              <img src={image} alt="Generated" className="rounded-lg shadow-lg max-w-full h-auto border-2 border-gray-200 bg-white" />
              <div className="flex space-x-4">
                <button 
                  onClick={handleDownload}
                  className="flex-1 p-4 bg-green-600 text-white rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
                >
                  Download <FiDownload className="ml-2" />
                </button>
                <button 
                  onClick={clearImage} 
                  className="flex-1 p-4 bg-[#ffd700] text-[#0a0a2a] rounded-lg flex items-center justify-center hover:bg-[#ffed4a] transition-colors"
                >
                  Clear <FiRefreshCw className="ml-2" />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


