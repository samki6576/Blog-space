import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  increment,
  Timestamp,
} from "firebase/firestore"
import { db } from "./firebase"
import type { Post } from "./firebase"
import toast from "react-hot-toast"

export const postsService = {
  // Get all posts
  async getPosts(
    filters: {
      category?: string
      status?: string
      search?: string
      limitCount?: number
      lastDoc?: any
    } = {},
  ) {
    try {
      let q = query(collection(db, "posts"), orderBy("createdAt", "desc"))

      if (filters.status) {
        q = query(q, where("status", "==", filters.status))
      }

      if (filters.category) {
        q = query(q, where("category", "==", filters.category))
      }

      if (filters.limitCount) {
        q = query(q, limit(filters.limitCount))
      }

      if (filters.lastDoc) {
        q = query(q, startAfter(filters.lastDoc))
      }

      const querySnapshot = await getDocs(q)
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Post[]

      // Filter by search term if provided
      let filteredPosts = posts
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        filteredPosts = posts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm) ||
            post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
        )
      }

      return {
        data: filteredPosts,
        lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
        error: null,
      }
    } catch (error: any) {
      toast.error(error.message)
      return { data: null, lastDoc: null, error }
    }
  },

  // Get single post
  async getPost(slug: string) {
    try {
      const q = query(collection(db, "posts"), where("slug", "==", slug))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        return { data: null, error: "Post not found" }
      }

      const postDoc = querySnapshot.docs[0]
      const post = {
        id: postDoc.id,
        ...postDoc.data(),
        createdAt: postDoc.data().createdAt?.toDate(),
        updatedAt: postDoc.data().updatedAt?.toDate(),
      } as Post

      // Increment views
      await updateDoc(doc(db, "posts", postDoc.id), {
        views: increment(1),
      })

      return { data: post, error: null }
    } catch (error: any) {
      return { data: null, error }
    }
  },

  // Create post
  async createPost(post: Omit<Post, "id" | "createdAt" | "updatedAt" | "views" | "likes">) {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        ...post,
        views: 0,
        likes: 0,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      })

      toast.success("Post created successfully!")
      return { data: { id: docRef.id, ...post }, error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { data: null, error }
    }
  },

  // Update post
  async updatePost(id: string, updates: Partial<Post>) {
    try {
      await updateDoc(doc(db, "posts", id), {
        ...updates,
        updatedAt: Timestamp.now(),
      })

      toast.success("Post updated successfully!")
      return { error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { error }
    }
  },

  // Delete post
  async deletePost(id: string) {
    try {
      await deleteDoc(doc(db, "posts", id))
      toast.success("Post deleted successfully!")
      return { error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { error }
    }
  },

  // Like post
  async likePost(postId: string, userId: string) {
    try {
      // Check if user already liked the post
      const likeQuery = query(collection(db, "postLikes"), where("postId", "==", postId), where("userId", "==", userId))
      const likeSnapshot = await getDocs(likeQuery)

      if (!likeSnapshot.empty) {
        // Unlike - remove like document and decrement count
        await deleteDoc(likeSnapshot.docs[0].ref)
        await updateDoc(doc(db, "posts", postId), {
          likes: increment(-1),
        })
        return { liked: false, error: null }
      } else {
        // Like - add like document and increment count
        await addDoc(collection(db, "postLikes"), {
          postId,
          userId,
          createdAt: Timestamp.now(),
        })
        await updateDoc(doc(db, "posts", postId), {
          likes: increment(1),
        })
        return { liked: true, error: null }
      }
    } catch (error: any) {
      toast.error(error.message)
      return { liked: false, error }
    }
  },
}
