import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export const loginUser = async (email, password) => {
  try {
    // First, authenticate the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Then, fetch the user's role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        success: true,
        user: {
          ...user,
          role: userData.role // Include the role from Firestore
        }
      };
    } else {
      // If the user document doesn't exist, assume they're a regular user
      return {
        success: true,
        user: {
          ...user,
          role: 'user'
        }
      };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};
