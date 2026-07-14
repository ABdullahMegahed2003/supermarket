"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { products as initialProducts } from "@/data/products";
import Image from "next/image";

type ProductItem = {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  rating: number;
  isActive: boolean;
};

const STORAGE_KEY = "admin-product-management";

const defaultProducts: ProductItem[] = initialProducts.map((product) => ({
  ...product,
  isActive: true,
}));

const emptyForm = {
  title: "",
  category: "",
  price: 0,
  stock: 0,
  description: "",
  image: "",
  rating: 0,
  isActive: true,
};

export default function ProductManagementPage() {
  const [products, setProducts] = useState<ProductItem[]>(defaultProducts);
  const [form, setForm] = useState(emptyForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setProducts(parsed as ProductItem[]);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const totalStock = useMemo(() => products.reduce((sum, item) => sum + item.stock, 0), [products]);
  const totalValue = useMemo(() => products.reduce((sum, item) => sum + item.price * item.stock, 0), [products]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
    return ["all", ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !searchTerm ||
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = filterCategory === "all" || product.category === filterCategory;

      const matchesStatus =
        filterStatus === "all" || (filterStatus === "active" ? product.isActive : !product.isActive);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchTerm, filterCategory, filterStatus]);

  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  };

  const openEditForm = (product: ProductItem) => {
    setEditingId(product.id);
    setForm({
      title: product.title,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description,
      image: product.image,
      rating: product.rating,
      isActive: product.isActive,
    });
    setIsFormOpen(true);
  };

  const saveProduct = () => {
    if (!form.title.trim()) return;

    if (editingId) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingId
            ? {
                ...product,
                title: form.title.trim(),
                category: form.category.trim(),
                price: Number(form.price),
                stock: Number(form.stock),
                description: form.description.trim(),
                image: form.image.trim(),
                rating: Number(form.rating),
                isActive: form.isActive,
              }
            : product
        )
      );
    } else {
      const newProduct: ProductItem = {
        id: Date.now(),
        title: form.title.trim(),
        category: form.category.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        description: form.description.trim(),
        image: form.image.trim(),
        rating: Number(form.rating),
        isActive: form.isActive,
      };

      setProducts((prev) => [newProduct, ...prev]);
    }

    setForm(emptyForm);
    setEditingId(null);
    setIsFormOpen(false);
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const cancelForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setIsFormOpen(false);
  };

  const toggleProductStatus = (id: number) => {
    setProducts((prev) => prev.map((product) => (product.id === id ? { ...product, isActive: !product.isActive } : product)));
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-right">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700">إدارة المنتجات</p>
            <h1 className="text-3xl font-bold text-slate-900">المنتجات والحالات</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
              لوحة الإدارة
            </Link>
            <Link href="/admin/create" className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">
              صفحة الإضافة
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">عدد المنتجات</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{products.length}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">إجمالي الكمية</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{totalStock}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">إجمالي القيمة</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{totalValue} جنيه</p>
          </div>
        </div>


        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-bold text-slate-900">قائمة المنتجات ({filteredProducts.length})</h2>
          
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            >
              <option value="all">كل الأقسام</option>
              {categories.filter(c => c !== 'all').map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            >
              <option value="all">كل الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">متوقف</option>
            </select>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                
                              <div className="relative h-40 overflow-hidden bg-slate-100 sm:h-44">
                                <Image
                                  src={product.image}
                                  alt={product.title}
                                  fill
                                  sizes="(max-width: 1024px) 100vw, 33vw"
                                  className="object-cover"
                                />
                              </div>
                
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">{product.title}</h3>
                    <p className="text-sm text-slate-500">{product.category}</p>
                    <p className="mt-2 text-sm text-emerald-700">{product.price} جنيه • الكمية: {product.stock}</p>
                  </div>
                  <div className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${product.isActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                    {product.isActive ? "نشط" : "متوقف"}
                  </div>
                </div>

                <div className="mt-4 flex justify-around  flex-wrap gap-2 mb-6">
                  <button onClick={() => openEditForm(product)} className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">
                    تعديل
                  </button>
                  <button onClick={() => toggleProductStatus(product.id)} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                    {product.isActive ? "إيقاف المنتج" : "تشغيل المنتج"}
                  </button>
                  <button onClick={() => deleteProduct(product.id)} className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">
                    حذف
                  </button>
                </div>
              </article>
            ))}
            {filteredProducts.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                لا توجد منتجات تطابق معايير البحث.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
