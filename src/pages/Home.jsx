/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  Star,
  ShieldCheck,
  HeartHandshake,
  Utensils,
  Award,
  Clock,
  ArrowRight,
  PhoneCall,
  Gift,
  ChevronRight,
  Navigation,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home({
  restaurant,
  menuItems,
  reviews,
  onAddToCart,
}) {
  const navigate = useNavigate();

  // Filter signature items based on client instructions (or fallback to popular ones)
  const signatureDishes = menuItems
    .filter((i) =>
      [
        "Butterfly Steak",
        "Chief Grill Special Pizza",
        "Molten Lava Cake",
        "Mint Margarita",
        "Chief Special Steak",
      ].includes(i.name),
    )
    .slice(0, 4);

  // If none matched, grab first 4 popular items
  const displaySignature =
    signatureDishes.length > 0
      ? signatureDishes
      : menuItems.filter((i) => i.popular).slice(0, 4);

  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F5] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-12">
        {/* Full-screen Darkened Food Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1600"
            alt="Premium Grilled Steaks Background"
            className="w-full h-full object-cover filter brightness-[0.18] scale-102"
          />
          {/* Subtle elegant radial gradient for focus */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-black/90" />
        </div>

        {/* Content Box */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Established pill badge */}
          <div className="inline-block px-3.5 py-1.5 bg-[#1A1A1A] border border-white/10 rounded-full text-[10px] uppercase tracking-wider text-[#E19E4F] font-mono leading-none">
            Est. 1983 • Peshawar Heritage Dinner
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white leading-none italic font-black tracking-tight max-w-4xl mx-auto">
            Experience <br />
            <span className="text-[#E19E4F] not-italic">Peshawar's</span> <br />
            Favorite Taste
          </h1>

          <p className="text-zinc-400 font-brand text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Premium wood-fired BBQ, custom hand-cut steak reductions, cheesy
            artisanal pizzas and authentic Continental Culinary Dining spanning
            over four decades.
          </p>

          {/* Action Call to Actions */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 max-w-lg mx-auto">
            <button
              onClick={() => navigate("/menu")}
              className="w-full sm:w-auto px-8 py-4 bg-[#E19E4F] hover:bg-[#d08f43] active:translate-y-0.5 text-black font-brand font-bold text-sm rounded-lg shadow-[0_0_30px_rgba(225,158,79,0.25)] cursor-pointer transition duration-200"
            >
              ORDER ONLINE
            </button>
            <button
              onClick={() => navigate("/menu")}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-brand font-bold text-sm rounded-lg cursor-pointer transition duration-150"
            >
              VIEW SIGNATURE MENU
            </button>
          </div>

          {/* Trust Banner (Google Review Metrics) */}
          <div className="pt-12 border-t border-white/5 flex flex-wrap justify-center gap-10 md:gap-14 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#E19E4F] text-[#E19E4F]"
                  />
                ))}
              </div>
              <p className="text-[10px] uppercase tracking-widest text-[#E19E4F] font-mono">
                6,465+ Google Reviews
              </p>
              <p className="text-lg font-serif italic text-white font-medium">
                4.3 ★ Rating
              </p>
            </div>

            <div className="h-12 w-px bg-white/5 hidden sm:block" />

            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest opacity-50 font-mono">
                Heritage Excellence
              </p>
              <p className="text-lg font-serif italic text-white font-medium">
                40+ Yrs Legacy
              </p>
            </div>

            <div className="h-12 w-px bg-white/5 hidden sm:block" />

            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest opacity-50 font-mono">
                Authentic Dining
              </p>
              <p className="text-lg font-serif italic text-white font-medium">
                University Town
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE DISHES */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <span className="text-xs text-[#E19E4F] font-mono tracking-widest uppercase block mb-1">
              CRAVED BY THOUSANDS
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black italic text-white tracking-tight">
              Our Signature Grills
            </h2>
          </div>
          <button
            onClick={() => navigate("/menu")}
            className="group flex items-center gap-1 bg-white/5 text-[#E19E4F] text-xs cursor-pointer font-brand uppercase tracking-wider font-bold px-4 py-2.5 rounded-lg border border-[#E19E4F]/20 hover:bg-[#E19E4F]/10 transition"
          >
            View Full Menu
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition text-[#E19E4F]" />
          </button>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displaySignature.map((item) => (
            <div
              key={item.id}
              className="group bg-[#141414] rounded-2xl overflow-hidden border border-white/10 hover:border-[#E19E4F]/30 transition duration-300 flex flex-col justify-between"
            >
              {/* Product Photo */}
              <div className="relative aspect-video sm:aspect-square overflow-hidden bg-zinc-900">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-550 filter brightness-90 group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />

                {/* Popular or Specialty label overlay */}
                <div className="absolute top-3 left-3 flex gap-1">
                  <span className="text-[9px] font-brand font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E19E4F] text-black">
                    Signature
                  </span>
                  <span className="text-[9px] font-brand font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/80 text-[#E19E4F] backdrop-blur border border-white/5">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-serif italic text-zinc-100 group-hover:text-[#E19E4F] transition duration-150">
                    {item.name}
                  </h3>
                  <p className="text-zinc-400 text-xs font-sans font-light leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-white/5 mt-4">
                  <div>
                    <span className="text-[9px] text-[#E19E4F] uppercase font-mono block">
                      PRICE
                    </span>
                    <span className="font-brand font-black text-base text-[#E19E4F] font-mono">
                      Rs. {item.price}
                    </span>
                  </div>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="bg-white/5 hover:bg-[#E19E4F] text-white hover:text-black px-4 py-2 rounded-lg text-xs font-brand font-bold border border-white/10 hover:border-transparent transition duration-200 cursor-pointer"
                  >
                    Add to order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY CHOOSE CHIEF GRILL */}
      <section className="bg-brand-card/40 border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs text-[#E19E4F] font-mono tracking-widest uppercase">
              OUR FOUNDATION VALUES
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black italic text-white tracking-tight">
              We Stand For Excellence
            </h2>
            <p className="text-zinc-500 text-sm font-sans font-light max-w-xl mx-auto">
              Dedicated to four decades of recipe heritage, custom-aged
              ingredients, and Peshawar’s legendary hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8 text-[#E19E4F]" />,
                title: "40+ Years Legacy",
                description:
                  "Four decades of culinary passion, master grilling techniques, and unwavering guest trust.",
              },
              {
                icon: <HeartHandshake className="w-8 h-8 text-[#E19E4F]" />,
                title: "Premium Ambiance",
                description:
                  "Executive banquet halls, corporate dinings and premium separate halls crafted for family security.",
              },
              {
                icon: <Utensils className="w-8 h-8 text-[#E19E4F]" />,
                title: "Charcoal Traditions",
                description:
                  "Searing premium hand-cut skewers, prime butter, and pure organic local ingredients.",
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-[#E19E4F]" />,
                title: "VIP Desk Liaison",
                description:
                  "Secure immediate reservations, local dispatch courier, and personalized banquet coordination.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-[#141414] p-6 rounded-2xl border border-white/5 hover:border-[#E19E4F]/20 transition text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-2 text-[#E19E4F]">
                  {card.icon}
                </div>
                <h3 className="text-lg font-serif font-bold text-zinc-200">
                  {card.title}
                </h3>
                <p className="text-zinc-500 text-xs font-sans font-light leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CUSTOMER REVIEWS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs text-[#E19E4F] font-mono tracking-widest uppercase">
            GUEST VOICES
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black italic text-white tracking-tight">
            Verified Dining Reviews
          </h2>
          <p className="text-zinc-400 text-sm">
            Hear straight from local corporate delegates, esteemed families, and
            food adventurers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.slice(0, 4).map((review) => (
            <div
              key={review.id}
              className="bg-[#141414] p-8 rounded-2xl border border-white/5 flex flex-col justify-between space-y-6 hover:border-[#E19E4F]/10 transition"
            >
              <p className="text-zinc-300 font-brand font-light text-base leading-relaxed italic">
                "{review.comment}"
              </p>

              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div>
                  <h4 className="font-brand font-bold text-zinc-100">
                    {review.customerName}
                  </h4>
                  <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider">
                    VERIFIED CHIEF GRILL GUEST
                  </span>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#E19E4F] text-[#E19E4F]"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to review submit */}
        <div className="mt-12 bg-[#141414] border border-white/5 p-8 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <div>
            <h4 className="font-serif italic font-bold text-white text-xl">
              Enjoyed your latest meal?
            </h4>
            <p className="text-zinc-500 text-xs font-sans mt-1">
              Submit your testimonial and directly see it populating live on our
              visual boards.
            </p>
          </div>
          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-3 bg-[#E19E4F] hover:bg-[#d08f43] cursor-pointer text-black font-brand font-bold text-xs uppercase tracking-wider rounded-lg transition"
          >
            WRITE AN ONLINE REVIEW
          </button>
        </div>
      </section>

      {/* 5. LOCATIONS & BRANCHES SECTION */}
      <section className="bg-[#0A0A0A] border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs text-[#E19E4F] font-mono tracking-widest uppercase">
              LOCATIONS IN PESHAWAR
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black italic text-white tracking-tight">
              Our Peshawar Secretariat
            </h2>
            <p className="text-zinc-400 text-sm">
              Discover beautiful rooftop ambiances, dynamic seating halls, and
              valet parking spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {restaurant.branches?.map((branch) => (
              <div
                key={branch.name}
                className="bg-[#141414] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#E19E4F]/20 transition"
              >
                {/* Visual Location Frame */}
                <div className="bg-zinc-950 w-full h-64 overflow-hidden relative">
                  {branch.mapEmbed ? (
                    <iframe
                      src={branch.mapEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={branch.name}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-6 text-center text-zinc-500">
                      GMap Frame Load
                    </div>
                  )}
                  {/* Banner overlay */}
                  <div className="absolute bottom-3 left-3 bg-[#0A0A0A]/90 border border-white/5 px-3 py-1.5 rounded text-[10px] font-mono text-brand-gold uppercase tracking-wider backdrop-blur-sm">
                    {branch.timings}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-serif italic text-zinc-200">
                      {branch.name}
                    </h3>
                    <p className="text-zinc-500 text-sm mt-1">
                      {branch.address}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-4 border-t border-white/5">
                    <div>
                      <span className="text-zinc-500 block">
                        CALL TO RESERVE
                      </span>
                      <a
                        href={`tel:${branch.phone}`}
                        className="text-[#E19E4F] hover:underline font-bold transition"
                      >
                        {branch.phone}
                      </a>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">
                        WHATSAPP ORDERING
                      </span>
                      <a
                        href={`https://wa.me/${branch.whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-300 hover:text-emerald-500 font-bold transition block truncate"
                      >
                        {branch.whatsapp}
                      </a>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a
                      href={branch.mapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-[#E19E4F] hover:bg-[#d08f43] text-black text-xs font-serif italic font-extrabold py-3.5 px-4 rounded-lg text-center flex items-center justify-center gap-2 transition"
                    >
                      <Navigation className="w-4 h-4" />
                      GET DIRECTIONS
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHATSAPP ORDERING BANNER CTA */}
      <section className="relative overflow-hidden bg-[#141414] border-t border-white/5 py-20 px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#E19E4F]/5 blur-[120px] pointer-events-none" />

        <span className="bg-[#E19E4F]/10 border border-[#E19E4F]/30 text-[#E19E4F] text-[10px] font-mono tracking-widest uppercase px-3.5 py-1.5 rounded-full inline-block">
          FASTEST SHIPPINGS LINE
        </span>

        <h2 className="text-3xl sm:text-5xl font-serif font-black italic text-white max-w-2xl mx-auto leading-tight">
          Craving the Sizzle? <br />
          Experience Chief Grill At Home
        </h2>

        <p className="text-zinc-400 text-sm max-w-lg mx-auto font-sans leading-relaxed">
          Avoid high food delivery commissions and markups. Order direct from
          our wood grills in University Town Peshawar to your living room.
        </p>

        <div className="pt-4">
          <button
            onClick={() => navigate("/menu")}
            className="px-8 py-4 bg-[#E19E4F] cursor-pointer hover:bg-[#d08f43] text-black font-brand font-bold text-xs uppercase tracking-widest rounded-lg inline-flex items-center gap-2 shadow-lg transition"
          >
            <PhoneCall className="w-4 h-4" />
            ORDER ON WHATSAPP
          </button>
        </div>
      </section>
    </div>
  );
}
