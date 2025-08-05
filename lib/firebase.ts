import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase only on client side
let app: any = null
let auth: any = null
let db: any = null
let storage: any = null

if (typeof window !== 'undefined') {
  // Only initialize on client side
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
}

// Export with fallbacks for server-side rendering
export { auth, db, storage }
export default app

// Database types
export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  featuredImage?: string
  category: string
  tags: string[]
  status: "draft" | "published"
  authorId: string
  authorName: string
  authorAvatar?: string
  views: number
  likes: number
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  authorName: string
  authorAvatar?: string
  content: string
  createdAt: Date
}

export interface User {
  id: string
  email: string
  displayName?: string
  photoURL?: string
  role: "user" | "admin"
  createdAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  postCount: number
}
