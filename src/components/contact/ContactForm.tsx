"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Input, Textarea, Select } from "@/components/ui/FormControls";
import { Button } from "@/components/ui/Button";
import { servicesData } from "@/data/services";
import { ApiResponse } from "@/types";
import { Send, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import { hasWhatsApp, getWhatsAppUrl } from "@/config/site";

export function ContactForm() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceCategory: "Architectural Design",
    propertyType: "3 BHK Apartment / Floor",
    carpetArea: "",
    budgetRange: "",
    message: "",
    honeypot: "", // hidden spam field
    privacyConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
    referenceId?: string;
  } | null>(null);

  // Pre-populate form fields from URL search params (e.g. from services or estimator)
  useEffect(() => {
    if (!searchParams) return;
    const serviceParam = searchParams.get("service");
    const propertyParam = searchParams.get("propertyType");
    const areaParam = searchParams.get("area");
    const budgetParam = searchParams.get("budget");

    setFormData((prev) => ({
      ...prev,
      serviceCategory: serviceParam || prev.serviceCategory,
      propertyType: propertyParam || prev.propertyType,
      carpetArea: areaParam ? `${areaParam} sq. ft.` : prev.carpetArea,
      budgetRange: budgetParam || prev.budgetRange,
      message:
        areaParam && budgetParam
          ? `Hello, I computed an initial project estimate for a ${propertyParam || "property"} of approx ${areaParam} sq. ft. (Budget range: ${budgetParam}). I would like to schedule a formal consultation.`
          : prev.message,
    }));
  }, [searchParams]);

  const serviceOptions = [
    { label: "Architectural Planning & Facade Design", value: "Architectural Design" },
    { label: "Luxury Interior Architecture & Styling", value: "Interior Design" },
    { label: "3D Elevation & Photorealistic Renders", value: "3D Visualization" },
    { label: "Space Planning & Vastu Alignment", value: "Space Planning" },
    { label: "Turnkey Execution & Site Supervision", value: "Turnkey Execution" },
    { label: "General Project Consultation", value: "General Consultation" },
  ];

  const propertyOptions = [
    { label: "3 BHK Apartment / Floor", value: "3 BHK Apartment" },
    { label: "2 BHK Apartment", value: "2 BHK Apartment" },
    { label: "4+ BHK Penthouse / Luxury Suite", value: "4+ BHK Penthouse" },
    { label: "Private Bungalow / Villa", value: "Private Villa" },
    { label: "Commercial Office / Studio", value: "Commercial Office" },
    { label: "Retail / Boutique Space", value: "Retail Space" },
    { label: "Raw Plot / Greenfield Architecture", value: "Greenfield Plot" },
    { label: "Other / Renovation Scope", value: "Other" },
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your name (minimum 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Please describe your project (minimum 10 characters).";
    }

    if (!formData.privacyConsent) {
      newErrors.privacyConsent = "Please agree to the privacy policy to submit.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse<{ referenceId?: string }> = await res.json();

      if (!res.ok) {
        setSubmitStatus({
          success: false,
          message:
            data.message || "Failed to dispatch your inquiry. Please try WhatsApp.",
        });
        if (data.errors) {
          setErrors(data.errors);
        }
      } else {
        setSubmitStatus({
          success: true,
          message: data.message,
          referenceId: data.data?.referenceId,
        });
        // Reset form upon success
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceCategory: "Architectural Design",
          propertyType: "3 BHK Apartment / Floor",
          carpetArea: "",
          budgetRange: "",
          message: "",
          honeypot: "",
          privacyConsent: false,
        });
        setErrors({});
      }
    } catch {
      setSubmitStatus({
        success: false,
        message: "Network error. Please check your connection or reach out on WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsAppAvailable = hasWhatsApp();

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-sm p-6 sm:p-8 md:p-10 shadow-xl">
      <div className="mb-8 pb-6 border-b border-stone-800">
        <h3 className="text-2xl font-serif text-white">Send a Project Inquiry</h3>
        <p className="mt-1.5 text-xs sm:text-sm text-stone-400 font-light">
          Fill in your details below and our design team will contact you with preliminary ideas and next steps.
        </p>
      </div>

      {submitStatus && (
        <div
          className={`mb-8 p-5 rounded-sm border text-sm flex items-start gap-3.5 ${
            submitStatus.success
              ? "bg-emerald-950/40 border-emerald-800 text-emerald-200"
              : "bg-red-950/40 border-red-800 text-red-200"
          }`}
        >
          {submitStatus.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="font-semibold">
              {submitStatus.success ? "Inquiry Dispatched Successfully" : "Submission Error"}
            </div>
            <p className="mt-1 text-xs leading-relaxed opacity-90">{submitStatus.message}</p>
            {submitStatus.referenceId && (
              <p className="mt-1 text-[11px] font-mono opacity-70">
                Ref: {submitStatus.referenceId}
              </p>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Spam protection Honeypot - visually hidden from human users */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="hp_field">Do not fill this</label>
          <input
            id="hp_field"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          />
        </div>

        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Your Full Name"
            required
            placeholder="e.g. Rahul Sharma"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
          />

          <Input
            label="Email Address"
            type="email"
            required
            placeholder="e.g. rahul@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
          />
        </div>

        {/* Row 2: Phone & Service Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Phone / WhatsApp (Optional)"
            type="tel"
            placeholder="e.g. +91 98765 43210"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={errors.phone}
            helperText="For instant WhatsApp follow-up"
          />

          <Select
            label="Service Discipline"
            required
            options={serviceOptions}
            value={formData.serviceCategory}
            onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
          />
        </div>

        {/* Row 3: Property Type & Carpet Area */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Select
            label="Property Type"
            options={propertyOptions}
            value={formData.propertyType}
            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
          />

          <Input
            label="Carpet Area (Approx)"
            placeholder="e.g. 2,400 sq. ft."
            value={formData.carpetArea}
            onChange={(e) => setFormData({ ...formData, carpetArea: e.target.value })}
          />

          <Input
            label="Estimated Budget"
            placeholder="e.g. ₹ 25 - 40 Lakhs"
            value={formData.budgetRange}
            onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
          />
        </div>

        {/* Row 4: Project Message */}
        <Textarea
          label="Project Vision & Specific Requirements"
          required
          rows={4}
          placeholder="Share details about your site location, family spatial requirements, preferred aesthetic style (modernist, japandi, minimalist), timeline expectations..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          error={errors.message}
        />

        {/* Privacy Consent Checkbox */}
        <div className="space-y-1">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.privacyConsent}
              onChange={(e) =>
                setFormData({ ...formData, privacyConsent: e.target.checked })
              }
              className="w-4 h-4 mt-0.5 accent-[#C5A880] rounded"
            />
            <span className="text-xs text-stone-400 font-light leading-relaxed">
              I consent to Sanrachana Design Studio processing my submitted contact details to evaluate my architectural or interior project inquiry.
            </span>
          </label>
          {errors.privacyConsent && (
            <p className="text-xs text-red-500 pl-7">{errors.privacyConsent}</p>
          )}
        </div>

        {/* Submit Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
          <Button
            type="submit"
            variant="gold"
            size="lg"
            isLoading={isSubmitting}
            rightIcon={<Send className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Submit Project Inquiry
          </Button>

          {whatsAppAvailable && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<MessageCircle className="w-4 h-4 text-emerald-400" />}
              className="w-full sm:w-auto text-stone-300 border-stone-700 hover:border-emerald-500/50 hover:bg-stone-950"
            >
              Prefer WhatsApp? Chat Directly
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
