import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}