import { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { ServiceDetailSection } from "@/components/services/ServiceDetailSection";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Services & Architectural Disciplines | ${siteConfig.name}`,
  description:
    "Explore architectural design, interior architecture, 3D elevation visualization, space planning, and turnkey project execution offered by Sanrachana Design Studio.",
};

export default function ServicesPage() {
  return (
    <main className="flex-1">
      <PageHero
        title="Disciplines & Services"
        devanagariSubtitle="वास्तुशिल्प और आंतरिक डिज़ाइन सेवाएँ"
        badge="Tailored Spatial Solutions"
        description="Comprehensive architecture and interior solutions ranging from initial concept massing to complete turnkey execution."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />

      <ServiceDetailSection />

      <ConsultationCTA />
    </main>
  );
}
