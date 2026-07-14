"use client"

import Image from "next/image";
import { products } from "@/data/products";
import { useContext, useState, useMemo } from "react";
import { CartContext } from "@/store/idproductsReducer";    
import Link from "next/link";
import { Search } from "lucide-react";

export default function ProductsAll(){
 const cartContext = useContext(CartContext);
 const [searchTerm, setSearchTerm] = useState("");
 const [selectedCategory, setSelectedCategory] = useState("الكل");

 // استخراج الأقسام الفريدة من البيانات
 const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return ["الكل", ...uniqueCategories];
 }, []);

 // تصفية المنتجات بناءً على البحث والفلتر
 const filteredProducts = useMemo(() => {
    return products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "الكل" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
 }, [searchTerm, selectedCategory]);

  if(!cartContext){
        return null;
     }

    return(
 <section className="bg-slate-50 py-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[1.75rem] border border-slate-200 bg-white px-6 py-7">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                اكتشف المنتجات
              </p>
              <h1 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                منتجات <span className="text-emerald-700">فريدو</span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* حقل البحث */}
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  placeholder="ابحث عن منتج..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-10 pl-4 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              </div>

              {/* فلتر الأقسام */}
              <select
                className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-40 overflow-hidden bg-slate-100 sm:h-44">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="space-y-2.5 p-4 text-right">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">{product.title}</h2>
                    <p className="mt-1 text-xs text-slate-500">{product.category}</p>
                  </div>
                  <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                    {product.rating} ★
                  </span>
                </div>

                <p className="min-h-[3rem] text-xs leading-5 text-slate-600">
                  {product.description}
                </p>

                <div className="flex flex-col gap-3 pt-2">
                  <p className="text-lg font-extrabold text-slate-900">{product.price} جنيه</p>
                  <div className="flex items-center gap-2">
                    <Link 
                      href={`/products/${product.id}`}
                      className="flex-1 rounded-xl border border-slate-200 py-2.5 text-center text-xs font-bold text-slate-600 transition  hover:bg-emerald-800 hover:text-white"
                    >
                      التفاصيل
                    </Link>
                    {/* <button 
                      className="flex-[2] rounded-xl bg-emerald-700 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-800" 
                      onClick={() => {
                    dispatch({type: "ADD_TO_CART",payload:product.id,});
                      //toast.success("تم إضافة المنتج إلى السلة بنجاح");
                      toast.success("تمت إضافة المنتج", {
                    description: "يمكنك مراجعة السلة الآن",
});
                      
                  }}>
                    أضف إلى السلة
                    
                  </button> */}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">لم يتم العثور على منتجات تطابق بحثك.</p>
            <button onClick={() => {setSearchTerm(""); setSelectedCategory("الكل");}} className="mt-4 text-emerald-700 font-semibold underline">إعادة ضبط الفلاتر</button>
          </div>
        )}
      </div>
    </section>
    );
}