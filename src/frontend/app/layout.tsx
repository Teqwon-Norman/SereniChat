import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React, { ReactNode } from 'react'

import './globals.css'

import AuthContext from './context/AuthContext'
import ToasterContext from './context/ToasterContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SereniChat',
  description: 'AI-powered therapist chat application',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={inter.className}
      >
        <AuthContext>
          <ToasterContext />
          { children }
        </AuthContext>
      </body>
    </html>
  );
}
