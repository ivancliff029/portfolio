// components/guards/withAdminAuth.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export default function withAdminAuth(WrappedComponent) {
  return function WithAdminAuthWrapper(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        try {
          if (!user) {
            router.push("/login");
            return;
          }

          // Check if user has admin role
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const isAdmin = userDoc.exists() && userDoc.data()?.role === "admin";

          if (!isAdmin) {
            router.push("/"); // Redirect non-admin users to home
            return;
          }

          setIsAuthorized(true);
        } catch (error) {
          console.error("Error checking admin status:", error);
          router.push("/");
        } finally {
          setIsLoading(false);
        }
      });

      return () => unsubscribe();
    }, [router]);

    // Show loading state
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    // Only render the protected component if user is authorized
    return isAuthorized ? <WrappedComponent {...props} /> : null;
  };
}
