import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

const DesktopMenu = ({ isAuthenticated, user, onSignIn, onSignUp, onLogout }) => {
  return (
    <div className="hidden min-[1113px]:flex items-center space-x-4 text-[15px]">
      <Link to="/deals" className="hover:text-[var(--accent-color)] transition">Browse</Link>
      <Link to="/dealers" className="hover:text-[var(--accent-color)] transition">For Dealers</Link>
      <Link to="/finance" className="hover:text-[var(--accent-color)] transition">Finance</Link>
      <Link to="/editorial" className="hover:text-[var(--accent-color)] transition">Editorial</Link>
      <Link to="/about-us" className="hover:text-[var(--accent-color)] transition">About</Link>
      <Link to="/contact" className="hover:text-[var(--accent-color)] transition">Contact</Link>

      {!isAuthenticated ? (
        <>
          <button
            onClick={onSignIn}
            className="px-3 py-1.5 bg-[var(--accent-color)] hover:brightness-110 text-white rounded-md text-sm font-medium transition shadow-md"
          >
            Sign In
          </button>
          <button
            onClick={onSignUp}
            className="px-3 py-1.5 border border-[var(--accent-color)] text-[var(--accent-color)] rounded-md text-sm font-medium hover:bg-[var(--accent-color)] hover:text-white transition"
          >
            Sign Up
          </button>
        </>
      ) : (
        <>
          <button
            className="relative p-1.5 rounded-full hover:bg-[var(--hover-color)] transition"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-[var(--text-color)]" />
            <span className="absolute -top-1 -right-1 bg-[var(--accent-color)] text-white text-[9px] rounded-full px-[3px]">
              3
            </span>
          </button>

          <ProfileDropdown user={user} onLogout={onLogout} />
        </>
      )}
    </div>
  );
};

export default DesktopMenu;