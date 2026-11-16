import React, { useState, useMemo } from "react";
import Button from "../components/atoms/Button";
import ProductGrid from "../components/organisms/ProductGrid";
import ProductList from "../components/organisms/ProductList";
import ProductModal from "../components/organisms/ProductModal";
import ConfirmModal from "../components/organisms/ConfirmModal";
import { CATEGORIES } from "../data/initialProducts";
import {
  Search,
  PlusCircle,
  LayoutGrid,
  List,
  Filter,
  ArrowUpDown,
  RotateCcw
} from "lucide-react";

export default function ProductsPage({
  products = [],
  onSaveProduct,
  onDeleteProduct,
  displayMode = "grid",
  onChangeDisplayMode
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [sortBy, setSortBy] = useState("default");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "Semua Kategori" || product.category === selectedCategory;

        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          product.name.toLowerCase().includes(query) ||
          (product.description && product.description.toLowerCase().includes(query)) ||
          (product.sku && product.sku.toLowerCase().includes(query));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "stock-asc":
            return a.stock - b.stock;
          case "stock-desc":
            return b.stock - a.stock;
          case "name-asc":
            return a.name.localeCompare(b.name);
          default:
            return b.id - a.id;
        }
      });
  }, [products, searchQuery, selectedCategory, sortBy]);

  function handleOpenCreate() {
    setEditingProduct(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(product) {
    setEditingProduct(product);
    setIsModalOpen(true);
  }

  function handleOpenDelete(product) {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  }

  function handleConfirmDelete() {
    if (productToDelete) {
      onDeleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  }

  function handleResetFilters() {
    setSearchQuery("");
    setSelectedCategory("Semua Kategori");
    setSortBy("default");
  }

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "Semua Kategori" || sortBy !== "default";

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Katalog Produk
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kelola inventaris barang, sesuaikan stok, dan perbarui data produk secara berkala.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-xs">
            <button
              type="button"
              onClick={() => onChangeDisplayMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${
                displayMode === "grid"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Tampilan Grid"
              aria-label="Grid Mode"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onChangeDisplayMode("list")}
              className={`p-1.5 rounded-md transition-colors ${
                displayMode === "list"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Tampilan Tabel List"
              aria-label="List Mode"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <Button variant="primary" onClick={handleOpenCreate}>
            <PlusCircle className="w-4 h-4" />
            + Tambah Produk
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama, SKU, atau deskripsi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-sm rounded-lg border border-slate-300 bg-white py-2 px-3 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3 flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full text-sm rounded-lg border border-slate-300 bg-white py-2 px-3 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              <option value="default">Urutan: Terbaru</option>
              <option value="price-asc">Harga: Terendah</option>
              <option value="price-desc">Harga: Tertinggi</option>
              <option value="stock-asc">Stok: Tersedikit</option>
              <option value="stock-desc">Stok: Terbanyak</option>
              <option value="name-asc">Nama: A - Z</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div>
            Menampilkan <span className="font-bold text-slate-800">{filteredProducts.length}</span> dari{" "}
            <span className="font-bold text-slate-800">{products.length}</span> produk
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 font-semibold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {displayMode === "grid" ? (
        <ProductGrid
          products={filteredProducts}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      ) : (
        <ProductList
          products={filteredProducts}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      )}

      <ProductModal
        isOpen={isModalOpen}
        initialData={editingProduct}
        onClose={() => setIsModalOpen(false)}
        onSave={onSaveProduct}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Konfirmasi Hapus Produk"
        message={
          productToDelete
            ? `Apakah Anda yakin ingin menghapus produk "${productToDelete.name}" (SKU: ${productToDelete.sku}) dari sistem? Data yang terhapus tidak dapat dipulihkan.`
            : "Hapus produk ini?"
        }
        confirmLabel="Ya, Hapus Produk"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
