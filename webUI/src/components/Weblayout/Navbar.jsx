import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import AuthModal from "./AuthModal";
import Sidebar from "./Sidebar/SideBar";
import TopBar from "./TopBar";
import ProgressBar from "./ProgressBar";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import HamburgerMenuButton from "./HamburgerMenuButton";
import Breadcrumbs from "./topbar/Breadcrumbs"; // Import the Hamburger Menu Button component

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
    <div className="fixed top-0 left-0 w-full z-40">
      <ProgressBar />
      <TopBar onSeeMoreClick={() => setIsSidebarOpen(true)} />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <nav
        className="px-6 py-3 shadow-lg"
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
        }}
      >
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="text-2xl font-bold tracking-wide" style={{ color: "var(--text-color)" }}>
              <span style={{ color: "var(--text-color)" }}>Deals</span>
              <span style={{ color: "var(--accent-color)" }}>&</span>
              <span style={{ color: "var(--text-color)" }}>Wheels</span>
            </Link>
          </motion.div>

          <DesktopMenu setShowAuthModal={setShowAuthModal} />

          {/* Use the HamburgerMenuButton component */}
          <HamburgerMenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>

        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} setShowAuthModal={setShowAuthModal} />
      </nav>

      <div className="pt-[60px] md:pt-[60px]"></div>

      <AuthModal
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
      />
    </div>
    </>
  );
};

export default Navbar;
