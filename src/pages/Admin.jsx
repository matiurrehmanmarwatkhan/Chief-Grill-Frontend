/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Utensils, Gift, Image as ImageIcon, MessageSquare, Check, RefreshCw, Trash2, Eye, EyeOff, Sparkles, Calendar, Clock, Users, Edit } from "lucide-react";
import { 
  addMenuItem, 
  updateMenuItem, 
  deleteMenuItem,
  addOffer, 
  updateOffer,
  deleteOffer,
  addGalleryItem, 
  addReview,
  uploadImage
} from "../services/api";

export default function Admin({
  menuItems,
  offersList,
  galleryItems,
  reviewsList,
  reservationsList = [],
  onRefreshAll,
}) {
  const [activeSubTab, setActiveSubTab] = useState("menu");
  const [resvSearchQuery, setResvSearchQuery] = useState("");
  const [editingOfferId, setEditingOfferId] = useState(null);

  // FORM STATES: MENU ITEM
  const [menuForm, setMenuForm] = useState({
    name: "",
    category: "BBQ",
    description: "",
    price: "",
    image: "",
    popular: false,
    availability: true
  });

  // FORM STATES: OFFER
  const [offerForm, setOfferForm] = useState({
    title: "",
    description: "",
    image: "",
    expiryDate: "",
    validity: "",
    code: ""
  });

  // FORM STATES: GALLERY
  const [galleryForm, setGalleryForm] = useState({
    image: "",
    category: "food",
    title: ""
  });

  // FORM STATES: TESTIMONIAL
  const [reviewForm, setReviewForm] = useState({
    customerName: "",
    comment: "",
    rating: 5
  });

  // FORM STATES: WALK-IN RESERVATION
  const [walkinForm, setWalkinForm] = useState({
    branchName: "University Town (Main Branch)",
    date: new Date().toISOString().split('T')[0],
    time: "07:30 PM",
    guestsCount: 4,
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    specialRequests: ""
  });

  // Notifications feedback states
  const [notification, setNotification] = useState(null);

  // Image Uploading States & Handlers
  const [uploadingImage, setUploadingImage] = useState(null);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageFileChange = async (e, formType) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(formType);
      const base64 = await convertToBase64(file);
      const res = await uploadImage(base64);
      
      if (formType === "menu") {
        setMenuForm(prev => ({ ...prev, image: res.url }));
      } else if (formType === "offer") {
        setOfferForm(prev => ({ ...prev, image: res.url }));
      } else if (formType === "gallery") {
        setGalleryForm(prev => ({ ...prev, image: res.url }));
      }
      showNotification("Image uploaded and linked successfully!");
    } catch (err) {
      console.error(err);
      showNotification("Failed to upload image. Please try again.", "error");
    } finally {
      setUploadingImage(null);
    }
  };

  const showNotification = (text, type = "success") => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // HANDLER: Create / Add Menu Item
  const handleCreateMenu = async (e) => {
    e.preventDefault();
    if (!menuForm.name.trim() || !menuForm.price) {
      showNotification("Please fill in food item name and price", "error");
      return;
    }

    try {
      await addMenuItem({
        ...menuForm,
        price: Number(menuForm.price)
      });
      // Clear forms
      setMenuForm({
        name: "",
        category: "BBQ",
        description: "",
        price: "",
        image: "",
        popular: false,
        availability: true
      });
      showNotification("Food item created and saved successfully inside DB!");
      onRefreshAll();
    } catch (err) {
      console.error(err);
      showNotification("Failed to save menu item to database", "error");
    }
  };

  // HANDLER: Toggle menu item availability status
  const handleToggleAvailability = async (id, current) => {
    try {
      await updateMenuItem(id, { availability: !current });
      showNotification(`Availability toggled for menu item.`);
      onRefreshAll();
    } catch (err) {
      console.error(err);
      showNotification("Failed to update item availability inside DB", "error");
    }
  };

  // HANDLER: Toggle popular brand tag
  const handleTogglePopular = async (id, current) => {
    try {
      await updateMenuItem(id, { popular: !current });
      showNotification(`Signature showcase status updated.`);
      onRefreshAll();
    } catch (err) {
      console.error(err);
      showNotification("Failed to toggle special category tag in DB", "error");
    }
  };

  // HANDLER: Delete menu item
  const handleDeleteMenu = async (id) => {
    if (!window.confirm("Are you absolutely sure you want to delete this dish from the digital menu? This action can write back to datastore.")) return;
    try {
      await deleteMenuItem(id);
      showNotification("Food item successfully removed from digital menu.");
      onRefreshAll();
    } catch (err) {
      console.error(err);
      showNotification("Failed to delete food item from database", "error");
    }
  };

  // HANDLER: Create or Update Offer
  const handleCreateOffer = async (e) => {
    e.preventDefault();
    if (!offerForm.title.trim() || !offerForm.code.trim()) {
      showNotification("Please fill in Offer title and promo code", "error");
      return;
    }

    try {
      if (editingOfferId) {
        await updateOffer(editingOfferId, offerForm);
        showNotification("Special offer updated successfully on database!");
        setEditingOfferId(null);
      } else {
        await addOffer(offerForm);
        showNotification("Special offer added and published successfully on database!");
      }
      setOfferForm({
        title: "",
        description: "",
        image: "",
        expiryDate: "",
        validity: "",
        code: ""
      });
      onRefreshAll();
    } catch (err) {
      console.error(err);
      showNotification(editingOfferId ? "Failed to update offer data in database" : "Failed to write offer data to database", "error");
    }
  };

  // HANDLER: Load Offer details into form for editing
  const handleEditOffer = (offer) => {
    setEditingOfferId(offer.id);
    setOfferForm({
      title: offer.title,
      description: offer.description,
      image: offer.image,
      expiryDate: offer.expiryDate,
      validity: offer.validity,
      code: offer.code || ""
    });
  };

  // HANDLER: Cancel Offer editing
  const handleCancelEditOffer = () => {
    setEditingOfferId(null);
    setOfferForm({
      title: "",
      description: "",
      image: "",
      expiryDate: "",
      validity: "",
      code: ""
    });
  };

  // HANDLER: Delete Offer
  const handleDeleteOffer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this special offer? This action is permanent.")) return;
    try {
      await deleteOffer(id);
      showNotification("Special offer deleted successfully!");
      if (editingOfferId === id) {
        handleCancelEditOffer();
      }
      onRefreshAll();
    } catch (err) {
      console.error(err);
      showNotification("Failed to delete special offer", "error");
    }
  };

  // HANDLER: Create Gallery Frame
  const handleCreateGallery = async (e) => {
    e.preventDefault();
    if (!galleryForm.image.trim()) {
      showNotification("Please enter image URL path", "error");
      return;
    }

    try {
      await addGalleryItem(galleryForm);
      setGalleryForm({
        image: "",
        category: "food",
        title: ""
      });
      showNotification("Gallery photo linked and synced on server!");
      onRefreshAll();
    } catch (err) {
      console.error(err);
      showNotification("Failed to register image inside gallery system", "error");
    }
  };

  // HANDLER: Create review manual
  const handleCreateReview = async (e) => {
    e.preventDefault();
    if (!reviewForm.customerName.trim() || !reviewForm.comment.trim()) {
      showNotification("Please fill in guest name and testimonial comment link", "error");
      return;
    }

    try {
      await addReview(reviewForm);
      setReviewForm({
        customerName: "",
        comment: "",
        rating: 5
      });
      showNotification("Customer testimonial verified and recorded inside db.json!");
      onRefreshAll();
    } catch (err) {
      console.error(err);
      showNotification("Failed to post testimonial to backend server", "error");
    }
  };

  // HANDLER: Create Walk-in Reservation
  const handleCreateWalkin = async (e) => {
    e.preventDefault();
    if (!walkinForm.customerName.trim() || !walkinForm.customerPhone.trim()) {
      showNotification("Please provide guest name and phone number", "error");
      return;
    }

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(walkinForm)
      });
      if (!res.ok) throw new Error("Failed to create reservation");
      
      setWalkinForm({
        branchName: "University Town (Main Branch)",
        date: new Date().toISOString().split('T')[0],
        time: "07:30 PM",
        guestsCount: 4,
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        specialRequests: ""
      });
      showNotification("Reservation registered and synced to file logs!");
      onRefreshAll();
    } catch (err) {
      console.error(err);
      showNotification("Failed to write reservation data", "error");
    }
  };

  // HANDLER: Update reservation status
  const handleUpdateResvStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error("Failed to update status");
      showNotification(`Reservation marked as ${status}!`);
      onRefreshAll();
    } catch (err) {
      console.error(err);
      showNotification("Failed to update status", "error");
    }
  };

  // HANDLER: Delete reservation
  const handleDeleteResv = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reservation record from database?")) return;
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete");
      showNotification("Reservation log cleared successfully.");
      onRefreshAll();
    } catch (err) {
      console.error(err);
      showNotification("Failed to delete reservation", "error");
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner introduction with dynamic db indicator */}
        <div className="bg-[#141414] rounded-3xl border border-white/10 p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 rounded-full bg-[#E19E4F]/3 blur-[90px] pointer-events-none" />
          <div className="space-y-2 relative z-10">
            <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-450 text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full inline-block font-semibold">
              Live Connection: db.json Persistent Store Active
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-black italic text-zinc-100 tracking-tight flex items-center gap-2">
              Chief Grill Partner Console
            </h1>
            <p className="text-zinc-400 font-brand text-sm max-w-xl">
              Welcome back, Partner. You have full edit access to menus, promotional coupons, interior media boards and customer testimonials.
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => {
              onRefreshAll();
              showNotification("Database records refreshed successfully from file structure!");
            }}
            className="relative z-10 px-5 py-3 bg-[#1A1A1A] border border-white/10 hover:border-[#E19E4F]/40 text-xs text-zinc-300 rounded-xl font-brand font-bold flex items-center gap-1.5 cursor-pointer hover:bg-zinc-800 active:translate-y-0.5 transition"
          >
            <RefreshCw className="w-4 h-4 text-[#E19E4F]" />
            Reload Database
          </button>
        </div>

        {/* Global Notifications system */}
        {notification && (
          <div
            className={`p-4 rounded-xl border text-sm font-brand font-semibold text-center flex items-center justify-center gap-2 ${
              notification.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-450"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            <Check className="w-4 h-4 text-emerald-500" />
            {notification.text}
          </div>
        )}

        {/* Stats Summary Panel */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { icon: <Utensils className="w-5 h-5 text-[#E19E4F]" />, label: "Menu Catalog Items", count: menuItems.length },
            { icon: <Gift className="w-5 h-5 text-[#E19E4F]" />, label: "Active Promotions", count: offersList.length },
            { icon: <ImageIcon className="w-5 h-5 text-[#E19E4F]" />, label: "Visual Gallery Items", count: galleryItems.length },
            { icon: <MessageSquare className="w-5 h-5 text-[#E19E4F]" />, label: "Guest Testimonials", count: reviewsList.length },
            { icon: <Calendar className="w-5 h-5 text-[#E19E4F]" />, label: "Table Reservations", count: reservationsList.length },
          ].map((stat, idx) => (
            <div key={idx} className="bg-[#141414] p-5 rounded-2xl border border-white/5 flex items-center gap-4">
              <div className="p-3 bg-black border border-white/10 rounded-xl shrink-0 text-[#E19E4F]">
                {stat.icon}
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] uppercase font-mono block tracking-wider">{stat.label}</span>
                <span className="text-2xl font-brand font-extrabold text-white font-mono mt-0.5 block">{stat.count}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sub-tabs Selection navigation */}
        <div className="flex border-b border-white/5 pb-3 gap-2 overflow-x-auto whitespace-nowrap">
          {[
            { id: "menu", label: "Manage Menu", icon: <Utensils className="w-4 h-4" /> },
            { id: "offers", label: "Promotions & Offers", icon: <Gift className="w-4 h-4" /> },
            { id: "gallery", label: "Media Gallery", icon: <ImageIcon className="w-4 h-4" /> },
            { id: "reviews", label: "Guest Reviews", icon: <MessageSquare className="w-4 h-4" /> },
            { id: "reservations", label: "Table Reservations", icon: <Calendar className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => {
                setActiveSubTab(tab.id);
                handleCancelEditOffer();
              }}
              className={`px-5 py-3 rounded-xl text-xs font-brand font-bold flex items-center gap-2 border transition cursor-pointer ${
                activeSubTab === tab.id
                  ? "bg-[#E19E4F]/10 border-[#E19E4F]/30 text-[#E19E4F] font-bold"
                  : "bg-black border-white/5 text-zinc-500 hover:text-zinc-200 hover:border-white/10"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB WORKSPACES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Management Form (5 columns) */}
          <div className="lg:col-span-4 bg-[#141414] p-6 rounded-3xl border border-white/10 shadow-xl space-y-6">
            
            {/* Context Header */}
            <div>
              <h3 className="text-xl font-serif font-black italic text-[#E19E4F] capitalize">
                {activeSubTab === "offers" && editingOfferId ? "Edit Campaign Coupon" : `New ${activeSubTab} Register`}
              </h3>
              <p className="text-zinc-500 text-xs mt-0.5">
                {activeSubTab === "offers" && editingOfferId 
                  ? "Update the offer details below and save your changes." 
                  : "Input the metrics below. Submission compiles direct edits to `/data/db.json` asynchronously."}
              </p>
            </div>

            {/* IF MENU TAB form */}
            {activeSubTab === "menu" && (
              <form onSubmit={handleCreateMenu} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 block font-medium font-mono">Food Item Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Butterfly Steak, Pizza"
                    value={menuForm.name}
                    onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-400 block font-medium font-mono">Food Category *</label>
                    <select
                      value={menuForm.category}
                      onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition"
                    >
                      {["BBQ", "Burgers", "Pizza", "Desi Food", "Chinese", "Desserts", "Drinks", "Continental"].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-400 block font-medium font-mono">Price (PKR) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g., 1650"
                      value={menuForm.price}
                      onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 block font-medium font-mono">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Enter short appetizing ingredients & dressing info..."
                    value={menuForm.description}
                    onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition resize-none"
                  />
                </div>

                 <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 block font-medium font-mono">Food Photo URL Path</label>
                  <input
                    type="text"
                    placeholder="Paste Unsplash URL or upload local file"
                    value={menuForm.image}
                    onChange={(e) => setMenuForm({ ...menuForm, image: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition"
                  />
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer text-[10px] uppercase font-mono tracking-wider bg-[#1A1A1A] hover:bg-zinc-800 text-zinc-300 px-3.5 py-2 rounded-lg border border-white/5 transition flex items-center gap-1.5 font-bold">
                      <span>Or Upload Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileChange(e, "menu")}
                        className="hidden"
                      />
                    </label>
                    {uploadingImage === "menu" && (
                      <span className="text-[10px] text-[#E19E4F] font-mono animate-pulse">Uploading to cloud...</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={menuForm.popular}
                      onChange={(e) => setMenuForm({ ...menuForm, popular: e.target.checked })}
                      className="rounded border-white/10 text-[#E19E4F] bg-black h-4 w-4 focus:ring-0"
                    />
                    Is Signature Dish
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#E19E4F] hover:bg-[#d59144] active:translate-y-0.5 rounded-xl font-brand text-xs uppercase tracking-widest text-[#0A0A0A] font-bold transition duration-200 cursor-pointer"
                >
                  Publish Food Item
                </button>
              </form>
            )}

            {/* IF OFFERS TAB form */}
            {activeSubTab === "offers" && (
              <form onSubmit={handleCreateOffer} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 block font-medium font-mono">Offer Campaign Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Weekend Steak Fiesta"
                    value={offerForm.title}
                    onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-400 block font-medium font-mono">Promo Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., CG-WEEKEND"
                      value={offerForm.code}
                      onChange={(e) => setOfferForm({ ...offerForm, code: e.target.value.toUpperCase() })}
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 font-mono focus:outline-none focus:border-[#E19E4F] transition font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-400 block font-medium font-mono">Expiry Date *</label>
                    <input
                      type="date"
                      required
                      value={offerForm.expiryDate}
                      onChange={(e) => setOfferForm({ ...offerForm, expiryDate: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 font-mono focus:outline-none focus:border-[#E19E4F] transition"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 block font-medium font-mono">Validity Terms</label>
                  <input
                    type="text"
                    placeholder="e.g., Saturdays & Sundays Dine-In"
                    value={offerForm.validity}
                    onChange={(e) => setOfferForm({ ...offerForm, validity: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition"
                  />
                </div>

                 <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 block font-medium font-mono">Promo Campaign image URL</label>
                  <input
                    type="text"
                    placeholder="Paste Unsplash URL or upload local file"
                    value={offerForm.image}
                    onChange={(e) => setOfferForm({ ...offerForm, image: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition"
                  />
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer text-[10px] uppercase font-mono tracking-wider bg-[#1A1A1A] hover:bg-zinc-800 text-zinc-300 px-3.5 py-2 rounded-lg border border-white/5 transition flex items-center gap-1.5 font-bold">
                      <span>Or Upload Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileChange(e, "offer")}
                        className="hidden"
                      />
                    </label>
                    {uploadingImage === "offer" && (
                      <span className="text-[10px] text-[#E19E4F] font-mono animate-pulse">Uploading to cloud...</span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 block font-medium font-mono">Offer Description Campaign Details</label>
                  <textarea
                    rows={3}
                    placeholder="Details about items included, savings and limits..."
                    value={offerForm.description}
                    onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-[#E19E4F] hover:bg-[#d59144] rounded-xl font-brand text-xs uppercase tracking-widest text-[#0A0A0A] font-bold transition duration-205 cursor-pointer"
                  >
                    {editingOfferId ? "Update Coupon" : "Publish Campaign Coupon"}
                  </button>
                  {editingOfferId && (
                    <button
                      type="button"
                      onClick={handleCancelEditOffer}
                      className="px-4 py-3.5 bg-zinc-850 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl font-brand text-xs uppercase tracking-widest font-bold transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}

            {/* IF GALLERY TAB form */}
            {activeSubTab === "gallery" && (
              <form onSubmit={handleCreateGallery} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 block font-medium font-mono">Visual Gallery Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Rooftop Banquet Hall"
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 block font-medium font-mono">Visual category *</label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition"
                  >
                    <option value="food">Specialty Food Dish</option>
                    <option value="interior">Luxury Interior Room</option>
                    <option value="family">Family Gathering Hall</option>
                    <option value="events">Events & Catering</option>
                  </select>
                </div>

                 <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 block font-medium font-mono">Image Asset Link *</label>
                  <input
                    type="text"
                    required
                    placeholder="Paste premium Unsplash URL link or upload local file"
                    value={galleryForm.image}
                    onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 font-mono focus:outline-none focus:border-[#E19E4F] transition"
                  />
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer text-[10px] uppercase font-mono tracking-wider bg-[#1A1A1A] hover:bg-zinc-800 text-zinc-300 px-3.5 py-2 rounded-lg border border-white/5 transition flex items-center gap-1.5 font-bold">
                      <span>Or Upload Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileChange(e, "gallery")}
                        className="hidden"
                      />
                    </label>
                    {uploadingImage === "gallery" && (
                      <span className="text-[10px] text-[#E19E4F] font-mono animate-pulse">Uploading to cloud...</span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#E19E4F] hover:bg-[#d59144] rounded-xl font-brand text-xs uppercase tracking-widest text-[#0A0A0A] font-bold transition duration-200 cursor-pointer"
                >
                  Sync to Ambiance Boards
                </button>
              </form>
            )}

            {/* IF REVIEWS TAB form */}
            {activeSubTab === "reviews" && (
              <form onSubmit={handleCreateReview} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 block font-medium font-mono">Respected Customer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Dr. Faisal Khan, Shehryar Afridi"
                    value={reviewForm.customerName}
                    onChange={(e) => setReviewForm({ ...reviewForm, customerName: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 block font-medium font-mono">Rating Stars (1 - 5) *</label>
                  <select
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 font-mono focus:outline-none focus:border-[#E19E4F] transition"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (Excellent)</option>
                    <option value={4}>⭐⭐⭐⭐ (Very Good)</option>
                    <option value={3}>⭐⭐⭐ (Good)</option>
                    <option value={2}>⭐⭐ (Fair)</option>
                    <option value={1}>⭐ (Poor)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 block font-medium font-mono">Testimonial Comment details *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Type detailed feedback about recipes quality or service speeds..."
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#E19E4F] hover:bg-[#d59144] rounded-xl font-brand text-xs uppercase tracking-widest text-[#0A0A0A] font-bold transition duration-205 cursor-pointer"
                >
                  Register Verified Testimonial
                </button>
              </form>
            )}

            {/* IF RESERVATIONS TAB form */}
            {activeSubTab === "reservations" && (
              <form onSubmit={handleCreateWalkin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 block font-medium font-mono">Branch Location *</label>
                  <select
                    value={walkinForm.branchName}
                    onChange={(e) => setWalkinForm({ ...walkinForm, branchName: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition"
                  >
                    <option value="University Town (Main Branch)">University Town (Main Branch)</option>
                    <option value="Hayatabad Branch">Hayatabad Branch</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-400 block font-medium font-mono">Date *</label>
                    <input
                      type="date"
                      required
                      value={walkinForm.date}
                      onChange={(e) => setWalkinForm({ ...walkinForm, date: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 font-mono focus:outline-none focus:border-[#E19E4F] transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-400 block font-medium font-mono">Time Slot *</label>
                    <select
                      value={walkinForm.time}
                      onChange={(e) => setWalkinForm({ ...walkinForm, time: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 font-mono focus:outline-none focus:border-[#E19E4F] transition"
                    >
                      {["12:00 PM", "01:00 PM", "02:00 PM", "06:00 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "10:00 PM", "11:00 PM", "12:00 AM"].map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 block font-medium font-mono">Total Guests Count *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    value={walkinForm.guestsCount}
                    onChange={(e) => setWalkinForm({ ...walkinForm, guestsCount: Number(e.target.value) })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 font-mono focus:outline-none focus:border-[#E19E4F] transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 block font-medium font-mono font-bold text-[#E19E4F]">Guest Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Malik Shehryar"
                    value={walkinForm.customerName}
                    onChange={(e) => setWalkinForm({ ...walkinForm, customerName: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 block font-medium font-mono">Phone Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., +92 333 9991234"
                    value={walkinForm.customerPhone}
                    onChange={(e) => setWalkinForm({ ...walkinForm, customerPhone: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 font-mono focus:outline-none focus:border-[#E19E4F] transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 block font-medium font-mono">Special Requests (VIP Hall, Cake, etc.)</label>
                  <textarea
                    rows={2}
                    placeholder="Require single custom high chair, or flower arrangements..."
                    value={walkinForm.specialRequests}
                    onChange={(e) => setWalkinForm({ ...walkinForm, specialRequests: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#E19E4F] hover:bg-[#d59144] rounded-xl font-brand text-xs uppercase tracking-widest text-[#0A0A0A] font-bold transition duration-205 cursor-pointer"
                >
                  Register Offline Booking
                </button>
              </form>
            )}

          </div>

          {/* RIGHT: Active items database grid listing (8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-serif italic text-[#E19E4F] pl-1">
                Active {activeSubTab} Nodes inside File Storage
              </h3>
              <span className="text-zinc-500 font-mono text-[10px] uppercase font-mono tracking-widest pr-1">
                SCROLLABLE REGISTER
              </span>
            </div>

            {/* TAB LISTING VIEW - MENU */}
            {activeSubTab === "menu" && (
              <div className="space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#141414] p-4 rounded-2xl border border-white/5 flex items-center justify-between gap-4 hover:border-white/10 transition"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover bg-zinc-900 border border-white/10"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-brand font-black text-sm text-zinc-200">{item.name}</h4>
                          <span className="text-[10px] bg-black px-2 py-0.5 rounded text-[#E19E4F] font-mono border border-white/5">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[#E19E4F] font-mono text-xs mt-0.5 font-bold">Rs. {item.price}</p>
                      </div>
                    </div>

                    {/* Operational control buttons */}
                    <div className="flex items-center gap-2.5 select-none">
                      {/* Signature tag */}
                      <button
                        type="button"
                        onClick={() => handleTogglePopular(item.id, item.popular)}
                        className={`p-1.5 px-3 rounded-lg text-[10px] font-brand font-bold transition flex items-center gap-1 cursor-pointer ${
                          item.popular
                            ? "bg-[#E19E4F] text-black shadow-md"
                            : "bg-black text-zinc-500 hover:text-zinc-300 border border-white/5"
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 fill-current" />
                        {item.popular ? "Signature" : "Set Signature"}
                      </button>

                      {/* Toggle Availability */}
                      <button
                        type="button"
                        onClick={() => handleToggleAvailability(item.id, item.availability)}
                        className={`p-1.5 rounded-lg text-xs font-brand border flex items-center gap-1 transition cursor-pointer ${
                          item.availability
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-450 hover:bg-emerald-500/20"
                            : "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                        }`}
                      >
                        {item.availability ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        {item.availability ? "Available" : "Sold Out"}
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDeleteMenu(item.id)}
                        className="p-1.5 rounded-lg bg-black hover:bg-red-950/20 text-zinc-500 hover:text-red-400 border border-white/5 transition cursor-pointer"
                        title="Delete dishes node"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* TAB LISTING VIEW - OFFERS */}
            {activeSubTab === "offers" && (
              <div className="space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
                {offersList.map((offer) => (
                  <div
                    key={offer.id}
                    className="bg-[#141414] p-4 rounded-2xl border border-white/5 flex justify-between items-center hover:border-white/10 transition"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-12 h-12 rounded-xl object-cover bg-zinc-900 border border-white/10"
                      />
                      <div>
                        <h4 className="font-brand font-extrabold text-sm text-zinc-200">{offer.title}</h4>
                        <p className="text-zinc-500 text-xs mt-0.5 font-mono">Until: {offer.expiryDate} | Code: <span className="text-[#E19E4F] font-bold">{offer.code}</span></p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 select-none">
                      <span className="hidden sm:inline-block text-[10px] bg-[#E19E4F]/10 text-[#E19E4F] border border-[#E19E4F]/20 px-3 py-1 rounded-full font-sans uppercase font-bold text-center">
                        Live Promo
                      </span>

                      <button
                        type="button"
                        onClick={() => handleEditOffer(offer)}
                        className={`p-1.5 px-3 rounded-lg text-xs font-brand border flex items-center gap-1.5 transition cursor-pointer ${
                          editingOfferId === offer.id
                            ? "bg-[#E19E4F]/10 border-[#E19E4F]/30 text-[#E19E4F]"
                            : "bg-black hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-white/5"
                        }`}
                        title="Edit Offer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteOffer(offer.id)}
                        className="p-1.5 rounded-lg bg-black hover:bg-red-950/20 text-zinc-500 hover:text-red-400 border border-white/5 transition cursor-pointer"
                        title="Delete Offer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB LISTING VIEW - GALLERY */}
            {activeSubTab === "gallery" && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#E19E4F]/20 transition relative aspect-square"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <span className="text-[9px] bg-[#E19E4F] text-black font-semibold font-mono uppercase w-max px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <p className="text-white text-xs font-brand tracking-tight mt-1 truncate">{item.title || "Lounge Snapshot"}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB LISTING VIEW - REVIEWS */}
            {activeSubTab === "reviews" && (
              <div className="space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
                {reviewsList.map((review) => (
                  <div
                    key={review.id}
                    className="bg-[#141414] p-4 rounded-2xl border border-white/5 flex flex-col gap-2.5 hover:border-white/10 transition"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-brand font-bold text-sm text-zinc-200">{review.customerName}</h4>
                        <span className="text-[10px] text-zinc-550 font-mono tracking-wider">{review.date || "Just Now"}</span>
                      </div>

                      <div className="flex items-center gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className="text-[#E19E4F] text-sm">★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-zinc-400 text-xs font-sans leading-relaxed italic border-t border-white/5 pt-2">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB LISTING VIEW - RESERVATIONS */}
            {activeSubTab === "reservations" && (
              <div className="space-y-4">
                {/* Search query input */}
                <input
                  type="text"
                  placeholder="Search reservations by guest name, phone, or branch..."
                  value={resvSearchQuery}
                  onChange={(e) => setResvSearchQuery(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-zinc-300 focus:outline-[#E19E4F] focus:outline-none focus:border-[#E19E4F] transition"
                />

                <div className="space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
                  {reservationsList
                    .filter(r => {
                      const q = resvSearchQuery.toLowerCase().trim();
                      if (!q) return true;
                      return (
                        r.customerName.toLowerCase().includes(q) ||
                        r.customerPhone.includes(q) ||
                        r.branchName.toLowerCase().includes(q)
                      );
                    })
                    .map((r) => (
                      <div
                        key={r.id}
                        className="bg-[#141414] p-5 rounded-2xl border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/10 transition"
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-brand font-extrabold text-[#E19E4F] text-sm">{r.customerName}</h4>
                            <span className="text-[10px] bg-white/5 border border-white/10 rounded px-2 py-0.5 text-zinc-400 font-mono">
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

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-zinc-400 font-sans pt-1">
                            <p><span className="text-zinc-500 font-mono">Phone:</span> <span className="text-zinc-200">{r.customerPhone}</span></p>
                            {r.customerEmail && <p><span className="text-zinc-500 font-mono">Email:</span> <span className="text-zinc-200">{r.customerEmail}</span></p>}
                            <p><span className="text-zinc-500 font-mono">Branch:</span> <span className="text-zinc-200">{r.branchName}</span></p>
                            <p><span className="text-zinc-500 font-mono font-bold text-[#E19E4F]">DateTime:</span> <span className="text-[#E19E4F] font-bold font-mono">{r.date} @ {r.time} ({r.guestsCount} Guests)</span></p>
                          </div>

                          {r.specialRequests && (
                            <p className="text-xs italic text-zinc-550 mt-2 bg-black/40 p-2 rounded border border-white/5">
                              "{r.specialRequests}"
                            </p>
                          )}
                        </div>

                        {/* Actions group */}
                        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                          {r.status === "pending" && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleUpdateResvStatus(r.id, "confirmed")}
                                className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-450 hover:text-white rounded-lg text-xs font-brand font-bold border border-emerald-600/30 transition cursor-pointer"
                              >
                                Approve
                              </button>
                              <button
                                type="button"
                                onClick={() => handleUpdateResvStatus(r.id, "cancelled")}
                                className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg text-xs font-brand font-bold border border-red-600/30 transition cursor-pointer"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {r.status !== "pending" && (
                            <button
                              type="button"
                              onClick={() => handleUpdateResvStatus(r.id, "pending")}
                              className="px-3 py-1.5 bg-zinc-850 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-brand font-bold border border-white/5 transition cursor-pointer"
                            >
                              Reset
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteResv(r.id)}
                            className="p-1.5 rounded-lg bg-black hover:bg-red-950/20 text-zinc-500 hover:text-red-400 border border-white/5 transition cursor-pointer"
                            title="Delete reservation log"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  {reservationsList.length === 0 && (
                    <p className="text-zinc-500 text-xs italic text-center py-6">
                      No reservations registered inside file storage yet.
                    </p>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
