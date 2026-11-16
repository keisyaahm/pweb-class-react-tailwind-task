import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";
import { AlertCircle, LoaderCircle, RefreshCw } from "lucide-react";

export default function AppLayout({ totalProducts = 0, isLoading = false, apiError = "", onRetry }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar totalProducts={totalProducts} />

      {isLoading && (
        <div className="border-b border-blue-100 bg-blue-50 px-4 py-2 text-center text-sm font-medium text-blue-700">
          <span className="inline-flex items-center gap-2">
            <LoaderCircle className="h-4 w-4 animate-spin" /> Mengambil data dari Express API...
          </span>
        </div>
      )}

      {apiError && !isLoading && (
        <div className="border-b border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 font-medium">
              <AlertCircle className="h-4 w-4" /> {apiError}
            </span>
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 rounded-md border border-rose-300 bg-white px-3 py-1 font-semibold hover:bg-rose-100"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Coba Lagi
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-semibold text-slate-700">Tugas Pemrograman Web Pertemuan 13</span>
            <span className="mx-2">·</span>
            <span>React Router v7 dan Tailwind CSS v4</span>
          </div>
          <div>
            Dikembangkan oleh <span className="font-semibold text-slate-700">Keisya Halimah</span> · Departemen Teknologi Informasi ITS
          </div>
        </div>
      </footer>
    </div>
  );
}
