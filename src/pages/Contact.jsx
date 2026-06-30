/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, Star, Send, Check } from "lucide-react";
import { addReview } from "../services/api";

export default function Contact({ restaurant, onReviewSubmitted }) {
  const [customerName, setCustomerName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !comment.trim()) {
      alert("Please fill out your Name and Testimonial Message!");
      return;
    }

    try {
      setIsSubmitting(true);
      const newReview = await addReview({
        customerName,
        rating,
        comment,
      });
      onReviewSubmitted(newReview);
      setSubmitSuccess(true);
      setCustomerName("");
      setComment("");
      setRating(5);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      alert("Failed to post testimonial. Please try again! Internal server is active.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F5] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-fade-in">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 bg-[#1A1A1A] border border-white/10 rounded text-[10px] uppercase tracking-wider text-[#E19E4F] font-mono font-bold leading-none">
            RESERVE A ROOM OR SAY HELLO
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-black italic text-white tracking-tight leading-none text-white">
            Get In Touch
          </h1>
          <p className="text-zinc-400 font-brand text-base">
            Have a catering request, corporate hall requirement, or dining question? Contact our managers directly below.
          </p>
        </div>

        {/* Contact info grid & review form combination */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact Info panels (5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-2xl font-serif font-bold italic text-zinc-100">Restaurant Information</h3>
            
            <div className="space-y-6">
              
              {/* Phone cards */}
              <div className="bg-[#141414] p-5 rounded-2xl border border-white/10 flex gap-4 items-start hover:border-[#E19E4F]/20 transition">
                <div className="p-3 bg-[#E19E4F]/10 border border-[#E19E4F]/20 rounded-xl text-[#E19E4F] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-brand font-bold text-zinc-200 text-sm uppercase">Direct Phone Lines</h4>
                  <p className="text-zinc-400 text-sm mt-1">Main Office: {restaurant.contact?.phone || "+92 91 584 5555"}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">Late Night Line: +92 (91) 581-6666</p>
                </div>
              </div>

              {/* Email card */}
              <div className="bg-[#141414] p-5 rounded-2xl border border-white/10 flex gap-4 items-start hover:border-[#E19E4F]/20 transition">
                <div className="p-3 bg-[#E19E4F]/10 border border-[#E19E4F]/20 rounded-xl text-[#E19E4F] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-brand font-bold text-zinc-200 text-sm uppercase">Email Communications</h4>
                  <p className="text-zinc-400 text-sm mt-1">{restaurant.contact?.email || "info@chiefgrill.com"}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">Corporate: sales@chiefgrill.com</p>
                </div>
              </div>

              {/* Timing info */}
              <div className="bg-[#141414] p-5 rounded-2xl border border-white/10 flex gap-4 items-start hover:border-[#E19E4F]/20 transition">
                <div className="p-3 bg-[#E19E4F]/10 border border-[#E19E4F]/20 rounded-xl text-[#E19E4F] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-brand font-bold text-zinc-200 text-sm uppercase">Our Operations Timing</h4>
                  <p className="text-zinc-400 text-sm mt-1">Daily Dine-In & Takeaway: {restaurant.timings || "12:00 PM - 02:00 AM"}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">Late Delivery Sizzles: 11:00 PM to 2:00 AM</p>
                </div>
              </div>

              {/* Head office map location */}
              <div className="bg-[#141414] p-5 rounded-2xl border border-white/10 flex gap-4 items-start hover:border-[#E19E4F]/20 transition">
                <div className="p-3 bg-[#E19E4F]/10 border border-[#E19E4F]/20 rounded-xl text-[#E19E4F] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-brand font-bold text-zinc-200 text-sm uppercase">Main Location Secretariat</h4>
                  <p className="text-zinc-400 text-sm mt-1">{restaurant.contact?.address || "Bhattani Plaza, 3A Park Avenue, University Town, Peshawar"}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Active Testimonial submission form (7 columns) */}
          <div className="lg:col-span-7 bg-[#141414] p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
            
            <div className="space-y-1">
              <h3 className="text-2xl font-serif font-black italic text-zinc-150">We Value Your Feedback</h3>
              <p className="text-zinc-500 text-xs">Your reviews are stored inside our JSON database, which immediately populates onto our real-time homepage carousel!</p>
            </div>

            {submitSuccess ? (
              <div className="p-8 bg-emerald-500/10 border-2 border-dashed border-emerald-500/40 rounded-2xl text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 bg-emerald-500 text-zinc-950 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <Check className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-brand font-bold text-white text-lg">Testimonial Published Successfully!</h4>
                  <p className="text-zinc-400 text-xs mt-1">Thank you for rating Chief Grill. Your verification feedback has been logged directly inside the database files and is currently live on the main dashboard homepage!</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-5">
                
                {/* Contact Name input */}
                <div className="space-y-1.5">
                  <label className="block text-xs text-zinc-400 uppercase tracking-widest font-medium font-mono">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Name (e.g., Dr. Faisal Khan, Ramsha Malik)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl p-3.5 text-xs text-zinc-300 focus:outline-none focus:border-[#E19E4F] transition"
                  />
                </div>

                {/* Rating selection buttons */}
                <div className="space-y-1.5">
                  <label className="block text-xs text-zinc-400 uppercase tracking-widest font-medium font-mono">Star rating *</label>
                  <div className="flex items-center gap-1.5 select-none">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 rounded hover:bg-zinc-900 transition focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 transition cursor-pointer ${
                            star <= rating ? "fill-[#E19E4F] text-[#E19E4F]" : "text-zinc-700"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-zinc-500 font-mono pl-3">({rating} / 5 Rating)</span>
                  </div>
                </div>

                {/* Comment box */}
                <div className="space-y-1.5">
                  <label className="block text-xs text-zinc-400 uppercase tracking-widest font-medium font-mono">Your Testimonial Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Please write down your dining experience highlights. Be descriptive (e.g. Taste of Butterfly Steak, elegant sitting layouts...)"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl p-3.5 text-xs text-zinc-300 focus:outline-none focus:border-[#E19E4F] transition resize-none"
                  />
                </div>

                {/* Send button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-brand text-xs font-bold uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 transition duration-200 shadow-lg ${
                    isSubmitting
                      ? "bg-zinc-800 cursor-wait text-zinc-500"
                      : "bg-[#E19E4F] hover:bg-[#d08f43] text-black cursor-pointer active:translate-y-0.5 font-bold"
                  }`}
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Posting..." : "Publish Real-time Review"}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
