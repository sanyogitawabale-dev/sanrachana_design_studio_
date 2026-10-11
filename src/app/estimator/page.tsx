import { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { CostEstimator } from "@/components/estimator/CostEstimator";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Project Cost Estimator | ${siteConfig.name}`,
  description:
    "Calculate preliminary ballpark estimates for residential villas, interior architecture, 3D elevation renders, and turnkey execution with Sanrachana Design Studio.",
};

export default function EstimatorPage() {
  return (
    <main className="flex-1">
      <PageHero
        title="Interactive Cost Estimator"
        devanagariSubtitle="परियोजना लागत और बजट अनुमानक"
        badge="Budgetary Tool"
        description="Select your property type, approximate square footage, and desired finish level to receive a transparent preliminary investment range."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cost Estimator", href: "/estimator" },
        ]}
      />

      <CostEstimator />

      <ConsultationCTA />
    </main>
  );
}
