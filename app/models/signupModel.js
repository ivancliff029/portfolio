import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase";

export const signupUser = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Assign default role and save to Firestore
    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      role: "user",
    });
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};