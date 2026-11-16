import React from "react";
import { Link } from "react-router-dom";
import Badge from "../atoms/Badge";
import { formatRupiah } from "../../data/initialProducts";
import { Eye, Edit3, Trash2, AlertTriangle } from "lucide-react";

export default function ProductCard({ product, onEdit, onDelete }) {
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="purple" size="xs">
            {product.category}
          </Badge>

          {isOutOfStock ? (
            <Badge variant="danger" size="xs">
              Stok Habis
            </Badge>
          ) : isLowStock ? (
            <Badge variant="warning" size="xs" className="gap-1 flex items-center">
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              Sisa {product.stock}
            </Badge>
          ) : (
            <Badge variant="success" size="xs">
              Tersedia ({product.stock})
            </Badge>
          )}
        </div>

        <div className="mt-4">
          <div className="text-xs font-mono text-slate-600 mb-1">
            {product.sku || `PRD-${product.id}`}
          </div>
          <h3 className="font-bold text-slate-800 text-base group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-slate-500 line-clamp-2">
            {product.description || "Tidak ada deskripsi tambahan."}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
          <div>
            <span className="text-[11px] text-slate-600 uppercase tracking-wider font-semibold">Harga</span>
            <div className="text-lg font-extrabold text-blue-600">
              {formatRupiah(product.price)}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-600 uppercase tracking-wider font-semibold">Stok</span>
            <div className={`text-sm font-bold ${isLowStock ? 'text-amber-600' : 'text-slate-700'}`}>
              {product.stock} unit
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50/70 px-4 py-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <Link
          to={`/products/${product.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50/60 hover:bg-blue-100/70 px-3 py-1.5 rounded-md transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          Detail
        </Link>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(product)}
            title="Edit Produk"
            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-white rounded-md transition-colors border border-transparent hover:border-slate-200"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(product)}
            title="Hapus Produk"
            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-white rounded-md transition-colors border border-transparent hover:border-slate-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
