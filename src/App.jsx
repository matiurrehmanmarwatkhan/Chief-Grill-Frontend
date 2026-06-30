/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";
import Offers from "./pages/Offers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Reservations from "./pages/Reservations";
import { fetchRestaurant, fetchMenu, fetchOffers, fetchGallery, fetchReviews, fetchReservations } from "./services/api";
import { UtensilsCrossed } from "lucide-react";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // States for database entities
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [offers, setOffers] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reservations, setReservations] = useState([]);

  // Local state for interactive cart
  const [cart, setCart] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem("admin_logged_in") === "true";
  });

  // Master fetch database values
  const loadDatabase = async (showSpinner = false) => {
    try {
      if (showSpinner) {
        setLoading(true);
      }
      const [restData, menuData, offersData, galData, revData, resvData] = await Promise.all([
        fetchRestaurant(),
        fetchMenu(),
        fetchOffers(),
        fetchGallery(),
        fetchReviews(),
        fetchReservations()
      ]);

      setRestaurant(restData);
      setMenuItems(menuData);
      setOffers(offersData);
      setGallery(galData);
      setReviews(revData);
      setReservations(resvData || []);
    } catch (e) {
      console.error("Database initialization error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDatabase(true);
  }, []);

  // Cart operations
  const handleAddToCart = (menuItem) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.menuItem.id === menuItem.id);
      if (existingIdx > -1) {
        const newCart = [...prevCart];
        newCart[existingIdx].quantity += 1;
        return newCart;
      } else {
        return [...prevCart, { menuItem, quantity: 1 }];
      }
    });
  };

  const handleUpdateCartQty = (id, qty) => {
    if (qty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.menuItem.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.menuItem.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Add review from contact to homepage live
  const handleReviewSubmitted = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center font-brand space-y-4">
        <div className="relative w-20 h-20">
          {/* Pulsing Gold Glow effect */}
          <div className="absolute inset-0 rounded-full bg-[#E19E4F]/10 blur-xl animate-pulse" />
          <div className="w-16 h-16 rounded-2xl bg-[#E19E4F] flex items-center justify-center border border-white/5 animate-spin text-black">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
        </div>
        <div className="text-center space-y-1">
          <p className="text-zinc-200 text-sm font-semibold tracking-wider font-brand">CHIEF GRILL PESHAWAR</p>
          <p className="text-zinc-500 text-xs font-mono font-medium animate-pulse">Initializing Premium Experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col justify-between selection:bg-[#E19E4F] selection:text-black">
      {/* Visual Navigation Bar */}
      {restaurant && (
        <Navbar
          cart={cart}
          setCartOpen={setCartOpen}
        />
      )}

      {/* Primary Dynamic Screen View content routing */}
      <main className="flex-1">
        {restaurant && (
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  restaurant={restaurant}
                  menuItems={menuItems}
                  reviews={reviews}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/menu"
              element={
                <Menu
                  menuItems={menuItems}
                  onAddToCart={handleAddToCart}
                  setCartOpen={setCartOpen}
                />
              }
            />
            <Route
              path="/gallery"
              element={<Gallery galleryItems={gallery} />}
            />
            <Route
              path="/offers"
              element={<Offers offersList={offers} />}
            />
            <Route
              path="/about"
              element={<About restaurant={restaurant} />}
            />
            <Route
              path="/contact"
              element={
                <Contact
                  restaurant={restaurant}
                  onReviewSubmitted={handleReviewSubmitted}
                />
              }
            />
            <Route
              path="/reservations"
              element={<Reservations branches={restaurant.branches} />}
            />
            <Route
              path="/admin"
              element={
                isAdminLoggedIn ? (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Owner Top Logout Bar */}
                    <div className="bg-zinc-900/40 border border-zinc-800/80 px-6 py-4 flex justify-between items-center w-full mt-6 rounded-2xl backdrop-blur-md">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[#E19E4F] font-brand font-bold text-xs uppercase tracking-wider">Mati Ur Rehman Session Active</span>
                      </div>
                      <button
                        onClick={() => {
                          sessionStorage.removeItem("admin_logged_in");
                          setIsAdminLoggedIn(false);
                        }}
                        className="bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-300 hover:text-white px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-brand font-bold transition cursor-pointer"
                      >
                        Logout Panel
                      </button>
                    </div>

                    <Admin
                      menuItems={menuItems}
                      offersList={offers}
                      galleryItems={gallery}
                      reviewsList={reviews}
                      reservationsList={reservations}
                      onRefreshAll={loadDatabase}
                    />
                  </div>
                ) : (
                  <AdminLogin onLoginSuccess={() => setIsAdminLoggedIn(true)} />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </main>

      {/* Cart Drawer sliding checkout sheet */}
      {restaurant && (
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart}
          onUpdateQty={handleUpdateCartQty}
          onRemoveItem={handleRemoveItem}
          onClear={handleClearCart}
          branches={restaurant.branches}
        />
      )}

      {/* Responsive Visual Footer */}
      {restaurant && <Footer restaurant={restaurant} />}
    </div>
  );
}
