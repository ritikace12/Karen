import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-8">About Karen</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">What is Karen?</h2>
            <p className="text-gray-600 mb-4">
              Karen is an advanced AI image generation assistant that transforms your imagination into stunning visuals. 
              Powered by cutting-edge AI technology, Karen can create unique, high-quality images based on your text descriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Instant image generation</li>
                <li>• High-quality output</li>
                <li>• User-friendly interface</li>
                <li>• Gallery of generated images</li>
                <li>• Responsive design</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-4">How It Works</h3>
              <ul className="space-y-2 text-gray-600">
                <li>1. Enter your image description</li>
                <li>2. Click "Generate Image"</li>
                <li>3. Wait for AI processing</li>
                <li>4. View your generated image</li>
                <li>5. Save or share your creation</li>
              </ul>
            </motion.div>
          </div>

      
        </motion.div>
      </div>
    </div>
  );
};

export default About; 