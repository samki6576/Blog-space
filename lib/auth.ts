import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "./firebase"
import toast from "react-hot-toast"

export const authService = {
  // Sign up
  async signUp(email: string, password: string, fullName: string) {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)

      // Update the user's display name
      await updateProfile(user, {
        displayName: fullName,
      })

      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        email: user.email,
        displayName: fullName,
        photoURL: user.photoURL,
        role: "user",
        createdAt: new Date(),
      })

      toast.success("Account created successfully!")
      return { user, error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { user: null, error }
    }
  },

  // Sign in
  async signIn(email: string, password: string) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      toast.success("Signed in successfully!")
      return { user, error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { user: null, error }
    }
  },

  // Sign out
  async signOut() {
    try {
      await firebaseSignOut(auth)
      toast.success("Signed out successfully!")
      return { error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { error }
    }
  },

  // Get current user profile
  async getCurrentUserProfile(user: User) {
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid))
      if (userDoc.exists()) {
        return { profile: userDoc.data(), error: null }
      }
      return { profile: null, error: null }
    } catch (error: any) {
      return { profile: null, error }
    }
  },

  // Update profile
  async updateProfile(userId: string, updates: any) {
    try {
      await updateDoc(doc(db, "users", userId), {
        ...updates,
        updatedAt: new Date(),
      })

      toast.success("Profile updated successfully!")
      return { error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { error }
    }
  },
}
