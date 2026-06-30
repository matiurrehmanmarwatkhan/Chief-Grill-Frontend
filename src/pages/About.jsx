/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Landmark, ChefHat, CheckCircle2, History, Award, Heart } from "lucide-react";

export default function About({ restaurant }) {
  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F5] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 animate-fade-in">
        
        {/* Editorial Brand Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 bg-[#1A1A1A] border border-white/10 rounded text-[10px] uppercase tracking-wider text-[#E19E4F] font-mono font-bold leading-none">
              OUR HISTORICAL TIMELINE
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-black italic text-white leading-tight tracking-tight">
              Peshawar's Gourmet <br />
              Legacy Since {restaurant.established || "1983"}
            </h1>
            
            <p className="text-zinc-400 font-brand text-base leading-relaxed font-light">
              Chief Grill opened its doors in university town Peshawar back in 1983. At the time, Peshawar's food scene was characterized by simple local joints. We set out to redefine this by bringing international grilling standards, luxury seating, and a robust fusion of BBQs, thick-cut hot Steaks and premium pizzas.
            </p>
            
            <p className="text-zinc-500 text-sm leading-relaxed">
              Today, Chief Grill spans generations of families who first dined here as kids and now bring their grandchildren. Our secret has always remained unchanged: never compromise on raw ingredient premium grades, hand-grill over authentic organic charcoals, and serve every guest with absolute royal hospitality.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-1">
                <span className="text-3xl font-brand font-black text-[#E19E4F] font-mono">40+</span>
                <p className="text-xs text-zinc-400">Years of Family Trust</p>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-brand font-black text-[#E19E4F] font-mono">100%</span>
                <p className="text-xs text-zinc-400">Local Halal Procurement</p>
              </div>
            </div>
          </div>

          {/* Luxury illustration frame */}
          <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#141414] group">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000"
              alt="Chief Grill dining atmosphere"
              className="w-full h-full object-cover transition duration-500 filter brightness-90 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            {/* Ambient visual badge */}
            <div className="absolute bottom-6 right-6 bg-black/95 border border-white/10 p-4 rounded-2xl max-w-xs backdrop-blur space-y-1 animate-fade-in">
              <h4 className="font-brand font-bold text-white text-sm">Aesthetic Banquet Spaces</h4>
              <p className="text-zinc-500 text-[11px]">Fully separated private dining cells for royal families in University Town and Hayatabad.</p>
            </div>
          </div>

        </div>

        {/* Brand core values */}
        <div className="py-16 border-t border-white/5 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs text-[#E19E4F] font-mono tracking-widest uppercase">OUR GUIDING PILLARS</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black italic text-white tracking-tight">Crafted With Perfection</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ChefHat className="w-8 h-8 text-[#E19E4F]" />,
                title: "Premium Grilling Masters",
                description: "Our core grilling chefs have been with us for years, preserving the hand-seasoned secrets of traditional masala marinations, charbroiling rules and steak glaze cookery."
              },
              {
                icon: <CheckCircle2 className="w-8 h-8 text-[#E19E4F]" />,
                title: "Pristine Hygiene Controls",
                description: "From daily deep steam cleans of our stainless steel counters to double wash routines of cold ingredients, we uphold international standards in kitchen health safety."
              },
              {
                icon: <Heart className="w-8 h-8 text-[#E19E4F]" />,
                title: "Legendary Hospitality",
                description: "Guests are treated with deep respect and immediate service. Our local waiters ensure your food arrives sizzling, hot, and exactly to your customized liking."
              }
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-[#141414] p-8 rounded-2xl border border-white/5 hover:border-[#E19E4F]/20 transition"
              >
                <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 text-[#E19E4F]">
                  {value.icon}
                </div>
                <h3 className="text-lg font-brand font-bold text-zinc-100 mb-3">{value.title}</h3>
                <p className="text-zinc-500 text-xs font-sans font-light leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
