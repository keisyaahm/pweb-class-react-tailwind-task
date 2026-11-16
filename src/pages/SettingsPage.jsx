import React, { useState } from "react";
import Button from "../components/atoms/Button";
import ConfirmModal from "../components/organisms/ConfirmModal";
import {
  Settings,
  LayoutGrid,
  List,
  RotateCcw,
  HardDrive,
  Download,
  CheckCircle2,
  Info
} from "lucide-react";

export default function SettingsPage({
  displayMode = "grid",
  onChangeDisplayMode,
  products = [],
  onResetData
}) {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [successNotice, setSuccessNotice] = useState("");

  const dataSize = new Blob([JSON.stringify(products)]).size;

  function handleResetConfirm() {
    onResetData();
    setSuccessNotice("Data inventaris produk berhasil direset ke data seeder awal!");
    setTimeout(() => setSuccessNotice(""), 4000);
  }

  function handleExportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `products_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setSuccessNotice("Berkas JSON inventaris berhasil diekspor ke perangkat Anda.");
    setTimeout(() => setSuccessNotice(""), 4000);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="pb-5 border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Pengaturan Aplikasi
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Sesuaikan preferensi tata letak, kelola persistensi state di browser, dan reset data awal.
        </p>
      </div>

      {successNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-2.5 text-sm font-semibold animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Preferensi Tampilan Katalog Produk
            </h2>
            <p className="text-xs text-slate-500">
              Pilihan ini tersimpan di browser dan langsung memengaruhi tampilan halaman Produk.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div
            onClick={() => onChangeDisplayMode("grid")}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
              displayMode === "grid"
                ? "border-blue-600 bg-blue-50/40 shadow-xs"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <div className={`p-2.5 rounded-lg shrink-0 ${displayMode === "grid" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 text-sm">Mode Kartu (Grid View)</span>
                {displayMode === "grid" && (
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                    Aktif
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Tampilan kartu responsif (1 kolom pada mobile, 2 kolom pada tablet, 3 kolom pada desktop).
              </p>
            </div>
          </div>

          <div
            onClick={() => onChangeDisplayMode("list")}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
              displayMode === "list"
                ? "border-blue-600 bg-blue-50/40 shadow-xs"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <div className={`p-2.5 rounded-lg shrink-0 ${displayMode === "list" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>
              <List className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 text-sm">Mode Tabel (List View)</span>
                {displayMode === "list" && (
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                    Aktif
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Format tabel kompak dengan kolom informasi detail dan tombol aksi terpusat.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Status Persistensi dan Memori State
            </h2>
            <p className="text-xs text-slate-500">
              State produk dan preferensi disimpan otomatis ke localStorage browser.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs text-slate-500 font-medium">Total Produk Tersimpan</div>
            <div className="text-xl font-bold text-slate-800 mt-1">{products.length} Barang</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs text-slate-500 font-medium">Ukuran Payload State</div>
            <div className="text-xl font-bold text-slate-800 mt-1">{(dataSize / 1024).toFixed(2)} KB</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs text-slate-500 font-medium">Penyimpanan Terpasang</div>
            <div className="text-xl font-bold text-emerald-600 mt-1">localStorage (Aktif)</div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <Button variant="neutral" onClick={handleExportJSON}>
            <Download className="w-4 h-4 text-slate-600" />
            Ekspor Data (.JSON)
          </Button>

          <Button variant="danger" onClick={() => setIsResetModalOpen(true)}>
            <RotateCcw className="w-4 h-4" />
            Reset ke Data Seeder Awal
          </Button>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-3 text-xs text-blue-900 leading-relaxed">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Mekanisme Navigasi dan Siklus Hidup State:</span>
          <br />
          Navigasi antar route internal dilakukan melalui komponen <code>Link</code> atau <code>NavLink</code> React Router tanpa memuat ulang dokumen HTML (SPA). Data state bersama tetap terjaga di memori komponen root <code>App.jsx</code>, dan dipulihkan kembali dari <code>localStorage</code> saat reload halaman langsung (F5).
        </div>
      </div>

      <ConfirmModal
        isOpen={isResetModalOpen}
        title="Reset Data Inventaris?"
        message="Tindakan ini akan mengembalikan seluruh daftar produk ke data seeder awal (8 produk seeder). Seluruh produk yang Anda tambahkan atau edit secara manual akan dikembalikan ke kondisi semula."
        confirmLabel="Ya, Reset Data Sekarang"
        variant="warning"
        onConfirm={handleResetConfirm}
        onClose={() => setIsResetModalOpen(false)}
      />
    </div>
  );
}
