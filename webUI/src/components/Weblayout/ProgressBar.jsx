import React, { useEffect, useState } from "react";

export default function ProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[4px] bg-transparent pointer-events-none">
      <div
        className="h-full transition-all duration-300 ease-in-out"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(to right, var(--accent-color), var(--highlight-color))`,
        }}
      ></div>
    </div>
  );
}