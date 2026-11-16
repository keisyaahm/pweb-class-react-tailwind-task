import React from "react";
import { Link } from "react-router-dom";
import { Compass, Home, Package } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="max-w-xl mx-auto py-16 px-4 text-center animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-lg">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 mb-6 shadow-xs">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="inline-block text-xs font-black uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full mb-3">
          Error 404 - Not Found
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          Halaman Tidak Ditemukan
        </h1>

        <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
          Alamat URL yang Anda tuju tidak terdaftar dalam rute aplikasi atau mungkin telah dipindahkan.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-xs"
          >
            <Package className="w-4 h-4" />
            Kembali ke Produk
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
          >
            <Home className="w-4 h-4" />
            Menuju Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
