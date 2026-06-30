/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Maximize2, X, Image as ImageIcon, Sparkles, Filter } from "lucide-react";

export default function Gallery({ galleryItems }) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filters = [
    { id: "all", label: "All Photos" },
    { id: "food", label: "Specialty Dishes" },
    { id: "interior", label: "Interior & Lounge" },
    { id: "family", label: "Family Hall" },
    { id: "events", label: "Special Banquets" }
  ];

  const filteredGallery = useMemo(() => {
    if (selectedFilter === "all") return galleryItems;
    return galleryItems.filter((item) => item.category === selectedFilter);
  }, [galleryItems, selectedFilter]);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev + 1) % filteredGallery.length);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F5] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in">
        
        {/* Page Headings */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 bg-[#1A1A1A] border border-white/10 rounded text-[10px] uppercase tracking-wider text-[#E19E4F] font-mono font-bold leading-none">
            TASTE MEETING LUXURY
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-black italic text-white tracking-tight leading-none">
            Our Gallery
          </h1>
          <p className="text-zinc-400 font-brand text-base">
            Take a virtual tour of our premium family dining lounge, sizzling barbecues, and corporate celebrations in Peshawar.
          </p>
        </div>

        {/* Filter categories Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 select-none">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setSelectedFilter(f.id);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2 rounded-xl text-xs font-brand font-semibold tracking-wide border transition duration-150 cursor-pointer ${
                selectedFilter === f.id
                  ? "bg-[#E19E4F] border-[#E19E4F] text-black shadow-xl font-bold"
                  : "bg-[#141414] border-white/5 text-zinc-400 hover:text-white hover:border-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Gallery Image Grid */}
        {filteredGallery.length === 0 ? (
          <div className="text-center py-20 bg-[#141414] border border-white/5 rounded-2xl flex flex-col items-center justify-center space-y-4">
            <ImageIcon className="w-12 h-12 text-zinc-700 animate-pulse" />
            <p className="text-zinc-500 text-sm font-sans">No photos in this category yet. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGallery.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(index)}
                className="group relative aspect-square bg-zinc-900 overflow-hidden cursor-pointer rounded-2xl border border-white/10 hover:border-[#E19E4F]/40 shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title || "Gallery photo"}
                  className="w-full h-full object-cover transition duration-500 filter brightness-95 group-hover:brightness-50 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />

                {/* Cover Overlay details on Hoover hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black via-black/50 to-transparent">
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
                    <span className="text-[9px] bg-[#E19E4F] text-black font-mono uppercase tracking-widest px-2 py-0.5 rounded font-bold">
                      {item.category}
                    </span>
                    <h3 className="font-brand font-bold text-sm text-white pt-1">
                      {item.title || "Chief Grill Ambiance"}
                    </h3>
                    <div className="flex items-center gap-1 text-zinc-400 text-[10px] font-sans font-medium hover:text-[#E19E4F] transition pt-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-[#E19E4F]" /> Fullscreen Lightbox
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Fullscreen Lightbox Preview Overlay */}
        {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
          <div
            onClick={handleCloseLightbox}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out animate-fade-in"
          >
            <button
              onClick={handleCloseLightbox}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#141414] border border-white/10 text-white hover:bg-zinc-800 transition shadow cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Slider back button */}
            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-[#141414]/60 hover:bg-[#141414] border border-white/10 rounded-full text-zinc-350 hover:text-white transition cursor-pointer select-none"
            >
              <span className="text-xl font-bold font-mono">←</span>
            </button>

            {/* Main Image content frame */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[80vh] flex flex-col items-center gap-3 cursor-default"
            >
              <img
                src={filteredGallery[lightboxIndex].image}
                alt={filteredGallery[lightboxIndex].title || "Lightbox view"}
                 className="max-w-full max-h-[70vh] rounded-xl object-contain shadow-2xl border border-white/10 bg-black"
                referrerPolicy="no-referrer"
              />
              <div className="text-center space-y-1">
                <span className="text-[9px] bg-[#E19E4F]/10 text-[#E19E4F] border border-[#E19E4F]/20 font-mono px-3 py-1 rounded-full uppercase tracking-wider">
                  Category: {filteredGallery[lightboxIndex].category}
                </span>
                <p className="font-brand font-extrabold text-white text-base mt-2">
                  {filteredGallery[lightboxIndex].title || "Signature Dining Presentation"}
                </p>
              </div>
            </div>

            {/* Slider next button */}
            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-[#141414]/60 hover:bg-[#141414] border border-white/10 rounded-full text-zinc-350 hover:text-white transition cursor-pointer select-none"
            >
              <span className="text-xl font-bold font-mono">→</span>
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
