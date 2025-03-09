"use client"
import React, { useState } from 'react';
import { Coffee } from 'lucide-react';
import PaymentModal from './PaymentModal';

const BuyMeCoffeeSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-4">Support My Work</h2>
            <p className="text-lg mb-6">
              If you found my projects helpful or interesting, consider buying me a coffee. Your support helps me continue creating and maintaining open-source projects.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-amber-600 px-6 py-3 rounded-lg font-bold flex items-center shadow-lg hover:bg-gray-100 transition-colors"
            >
              <Coffee className="mr-2 h-5 w-5" />
              Buy me a coffee
            </button>
          </div>
        </div>
      </div>
      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default BuyMeCoffeeSection;