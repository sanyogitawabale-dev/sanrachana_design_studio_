export interface NavItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
}

export const mainNavItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Design Process", href: "/process" },
  { title: "Cost Estimator", href: "/estimator", badge: "Interactive" },
  { title: "Contact", href: "/contact" },
];

export const footerLinks = {
  quickLinks: [
    { title: "Home", href: "/" },
    { title: "About Studio", href: "/about" },
    { title: "Featured Portfolio", href: "/portfolio" },
    { title: "Our 4-Step Process", href: "/process" },
    { title: "Interactive Estimator", href: "/estimator" },
    { title: "Contact & Consultation", href: "/contact" },
    { title: "Privacy Policy", href: "/privacy" },
  ],
  services: [
    { title: "Architectural Design", href: "/services#architectural" },
    { title: "Luxury Interior Architecture", href: "/services#interior" },
    { title: "3D Elevation & Visualization", href: "/services#3d-visualization" },
    { title: "Space Planning & Vastu", href: "/services#space-planning" },
    { title: "Turnkey Renovation & Execution", href: "/services#turnkey" },
  ],
  categories: [
    { title: "Residential Bungalows & Villas", href: "/portfolio?category=residential" },
    { title: "Modern Apartments & Penthouses", href: "/portfolio?category=interior" },
    { title: "Commercial Offices & Studios", href: "/portfolio?category=commercial" },
    { title: "3D Architectural Renderings", href: "/portfolio?category=3d-visualization" },
  ],
};
