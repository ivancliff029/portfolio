'use client';

import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import { signupUser } from '../models/signupModel';
import { useRouter } from 'next/navigation'; // Use this for Next.js 13+ (app directory)

export default function Signup() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signupUser(formData.email, formData.password, formData.username);
    if (!response.success) {
      setError(response.error);
    } else {
      console.log('User signed up:', response.user);
      router.push('/login');
    }
  };

  return (
    <>
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Create an Account</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <AiOutlineUser className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="relative">
          <AiOutlineMail className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="relative">
          <AiOutlineLock className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
