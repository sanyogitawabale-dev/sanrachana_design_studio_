export interface FAQItem {
  question: string;
  answer: string;
  category: "general" | "services" | "process" | "cost";
}

export const faqsData: FAQItem[] = [
  {
    question: "How do I schedule an initial consultation with Sanrachana Design Studio?",
    answer:
      "You can submit your project details via our website Contact form, reach out through our official WhatsApp click-to-chat button, or connect with us on Instagram @sanrachana_design_studio_. We review your requirements and schedule an initial discovery call or site visit.",
    category: "general",
  },
  {
    question: "What types of architectural and interior projects do you handle?",
    answer:
      "We specialize in private residential villas, luxury bungalows, apartment interiors, penthouses, commercial office spaces, boutique retail studios, and 3D elevation visualization studies across various scale requirements.",
    category: "services",
  },
  {
    question: "Can I hire Sanrachana Design Studio only for 3D Elevation or Planning drawings?",
    answer:
      "Yes. We offer modular service packages. You can engage us strictly for 3D exterior elevations, 2D floor plans & Vastu analysis, complete interior design documentation, or full turnkey execution.",
    category: "services",
  },
  {
    question: "How long does the complete design phase typically take?",
    answer:
      "A typical architectural or interior concept and 3D rendering phase takes between 3 to 6 weeks, depending on the project scale, area, and speed of client feedback. Detailed working drawings and BOQ take an additional 2 to 3 weeks.",
    category: "process",
  },
  {
    question: "How are project costs and fee structures calculated?",
    answer:
      "Design fees are structured transparently either on a per-square-foot basis or as a fixed project scope fee. You can use our interactive Cost Estimator for preliminary ballpark ranges, followed by a formal customized quote.",
    category: "cost",
  },
];
