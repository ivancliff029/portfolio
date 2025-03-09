"use client"
import React, { useState } from 'react';

const BuyMeCoffee = () => {
  const [amount, setAmount] = useState(1000);

  const handlePayment = () => {
    const flutterwaveConfig = {
      public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: Date.now().toString(),
      amount: amount,
      currency: 'UGX',
      payment_options: 'card,mobilemoney,ussd',
      customer: {
        email: 'user@example.com',
        phone_number: '0700000000',
        name: 'John Doe',
      },
      customizations: {
        title: 'Buy Me a Coffee',
        description: 'Support my work',
        logo: 'https://yourwebsite.com/logo.png',
      },
      callback: (response) => {
        console.log('Payment Successful', response);
        onClose();
      },
      onclose: () => {
        console.log('Payment Closed');
        onClose();
      },
    };

    // Load Flutterwave script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.onload = () => {
      window.FlutterwaveCheckout(flutterwaveConfig);
    };
    document.body.appendChild(script);
  };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Buy Me a Coffee 🙂</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300">Enter the amount you wish to contribute(Ugx):</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
        min="1000"
      />
      <div className="flex justify-end space-x-2">
        <button
          onClick={()=>window.history.back()}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handlePayment}
          className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-800"
        >
          Pay Now
        </button>
      </div>
    </div>
  </div>
  );
};

export default BuyMeCoffee;