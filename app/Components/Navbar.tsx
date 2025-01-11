"use client";
import Image from 'next/image';
import { useState } from 'react';
import { FaHome, FaBriefcase, FaBlog, FaStar } from 'react-icons/fa';
import { useClerk, useUser } from '@clerk/nextjs';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { signOut } = useClerk();
  const { user } = useUser();

  const navItems = [
    { href: '/', label: 'Home', icon: FaHome },
    { href: '/portfolio', label: 'Portfolio', icon: FaBriefcase },
    { href: '/blogs', label: 'Blog', icon: FaBlog },
    { href: '/reviews', label: 'Reviews', icon: FaStar },
  ];

  return (
    <>
      <nav className="bg-indigo-600 text-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image 
              src="/img/favicon.png" 
              className="h-12 w-12" 
              alt="My logo" 
              width={48} 
              height={48} 
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">Odeke Ivan</span>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  type="button"
                  className="flex text-sm rounded-full focus:ring-4 focus:ring-indigo-300"
                  id="user-menu-button"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img className="w-8 h-8 rounded-full" src={user.imageUrl || '/img/default-avatar.png'} alt="user photo" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow" id="user-dropdown">
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900">{user.fullName}</span>
                      <span className="block text-sm text-gray-500 truncate">{user.primaryEmailAddress?.emailAddress}</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                      </li>
                      <li>
                        <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</a>
                      </li>
                      <li>
                        <button onClick={() => signOut()} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              aria-controls="navbar-user"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
          </div>
          <div className={`items-center justify-center w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-indigo-600 md:justify-center">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className={`flex items-center py-2 px-3 rounded hover:bg-indigo-700 md:hover:bg-transparent md:hover:text-indigo-200 md:p-0 ${
                      index === 0 ? 'bg-indigo-700 text-white md:bg-transparent md:text-white' : ''
                    }`}
                    aria-current={index === 0 ? 'page' : undefined}
                  >
                    <item.icon className="mr-2" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
