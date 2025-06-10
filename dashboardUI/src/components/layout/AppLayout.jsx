// AppLayout.js
import { useState, useEffect } from "react";
import LeftBar from "./LeftBar";
import Navbar from "./Navbar/Navbar";
import RightBar from "./RightBar";

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightbarOpen, setRightbarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    const handleResize = () => {
      checkMobile();
    };

    const debouncedResize = debounce(handleResize, 100); // 100ms debounce

    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  useEffect(() => {
    if ((isMobile && sidebarOpen) || (isMobile && rightbarOpen)) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobile, sidebarOpen, rightbarOpen]);

  const leftBarWidth = collapsed ? 72 : 256;

  // Debounce function
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      {/* Left Sidebar */}
      {isMobile ? (
        sidebarOpen && (
          <div className="fixed inset-0 z-40 flex">
            <LeftBar
              isOpen={sidebarOpen}
              isMobile={isMobile}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
            <div
              className="absolute inset-0 bg-[var(--overlay)] backdrop-blur-xs transition-opacity duration-300"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
        )
      ) : (
        <div style={{ width: leftBarWidth }}>
          <LeftBar
            isOpen
            isMobile={false}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 transition-all duration-300 stubborn-width">
        <div className="transition-all duration-300">
          <Navbar
            onSidebarToggle={() => setSidebarOpen((prev) => !prev)}
            onRightbarToggle={() => setRightbarOpen((prev) => !prev)}
          />
        </div>
        <main className="flex-1 overflow-y-auto p-4 overflow-x-hidden">
          <div className="w-full max-w-full">
            {children}
          </div>
        </main>
      </div>

      {/* RightBar */}
      <RightBar
        isOpen={rightbarOpen}
        isMobile={isMobile}
        onClose={() => setRightbarOpen(false)}
      />
    </div>
  );
}