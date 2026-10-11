import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Compass, ArrowLeft, Home } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center pt-32 pb-20 bg-stone-950 text-stone-100 px-4">
      <div className="max-w-lg text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center mx-auto text-[#C5A880]">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
            {siteConfig.devanagariName} • 404 Error
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-white">
            Blueprint Not Found
          </h1>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            The spatial elevation or page you are looking for has been moved, renamed, or does not exist in our architectural plan.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="gold" size="md" href="/" leftIcon={<Home className="w-4 h-4" />}>
            Return to Home
          </Button>
          <Button
            variant="outline"
            size="md"
            href="/portfolio"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="border-stone-700 text-stone-300"
          >
            Explore Portfolio
          </Button>
        </div>
      </div>
    </main>
  );
}
