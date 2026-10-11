import { Hero } from "@/components/home/Hero";
import { CinematicStoryScroll } from "@/components/home/CinematicStoryScroll";
import { SketchToSpaceSection } from "@/components/home/SketchToSpaceSection";
import { ArchitecturalMarquee } from "@/components/home/ArchitecturalMarquee";
import { StatsOverview } from "@/components/home/StatsOverview";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { InstagramReelsSection } from "@/components/home/InstagramReelsSection";
import { InstagramShowcase } from "@/components/home/InstagramShowcase";
import { ProjectStorySpotlight } from "@/components/home/ProjectStorySpotlight";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { EmotionalBrandStatement } from "@/components/home/EmotionalBrandStatement";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Section 1: The Possibility (Opening Hero) */}
      <Hero />

      {/* Cinematic Scrollytelling Story: From Empty Space to Dream Space */}
      <CinematicStoryScroll />

      {/* Section 2: From Sketch to Space */}
      <SketchToSpaceSection />

      {/* Studio Rhythm: Marquee & Stats */}
      <ArchitecturalMarquee />
      <StatsOverview />

      {/* Section 3: What We Design (Services) */}
      <ServicesPreview />

      {/* Section 4: Selected Work (Featured Case Studies & Transformations) */}
      <FeaturedProjects />

      {/* Section 5: Portfolio Gallery & Instagram Reels Walkthroughs */}
      <InstagramReelsSection />
      <InstagramShowcase />

      {/* Section 6: Project Stories (Deep Dive Methodology) */}
      <ProjectStorySpotlight />

      {/* Section 7: Our Process (4-Phase Architecture Workflow) */}
      <ProcessTimeline />

      {/* Section 8: Emotional Brand Statement */}
      <EmotionalBrandStatement />

      {/* Section 9: Start a Project (Enquiry & Consultation) */}
      <ConsultationCTA />
    </main>
  );
}
