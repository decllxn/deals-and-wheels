import { Car, DollarSign, Home, BookOpen, Info, Mail } from "lucide-react";

export const navLinks = [
  { label: "Browse Cars", to: "/listings", icon: Car },
  { label: "For Dealers", to: "/dealers", icon: DollarSign },
  { label: "Pricing", to: "/pricing", icon: Home },
  { label: "Editorial", to: "/editorial", icon: BookOpen },
  { label: "About", to: "/about-us", icon: Info },
  { label: "Contact", to: "/contact", icon: Mail },
];