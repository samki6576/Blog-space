import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Header } from "@/components/layout/header"
import { Toaster } from "react-hot-toast"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BlogSpace - Complete Blog Platform",
  description: "A complete, feature-rich blog platform built with Next.js and Supabase",
  generator: "Samra",

  icons: {
    icon: [
      { url: "/r.png", sizes: "32x32" },
      { url: "/r.png", sizes: "192x192" },
      { url: "/r.png", sizes: "512x512" },
    ],
    apple: [{ url: "/r.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",

  openGraph: {
    title: "BlogSpace - Complete Blog Platform",
    description: "A complete, feature-rich blog platform built with Next.js and Supabase",
    url: "https://yourdomain.com",
    siteName: "BlogSpace",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlogSpace - Complete Blog Platform",
    description: "A complete, feature-rich blog platform built with Next.js and Supabase",
    images: ["/og-image.png"],
    creator: "@yourhandle",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            <Toaster position="top-right" />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
