import React from 'react';
import Navbar from '../Components/Navbar';

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                    {children}
                </div>
            </div>
        </>
    );
}