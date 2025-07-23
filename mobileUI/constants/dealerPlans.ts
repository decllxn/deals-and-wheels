// constants/dealerPlans.ts
export type PlanType = {
  name: string;
  price: string;
  listings: number | string;
  badge: string;
  message: string;
  benefits: string[];
};

export const DEALER_PLANS: PlanType[] = [
  {
    name: "Starter",
    price: "KSh 3,500/mo",
    listings: 10,
    badge: "starter-badge",
    message: "Build your dealer brand. 10 listings, verified badge—risk free.",
    benefits: [
      "Verified dealer badge",
      "Visible in search results",
      "Basic lead tracking",
      "Email support",
      "Profile page with logo + contact info",
    ],
  },
  {
    name: "Bronze",
    price: "KSh 12,000/mo",
    listings: 30,
    badge: "bronze-badge",
    message: "Boost visibility, access quiet leads, and get analytics that show you real traction.",
    benefits: [
      "Everything in Starter",
      "Priority placement in search results",
      "Photo-enhanced listings (up to 15 images)",
      "Simple analytics dashboard (views, clicks)",
      "Dedicated WhatsApp support",
    ],
  },
  {
    name: "Silver",
    price: "KSh 25,000/mo",
    listings: 60,
    badge: "silver-badge",
    message: "Get featured, send alerts, and scale smarter with deeper insight.",
    benefits: [
      "Everything in Bronze",
      "Up to 5 Featured Listings per week",
      "Broadcast new listings to email/WhatsApp leads",
      "Custom dealer banner on listing pages",
      "Insight dashboard (engagement vs competitors)",
    ],
  },
  {
    name: "Gold",
    price: "KSh 45,000/mo",
    listings: 120,
    badge: "gold-badge",
    message: "Be the showroom online—homepage exposure, API access, custom branding.",
    benefits: [
      "Everything in Silver",
      "Bulk upload via CSV/API",
      "Automated price insights (market trend engine)",
      "Custom dealership landing page",
      "Dealer staff accounts with role permissions",
    ],
  },
  {
    name: "Diamond",
    price: "KSh 60,000/mo",
    listings: 200,
    badge: "diamond-badge",
    message: "Unlock prestige—VIP placement, influencer features, and pro-level dealer tools.",
    benefits: [
      "Everything in Gold",
      "VIP support line (Phone/WhatsApp)",
      "Auto-sync to external CRMs",
      "Influencer video shoutout (IG/YouTube)",
      "Priority exposure in homepage carousel",
    ],
  },
  {
    name: "Platinum",
    price: "KSh 75,000/mo",
    listings: "Unlimited",
    badge: "platinum-badge",
    message: "Enterprise-grade support, marketing partnerships, and full service integration.",
    benefits: [
      "Everything in Diamond",
      "ERP system access (inventory, leads, invoicing)",
      "Monthly dealership performance report",
      "Video listing support (hosted via YouTube or native)",
      "Monthly social media boost (IG/TikTok/YT shoutout)",
    ],
  },
  {
    name: "Partner",
    price: "Custom Quote",
    listings: "Unlimited",
    badge: "partner-badge",
    message: "Let’s grow together—co-marketing, white-labeling, and shared strategic goals.",
    benefits: [
      "Everything in Platinum",
      "Dedicated business strategist",
      "Revenue share & co-branded marketing",
      "White-label options (e.g., partner subdomain)",
      "In-house editorial or video review of partner vehicles",
      "Direct lead syncing to CRM/ERP via API",
    ],
  },
];
