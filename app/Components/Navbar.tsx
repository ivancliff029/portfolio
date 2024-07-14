"use client";
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-indigo-600">
            <li>
              <a href="/" className="block py-2 px-3 text-white bg-indigo-700 rounded md:bg-transparent md:text-white md:p-0" aria-current="page">Home</a>
            </li>
            <li>
              <a href="/portfolio" className="block py-2 px-3 rounded hover:bg-indigo-700 md:hover:bg-transparent md:border-0 md:hover:text-indigo-200 md:p-0">Portfolio</a>
            </li>
            <li>
              <a href="/blogs" className="block py-2 px-3 rounded hover:bg-indigo-700 md:hover:bg-transparent md:border-0 md:hover:text-indigo-200 md:p-0">Blog</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}