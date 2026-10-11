import { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Portfolio & Architectural Showcase | ${siteConfig.name}`,
  description:
    "View our curated portfolio of contemporary villas, luxury residential interiors, modern commercial offices, and 3D architectural elevations.",
};

export default function PortfolioPage() {
  return (
    <main className="flex-1">
      <PageHero
        title="Portfolio & Architectural Works"
        devanagariSubtitle="चयनित वास्तुशिल्प और आंतरिक परियोजनाएं"
        badge="Spatial Gallery"
        description="Explore our collection of contemporary residences, luxury apartments, commercial spaces, and 3D elevation renderings."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
        ]}
      />

      <PortfolioGallery />

      <ConsultationCTA />
    </main>
  );
}
