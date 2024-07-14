import React, { useState, FormEvent } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import axios from 'axios';

const ContactForm: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('/api/send-email', {
        name,
        email: userEmail,
        subject: title,
        message
      });

      if (response.data.success) {
        setSuccess(true);
        setShowModal(false);
        // Clear form fields
        setName('');
        setUserEmail('');
        setTitle('');
        setMessage('');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (err) {
      setError('Failed to send email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const circleVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 0.5,
        yoyo: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 py-12 px-4 overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-indigo-200 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            variants={circleVariants}
          />
        ))}
      </motion.div>

      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden z-10">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Contact Me</h2>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <FaEnvelope className="text-indigo-600 mr-2" />
              <span>odekeivancliff@gmail.com</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-indigo-600 mr-2" />
              <span>+256778054598</span>
            </div>
          </div>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://www.linkedin.com/in/odeke-ivan-433914216/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
              <FaLinkedin size={24} />
            </a>
            <a href="https://x.com/ivancliff8" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
              <FaXTwitter size={24} />
            </a>
            <a href="https://github.com/ivancliff029" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
              <FaGithub size={24} />
            </a>
          </div>
          <button
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold cursor-pointer hover:bg-indigo-700 transition duration-300"
            onClick={() => setShowModal(true)}
          >
            Send Message
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Compose Message</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="border border-gray-300 p-3 rounded mb-4 w-full"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                className="border border-gray-300 p-3 rounded mb-4 w-full"
                placeholder="Your Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
              <input
                type="text"
                className="border border-gray-300 p-3 rounded mb-4 w-full"
                placeholder="Subject"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                className="border border-gray-300 p-3 rounded mb-4 w-full"
                rows={4}
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {success && <p className="text-green-500 mb-4">Email sent successfully!</p>}
              <div className="flex justify-end">
                <button
                  className={`bg-indigo-600 text-white py-2 px-6 rounded-lg font-semibold cursor-pointer hover:bg-indigo-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
                <button
                  className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg font-semibold cursor-pointer hover:bg-gray-400 transition duration-300 ml-4"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactForm;