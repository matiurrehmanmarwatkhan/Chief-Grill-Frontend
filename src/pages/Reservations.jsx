/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Phone, 
  Mail, 
  HelpCircle, 
  FileText,
  User,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { addReservation } from "../services/api";

export default function Reservations({ branches }) {
  // Booking Form State
  const [branchName, setBranchName] = useState(branches[0]?.name || "University Town (Main Branch)");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [time, setTime] = useState("07:30 PM");
  const [guestsCount, setGuestsCount] = useState(4);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Booking Query Status state
  const [searchPhone, setSearchPhone] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);

  // Flow State
  const [submitting, setSubmitting] = useState(false);
  const [bookedReservation, setBookedReservation] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (text, type = "success") => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const todayStr = new Date().toISOString().split("T")[0];

  const timeSlots = [
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", 
    "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", 
    "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM",
    "12:00 AM", "12:30 AM", "01:00 AM"
  ];

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      showNotification("Please provide your name and contact phone number.", "error");
      return;
    }

    setSubmitting(true);
    try {
      const reservationData = {
        branchName,
        date,
        time,
        guestsCount,
        customerName,
        customerPhone,
        customerEmail,
        specialRequests
      };

      const result = await addReservation(reservationData);
      setBookedReservation(result);
      showNotification("Reservation registered successfully!");
      
      // Clear form
      setCustomerName("");
      setCustomerPhone("");
      setCustomerEmail("");
      setSpecialRequests("");
    } catch (err) {
      console.error(err);
      showNotification("Submission failed. Please try again or call the branch directly.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSearchBookings = async (e) => {
    e.preventDefault();
    if (!searchPhone.trim()) return;

    setSearching(true);
    setSearchTriggered(true);
    try {
      const res = await fetch(`/api/reservations`);
      if (res.ok) {
        const allReservations = await res.json();
        // Filter by trailing matching digits or exact phone to make lookup friendly
        const cleanSearch = searchPhone.replace(/[^0-9]/g, "");
        const matched = allReservations.filter(r => {
          const cleanPhone = r.customerPhone.replace(/[^0-9]/g, "");
          return cleanPhone.includes(cleanSearch) || r.customerPhone.trim() === searchPhone.trim();
        });
        setSearchResult(matched);
      } else {
        setSearchResult([]);
      }
    } catch (err) {
      console.error(err);
      showNotification("Failed to fetch reservation logs.", "error");
    } finally {
      setSearching(false);
    }
  };

  // WhatsApp formatted string generator
  const getWhatsAppShareLink = (resv) => {
    const selectedBranch = branches.find(b => b.name === resv.branchName);
    const whatsappNum = selectedBranch ? selectedBranch.whatsapp.replace(/[^0-9]/g, "") : "923331234567";
    const text = `Hello Chief Grill *${resv.branchName}*, I have booked a table using website. Here are my details:
• *Booking ID:* ${resv.id}
• *Name:* ${resv.customerName}
• *Date:* ${resv.date}
• *Time:* ${resv.time}
• *Guests:* ${resv.guestsCount} Persons
• *Phone:* ${resv.customerPhone}
${resv.specialRequests ? `• *Special Requests:* ${resv.specialRequests}` : ""}
Please confirm my reservation. Thank you!`;
    return `https://wa.me/${whatsappNum}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner header title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="bg-[#E19E4F]/10 border border-[#E19E4F]/30 text-[#E19E4F] text-[10px] font-mono tracking-widest uppercase px-3.5 py-1.5 rounded-full inline-block font-bold">
            Peshawar's Gourmet Hospitality
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black italic tracking-tight text-white">
            Table Reservations
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Reserve your executive suite, family banquet table, or corporate dinner lounges at our premium branches. Secured instantly via database storage.
          </p>
        </div>

        {/* Banner alerts feedback */}
        {notification && (
          <div
            className={`p-4 rounded-xl border text-center text-sm font-brand font-semibold max-w-lg mx-auto ${
              notification.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-450"
                : "bg-red-500/10 border-red-500/10 text-red-400"
            }`}
          >
            {notification.text}
          </div>
        )}

        {bookedReservation ? (
          /* SUCCESS SCREEN STATE */
          <div className="max-w-2xl mx-auto bg-[#141414] border border-white/10 rounded-3xl p-8 sm:p-10 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-500/5 blur-[90px] pointer-events-none" />
            
            <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-450">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold italic text-white">Table Reserved!</h2>
              <p className="text-zinc-400 text-sm max-w-md mx-auto">
                Thank you, <span className="text-[#E19E4F] font-bold">{bookedReservation.customerName}</span>. Your slot is registered in our database. We look forward to hosting you!
              </p>
            </div>

            {/* Receipt layout */}
            <div className="bg-black border border-white/5 rounded-2xl p-6 text-left space-y-4 font-brand">
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-zinc-500 text-xs font-mono uppercase">Reservation Code</span>
                <span className="text-[#E19E4F] font-mono text-sm font-bold uppercase">{bookedReservation.id}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <span className="text-zinc-500 block mb-0.5">BRANCH SITE</span>
                  <span className="text-zinc-200 font-bold">{bookedReservation.branchName}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">GUESTS COUNTS</span>
                  <span className="text-zinc-200 font-bold">{bookedReservation.guestsCount} Persons</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">DATE OF VISIT</span>
                  <span className="text-zinc-200 font-bold font-mono">{bookedReservation.date}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">DINING TIME</span>
                  <span className="text-[#E19E4F] font-bold font-mono">{bookedReservation.time}</span>
                </div>
              </div>

              {bookedReservation.specialRequests && (
                <div className="border-t border-white/5 pt-3">
                  <span className="text-zinc-500 text-[10px] block font-mono">SPECIAL REQUESTS</span>
                  <p className="text-zinc-300 text-xs italic mt-0.5">"{bookedReservation.specialRequests}"</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppShareLink(bookedReservation)}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-4 bg-emerald-600 hover:bg-emerald-500 active:translate-y-0.5 text-white font-brand font-bold text-xs uppercase tracking-widest rounded-xl transition inline-flex items-center justify-center gap-2"
              >
                Send WhatsApp Confirmation
              </a>
              
              <button
                type="button"
                onClick={() => setBookedReservation(null)}
                className="px-6 py-4 bg-[#222] hover:bg-[#333] text-zinc-300 font-brand font-bold text-xs uppercase tracking-widest rounded-xl transition"
              >
                Book Another Table
              </button>
            </div>
            
            <p className="text-zinc-500 text-[10px] font-mono">
              Note: A host will review your requests. Direct inquiries can be made to branch contact numbers.
            </p>
          </div>
        ) : (
          /* PRIMARY VIEW CONTENT - Booking Form & Lookup */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT SIDE: Booking Form (7 Columns) */}
            <div className="lg:col-span-8 bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-10 space-y-8 relative shadow-xl">
              <div className="absolute top-12 right-12 w-32 h-32 rounded-full bg-[#E19E4F]/3 blur-[50px] pointer-events-none" />
              
              <div className="border-b border-white/5 pb-4">
                <h2 className="text-2xl font-serif italic text-[#E19E4F] font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#E19E4F]" />
                  Secure Luxury Dining Lounge
                </h2>
                <p className="text-zinc-500 text-xs mt-1">
                  Fill in your choices below. Tables are held for a maximum of 15 minutes past reservation.
                </p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-6">
                
                {/* 1. Branch Selector */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-zinc-400 font-mono flex items-center gap-1.5 font-bold">
                    <MapPin className="w-4 h-4 text-[#E19E4F]" />
                    Select Branch Location
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {branches.map((b) => (
                      <div
                        key={b.name}
                        onClick={() => setBranchName(b.name)}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition select-none ${
                          branchName === b.name
                            ? "bg-[#E19E4F]/10 border-[#E19E4F] text-[#E19E4F]"
                            : "bg-black/60 border-white/5 text-zinc-400 hover:border-white/15"
                        }`}
                      >
                        <h4 className="font-serif italic font-extrabold text-[#E19E4F] text-sm">{b.name}</h4>
                        <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2 leading-relaxed">{b.address}</p>
                        <span className="inline-block mt-3 text-[9px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded">
                          Timings: {b.timings}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Date/Time/Guests Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Date Input */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 font-mono flex items-center gap-1.5 font-bold">
                      <Calendar className="w-4 h-4 text-[#E19E4F]" />
                      Calendar Date
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl p-3.5 text-xs text-zinc-200 font-mono focus:outline-none focus:border-[#E19E4F] transition"
                    />
                  </div>

                  {/* Time Slots selector */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 font-mono flex items-center gap-1.5 font-bold">
                      <Clock className="w-4 h-4 text-[#E19E4F]" />
                      Select Hour Slot
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl p-3.5 text-xs text-zinc-200 font-mono focus:outline-none focus:border-[#E19E4F] transition cursor-pointer"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>

                  {/* Number of guests */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 font-mono flex items-center gap-1.5 font-bold">
                      <Users className="w-4 h-4 text-[#E19E4F]" />
                      Total Guests Count
                    </label>
                    <div className="flex items-center gap-1.5 bg-black border border-white/10 rounded-xl p-1 justify-between">
                      <button
                        type="button"
                        onClick={() => setGuestsCount(prev => Math.max(1, prev - 1))}
                        className="px-3 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg text-sm font-bold transition"
                      >
                        -
                      </button>
                      <span className="text-xs text-zinc-200 font-mono font-bold">{guestsCount} Persons</span>
                      <button
                        type="button"
                        onClick={() => setGuestsCount(prev => Math.min(30, prev + 1))}
                        className="px-3 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg text-sm font-bold transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>

                {/* 3. Personal Contact details */}
                <div className="border-t border-white/5 pt-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#E19E4F]" />
                    <h3 className="text-sm font-serif italic text-[#E19E4F] font-bold">Your Personal Contact Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-zinc-400 block font-mono">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Dr. Faisal Afridi"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl p-3.5 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs text-zinc-400 block font-mono">Phone Number (WhatsApp Active) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g., +92 333 1234567"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl p-3.5 text-xs text-zinc-200 font-mono focus:outline-none focus:border-[#E19E4F] transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-zinc-400 block font-mono">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="e.g., info@faisal.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl p-3.5 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-zinc-400 block font-mono">Special Requests (VIP Hall, Cake, Flowers, etc.)</label>
                    <textarea
                      rows={3}
                      placeholder="e.g., Require quiet family hall with standard kids chair, also need single candle holder setup."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl p-3.5 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#E19E4F] hover:bg-[#d08f43] disabled:bg-[#d08f43]/50 text-black rounded-xl font-brand text-xs uppercase tracking-widest font-bold transition cursor-pointer flex items-center justify-center gap-2"
                >
                  {submitting ? "Processing secure reservation..." : "Book Table & Sync Reservations"}
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>
            </div>

            {/* RIGHT SIDE: Lookup search queries & Support info (5 Columns) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Lookup card */}
              <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-serif italic text-[#E19E4F] font-bold">Check Status</h3>
                  <p className="text-zinc-500 text-xs">
                    Confirm coordinates, cancel or check confirmation status of your submitted bookings.
                  </p>
                </div>

                <form onSubmit={handleSearchBookings} className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Enter registered phone number"
                      value={searchPhone}
                      onChange={(e) => setSearchPhone(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl p-3 pl-10 text-xs text-zinc-200 font-mono focus:outline-none focus:border-[#E19E4F] transition"
                    />
                    <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={searching}
                    className="w-full py-2.5 bg-[#222] hover:bg-[#333] active:translate-y-0.5 text-zinc-300 rounded-xl font-brand text-[11px] font-bold transition uppercase tracking-wider"
                  >
                    {searching ? "Searching logs..." : "Search Bookings"}
                  </button>
                </form>

                {searchTriggered && (
                  <div className="border-t border-white/5 pt-4 space-y-3">
                    <span className="text-[10px] text-zinc-500 font-mono block uppercase">Search Results</span>
                    
                    {searchResult && searchResult.length > 0 ? (
                      <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                        {searchResult.map((r) => (
                          <div key={r.id} className="bg-black/80 rounded-xl p-4 border border-white/5 space-y-2.5">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] bg-white/5 border border-white/5 rounded px-2 py-0.5 text-zinc-400 font-mono">
                                {r.id.substr(0, 10)}
                              </span>
                              
                              <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                                r.status === "confirmed" 
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : r.status === "cancelled"
                                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                  : "bg-amber-500/10 text-amber-550 border border-amber-500/20"
                              }`}>
                                {r.status}
                              </span>
                            </div>

                            <div className="text-xs space-y-1">
                              <p className="font-bold text-zinc-300">{r.customerName}</p>
                              <p className="text-zinc-500">{r.branchName}</p>
                              <p className="text-[#E19E4F] font-mono">{r.date} @ {r.time}</p>
                              <p className="text-zinc-400 font-mono">{r.guestsCount} Guests</p>
                            </div>

                            <div className="pt-2 border-t border-white/5">
                              <a
                                                    href={getWhatsAppShareLink(r)}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold transition flex items-center gap-1"
                              >
                                Follow-up on WhatsApp
                                <ChevronRight className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-zinc-500 text-xs italic text-center py-4">
                        No active bookings found for this phone logs.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Assistance support helper */}
              <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-gold/10 border border-[#E19E4F]/30 rounded-xl flex items-center justify-center text-[#E19E4F]">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif italic font-bold">Direct Reception VIP Desk</h4>
                    <p className="text-[10px] text-zinc-550 font-mono mt-0.5">ESTABLISHED DIRECT CHANNELS</p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs pt-2">
                  <div className="flex gap-2.5">
                    <Phone className="w-4 h-4 text-[#E19E4F] shrink-0" />
                    <div>
                      <p className="font-bold text-zinc-300">University Town Desk</p>
                      <a href="tel:+92915845555" className="text-zinc-500 hover:text-white transition">+92 (91) 584-5555</a>
                    </div>
                  </div>
                  
                  <div className="flex gap-2.5">
                    <Phone className="w-4 h-4 text-[#E19E4F] shrink-0" />
                    <div>
                      <p className="font-bold text-zinc-300">Hayatabad Desk</p>
                      <a href="tel:+92915816666" className="text-zinc-500 hover:text-white transition">+92 (91) 581-6666</a>
                    </div>
                  </div>

                  <div className="flex gap-2.5">
                    <Mail className="w-4 h-4 text-[#E19E4F] shrink-0" />
                    <div>
                      <p className="font-bold text-zinc-300">Gourmet Banquet email</p>
                      <p className="text-zinc-500 italic block">info@chiefgrill.com</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
