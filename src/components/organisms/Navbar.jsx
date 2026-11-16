import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LayoutDashboard, Package, Settings, Menu, X, Box } from "lucide-react";

export default function Navbar({ totalProducts = 0 }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItemClass = ({ isActive }) =>
    `inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
      isActive
        ? "bg-blue-600 text-white shadow-xs"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
    }`;

  const mobileNavItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-base font-semibold transition-all ${
      isActive
        ? "bg-blue-600 text-white shadow-xs"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-700 transition-colors">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-base leading-tight group-hover:text-blue-600 transition-colors">
                Manajemen Produk
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                PWeb ITS - React Router & Tailwind CSS
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1.5">
            <NavLink to="/" end className={navItemClass}>
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </NavLink>

            <NavLink to="/products" className={navItemClass}>
              <Package className="w-4 h-4" />
              Produk
              {totalProducts > 0 && (
                <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-bold group-hover:bg-blue-200">
                  {totalProducts}
                </span>
              )}
            </NavLink>

            <NavLink to="/settings" className={navItemClass}>
              <Settings className="w-4 h-4" />
              Settings
            </NavLink>
          </nav>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-3 px-2 border-t border-slate-100 space-y-1">
            <NavLink
              to="/"
              end
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavItemClass}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </NavLink>

            <NavLink
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavItemClass}
            >
              <Package className="w-5 h-5" />
              Daftar Produk ({totalProducts})
            </NavLink>

            <NavLink
              to="/settings"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavItemClass}
            >
              <Settings className="w-5 h-5" />
              Pengaturan Sistem
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}
