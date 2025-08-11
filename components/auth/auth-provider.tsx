"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { authService } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  profile: any
  loading: boolean
  error: Error | null
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
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Early return if Firebase auth isn't initialized
    if (!auth) {
      setError(new Error("Firebase auth not initialized"))
      setLoading(false)
      return
    }

    let unsubscribe: () => void

    try {
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        try {
          setUser(user)
          
          if (user) {
            const result = await authService.getCurrentUserProfile(user)
            if (result.error) {
              throw new Error(result.error)
            }
            setProfile(result.profile)
          } else {
            setProfile(null)
          }
        } catch (err) {
          setError(err instanceof Error ? err : new Error("Failed to load profile"))
        } finally {
          setLoading(false)
        }
      })
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Auth state change error"))
      setLoading(false)
    }

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  const handleAuthOperation = async (
    operation: () => Promise<any>,
    errorMessage: string
  ) => {
    if (!auth) {
      return { error: "Firebase not initialized" }
    }

    try {
      setLoading(true)
      setError(null)
      return await operation()
    } catch (err) {
      const error = err instanceof Error ? err : new Error(errorMessage)
      setError(error)
      return { error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signIn = (email: string, password: string) => 
    handleAuthOperation(
      () => authService.signIn(email, password),
      "Sign in failed"
    )

  const signUp = (email: string, password: string, fullName: string) => 
    handleAuthOperation(
      () => authService.signUp(email, password, fullName),
      "Sign up failed"
    )

  const signOut = () => 
    handleAuthOperation(
      () => authService.signOut(),
      "Sign out failed"
    )

  const updateProfile = async (updates: any) => {
    if (!user) return { error: "No user" }

    const result = await handleAuthOperation(
      () => authService.updateProfile(user.uid, updates),
      "Profile update failed"
    )

    if (!result.error) {
      setProfile((prev: any) => ({ ...prev, ...updates }))
    }
    return result
  }

  const value = {
    user,
    profile,
    loading,
    error,
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