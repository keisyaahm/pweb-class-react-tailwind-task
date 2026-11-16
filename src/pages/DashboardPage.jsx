import React from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/molecules/StatCard";
import Badge from "../components/atoms/Badge";
import Button from "../components/atoms/Button";
import { formatRupiah } from "../data/initialProducts";
import {
  Package,
  Layers,
  CircleDollarSign,
  Calculator,
  AlertTriangle,
  ArrowRight,
  PlusCircle,
  FolderOpen
} from "lucide-react";

export default function DashboardPage({ products = [], onOpenCreate }) {
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, curr) => acc + (Number(curr.stock) || 0), 0);
  const totalAssetValue = products.reduce(
    (acc, curr) => acc + (Number(curr.price) || 0) * (Number(curr.stock) || 0),
    0
  );
  const averagePrice = totalProducts > 0
    ? Math.round(products.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0) / totalProducts)
    : 0;

  const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 5);
  const outOfStockProducts = products.filter((p) => p.stock <= 0);

  const categoryCount = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const recentProducts = [...products].slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-6 sm:p-8 shadow-md">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Sistem Manajemen Inventaris Real-Time
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ringkasan Inventaris Produk
          </h1>
          <p className="mt-2 text-sm sm:text-base text-blue-100/90 leading-relaxed">
            Pantau pergerakan stok, estimasi nilai aset, dan status katalog produk secara terpusat dengan navigasi Single-Page Application (SPA).
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              onClick={onOpenCreate}
              className="bg-white text-blue-700 border-none hover:bg-blue-50 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              + Tambah Produk Baru
            </Button>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-800/60 hover:bg-blue-800 text-white text-sm font-semibold transition-colors border border-white/20"
            >
              <FolderOpen className="w-4 h-4" />
              Buka Katalog Produk
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="absolute -right-12 -bottom-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div className="absolute right-32 -top-12 w-48 h-48 rounded-full bg-indigo-500/20 blur-xl pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Produk Terdaftar"
          value={totalProducts}
          subtitle="Variasi item dalam sistem"
          icon={Package}
          variant="blue"
          badgeText="Item Unik"
        />

        <StatCard
          title="Total Unit Stok"
          value={totalStock.toLocaleString("id-ID")}
          subtitle="Kuantitas fisik di gudang"
          icon={Layers}
          variant="emerald"
          badgeText="Unit"
        />

        <StatCard
          title="Total Nilai Inventaris"
          value={formatRupiah(totalAssetValue)}
          subtitle="Kalkulasi harga dikali stok"
          icon={CircleDollarSign}
          variant="amber"
          badgeText="Aset"
        />

        <StatCard
          title="Rata-rata Harga"
          value={formatRupiah(averagePrice)}
          subtitle="Rata-rata per produk"
          icon={Calculator}
          variant="purple"
          badgeText="Index"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800 text-base">Distribusi Kategori Produk</h3>
              <p className="text-xs text-slate-500">Proporsi kategori barang dalam katalog inventaris</p>
            </div>
            <Link to="/products" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Lihat di Katalog <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {Object.entries(categoryCount).map(([cat, count]) => {
              const percentage = totalProducts > 0 ? Math.round((count / totalProducts) * 100) : 0;
              return (
                <div key={cat} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700 line-clamp-1">{cat}</span>
                    <span className="text-xs font-bold text-blue-600">{count} item</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block text-right">{percentage}% dari total</span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Sampel Produk Aktif
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recentProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 bg-white">
                  <div className="min-w-0 pr-3">
                    <div className="text-xs font-bold text-slate-800 truncate">{p.name}</div>
                    <div className="text-[11px] text-slate-400">{p.category} · {p.stock} unit</div>
                  </div>
                  <Link
                    to={`/products/${p.id}`}
                    className="shrink-0 text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Detail
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <div className="p-2 rounded-lg bg-amber-50 border border-amber-100">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-base leading-tight">
                Peringatan Stok Menipis
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Produk dengan sisa stok kurang dari atau sama dengan 5 unit membutuhkan pengadaan ulang segera agar tidak kehabisan persediaan.
            </p>

            <div className="mt-4 space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {lowStockProducts.length === 0 && outOfStockProducts.length === 0 ? (
                <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs text-center font-medium">
                  Seluruh stok produk berada pada kuantitas aman!
                </div>
              ) : (
                <>
                  {outOfStockProducts.map((p) => (
                    <div key={p.id} className="p-3 rounded-xl border border-rose-200 bg-rose-50/50 flex items-center justify-between">
                      <div className="min-w-0 pr-2">
                        <div className="text-xs font-bold text-rose-900 truncate">{p.name}</div>
                        <div className="text-[11px] text-rose-700">SKU: {p.sku}</div>
                      </div>
                      <Badge variant="danger" size="xs">Habis (0)</Badge>
                    </div>
                  ))}

                  {lowStockProducts.map((p) => (
                    <div key={p.id} className="p-3 rounded-xl border border-amber-200 bg-amber-50/50 flex items-center justify-between">
                      <div className="min-w-0 pr-2">
                        <div className="text-xs font-bold text-amber-900 truncate">{p.name}</div>
                        <div className="text-[11px] text-amber-700">SKU: {p.sku}</div>
                      </div>
                      <Badge variant="warning" size="xs">Sisa {p.stock}</Badge>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              to="/products"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Kelola Semua di Katalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
