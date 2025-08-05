import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./firebase";
import toast from "react-hot-toast";

export const storageService = {
  // Test function to check Firebase Storage configuration
  async testStorageConnection() {
    try {
      if (!storage) {
        throw new Error("Firebase Storage not initialized");
      }
      
      console.log("Testing Firebase Storage connection...");
      console.log("Storage object:", storage);
      console.log("Storage app:", storage.app);
      console.log("Storage bucket:", storage.app.options.storageBucket);
      return { success: true, error: null };
    } catch (error: any) {
      console.error("Storage connection test failed:", error);
      return { success: false, error: error.message };
    }
  },

  async uploadImage(file: File, folder = "images") {
    try {
      if (!storage) {
        throw new Error("Firebase Storage not initialized");
      }
      
      console.log("Starting image upload...");
      console.log("File:", file.name, file.size, file.type);
      console.log("Storage bucket:", storage.app.options.storageBucket);
      
      // Validate file type
      if (!file.type.match(/image\/(png|jpg|jpeg|gif|webp)/)) {
        throw new Error("Only image files are allowed");
      }

      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      console.log("File path:", filePath);

      // Upload file
      const storageRef = ref(storage, filePath);
      console.log("Storage ref created:", storageRef);
      
      const uploadResult = await uploadBytes(storageRef, file);
      console.log("Upload result:", uploadResult);
      
      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Download URL:", downloadURL);
      
      return { 
        url: downloadURL, 
        path: filePath,
        error: null 
      };
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload image");
      return { 
        url: null, 
        path: null,
        error: error.message || "Upload failed" 
      };
    }
  },

  async deleteImage(path: string) {
    try {
      if (!storage) {
        throw new Error("Firebase Storage not initialized");
      }
      
      const imageRef = ref(storage, path);
      await deleteObject(imageRef);
      return { error: null };
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete image");
      return { error: error.message || "Delete failed" };
    }
  },
};