"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { products as initialProducts } from "@/data/products";
import { defaultCategories, getStoredCategories, saveCategories, type CategoryItem } from "@/lib/categories";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  rating: number;
};

const emptyProductForm: Omit<Product, "id"> = {
  title: "",
  category: "",
  price: 0,
  stock: 0,
  description: "",
  image: "",
  rating: 0,
};

export default function AdminCreatePage() {
  const [items, setItems] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<CategoryItem[]>(getStoredCategories());
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [productForm, setProductForm] = useState<Omit<Product, "id">>(emptyProductForm);
  const [productImage, setProductImage] = useState("");
  const [message, setMessage] = useState("");

  const totalProducts = items.length;
  const totalStock = useMemo(() => items.reduce((sum, item) => sum + item.stock, 0), [items]);

  const handleFileToBase64 = (
    event: ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      setter("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setter(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const addCategory = () => {
    const trimmed = categoryName.trim();
    if (!trimmed) return;

    const nextCategories = [
      ...categories,
      { id: Date.now(), name: trimmed, image: categoryImage.trim() || undefined },
    ];

    setCategories(nextCategories);
    saveCategories(nextCategories);
    window.dispatchEvent(new Event("categoriesUpdated"));
    setCategoryName("");
    setCategoryImage("");
    setMessage("تمت إضافة القسم بنجاح");
  };

  const addProduct = () => {
    if (!productForm.title.trim()) return;

    const newProduct: Product = {
      id: Date.now(),
      ...productForm,
      image: productImage || productForm.image,
      price: Number(productForm.price),
      stock: Number(productForm.stock),
      rating: Number(productForm.rating),
    };

    setItems((prev) => [newProduct, ...prev]);
    setProductForm(emptyProductForm);
    setProductImage("");
    setMessage("تمت إضافة المنتج بنجاح");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-right">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700">إدارة المحتوى</p>
            <h1 className="text-3xl font-bold text-slate-900">إضافة قسم جديد و منتج جديد</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
              العودة للوحة الإدارة
            </Link>
            <Link href="/" className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">
              العودة للمتجر
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">إجمالي المنتجات</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{totalProducts}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">إجمالي الكمية</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{totalStock}</p>
          </div>
        </div>

        {message ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            {message}
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-2">
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">إضافة قسم جديد</h2>
            <div className="mt-4 space-y-3">
              <input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="اسم القسم"
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleFileToBase64(event, setCategoryImage)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 file:mr-3 file:rounded-full file:border-0 file:bg-emerald-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-emerald-700"
              />
              {categoryImage ? (
                <img src={categoryImage} alt="معاينة القسم" className="h-32 w-full rounded-2xl object-cover" />
              ) : null}
              <button onClick={addCategory} className="w-full rounded-xl bg-emerald-700 px-4 py-2 font-semibold text-white">
                إضافة القسم
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
              <p className="font-semibold">الأقسام الحالية</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span key={category.id} className="rounded-full bg-white px-3 py-1 text-sm shadow-sm">
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">إضافة منتج جديد</h2>
            <div className="mt-4 space-y-3">
              <input
                value={productForm.title}
                onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                placeholder="اسم المنتج"
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <select
                value={productForm.category}
                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              >
                <option value="">اختر القسم</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                placeholder="السعر"
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <input
                type="number"
                value={productForm.stock}
                onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                placeholder="الكمية"
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleFileToBase64(event, setProductImage)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 file:mr-3 file:rounded-full file:border-0 file:bg-emerald-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-emerald-700"
              />
              {productImage ? (
                <img src={productImage} alt="معاينة المنتج" className="h-32 w-full rounded-2xl object-cover" />
              ) : null}
              <input
                type="number"
                step="0.1"
                value={productForm.rating}
                onChange={(e) => setProductForm({ ...productForm, rating: Number(e.target.value) })}
                placeholder="التقييم"
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <textarea
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                placeholder="وصف المنتج"
                rows={4}
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <button onClick={addProduct} className="w-full rounded-xl bg-emerald-700 px-4 py-2 font-semibold text-white">
                إضافة المنتج
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
