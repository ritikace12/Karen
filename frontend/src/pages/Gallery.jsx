import { motion } from "framer-motion";
import { useState } from "react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images] = useState([
    // Add your generated images here
    // Example:
    // { id: 1, url: "path/to/image1.jpg", prompt: "A beautiful sunset" },
    // { id: 2, url: "path/to/image2.jpg", prompt: "A magical forest" },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Image Gallery
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.url}
                alt={image.prompt}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-600">{image.prompt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div className="bg-white rounded-lg max-w-4xl w-full p-4">
              <img
                src={selectedImage.url}
                alt={selectedImage.prompt}
                className="w-full h-auto rounded-lg"
              />
              <p className="mt-4 text-gray-600">{selectedImage.prompt}</p>
              <button
                onClick={() => setSelectedImage(null)}
                className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Gallery; 