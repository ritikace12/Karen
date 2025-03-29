import { motion } from "framer-motion";
import { useState } from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create mailto link with pre-filled data
      const mailtoLink = `mailto:ritikm361@gmail.com?subject=New Contact Form Submission from ${formData.name}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = mailtoLink;
      link.click();
      
      setSubmitStatus('success');
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 flex-grow relative pb-20">
      <div className="absolute inset-0 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] -z-10"></div>
      <div className="max-w-2xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600">Get in touch with us for any questions or collaborations.</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="3"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
            ></textarea>
          </div>

          {submitStatus === 'success' && (
            <div className="p-4 bg-green-100 text-green-700 rounded-lg">
              Message sent successfully! We'll get back to you soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              Failed to send message. Please try again or email us directly.
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-500"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center space-x-12">
            <motion.a
              href="mailto:ritikm361@gmail.com"
              whileHover={{ scale: 1.2 }}
              className="text-gray-600 hover:text-black transition-colors"
            >
              <EnvelopeIcon className="w-8 h-8" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/ritik-meena-9a5582204/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-gray-600 hover:text-black transition-colors"
            >
              <FaLinkedin className="w-8 h-8" />
            </motion.a>
            <motion.a
              href="https://x.com/ritikmeena_12"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-gray-600 hover:text-black transition-colors"
            >
              <FaTwitter className="w-8 h-8" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact; 