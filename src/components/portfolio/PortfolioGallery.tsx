"use client";

import React, { useState, useMemo } from "react";
import { Project, ProjectCategory } from "@/types";
import { portfolioProjects } from "@/data/portfolio";
import { ProjectCard } from "./ProjectCard";
import { LightboxModal } from "./LightboxModal";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { VerifiedNotice } from "@/components/common/VerifiedNotice";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type ExtendedCategory = ProjectCategory | "before-after";

export function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState<ExtendedCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const categories: { id: ExtendedCategory; label: string; count: number }[] = [
    { id: "all", label: "All Works", count: portfolioProjects.length },
    {
      id: "residential",
      label: "Residential",
      count: portfolioProjects.filter((p) => p.category === "residential").length,
    },
    {
      id: "interior",
      label: "Luxury Interiors",
      count: portfolioProjects.filter((p) => p.category === "interior").length,
    },
    {
      id: "commercial",
      label: "Commercial",
      count: portfolioProjects.filter((p) => p.category === "commercial").length,
    },
    {
      id: "3d-visualization",
      label: "3D Visualization",
      count: portfolioProjects.filter((p) => p.category === "3d-visualization").length,
    },
    {
      id: "before-after",
      label: "Before & After",
      count: portfolioProjects.filter((p) => Boolean(p.beforeAfter)).length,
    },
  ];

  const filteredProjects = useMemo(() => {
    return portfolioProjects.filter((project) => {
      let matchesCategory = true;
      if (activeCategory === "before-after") {
        matchesCategory = Boolean(project.beforeAfter);
      } else if (activeCategory !== "all") {
        matchesCategory = project.category === activeCategory;
      }

      const matchesSearch =
        searchQuery.trim() === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.scope?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleOpenLightbox = (project: Project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  return (
    <section className="py-12 sm:py-16 bg-stone-950 text-stone-100 min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Verification Note */}
        <div className="mb-10">
          <VerifiedNotice variant="banner" />
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 mb-10 pb-8 border-b border-stone-800">
          {/* Category Tabs */}
          <div
            className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none"
            role="tablist"
            aria-label="Project Categories"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-3.5 sm:px-4 py-2 rounded-sm text-xs sm:text-sm font-medium tracking-wide transition-all uppercase whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]",
                  activeCategory === cat.id
                    ? "bg-[#C5A880] text-stone-950 font-semibold shadow-md"
                    : "bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800"
                )}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search by keywords, scope..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-stone-900 border border-stone-800 rounded-sm text-xs sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880]"
              aria-label="Search projects by keyword"
            />
          </div>
        </div>

        {/* If user selected Before & After category tab, show featured interactive slider showcase first! */}
        {activeCategory === "before-after" && (
          <div className="mb-14 p-6 sm:p-8 bg-stone-900/60 border border-[#C5A880]/30 rounded-sm">
            <div className="flex items-center gap-2 mb-4 text-[#E0C7A6]">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span className="text-xs uppercase tracking-widest font-semibold">Featured Transformation Showcase</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {portfolioProjects
                .filter((p) => p.beforeAfter)
                .map((project) => (
                  <div key={`slider-${project.id}`} className="flex flex-col gap-3">
                    <BeforeAfterSlider
                      beforeImage={project.beforeAfter!.beforeImage}
                      afterImage={project.beforeAfter!.afterImage}
                      beforeLabel={project.beforeAfter!.beforeLabel}
                      afterLabel={project.beforeAfter!.afterLabel}
                      title={project.title}
                      subtitle={project.tagline}
                      aspectRatio="16/10"
                    />
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-stone-400 font-light">{project.area} • {project.location}</span>
                      <button
                        onClick={() => handleOpenLightbox(project)}
                        className="text-xs text-[#C5A880] hover:underline font-medium"
                      >
                        View Full Gallery →
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProjectCard
                    project={project}
                    onOpenLightbox={handleOpenLightbox}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-stone-900/50 rounded-sm border border-stone-800 p-8">
            <SlidersHorizontal className="w-8 h-8 text-stone-500 mx-auto mb-3" />
            <h3 className="text-lg font-serif text-stone-200">No Projects Found</h3>
            <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
              Try adjusting your category filter or search query.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-1.5 text-xs text-[#C5A880] hover:underline font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Dialog */}
      <LightboxModal
        project={selectedProject}
        activeImageIndex={activeImageIndex}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        onSelectImage={setActiveImageIndex}
      />
    </section>
  );
}
