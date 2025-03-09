import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);
    setIsLoading(true);

    try {
      await addDoc(collection(db, 'newsletter'), {
        email,
        timestamp: new Date()
      });

      setMessage('Thank you for subscribing to my newsletter!');
      setEmail('');
    } catch (error) {
      console.error('Error adding email to newsletter:', error);
      setMessage('An error occurred. Please try again later.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-16">
      <motion.div 
        className="px-6 mx-auto max-w-screen-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-screen-md text-center">
          <motion.h2 
            className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Stay Updated with My Newsletter
          </motion.h2>
          <motion.p 
            className="mx-auto mb-8 max-w-2xl text-gray-600 md:mb-12 sm:text-lg dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Get the latest technology news, CTF challenges, write-ups, and academic papers delivered directly to your inbox.
          </motion.p>
          
          <motion.form 
            onSubmit={handleSubmit}
            className="shadow-md rounded-lg bg-white dark:bg-gray-800 p-6 border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-grow">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  className="block p-3 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter your email"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="py-3 px-5 w-full text-sm font-medium text-white rounded-lg cursor-pointer bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors duration-300 disabled:opacity-70 disabled:hover:bg-blue-600"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing
                    </span>
                  ) : "Subscribe"}
                </button>
              </div>
            </div>
            
            <AnimatePresence>
              {message && (
                <motion.div 
                  className={`mt-4 text-sm ${isError ? 'text-red-500' : 'text-green-500'}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
              Your privacy matters to us.{' '}
              <a href="#" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                Read our Privacy Policy
              </a>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default NewsletterSignup;