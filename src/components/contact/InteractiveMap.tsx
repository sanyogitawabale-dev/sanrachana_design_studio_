import React from "react";
import { siteConfig, hasAddress, getDirectionsUrl } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { MapPin, Navigation, ExternalLink, Compass } from "lucide-react";

export function InteractiveMap() {
  const addressAvailable = hasAddress();
  const embedUrl = siteConfig.contact.googleMapsEmbedUrl;
  const directionsUrl = getDirectionsUrl();

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-sm overflow-hidden shadow-xl">
      <div className="p-6 sm:p-7 border-b border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A880] font-semibold mb-1">
            <MapPin className="w-4 h-4" />
            <span>Studio Location & Presence</span>
          </div>
          <h3 className="text-xl font-serif text-white">
            {addressAvailable ? siteConfig.contact.address : "Architecture & Interior Design Studio"}
          </h3>
          <p className="text-xs text-stone-400 font-light mt-0.5">
            Serving Residential, Commercial & Turnkey Clients Across India
          </p>
        </div>

        {directionsUrl && (
          <Button
            variant="gold"
            size="sm"
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            leftIcon={<Navigation className="w-4 h-4" />}
            rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
          >
            Get Directions
          </Button>
        )}
      </div>

      {/* Map Embed or Architectural Spatial Graphic */}
      <div className="relative min-h-[320px] w-full bg-stone-950 flex items-center justify-center p-6 text-center">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sanrachana Design Studio Location Map"
            className="w-full h-80 grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="max-w-md space-y-4 py-8">
            <div className="w-14 h-14 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center mx-auto text-[#C5A880]">
              <Compass className="w-7 h-7" />
            </div>

            <div>
              <div className="text-base font-serif text-white">
                {addressAvailable
                  ? siteConfig.contact.address
                  : "Sanrachana Design Studio (संरचना)"}
              </div>
              <p className="text-xs text-stone-400 font-light mt-2 leading-relaxed">
                We coordinate site visits, laser spatial surveys, and design discovery meetings for residential villas, luxury flats, and commercial properties.
              </p>
            </div>

            {directionsUrl && (
              <Button
                variant="outline"
                size="sm"
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 border-stone-700 hover:bg-stone-800"
              >
                Search Studio on Google Maps
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
