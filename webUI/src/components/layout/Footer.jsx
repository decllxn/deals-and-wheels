import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import GlassPanel from "@components/ui/GlassPanel";

export default function Footer() {
  return (
    <footer className="relative z-40 w-full border-t border-white/10 backdrop-blur-2xl bg-white/[0.04]">
      <GlassPanel className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-12">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* About */}
          <div>
            <h4 className="text-[var(--text-color)] font-semibold mb-4 text-base">
              About Zamara
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-[var(--accent-color)] transition"
                >
                  Who We Are
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-[var(--accent-color)] transition"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="hover:text-[var(--accent-color)] transition"
                >
                  Newsroom
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[var(--accent-color)] transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[var(--text-color)] font-semibold mb-4 text-base">
              Our Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dealers"
                  className="hover:text-[var(--accent-color)] transition"
                >
                  Dealer Solutions
                </Link>
              </li>
              <li>
                <Link
                  to="/finance"
                  className="hover:text-[var(--accent-color)] transition"
                >
                  Finance Tools
                </Link>
              </li>
              <li>
                <Link
                  to="/analytics"
                  className="hover:text-[var(--accent-color)] transition"
                >
                  Market Insights
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="hover:text-[var(--accent-color)] transition"
                >
                  Support Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[var(--text-color)] font-semibold mb-4 text-base">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faqs"
                  className="hover:text-[var(--accent-color)] transition"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/docs"
                  className="hover:text-[var(--accent-color)] transition"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/press"
                  className="hover:text-[var(--accent-color)] transition"
                >
                  Press Kit
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="hover:text-[var(--accent-color)] transition"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[var(--text-color)] font-semibold mb-4 text-base">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-[var(--accent-color)] transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-[var(--accent-color)] transition"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="hover:text-[var(--accent-color)] transition"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[var(--muted-text)]">
          {/* Brand + Logo */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center md:text-left flex flex-col items-center md:items-start"
          >
            <img
              src="/pngs/Zamara-logo.png"
              alt="Zamara Technologies Logo"
              className="w-28 mb-3 select-none"
              draggable="false"
            />
            <span className="font-medium text-[var(--text-color)] text-sm">
              Zamara Technologies Limited
            </span>
            <p className="text-xs md:text-sm mt-1 text-[var(--muted-text)] max-w-xs">
              Empowering Kenya’s automotive intelligence with technology, trust,
              and connectivity — driving the road to tomorrow.
            </p>
          </motion.div>

          {/* Socials */}
          <div className="flex space-x-5 text-lg">
            <a
              href="https://facebook.com"
              className="hover:text-[var(--accent-color)] transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-[var(--accent-color)] transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              className="hover:text-[var(--accent-color)] transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              className="hover:text-[var(--accent-color)] transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://youtube.com"
              className="hover:text-[var(--accent-color)] transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs mt-8 text-[var(--muted-text)]">
          © {new Date().getFullYear()} Zamara Technologies Limited. All rights reserved.
        </p>
      </GlassPanel>
    </footer>
  );
}