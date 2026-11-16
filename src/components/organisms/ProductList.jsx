import React from "react";
import { Link } from "react-router-dom";
import Badge from "../atoms/Badge";
import { formatRupiah } from "../../data/initialProducts";
import { Eye, Edit3, Trash2, AlertTriangle } from "lucide-react";

export default function ProductList({ products = [], onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300 p-8">
        <h4 className="font-bold text-slate-700">Tidak ada produk ditemukan</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Coba ganti kata kunci pencarian atau bersihkan filter kategori yang aktif.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              <th scope="col" className="px-5 py-3.5">SKU</th>
              <th scope="col" className="px-5 py-3.5">Nama Produk</th>
              <th scope="col" className="px-5 py-3.5">Kategori</th>
              <th scope="col" className="px-5 py-3.5 text-right">Harga</th>
              <th scope="col" className="px-5 py-3.5 text-center">Stok</th>
              <th scope="col" className="px-5 py-3.5 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {products.map((product) => {
              const isLowStock = product.stock > 0 && product.stock <= 5;
              const isOutOfStock = product.stock <= 0;

              return (
                <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-slate-500">
                    {product.sku || `PRD-${product.id}`}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-900 line-clamp-1">{product.name}</div>
                    <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">{product.description}</div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant="purple" size="xs">
                      {product.category}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-right font-bold text-blue-600">
                    {formatRupiah(product.price)}
                  </td>
                  <td className="px-5 py-4 text-center">
                    {isOutOfStock ? (
                      <Badge variant="danger" size="xs">Habis</Badge>
                    ) : isLowStock ? (
                      <Badge variant="warning" size="xs" className="inline-flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> {product.stock} unit
                      </Badge>
                    ) : (
                      <span className="text-slate-700 font-semibold">{product.stock} unit</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Link
                        to={`/products/${product.id}`}
                        title="Lihat Detail"
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => onEdit(product)}
                        title="Edit Produk"
                        className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(product)}
                        title="Hapus Produk"
                        className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
