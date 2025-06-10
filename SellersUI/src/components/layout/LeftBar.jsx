// LeftBar.js
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart2,
  Package,
  Users,
  Settings,
  FileText,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Share2,
  Hammer,
  Briefcase,
  Calendar,
  MessageSquare,
  Image,
  Video,
  CreditCard,
  Building,
  Headphones,
  BookOpen,
  Truck,
  Wrench,
  ShieldCheck,
  ScrollText,
  GraduationCap,
} from "lucide-react";

export default function LeftBar({
  isOpen,
  isMobile,
  collapsed,
  setCollapsed,
}) {
  const leftBarRef = useRef(null);

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
      if (isOpen && leftBarRef.current) {
        leftBarRef.current.style.overflowY = "auto";
      } else if (leftBarRef.current) {
        leftBarRef.current.style.overflowY = "hidden";
      }
    }
  }, [isOpen, isMobile]);

  const navItems = [
    {
      title: "Main",
      links: [
        { name: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
        { name: "Reports", icon: FileText, to: "/reports" },
        { name: "Analytics", icon: BarChart2, to: "/analytics" },
        { name: "Insights", icon: LayoutDashboard, to: "/insights" },
      ],
    },
    {
      title: "Sales & Auctions",
      links: [
        { name: "Sales", icon: ShoppingCart, to: "/sales" },
        { name: "Auctions", icon: Hammer, to: "/auctions" },
        { name: "Inventory", icon: Package, to: "/inventory" },
        { name: "Payments", icon: CreditCard, to: "/payments" },
        { name: "Vehicle Listings", icon: Package, to: "/vehicles" },
        { name: "Vehicle Inspection", icon: Hammer, to: "/inspections" },
      ],
    },
    {
      title: "Content & Marketing",
      links: [
        { name: "Blogs", icon: Newspaper, to: "/blogs" },
        { name: "Social Media", icon: Share2, to: "/social-media" },
        { name: "Gallery", icon: Image, to: "/gallery" },
        { name: "Videos", icon: Video, to: "/videos" },
        { name: "Testimonials", icon: MessageSquare, to: "/testimonials" },
        { name: "Referrals", icon: Share2, to: "/referrals" },
      ],
    },
    {
      title: "Corporate & Partnerships",
      links: [
        { name: "Corporate Onboarding", icon: Briefcase, to: "/corporate" },
        { name: "Partners", icon: Building, to: "/partners" },
        { name: "CRM", icon: Users, to: "/crm" },
        { name: "Leads", icon: Briefcase, to: "/leads" },
      ],
    },
    {
      title: "Operations & Logistics",
      links: [
        { name: "Logistics", icon: Truck, to: "/logistics" },
        { name: "Pickup & Delivery", icon: Calendar, to: "/deliveries" },
        { name: "Service Centers", icon: Hammer, to: "/workshops" },
        { name: "Repairs & Maintenance", icon: Wrench, to: "/maintenance" },
        { name: "Billing", icon: FileText, to: "/invoices" },
        { name: "Subscriptions", icon: CreditCard, to: "/subscriptions" },
      ],
    },
    {
      title: "Community & Support",
      links: [
        { name: "Users", icon: Users, to: "/users" },
        { name: "Events", icon: Calendar, to: "/events" },
        { name: "Messages", icon: MessageSquare, to: "/messages" },
        { name: "Support", icon: Headphones, to: "/support" },
        { name: "Forum", icon: BookOpen, to: "/forum" },
        { name: "Knowledge Base", icon: BookOpen, to: "/knowledge" },
        { name: "Employee Training", icon: GraduationCap, to: "/training" },
      ],
    },
    {
      title: "Admin & HR",
      links: [
        { name: "Settings", icon: Settings, to: "/settings" },
        { name: "Permissions", icon: ShieldCheck, to: "/permissions" },
        { name: "Audit Logs", icon: ScrollText, to: "/audit-logs" },
        { name: "Employees", icon: Users, to: "/employees" },
        { name: "Payroll", icon: CreditCard, to: "/payroll" },
      ],
    },
  ];

  const width = collapsed ? 73 : 256;

  return (
    <motion.div
      ref={leftBarRef}
      initial={{ x: isMobile ? "-100%" : 0 }}
      animate={{
        x: isMobile ? (isOpen ? 0 : "-100%") : 0,
        width,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`h-full bg-[var(--bg)] text-[var(--text)] shadow-md border-r border-[var(--border)] ${
        isMobile ? "fixed top-0 left-0 z-50" : "relative"
      }`}
      style={{ overflowY: isMobile ? "hidden" : "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="text-xl font-extrabold tracking-wide whitespace-nowrap overflow-hidden">
          {collapsed ? <span className="text-[var(--accent)]">D&W</span> : <><span>Deals</span><span className="text-[var(--accent)]">&</span><span>Wheels</span></>}
        </div>
        {!isMobile && (
          <button onClick={() => setCollapsed((prev) => !prev)} className="text-[var(--text-muted)] p-1 hover:bg-[var(--accent-hover)] rounded transition">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="px-2 space-y-6" style={{ overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {navItems.map((section, i) => (
          <div key={i}>
            {!collapsed && <div className="text-xs font-semibold text-[var(--text-muted)] uppercase px-2 mb-2 tracking-wider">{section.title}</div>}
            <div className="space-y-1">
              {section.links.map(({ name, icon: Icon, to }, j) => (
                <NavLink key={j} to={to} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${isActive ? "bg-[var(--accent-hover)] font-semibold" : ""} hover:bg-[var(--accent-hover)]`}>
                  <Icon className="w-5 h-5" />
                  {!collapsed && <span>{name}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}