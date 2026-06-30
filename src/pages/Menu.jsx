/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Search, Flame, Award, Filter, ArrowUpRight, ShoppingCart } from "lucide-react";

export default function Menu({ menuItems, onAddToCart, setCartOpen }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Categories lists derived dynamically
  const categories = useMemo(() => {
    const defaultCategories = ["All", "BBQ", "Burgers", "Pizza", "Desi Food", "Chinese", "Desserts", "Drinks"];
    const uniqueFromDB = Array.from(new Set(menuItems.map(item => item.category)));
    
    // Merge categories ensuring we preserve custom categories correctly
    const merged = Array.from(new Set([...defaultCategories, ...uniqueFromDB]));
    return merged.filter(Boolean);
  }, [menuItems]);

  // Handle Item filtering
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [menuItems, selectedCategory, searchQuery]);

  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F5] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title & Introduction header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 bg-[#1A1A1A] border border-white/10 rounded text-[10px] uppercase tracking-wider text-[#E19E4F] font-mono font-bold leading-none">
            AUTHENTIC FLAVORS, HAND-GRILL MASTERY
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-black italic text-white tracking-tight">
            Our Digital Menu
          </h1>
          <p className="text-zinc-400 font-brand text-base sm:text-lg">
            Sautéed, seasoned, sizzled and served fresh. Click to add any premium item to your WhatsApp ordering basket and checkout directly.
          </p>
        </div>

        {/* Categories, Filters & Search Bar */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center bg-[#141414] p-4 rounded-2xl border border-white/5 shadow-inner">
          
          {/* Categories selectors */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-3 lg:pb-0 custom-scrollbar whitespace-nowrap select-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl font-brand text-xs font-semibold tracking-wide transition cursor-pointer select-none border ${
                  selectedCategory === cat
                    ? "bg-[#E19E4F] border-[#E19E4F] text-black font-bold"
                    : "bg-black border-white/5 hover:border-white/20 text-zinc-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box filters */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search Butterfly Steaks or Pizza..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl p-3 pl-10 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#E19E4F] transition"
            />
          </div>

        </div>

        {/* Menu Listings */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#141414] border border-white/5 rounded-2xl space-y-4">
            <p className="text-zinc-500 text-sm font-sans">No culinary dishes found matching your current filter metrics.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 bg-black border border-white/10 hover:bg-white/5 text-xs text-zinc-300 rounded-lg transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-[#141414] rounded-2xl overflow-hidden border border-white/10 hover:border-[#E19E4F]/35 transition duration-200 flex flex-col justify-between"
              >
                
                {/* Upper Frame: Image & Badge overlay */}
                <div className="relative aspect-video bg-zinc-950 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition duration-500 filter brightness-90 group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 flex gap-1.5 items-center">
                    <span className="bg-black/95 text-zinc-300 font-brand font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur border border-white/10">
                      {item.category}
                    </span>
                    
                    {item.popular && (
                      <span className="bg-[#E19E4F] text-black font-brand font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow flex items-center gap-1">
                        <Flame className="w-3 h-3 text-black fill-current" /> Signature
                      </span>
                    )}
                  </div>

                  {/* Availability status overlay */}
                  {!item.availability && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                      <span className="bg-white/5 text-zinc-500 font-brand font-black text-xs uppercase tracking-widest px-4 py-2 rounded-xl border border-white/10">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                {/* Lower Frame: Details & pricing */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-serif italic text-white group-hover:text-[#E19E4F] transition duration-150">
                      {item.name}
                    </h3>
                    <p className="text-zinc-400 text-xs font-sans font-light leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Footers */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <span className="text-[9px] text-[#E19E4F] uppercase font-mono block">OUR RATE</span>
                      <span className="font-brand font-black text-base text-[#E19E4F] font-mono">
                        Rs. {item.price}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (item.availability) {
                          onAddToCart(item);
                        }
                      }}
                      disabled={!item.availability}
                      className={`font-brand text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-lg flex items-center gap-1.5 transition ${
                        item.availability
                          ? "bg-[#E19E4F] hover:bg-[#d08f43] text-black cursor-pointer active:translate-y-0.5"
                          : "bg-black text-zinc-650 border border-white/5 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to basket
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
