"use client";

import { useMemo } from "react";
import { products as initialProducts } from "@/data/products";
import Link from "next/link";

export default function AdminDashboard() {
  const totalProducts = initialProducts.length;
  const totalStock = useMemo(() => initialProducts.reduce((sum, item) => sum + item.stock, 0), []);
  const totalRevenue = useMemo(() => initialProducts.reduce((sum, item) => sum + item.price * item.stock, 0), []);


  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-right">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700">لوحة التحكم</p>
            <h1 className="text-3xl font-bold text-slate-900">إدارة المتجر</h1>
          </div>
          <div className="flex flex-wrap gap-3">
         
            <Link href="/" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              العودة للمتجر
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">إجمالي المنتجات</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{totalProducts}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">إجمالي الطلبات</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{totalProducts}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">إجمالي الكمية</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{totalStock}</p>
          </div>
         
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">إجمالي القيمة</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{totalRevenue} جنيه</p>
          </div>
           <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">اراد اليوم</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{totalRevenue} جنيه</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">إراد التوصيل</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{totalRevenue} جنيه</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">إراد المواقع</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{totalRevenue} جنيه</p>
          </div>
        </div>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">إدارة المحتوى والطلبات</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            يمكنك إدارة المنتجات والأقسام والانتقال السريع إلى حالات الطلبات المختلفة.
          </p>

         
        </section>
      </div>
    </main>
  );
}
