import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductModal from "./components/organisms/ProductModal";
import {
  INITIAL_PRODUCTS,
  STORAGE_KEY_PRODUCTS,
  STORAGE_KEY_SETTINGS
} from "./data/initialProducts";

export default function App() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  const [displayMode, setDisplayMode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved === "list" || saved === "grid") {
        return saved;
      }
    } catch (e) {
      console.error(e);
    }
    return "grid";
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, displayMode);
    } catch (e) {
      console.error(e);
    }
  }, [displayMode]);

  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  function handleSaveProduct(productData) {
    if (productData.id) {
      setProducts((prev) =>
        prev.map((item) => (item.id === productData.id ? { ...item, ...productData } : item))
      );
    } else {
      const maxId = products.length > 0 ? Math.max(...products.map((p) => Number(p.id) || 0)) : 0;
      const newProduct = {
        ...productData,
        id: maxId + 1,
        createdAt: new Date().toISOString().slice(0, 10)
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
  }

  function handleDeleteProduct(productId) {
    setProducts((prev) => prev.filter((item) => item.id !== productId));
  }

  function handleResetData() {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  }

  function handleChangeDisplayMode(mode) {
    setDisplayMode(mode);
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout totalProducts={products.length} />}>
          <Route
            index
            element={
              <DashboardPage
                products={products}
                onOpenCreate={() => setIsQuickAddOpen(true)}
              />
            }
          />

          <Route
            path="products"
            element={
              <ProductsPage
                products={products}
                onSaveProduct={handleSaveProduct}
                onDeleteProduct={handleDeleteProduct}
                displayMode={displayMode}
                onChangeDisplayMode={handleChangeDisplayMode}
              />
            }
          />

          <Route
            path="products/:id"
            element={
              <ProductDetailPage
                products={products}
                onSaveProduct={handleSaveProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            }
          />

          <Route
            path="settings"
            element={
              <SettingsPage
                displayMode={displayMode}
                onChangeDisplayMode={handleChangeDisplayMode}
                products={products}
                onResetData={handleResetData}
              />
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <ProductModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onSave={(data) => {
          handleSaveProduct(data);
          navigate("/products");
        }}
      />
    </>
  );
}
