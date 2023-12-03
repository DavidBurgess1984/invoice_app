"use client"

import InvoiceForm from '@/src/form/invoice-form'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/src/elements/header'
import { LightboxProvider } from '@/src/providers/lightbox-provider'
import { ThemeProvider, useTheme } from '@/src/providers/theme-provider'
import App from './app'
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <ThemeProvider>
      <LightboxProvider>
        <App>
          {children}
        </App>
    </LightboxProvider>
  </ThemeProvider>
  )
}
