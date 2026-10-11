import { ProcessStep } from "@/types";

export const designProcessSteps: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Discovery & Site Assessment",
    tagline: "Understanding Your Vision, Site Context & Functional Goals",
    description:
      "We begin by understanding your lifestyle habits, aesthetic preferences, budget boundaries, and site parameters. We analyze orientation, natural light, and structural constraints to form a solid design brief.",
    details: [
      "In-depth client lifestyle & spatial requirement interview",
      "Site measurement, topographical check & orientation analysis",
      "Vastu alignment & municipal zoning constraint review",
      "Initial project timeline and budget scoping",
    ],
    durationEstimate: "Week 1 - 2",
  },
  {
    stepNumber: "02",
    title: "Concept Design & 3D Visualization",
    tagline: "Translating Ideas into 2D Plans & Photorealistic Renders",
    description:
      "We translate requirements into iterative 2D layout options, followed by photorealistic 3D elevations and interior renders. You see exact materials, lighting moods, and spatial volumes before locking the design.",
    details: [
      "Multiple 2D spatial layout and circulation iterations",
      "Material moodboarding (stones, woods, metals, fabrics)",
      "High-resolution 3D exterior elevations and interior perspectives",
      "Client collaborative review and design refinement",
    ],
    durationEstimate: "Week 2 - 4",
  },
  {
    stepNumber: "03",
    title: "Technical Documentation & Detailed BOQ",
    tagline: "Milestone-Ready Working Drawings & Material Schedules",
    description:
      "Once 3D designs are finalized, we draft precision construction drawings—including structural, electrical conduits, plumbing, reflected ceiling plans, and comprehensive Bill of Quantities (BOQ).",
    details: [
      "Architectural GFC (Good-For-Construction) drawing sets",
      "Reflected ceiling plans, lighting circuitry & plumbing layouts",
      "Custom cabinetry and joinery technical detail drawings",
      "Exhaustive itemized BOQ with verified material specifications",
    ],
    durationEstimate: "Week 4 - 6",
  },
  {
    stepNumber: "04",
    title: "Execution Coordination & Final Handover",
    tagline: "Milestone Supervision, Snag Resolution & Key Delivery",
    description:
      "Whether through turnkey execution or periodic site supervision, we coordinate with vendors and contractors to ensure drawing compliance, precision craft, and on-time handover of your dream space.",
    details: [
      "Periodic on-site milestone inspection and quality audits",
      "Vendor coordination and drawing compliance checks",
      "Snag-list identification and perfection before handover",
      "Comprehensive handover dossier and maintenance guide",
    ],
    durationEstimate: "Execution Phase",
  },
];
