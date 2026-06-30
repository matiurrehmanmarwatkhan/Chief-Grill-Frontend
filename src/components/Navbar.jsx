/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  UtensilsCrossed,
  ShoppingBag,
  Menu,
  X,
  Landmark,
  Award,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ cart, setCartOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/reservations", label: "Reservations" },
    { path: "/gallery", label: "Gallery" },
    { path: "/offers", label: "Offers" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
    { path: "/admin", label: "Admin" },
  ];

  const handleTabClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    // Smooth scroll back to top on tab swap
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900/80 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Slogan */}
          <div
            onClick={() => handleTabClick("/")}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 bg-brand-gold rounded-lg flex items-center justify-center font-bold text-black text-xl shadow-lg shadow-brand-gold/10 group-hover:scale-105 transition duration-200">
              <span className="font-serif italic font-bold">CG</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-serif tracking-tight font-black italic text-[#E19E4F]">
                  Chief Grill
                </span>
                <span className="hidden sm:inline-block bg-[#1A1A1A] text-brand-gold text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded border border-brand-border">
                  ESTD 1983
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-sans tracking-widest uppercase font-semibold">
                Peshawar's Gourmet Heritage
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleTabClick(link.path)}
                className={`px-4 py-2 rounded-xl cursor-pointer text-xs uppercase tracking-wider font-brand font-semibold transition-all duration-150 relative ${
                  location.pathname === link.path
                    ? "text-[#E19E4F] bg-[#141414] font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-[#141414]/50"
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-brand-gold rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-4">
            {/* Direct Order Button */}
            <button
              onClick={() => handleTabClick("/menu")}
              className="hidden lg:flex items-center gap-1.5 bg-[#E19E4F] hover:bg-[#d08f43] active:translate-y-0.5 text-black text-xs font-brand font-bold px-5 py-2.5 rounded-full shadow-[0_4px_12px_rgba(225,158,79,0.15)] cursor-pointer transition"
            >
              Order Online
            </button>

            {/* Shopping cart trigger */}
            <button
              id="navbar-cart-btn"
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-brand-card border border-zinc-800 hover:bg-brand-cardlight text-zinc-300 hover:text-white cursor-pointer transition group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition text-brand-gold" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-gold text-black rounded-full flex items-center justify-center text-[10px] font-mono font-bold border-2 border-brand-darkbg animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu panel trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-brand-card border border-zinc-800 hover:bg-brand-cardlight text-zinc-300 hover:text-white md:hidden transition"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brand-border bg-brand-darkbg px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleTabClick(link.path)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-brand font-semibold uppercase tracking-wider transition ${
                location.pathname === link.path
                  ? "text-brand-gold bg-brand-card font-bold border-l-4 border-brand-gold pl-3"
                  : "text-zinc-400 hover:text-white hover:bg-brand-card/50"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              handleTabClick("/menu");
            }}
            className="w-full mt-4 bg-brand-gold text-black text-center py-3 rounded-xl text-xs uppercase tracking-widest font-brand font-bold transition shadow-lg"
          >
            Explore Menu & Order
          </button>
        </div>
      )}
    </nav>
  );
}
