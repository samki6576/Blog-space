"use client"

import { useAuth } from "@/components/auth/auth-provider"
import Image from "next/image"

export default function ProfilePage() {
  const { user, profile } = useAuth()

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Please log in to view your profile.</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <Image
          src={profile?.avatar_url || user.photoURL || "/placeholder-user.jpg"}
          alt={profile?.full_name || user.displayName || user.email}
          width={120}
          height={120}
          className="rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{profile?.full_name || user.displayName || "User"}</h2>
        <p className="text-gray-600 mb-2">{user.email}</p>
        <p className="text-gray-500 text-sm">Welcome to your profile page!</p>
      </div>
    </div>
  )
} 