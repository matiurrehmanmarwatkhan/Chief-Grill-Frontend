/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { UtensilsCrossed, Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer({ restaurant }) {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 text-zinc-400">
      
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand & Mission */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#E19E4F] rounded flex items-center justify-center text-black font-extrabold text-sm tracking-tighter">
                CG
              </div>
              <span className="text-xl font-serif font-black italic text-white tracking-tight">
                Chief <span className="text-[#E19E4F]">Grill</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed font-sans">
              Peshawar's favorite culinary destination since {restaurant.established || "1983"}. Crafting perfect wood-charred barbecues, artisanal steaks, and premium continental culinary experiences.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {restaurant.socialLinks?.facebook && (
                <a
                  href={restaurant.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#141414] border border-white/10 hover:border-[#E19E4F]/30 hover:bg-[#1A1A1A] text-zinc-400 hover:text-[#E19E4F] flex items-center justify-center transition"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {restaurant.socialLinks?.instagram && (
                <a
                  href={restaurant.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#141414] border border-white/10 hover:border-[#E19E4F]/30 hover:bg-[#1A1A1A] text-zinc-400 hover:text-[#E19E4F] flex items-center justify-center transition"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {restaurant.socialLinks?.youtube && (
                <a
                  href={restaurant.socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#141414] border border-white/10 hover:border-[#E19E4F]/30 hover:bg-[#1A1A1A] text-zinc-400 hover:text-[#E19E4F] flex items-center justify-center transition"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick links to sections */}
          <div className="space-y-6">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              Explore Chief Grill
            </h4>
            <ul className="space-y-3 font-brand text-sm">
              {[
                { label: "Interactive Food Menu", path: "/menu" },
                { label: "Book a Dining Table", path: "/reservations" },
                { label: "Hot Promotional Offers", path: "/offers" },
                { label: "Premium Food Gallery", path: "/gallery" },
                { label: "Legacy Journey Story", path: "/about" },
                { label: "Locate Nearest Branch", path: "/contact" },
                { label: "Partner Portal (Admin)", path: "/admin" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-[#E19E4F] text-zinc-500 hover:underline text-left focus:outline-none transition cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Opening timings */}
          <div className="space-y-6">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              Dining Hours
            </h4>
            <div className="space-y-4 text-sm font-sans">
              <div className="flex gap-3 items-start">
                <Clock className="w-4 h-4 text-[#E19E4F] mt-0.5 shrink-0" />
                <div>
                  <p className="text-zinc-300 font-brand font-medium">Daily Dine-In & Takeaway</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{restaurant.timings || "12:00 PM - 02:00 AM"}</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Clock className="w-4 h-4 text-[#E19E4F] mt-0.5 shrink-0" />
                <div>
                  <p className="text-zinc-300 font-brand font-medium">Late Night Ordering</p>
                  <p className="text-zinc-500 text-xs mt-0.5">Available until 2:00 AM at University Town</p>
                </div>
              </div>
              <p className="text-xs text-zinc-650 italic">
                * Timings may slightly vary during special Islamic events, national holidays, and Ramadan seasons.
              </p>
            </div>
          </div>

          {/* Headquarters contact */}
          <div className="space-y-6">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              Direct Contact
            </h4>
            <div className="space-y-4 text-sm font-sans">
              <div className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-[#E19E4F] mt-0.5 shrink-0" />
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {restaurant.contact?.address || "Bhattani Plaza, 3A Park Avenue, University Town, Peshawar"}
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-[#E19E4F] shrink-0" />
                <a href={`tel:${restaurant.contact?.phone}`} className="hover:text-[#E19E4F] transition text-xs font-mono">
                  {restaurant.contact?.phone || "+92 (91) 584-5555"}
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-[#E19E4F] shrink-0" />
                <a href={`mailto:${restaurant.contact?.email}`} className="hover:text-[#E19E4F] transition text-xs truncate font-mono">
                  {restaurant.contact?.email || "info@chiefgrill.com"}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sub Footer with copywrite and design systems label */}
      <div className="bg-black/40 py-6 border-t border-white/5 text-center font-sans text-xs text-zinc-600">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} Chief Grill Pakistan. All absolute branding assets and copyrights reserved.</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                navigate("/admin");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-zinc-650 hover:text-[#E19E4F] hover:underline transition"
            >
              Partner Secretariat Portal
            </button>
            <span className="text-zinc-800">|</span>
            <button
              onClick={handleScrollToTop}
              className="group text-zinc-500 hover:text-white flex items-center gap-1 transition"
            >
              Back to top 
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition text-[#E19E4F]" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
