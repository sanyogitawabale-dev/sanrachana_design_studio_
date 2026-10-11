export type ProjectCategory =
  | "all"
  | "residential"
  | "interior"
  | "commercial"
  | "3d-visualization";

export interface ProjectBeforeAfter {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title: string;
}

export interface Project {
  id: string;
  title: string;
  hindiTitle?: string;
  category: ProjectCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  location?: string;
  year?: string;
  area?: string;
  scope?: string[];
  clientType?: string;
  architecturalHighlights?: string[];
  coverImage: string;
  galleryImages: string[];
  videoUrl?: string;
  videoPoster?: string;
  instagramPostUrl?: string;
  beforeAfter?: ProjectBeforeAfter;
  featured?: boolean;
  isDemonstration?: boolean;
  aspectRatio?: "square" | "landscape" | "portrait" | "wide";
  gridSpan?: "col-span-1" | "col-span-2" | "col-span-3" | "row-span-2";
}

export interface ServiceItem {
  id: string;
  title: string;
  hindiTitle?: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  deliverables: string[];
  iconName: string;
  image: string;
  galleryImages?: string[];
  featured?: boolean;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  hindiTitle?: string;
  tagline: string;
  description: string;
  details: string[];
  durationEstimate?: string;
  keyDeliverable?: string;
  iconName?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  projectType: string;
  city?: string;
  quote: string;
  rating: number;
  year: string;
  isDemonstrationSample?: boolean;
}

export interface CostEstimatorInput {
  propertyType: "1bhk" | "2bhk" | "3bhk" | "4bhk-plus" | "villa" | "office" | "retail" | "other";
  carpetAreaSqFt: number;
  serviceCategory: "architectural" | "interior" | "3d-only" | "turnkey-full";
  finishTier: "standard" | "premium" | "luxury";
  include3dWalkthrough?: boolean;
  includeVastuPlanning?: boolean;
  includeSiteSupervision?: boolean;
}

export interface CostEstimatorResult {
  estimatedMinTotal: number;
  estimatedMaxTotal: number;
  currency: string;
  perSqFtRateMin: number;
  perSqFtRateMax: number;
  breakdown: {
    baseService: string;
    finishLevel: string;
    area: number;
    addons: string[];
  };
  notes: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  serviceCategory: string;
  propertyType?: string;
  carpetArea?: string;
  budgetRange?: string;
  message: string;
  honeypot?: string;
  privacyConsent: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}
