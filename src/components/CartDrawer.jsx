/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClear,
  branches,
}) {
  const [selectedBranch, setSelectedBranch] = useState(branches[0]?.name || "University Town");
  const [orderType, setOrderType] = useState("delivery");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const subtotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const deliveryCharges = orderType === "delivery" ? 150 : 0;
  const total = subtotal + deliveryCharges;

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;
    if (!userName.trim() || !userPhone.trim()) {
      alert("Please fill in your Name and Contact Phone for direct order processing!");
      return;
    }

    const branch = branches.find((b) => b.name === selectedBranch) || branches[0];
    const whatsappNum = branch?.whatsapp || "923331234567";

    // Format bold WhatsApp messages
    let messageText = `*🔥 CHIEF GRILL - NEW ORDER (DIRECT CUSTOMER) *\n`;
    messageText += `-----------------------------------------\n`;
    messageText += `*Customer:* ${userName}\n`;
    messageText += `*Phone:* ${userPhone}\n`;
    messageText += `*Branch Selected:* ${selectedBranch}\n`;
    messageText += `*Service Type:* ${orderType.toUpperCase().replace("_", " ")}\n`;
    
    if (orderType === "delivery") {
      messageText += `*Delivery Address:* ${userAddress || "Not Specified"}\n`;
    } else if (orderType === "dine_in") {
      messageText += `*Dine-in / Table Request:* ${tableNumber || "Self-assigned Table / Lounge booking"}\n`;
    }
    
    messageText += `-----------------------------------------\n`;
    messageText += `*ITEMS ORDERED:*\n`;
    
    cart.forEach((item) => {
      messageText += `• ${item.quantity}x _${item.menuItem.name}_ (Rs. ${item.menuItem.price} each) → *Rs. ${item.menuItem.price * item.quantity}*\n`;
    });

    messageText += `-----------------------------------------\n`;
    messageText += `*Subtotal:* Rs. ${subtotal}\n`;
    if (deliveryCharges > 0) {
      messageText += `*Delivery Fee:* Rs. ${deliveryCharges}\n`;
    }
    messageText += `*Grand Total Bill:* *Rs. ${total}*\n`;
    messageText += `-----------------------------------------\n`;
    messageText += `_Sent via Chief Grill Digital Experience Website._`;

    const encodedMsg = encodeURIComponent(messageText);
    const waURL = `https://wa.me/${whatsappNum}?text=${encodedMsg}`;
    window.open(waURL, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0A0A0A] border-l border-white/10 text-white shadow-2xl z-50 flex flex-col pointer-events-auto"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#141414]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#E19E4F]" />
                <h3 className="text-lg font-serif italic text-zinc-100">Your Checkout Basket</h3>
                <span className="bg-[#E19E4F]/10 text-[#E19E4F] text-xs px-2 py-0.5 rounded-full font-mono font-bold border border-[#E19E4F]/20">
                  {cart.length}
                </span>
              </div>
              <button
                id="cart-close-btn"
                onClick={onClose}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-[#1A1A1A] transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* List items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#141414] flex items-center justify-center border border-white/5">
                    <ShoppingBag className="w-8 h-8 text-zinc-650" />
                  </div>
                  <div>
                    <p className="text-zinc-300 font-brand font-semibold text-lg">Your basket is empty</p>
                    <p className="text-zinc-500 text-sm mt-1 max-w-xs">
                      Explore our premium menu page and add Butterfly Steaks or Chief Special Pizzas to begin.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-zinc-500 font-mono text-[10px] tracking-wider uppercase">ITEMS SELECTED</span>
                    <button
                      onClick={onClear}
                      className="text-zinc-500 hover:text-[#E19E4F] text-xs flex items-center gap-1 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear All
                    </button>
                  </div>

                  {/* Cart items */}
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.menuItem.id}
                        className="bg-[#141414] p-3 rounded-xl border border-white/5 flex gap-3 items-center"
                      >
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          className="w-16 h-16 rounded-lg object-cover bg-zinc-900 border border-white/10"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-brand font-medium text-sm text-zinc-200 truncate pr-4">
                            {item.menuItem.name}
                          </h4>
                          <p className="text-zinc-400 font-mono text-xs mt-0.5">
                            Rs. {item.menuItem.price} ea
                          </p>
                          
                          {/* Qty adjustment */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) onUpdateQty(item.menuItem.id, item.quantity - 1);
                                else onRemoveItem(item.menuItem.id);
                              }}
                              className="p-1 rounded bg-black text-zinc-400 hover:text-white border border-white/10 transition"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-mono px-2">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQty(item.menuItem.id, item.quantity + 1)}
                              className="p-1 rounded bg-black text-zinc-400 hover:text-white border border-white/10 transition"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right flex flex-col items-end justify-between self-stretch">
                          <button
                            onClick={() => onRemoveItem(item.menuItem.id)}
                            className="text-zinc-500 hover:text-red-400 p-1 rounded transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <span className="font-brand font-semibold text-sm text-[#E19E4F] font-mono">
                            Rs. {item.menuItem.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Options */}
                  <div className="p-4 bg-[#141414] rounded-2xl border border-white/10 space-y-4 mt-6">
                    <h5 className="font-mono text-[10px] font-bold text-[#E19E4F] tracking-widest uppercase">
                      DELIVERY & BOOKING INFORMATION
                    </h5>

                    {/* Branch Selection */}
                    <div>
                      <label className="block text-xs text-zinc-400 font-medium mb-1.5 font-mono">
                        Select Nearest Branch:
                      </label>
                      <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-[#E19E4F] transition"
                      >
                        {branches.map((b) => (
                          <option key={b.name} value={b.name}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Order Service Type */}
                    <div>
                      <label className="block text-xs text-zinc-400 font-medium mb-1.5 font-mono">
                        How will you receive your order?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "delivery", label: "Home Delivery" },
                          { id: "takeaway", label: "Takeaway" },
                          { id: "dine_in", label: "Dine-In Lounge" },
                        ].map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setOrderType(t.id)}
                            className={`p-2 rounded-lg text-xs font-brand text-center transition border ${
                              orderType === t.id
                                ? "bg-[#E19E4F]/10 text-[#E19E4F] border-[#E19E4F]/40 font-bold"
                                : "bg-black text-zinc-450 border-white/5 hover:text-zinc-200 hover:border-white/10"
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Customer Inputs */}
                    <div className="space-y-2.5">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Your Name *"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#E19E4F] transition"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Your Contact Phone (e.g., 03331234567) *"
                          value={userPhone}
                          onChange={(e) => setUserPhone(e.target.value)}
                          className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#E19E4F] transition"
                        />
                      </div>

                      {orderType === "delivery" && (
                        <div>
                          <textarea
                            required
                            placeholder="Full Delivery Address (Peshawar Streets/Sectors) *"
                            value={userAddress}
                            onChange={(e) => setUserAddress(e.target.value)}
                            rows={2}
                            className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#E19E4F] transition resize-none"
                          />
                        </div>
                      )}

                      {orderType === "dine_in" && (
                        <div>
                          <input
                            type="text"
                            placeholder="Table Number / Booking Slot Request"
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#E19E4F] transition"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Bottom calculation and Checkout CTA */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-white/10 bg-[#141414] space-y-4">
                <div className="space-y-1.5 text-sm font-brand">
                  <div className="flex justify-between text-zinc-400">
                    <span>Menu Items Subtotal</span>
                    <span className="font-mono">Rs. {subtotal}</span>
                  </div>
                  {orderType === "delivery" && (
                    <div className="flex justify-between text-zinc-400">
                      <span>Delivery Service Fee</span>
                      <span className="font-mono">Rs. {deliveryCharges}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold text-zinc-100 pt-2 border-t border-white/5">
                    <span>Est. Grand Total</span>
                    <span className="text-[#E19E4F] font-mono font-bold">Rs. {total}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckoutWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 active:translate-y-0.5 text-white font-brand py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition duration-200 cursor-pointer text-xs uppercase tracking-wider font-bold"
                >
                  <Send className="w-4 h-4" />
                  Order on WhatsApp
                </button>
                <p className="text-center text-zinc-500 text-[10px] leading-relaxed">
                  Your customized order with selected dishes, totals, and location coordinates is wrapped cleanly below. Just tap to dispatch to our team instantly!
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
