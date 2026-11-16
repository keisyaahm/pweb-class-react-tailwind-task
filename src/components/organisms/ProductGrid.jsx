import React from "react";
import ProductCard from "../molecules/ProductCard";

export default function ProductGrid({ products = [], onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300 p-8">
        <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h4 className="font-bold text-slate-700">Tidak ada produk ditemukan</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Coba ganti kata kunci pencarian atau bersihkan filter kategori yang aktif.
        </p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}
