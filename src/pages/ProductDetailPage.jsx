import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Badge from "../components/atoms/Badge";
import Button from "../components/atoms/Button";
import ProductModal from "../components/organisms/ProductModal";
import ConfirmModal from "../components/organisms/ConfirmModal";
import { formatRupiah } from "../data/initialProducts";
import {
  ArrowLeft,
  Layers,
  Tag,
  Calendar,
  AlertTriangle,
  Edit3,
  Trash2,
  CheckCircle2
} from "lucide-react";

export default function ProductDetailPage({ products = [], isLoading = false, onSaveProduct, onDeleteProduct }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => String(p.id) === String(id));

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm font-medium text-slate-500 shadow-xs">
        Memuat detail produk dari Express API...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center animate-in fade-in duration-300">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 mb-4">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Produk Tidak Ditemukan
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Produk dengan ID <span className="font-mono font-bold text-slate-800">#{id}</span> tidak terdaftar dalam sistem inventaris kami atau mungkin telah dihapus sebelumnya.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Katalog Produk
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
            >
              Buka Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock <= 0;

  async function handleSaveEdit(updatedData) {
    await onSaveProduct(updatedData);
    setIsEditModalOpen(false);
  }

  async function handleConfirmDelete() {
    await onDeleteProduct(product.id);
    navigate("/products");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Produk
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="neutral" size="sm" onClick={() => setIsEditModalOpen(true)}>
            <Edit3 className="w-3.5 h-3.5" />
            Edit Produk
          </Button>
          <Button variant="danger" size="sm" onClick={() => setIsDeleteModalOpen(true)}>
            <Trash2 className="w-3.5 h-3.5" />
            Hapus
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-50 to-blue-50/40 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="purple">{product.category}</Badge>
            <span className="text-xs font-mono text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200 font-semibold">
              SKU: {product.sku || `PRD-${product.id}`}
            </span>
            <span className="text-xs text-slate-400">ID #{product.id}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-baseline gap-4">
            <div className="text-3xl font-black text-blue-600">
              {formatRupiah(product.price)}
            </div>
            <div>
              {isOutOfStock ? (
                <Badge variant="danger" size="md">Stok Habis (0)</Badge>
              ) : isLowStock ? (
                <Badge variant="warning" size="md" className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Stok Menipis: Tersisa {product.stock} unit
                </Badge>
              ) : (
                <Badge variant="success" size="md" className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Tersedia ({product.stock} unit)
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">
              Deskripsi Produk
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed bg-slate-50/80 p-4 rounded-xl border border-slate-100">
              {product.description || "Tidak ada deskripsi detail yang dicantumkan untuk produk ini."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-1">
                <Tag className="w-4 h-4 text-blue-600" /> Kategori Barang
              </div>
              <div className="font-bold text-slate-800 text-sm">{product.category}</div>
            </div>

            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-1">
                <Layers className="w-4 h-4 text-emerald-600" /> Sisa Stok Fisik
              </div>
              <div className="font-bold text-slate-800 text-sm">{product.stock} unit siap kirim</div>
            </div>

            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-1">
                <Calendar className="w-4 h-4 text-purple-600" /> Terdaftar Pada
              </div>
              <div className="font-bold text-slate-800 text-sm">
                {product.createdAt
                  ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(product.createdAt))
                  : "Tanggal tidak tersedia"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductModal
        isOpen={isEditModalOpen}
        initialData={product}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Hapus Produk Ini?"
        message={`Apakah Anda yakin ingin menghapus produk "${product.name}" secara permanen? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus Sekarang"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
