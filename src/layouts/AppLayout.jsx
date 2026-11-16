import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";

export default function AppLayout({ totalProducts = 0 }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar totalProducts={totalProducts} />

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
