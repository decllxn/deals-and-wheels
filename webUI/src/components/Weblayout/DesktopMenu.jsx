import { Link } from "react-router-dom";
import { FaCar, FaWallet, FaUserTie, FaPhone, FaPlus } from "react-icons/fa";
import ProfileDropdown from "./ProfileDropdown";

const DesktopMenu = ({ setShowAuthModal }) => {
  return (
    <div className="hidden md:flex space-x-6 items-center">

      <Link to="/deals" className="nav-link hover:text-[var(--accent-color)] transition">Browse Cars</Link>
      <Link to="/dealers" className="nav-link hover:text-[var(--accent-color)] transition">For Dealers</Link>
      <Link to="/finance" className="nav-link hover:text-[var(--accent-color)] transition">Finance</Link>
      <Link to="/editorial" className="nav-link hover:text-[var(--accent-color)] transition">Editorial</Link>
      <Link to="/about-us" className="nav-link hover:text-[var(--accent-color)] transition">About Us</Link>
      <Link to="/contact" className="nav-link hover:text-[var(--accent-color)] transition">Contact</Link>

      <Link
        to="/sell-a-car"
        className="px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg text-sm font-semibold flex items-center space-x-2 transition shadow-lg"
      >
        <FaPlus size={16} />
        <span>Post Your Car</span>
      </Link>

      <button
        onClick={() => setShowAuthModal(true)}
        className="px-4 py-2 bg-[var(--highlight-color)] hover:brightness-110 text-white rounded-lg text-sm font-medium transition shadow-lg"
      >
        Sign In
      </button>

      <ProfileDropdown />
    </div>
  );
};

export default DesktopMenu;