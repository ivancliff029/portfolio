"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../lib/firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const BuyMeCoffee = () => {
  const [amount, setAmount] = useState(1000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Predefined donation amounts
  const presetAmounts = [1000, 5000, 10000, 20000];

  const handleAmountChange = (e) => {
    const value = parseInt(e.target.value);
    setAmount(isNaN(value) ? 1000 : Math.max(1000, value));
    setError('');
  };

  const handleSelectAmount = (value) => {
    setAmount(value);
    setError('');
  };

  const handleCancel = () => {
    router.back();
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setError('');

      if (amount < 1000) {
        setError('Minimum donation amount is 1,000 UGX');
        setIsProcessing(false);
        return;
      }

      // Generate a unique transaction reference
      const txRef = `coffee-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      const flutterwaveConfig = {
        public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: txRef,
        amount: amount,
        currency: 'UGX',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email: 'user@example.com', // Ideally this would come from user context/auth
          phone_number: '0700000000', // Ideally this would come from user context/auth
          name: 'John Doe', // Ideally this would come from user context/auth
        },
        customizations: {
          title: 'Buy Me a Coffee',
          description: 'Support my work with a small donation',
          logo: 'https://yourwebsite.com/logo.png',
        },
        callback: (response) => {
          console.log('Payment Successful', response);
          // Store payment data and show success message
          onPaymentSuccess(response, txRef);
        },
        onclose: () => {
          setIsProcessing(false);
          console.log('Payment Closed');
        },
      };

      // Load Flutterwave script dynamically
      loadFlutterwaveScript(flutterwaveConfig);
    } catch (err) {
      console.error('Payment initialization error:', err);
      setError('Failed to initialize payment. Please try again.');
      setIsProcessing(false);
    }
  };

  const loadFlutterwaveScript = (config) => {
    // Check if script already exists
    if (document.getElementById('flutterwave-script')) {
      window.FlutterwaveCheckout(config);
      return;
    }

    const script = document.createElement('script');
    script.id = 'flutterwave-script';
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.async = true;
    script.onload = () => {
      window.FlutterwaveCheckout(config);
    };
    script.onerror = () => {
      setError('Failed to load payment gateway. Please try again later.');
      setIsProcessing(false);
    };
    document.body.appendChild(script);
  };

  const onPaymentSuccess = async (response, txRef) => {
    // Mark as processing until Firestore operation completes
    setIsProcessing(true);
    
    try {
      // Get the key data points from Flutterwave response
      const { transaction_id, tx_ref, flw_ref, amount, currency, status, payment_type } = response;
      
      // Get user information - ideally from authentication context
      // This is placeholder - replace with actual user data in your app
      const userData = {
        name: response.customer?.name || 'Anonymous',
        email: response.customer?.email || 'anonymous@example.com',
        phone: response.customer?.phone_number || 'N/A'
      };
      
      // Create donation record to store in Firestore
      const donationData = {
        transactionId: transaction_id,
        transactionReference: tx_ref || txRef, // Use the ref from response or our generated one
        flutterwaveReference: flw_ref,
        amount: parseFloat(amount),
        currency: currency,
        status: status,
        paymentMethod: payment_type,
        donor: userData,
        timestamp: serverTimestamp(), // Firestore server timestamp
        metadata: response // Optionally store the complete response
      };
      
      // Add the document to Firestore
      const donationsRef = collection(db, 'donations');
      const docRef = await addDoc(donationsRef, donationData);
      
      console.log('Donation saved to Firestore with ID:', docRef.id);
      
      // Show success message
      setSuccess(true);
      setIsProcessing(false);
      
      // Optional: Set a timeout to redirect after showing success message
      setTimeout(() => {
        router.back();
      }, 3000);
      
    } catch (error) {
      console.error('Error saving donation to Firestore:', error);
      setError('Payment was successful, but we encountered an error saving your donation. Please contact support.');
      setIsProcessing(false);
    }
  };

  // Clean up any scripts when component unmounts
  useEffect(() => {
    return () => {
      const script = document.getElementById('flutterwave-script');
      if (script) {
        script.remove();
      }
    };
  }, []);

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-11/12 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">Thank You!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your donation of {amount.toLocaleString()} UGX has been received. Your support means a lot!
          </p>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-11/12 max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">Buy Me a Coffee ☕</h2>
          <p className="text-gray-600 dark:text-gray-300">Your support keeps me caffeinated and coding!</p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Donation Amount (UGX)
          </label>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {presetAmounts.map((presetAmount) => (
              <button
                key={presetAmount}
                onClick={() => handleSelectAmount(presetAmount)}
                className={`px-3 py-2 rounded-md text-sm ${
                  amount === presetAmount 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {presetAmount.toLocaleString()} UGX
              </button>
            ))}
          </div>
          
          <div className="relative">
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md mb-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              min="1000"
              step="500"
            />
            <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">UGX</span>
          </div>
          
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Minimum donation: 1,000 UGX
          </p>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            disabled={isProcessing}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 font-medium transition-colors flex items-center ${
              isProcessing ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Donate Now'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyMeCoffee;