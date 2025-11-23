"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [activeSection, setActiveSection] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const ticking = useRef(false);

  // Handle scroll to update active section and show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Show/hide scroll to top button
          const shouldShow = window.scrollY > 500;
          if (shouldShow !== showScrollTop) {
            setShowScrollTop(shouldShow);
          }

          // Update active section based on scroll position (less expensive now)
          const sections = document.querySelectorAll("section[id]");
          let currentSection = "";

          sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const sectionHeight = rect.height;
            if (
              window.scrollY >= sectionTop - 100 &&
              window.scrollY < sectionTop + sectionHeight - 100
            ) {
              currentSection = section.getAttribute("id") || "";
            }
          });

          if (currentSection !== activeSection) {
            setActiveSection(currentSection);
          }

          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showScrollTop, activeSection]);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg z-50"
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: showScrollTop ? 1 : 0,
        scale: showScrollTop ? 1 : 0.8,
        y: showScrollTop ? 0 : 20,
      }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ArrowUp className="h-5 w-5" />
    </motion.button>
  );
}
