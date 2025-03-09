import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white font-medium`}
    >
      <div className="flex items-center">
        <span>{message}</span>
        <button 
          onClick={onClose} 
          className="ml-4 text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/send-email', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      if (response.data.success) {
        showToast('Message sent successfully!', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (err) {
      showToast('Failed to send message. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 } 
    }
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.01,
      },
    },
  };

  const bubbleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
      transition: {
        delay: i * 0.02,
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    }),
  };

  const contactInfo = [
    { icon: <FaEnvelope />, text: 'odekeivancliff@gmail.com', href: 'mailto:odekeivancliff@gmail.com' },
    { icon: <FaPhone />, text: '+256 778 054 598', href: 'tel:+256778054598' },
  ];

  const socialLinks = [
    { icon: <FaLinkedin size={24} />, url: 'https://www.linkedin.com/in/odeke-ivan-433914216/', label: 'LinkedIn' },
    { icon: <FaXTwitter size={24} />, url: 'https://x.com/ivancliff8', label: 'Twitter' },
    { icon: <FaGithub size={24} />, url: 'https://github.com/ivancliff029', label: 'GitHub' },
  ];

  const formFields = [
    { name: 'name', type: 'text', placeholder: 'Your Name', required: true },
    { name: 'email', type: 'email', placeholder: 'Your Email', required: true },
    { name: 'subject', type: 'text', placeholder: 'Subject', required: true },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center py-16 px-4 overflow-hidden">
      {/* Custom Toast Notification */}
      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={hideToast} 
          />
        )}
      </AnimatePresence>
      
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 z-0"
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
      >
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            className="absolute rounded-full bg-indigo-300"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 12 + 5}px`,
              height: `${Math.random() * 12 + 5}px`,
            }}
            variants={bubbleVariants}
          />
        ))}
      </motion.div>
      
      <motion.div 
        className="w-full max-w-4xl z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden backdrop-blur-sm bg-opacity-95">
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Contact details sidebar */}
            <div className="md:col-span-2 bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <a 
                      key={index}
                      href={item.href}
                      className="flex items-center space-x-3 hover:text-indigo-200 transition duration-300"
                    >
                      <div className="text-xl">{item.icon}</div>
                      <span>{item.text}</span>
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
                <div className="flex space-x-5">
                  {socialLinks.map((link, index) => (
                    <a 
                      key={index}
                      href={link.url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-indigo-200 transition-all duration-300 transform hover:scale-110"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contact form */}
            <div className="md:col-span-3 p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {formFields.map((field) => (
                  <div key={field.name} className="relative">
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  </div>
                ))}
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                    placeholder="Your Message"
                    rows={5}
                    required
                  ></textarea>
                </div>
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactForm;