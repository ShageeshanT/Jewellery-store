"use client";

import { useAppContext } from "@/context/app";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/nextjs";

export default function LoadUserData() {
  const { setBilling, setUser } = useAppContext();
  const [loading, setLoading] = useState(false);

  // Always call hooks at the top level
  const { isSignedIn } = useAuth();

  const fetchUserBillingData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/app`, {
        method: "GET",
        cache: "no-store", // Changed from force-cache to get fresh data
      });

      if (!res.ok) {
        setLoading(false);
        return;
      }

      const data = await res.json();
      setBilling(data.billing);
      setUser(data.user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  }, [setBilling, setUser]);

  useEffect(() => {
    if (isSignedIn) {
      fetchUserBillingData();
    }
  }, [isSignedIn, fetchUserBillingData]);

  return (
    <>
      {loading && (
        <motion.div
          className="fixed flex flex-col justify-center items-center z-[1000] top-0 left-0 w-full h-full bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p className="text-lg font-semibold mb-4">Loading...</p>
          <motion.div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-3 h-3 bg-primary rounded-full"
                animate={{
                  y: [0, -10, 0], // Bouncing effect
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
