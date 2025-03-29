import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 fixed bottom-0 w-full">
      <div className="container mx-auto px-6">
        <div className="flex justify-center items-center">
          <p className="text-sm">
            Powered by <span className="text-lime-500 font-medium">PORTGAS UI</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 