/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Gift, Calendar, Check, Copy, Flame, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Offers({ offersList }) {
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  const navigate = useNavigate();

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => {
      setCopiedCodeId(null);
    }, 2000);
  };

  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F5] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page title introduction */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 bg-[#1A1A1A] border border-white/10 rounded text-[10px] uppercase tracking-wider text-[#E19E4F] font-mono font-bold leading-none">
            DIRECT SIGNUP PROMOTIONS
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-black italic text-white tracking-tight leading-none text-white">
            Exclusive Deals
          </h1>
          <p className="text-zinc-400 font-brand text-base">
            Claim limited-time premium BBQ combinations, steak bundles and loyal birthday discounts by presenting these digital coupons to our servers!
          </p>
        </div>

        {/* Offers list Grid */}
        {offersList.length === 0 ? (
          <div className="text-center py-20 bg-[#141414] border border-white/5 rounded-2xl flex flex-col items-center justify-center space-y-4">
            <Gift className="w-12 h-12 text-[#E19E4F] animate-pulse" />
            <p className="text-zinc-500 text-sm font-sans">No promotions active today. Follow us on Instagram for flash deals!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offersList.map((offer) => (
              <div
                key={offer.id}
                className="group bg-[#141414] rounded-2xl border border-white/10 overflow-hidden flex flex-col sm:flex-row hover:border-[#E19E4F]/30 transition duration-250"
              >
                {/* Promo Image pane */}
                <div className="relative w-full sm:w-1/3 aspect-[4/3] sm:aspect-auto bg-zinc-900 overflow-hidden shrink-0">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition duration-300 filter brightness-95 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Fire overlay badge for urgent deals */}
                  <div className="absolute top-3 left-3 bg-[#E19E4F] text-black font-brand text-[9px] font-bold uppercase py-0.5 px-2 rounded-md shadow flex items-center gap-1">
                    <Flame className="w-3 h-3 text-black fill-current" /> HOT PROMO
                  </div>
                </div>

                {/* Offer details pane */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-zinc-500 text-[10px] uppercase tracking-wider font-mono">
                      <Calendar className="w-3.5 h-3.5 text-[#E19E4F]" />
                      <span>UNTIL: {offer.expiryDate}</span>
                    </div>
                    <h3 className="text-lg font-serif italic text-white group-hover:text-[#E19E4F] transition duration-150">
                      {offer.title}
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed font-sans font-light">
                      {offer.description}
                    </p>
                    <p className="text-[#E19E4F] text-xs font-brand italic pt-1">
                      * {offer.validity}
                    </p>
                  </div>

                  {/* Promo Coupons controls */}
                  <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                    {offer.code ? (
                      <div>
                        <span className="text-[9px] text-[#E19E4F] uppercase font-mono block mb-1">PROMO CODE</span>
                        <div className="flex items-center gap-1.5 bg-black border border-white/10 rounded-lg p-1.5">
                          <code className="text-xs text-white font-mono px-2 py-0.5 uppercase tracking-wide font-bold">
                            {offer.code}
                          </code>
                          <button
                            onClick={() => handleCopyCode(offer.code, offer.id)}
                            className="p-1 px-2 bg-white/5 hover:bg-white/10 text-zinc-350 hover:text-white rounded text-[10px] font-brand font-semibold select-none flex items-center gap-1 transition cursor-pointer"
                          >
                            {copiedCodeId === offer.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" /> Copy
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-zinc-500 text-xs italic">No code needed, present image on counter.</div>
                    )}

                    <button
                      onClick={() => navigate("/menu")}
                      className="text-xs font-brand font-bold text-[#E19E4F] hover:text-[#d08f43] flex items-center gap-1 transition cursor-pointer"
                    >
                      Use Deal Inside Menu
                      <ArrowRight className="w-4 h-4 text-[#E19E4F]" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Info panel */}
        <div className="p-8 bg-[#141414] border border-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="w-12 h-12 rounded-full bg-[#E19E4F]/10 flex items-center justify-center border border-[#E19E4F]/20 text-[#E19E4F] grow-0 shrink-0">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-brand font-extrabold text-white text-base">Corporate Gatherings & Event Catering</h4>
              <p className="text-zinc-500 text-xs mt-0.5">Looking to cater an office party or a private wedding anniversary? Get custom customized menus and direct service.</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-3 bg-[#E19E4F] hover:bg-[#d08f43] text-black font-brand font-bold text-xs uppercase tracking-wider rounded-lg transition shrink-0 cursor-pointer"
          >
            Consult Catering Executive
          </button>
        </div>

      </div>
    </div>
  );
}
