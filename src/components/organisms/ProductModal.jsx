import React, { useState, useEffect } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import FormField from "../molecules/FormField";
import { CATEGORIES } from "../../data/initialProducts";
import { X, PlusCircle, Edit } from "lucide-react";

export default function ProductModal({ isOpen, onClose, onSave, initialData = null }) {
  const isEdit = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    name: "",
    category: "Alat Tulis",
    price: "",
    stock: "",
    sku: "",
    description: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        category: initialData.category || "Alat Tulis",
        price: initialData.price ?? "",
        stock: initialData.stock ?? "",
        sku: initialData.sku || "",
        description: initialData.description || ""
      });
    } else {
      setFormData({
        name: "",
        category: "Alat Tulis",
        price: "",
        stock: "",
        sku: "",
        description: ""
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama produk wajib diisi.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Nama produk minimal 3 karakter.";
    }

    if (!formData.category || formData.category === "Semua Kategori") {
      newErrors.category = "Pilih kategori produk yang valid.";
    }

    if (formData.price === "" || formData.price === null || formData.price === undefined) {
      newErrors.price = "Harga produk wajib diisi.";
    } else if (Number(formData.price) <= 0 || isNaN(Number(formData.price))) {
      newErrors.price = "Harga harus lebih besar dari Rp 0.";
    }

    if (formData.stock === "" || formData.stock === null || formData.stock === undefined) {
      newErrors.stock = "Jumlah stok wajib diisi.";
    } else if (Number(formData.stock) < 0 || isNaN(Number(formData.stock))) {
      newErrors.stock = "Stok tidak boleh bernilai negatif.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...(initialData || {}),
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      sku: formData.sku.trim() || `PRD-${Date.now().toString().slice(-4)}`,
      description: formData.description.trim()
    });

    onClose();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        <div className="px-6 py-4.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${isEdit ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
              {isEdit ? <Edit className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg leading-tight">
                {isEdit ? "Edit Data Produk" : "Tambah Produk Baru"}
              </h3>
              <p className="text-xs text-slate-500">
                {isEdit ? "Perbarui informasi produk dan stok" : "Masukkan detail produk ke dalam sistem inventaris"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <FormField label="Nama Produk" id="product-name" required error={errors.name}>
            <Input
              id="product-name"
              placeholder="Contoh: Buku Tulis Hardcover B5"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              hasError={Boolean(errors.name)}
              autoFocus
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Kategori" id="product-category" required error={errors.category}>
              <select
                id="product-category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-hidden"
              >
                {CATEGORIES.filter((c) => c !== "Semua Kategori").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Kode SKU (Opsional)" id="product-sku" hint="Biarkan kosong untuk auto-generate">
              <Input
                id="product-sku"
                placeholder="Misal: AT-001"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Harga (Rp)" id="product-price" required error={errors.price}>
              <Input
                id="product-price"
                type="number"
                min="0"
                step="500"
                placeholder="25000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                hasError={Boolean(errors.price)}
              />
            </FormField>

            <FormField label="Jumlah Stok (Unit)" id="product-stock" required error={errors.stock}>
              <Input
                id="product-stock"
                type="number"
                min="0"
                step="1"
                placeholder="10"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                hasError={Boolean(errors.stock)}
              />
            </FormField>
          </div>

          <FormField label="Deskripsi Produk" id="product-desc">
            <textarea
              id="product-desc"
              rows={3}
              placeholder="Spesifikasi atau informasi tambahan mengenai produk..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-hidden"
            />
          </FormField>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <Button variant="ghost" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" variant="primary">
              {isEdit ? "Simpan Perubahan" : "Tambah Produk"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
