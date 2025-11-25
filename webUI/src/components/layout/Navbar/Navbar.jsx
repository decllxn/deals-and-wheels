import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import GlassPanel from "@/components/ui/GlassPanel";
import NavMenu from "@/components/layout/Navbar/NavMenu";
import ProfileMenu from "@/components/layout/Navbar/ProfileMenu";
import AuthModal from "@/components/feedback/AuthModal/AuthModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link
          to="/"
          className="text-2xl font-semibold tracking-wide flex items-center gap-2"
          style={{
            color: "var(--accent-color)",
          }}
        >
          Magari.ke
        </Link>

        <div className="flex items-center gap-3">
          <ProfileMenu
            open={profileOpen}
            setOpen={setProfileOpen}
            setShowAuthModal={setShowAuthModal}
            setIsSignUp={setIsSignUp}
          />

          <button
            onClick={() => {
              setMenuOpen((p) => !p);
              setProfileOpen(false);
            }}
            className="text-[var(--text-color)] p-2 rounded-full hover:bg-white/10 transition"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <NavMenu open={menuOpen} setOpen={setMenuOpen} />
      <AuthModal
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
      />
    </header>
  );
}