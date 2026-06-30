/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Lock, User, ShieldAlert, KeyRound, ArrowRight, Loader2 } from "lucide-react";
import { loginAdmin } from "../services/api";

export default function AdminLogin({ onLoginSuccess }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await loginAdmin(name, password);
      
      if (result.success) {
        sessionStorage.setItem("admin_logged_in", "true");
        onLoginSuccess();
      } else {
        setError(result.error || "Authentication failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server connection failed. Please ensure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#080808] relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E19E4F]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E19E4F]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        {/* Logo/Icon Container */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 text-[#E19E4F] mb-4 shadow-lg shadow-black/40 relative group">
            <div className="absolute inset-0 bg-[#E19E4F]/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-300" />
            <KeyRound className="w-8 h-8 relative z-10" />
          </div>
          <h2 className="text-3xl font-serif font-black italic tracking-wide text-zinc-100 mb-2">
            Owner Authentication
          </h2>
          <p className="text-zinc-500 text-sm font-sans tracking-wide">
            Enter credentials to access the Chief Grill Management Dashboard.
          </p>
        </div>

        {/* Glassmorphic Login Card */}
        <div className="bg-zinc-950/60 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-8 shadow-[0_12px_40px_rgba(0,0,0,0.7)] relative">
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#E19E4F]/30 to-transparent" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-950/30 border border-red-900/50 text-red-400 text-sm animate-shake">
                <ShieldAlert className="w-5 h-5 flex-shrink-0 text-red-500" />
                <p className="font-medium">{error}</p>
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-400 font-semibold font-sans">
                Owner Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#E19E4F] transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-900/30 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#E19E4F] focus:ring-1 focus:ring-[#E19E4F]/20 transition-all font-sans text-sm"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-400 font-semibold font-sans">
                Security Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#E19E4F] transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-900/30 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#E19E4F] focus:ring-1 focus:ring-[#E19E4F]/20 transition-all font-sans text-sm"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E19E4F] hover:bg-[#d08f43] active:scale-[0.98] text-black font-brand font-bold text-xs uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition shadow-[0_4px_20px_rgba(225,158,79,0.15)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Authenticate Access</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
