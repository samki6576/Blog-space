"use client"

import { useAuth } from "@/components/auth/auth-provider"

export default function DashboardPage() {
  const { user, profile } = useAuth()

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Please log in to view your dashboard.</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {profile?.full_name || user.displayName || "User"}!</h1>
        <p className="text-gray-600 mb-2">This is your dashboard. Here you will find an overview of your posts, stats, and more features coming soon.</p>
      </div>
    </div>
  )
} 