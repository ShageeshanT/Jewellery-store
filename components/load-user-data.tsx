"use client";

import { useAppContext } from "@/context/app";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadUserData() {
  const { setBilling, setUser } = useAppContext();
  const [loading, setLoading] = useState(false);

  // Check if Clerk is available and configured
  const isClerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'pk_test_placeholder';

  let isSignedIn = false;

  if (isClerkConfigured) {
    // Only use Clerk if it's properly configured
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { useAuth } = require("@clerk/nextjs");
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const auth = useAuth();
      isSignedIn = auth.isSignedIn || false;
    } catch (error) {
      // Clerk not available
    }
  }

  const fetchUserBillingData = async () => {
    setLoading(true);
    const res = await fetch(`/api/app`, {
      method: "GET",
      cache: "force-cache",
    });

    if (!res.ok) {
      setLoading(false);
      return;
    }

    const data = await res.json();
    setBilling(data.billing);
    setUser(data.user);
    setLoading(false);
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchUserBillingData();
    }
  }, [isSignedIn]);

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
