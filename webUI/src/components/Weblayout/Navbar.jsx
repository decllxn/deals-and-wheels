import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useAuth } from "../../context/AuthContext";
import Sidebar from "./Sidebar/SideBar";
import TopBar from "./TopBar";
import ProgressBar from "./ProgressBar";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import HamburgerMenuButton from "./HamburgerMenuButton";
import AuthModal from "./AuthModal/AuthModal";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full z-40">
      <ProgressBar />
      <TopBar onSeeMoreClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <nav
        className="px-3 sm:px-5 py-2 shadow-md"
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
        }}
      >
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/" className="text-xl font-semibold tracking-wide">
              <span style={{ color: "var(--text-color)" }}>Deals</span>
              <span style={{ color: "var(--accent-color)" }}>&</span>
              <span style={{ color: "var(--text-color)" }}>Wheels</span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <DesktopMenu
            isAuthenticated={isAuthenticated}
            user={user}
            onSignIn={() => { setIsSignUp(false); setShowAuthModal(true); }}
            onSignUp={() => { setIsSignUp(true); setShowAuthModal(true); }}
            onLogout={logout}
          />

          {/* Hamburger for mobile */}
          <div className="min-[1113px]:hidden">
            <HamburgerMenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setShowAuthModal={setShowAuthModal}
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={logout}
        />
      </nav>

      {/* Offset for fixed navbar */}
      <div className="pt-[54px]" />

      <AuthModal
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
      />
    </header>
  );
};

export default Navbar;