"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { authService } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  profile: any
  loading: boolean
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string, fullName: string) => Promise<any>
  signOut: () => Promise<any>
  updateProfile: (updates: any) => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      if (user) {
        // Get user profile from Firestore
        const { profile } = await authService.getCurrentUserProfile(user)
        setProfile(profile)
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    return authService.signIn(email, password)
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    return authService.signUp(email, password, fullName)
  }

  const signOut = async () => {
    return authService.signOut()
  }

  const updateProfile = async (updates: any) => {
    if (!user) return { error: "No user" }

    const result = await authService.updateProfile(user.uid, updates)
    if (!result.error) {
      // Update local profile state
      setProfile((prev: any) => ({ ...prev, ...updates }))
    }
    return result
  }

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
