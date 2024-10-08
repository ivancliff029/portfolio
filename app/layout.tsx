// app/layout.tsx
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from "@vercel/analytics/react"
import { Inter } from 'next/font/google';
import './globals.css';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        >
          {children}
          <Analytics />
        </ClerkProvider>
      </body>
    </html>
  );
}
