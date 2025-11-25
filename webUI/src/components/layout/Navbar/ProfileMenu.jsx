// src/components/layout/ProfileMenu.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  User,
  LogOut,
  Settings,
  UserCircle2,
  LogIn,
  UserPlus,
  MessageCircle,
} from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";
import { useAuth } from "../../../context/AuthContext";

export default function ProfileMenu({
  open,
  setOpen,
  setShowAuthModal,
  setIsSignUp,
}) {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="p-2 rounded-full hover:bg-white/40 dark:hover:bg-white/10 transition"
      >
        <User className="w-5 h-5 text-[var(--text-color)] stroke-[1.5]" />
      </button>

      {/* Animated Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
            className="absolute right-0 mt-3 w-56 z-50"
          >
            <GlassPanel
              className="p-4 rounded-2xl border border-gray-200 dark:border-white/10 
                         bg-white/80 dark:bg-[var(--surface-color)]/80 
                         backdrop-blur-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)] 
                         flex flex-col space-y-2"
            >
              {isAuthenticated ? (
                <>
                  <MenuItem
                    to="/profile"
                    icon={<UserCircle2 className="w-4 h-4 stroke-[1.5]" />}
                    label="My Profile"
                    onClick={() => setOpen(false)}
                  />
                  <MenuItem
                    to="/chat"
                    icon={<MessageCircle className="w-4 h-4 stroke-[1.5]" />}
                    label="Chat"
                    onClick={() => setOpen(false)}
                  />
                  <MenuItem
                    to="/settings"
                    icon={<Settings className="w-4 h-4 stroke-[1.5]" />}
                    label="Settings"
                    onClick={() => setOpen(false)}
                  />
                  <Separator />
                  <MenuButton
                    icon={<LogOut className="w-4 h-4 stroke-[1.5]" />}
                    label="Sign Out"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="text-gray-600 dark:text-gray-300 hover:text-[var(--accent-color)]"
                  />
                </>
              ) : (
                <>
                  <AuthButton
                    label="Sign In"
                    icon={<LogIn className="w-4 h-4 stroke-[1.5]" />}
                    onClick={() => {
                      setIsSignUp(false);
                      setShowAuthModal(true);
                      setOpen(false);
                    }}
                    variant="plain"
                  />
                  <AuthButton
                    label="Create Account"
                    icon={<UserPlus className="w-4 h-4 stroke-[1.5]" />}
                    onClick={() => {
                      setIsSignUp(true);
                      setShowAuthModal(true);
                      setOpen(false);
                    }}
                    variant="outlined"
                  />
                </>
              )}
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Menu Link Items */
function MenuItem({ to, icon, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 rounded-lg 
                 hover:bg-gray-100 dark:hover:bg-white/5 
                 transition text-[var(--text-color)] font-medium"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

/* Logout Button */
function MenuButton({ icon, label, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg 
                  hover:bg-gray-100 dark:hover:bg-white/5 
                  transition text-left font-medium ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

/* Clean, minimalist Auth Buttons */
function AuthButton({ label, icon, onClick, variant = "plain" }) {
  const variants = {
    plain:
      "bg-white text-gray-800 dark:bg-white/10 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-white/20",
    outlined:
      "border border-gray-200 dark:border-white/20 text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-white/10",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl 
                  font-medium shadow-sm ${variants[variant]} transition`}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}

/* Divider */
function Separator() {
  return <div className="h-px bg-gray-200 dark:bg-white/10 my-2" />;
}