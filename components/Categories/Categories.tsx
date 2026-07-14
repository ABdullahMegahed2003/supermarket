"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategoryIcon, getStoredCategories, type CategoryItem } from "@/lib/categories";

export default function Categories() {
    const [categories, setCategories] = useState<CategoryItem[]>([]);

    useEffect(() => {
        setCategories(getStoredCategories());
        const onStorage = () => setCategories(getStoredCategories());
        window.addEventListener("storage", onStorage);
        window.addEventListener("categoriesUpdated", onStorage);
        return () => {
            window.removeEventListener("storage", onStorage);
            window.removeEventListener("categoriesUpdated", onStorage);
        };
    }, []);

    return (
        <section className="mt-12 px-4 sm:px-6 lg:px-8 mb-16" id="Categories">
            <h2 className="mb-10 text-3xl font-extrabold text-center lg:text-right lg:mr-16 xl:mr-20 sm:text-4xl lg:text-5xl">
                أقسام <strong className="text-emerald-700">فريدو</strong>
            </h2>
            
            <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                {categories.map((category) => {
                    const Icon = getCategoryIcon(category.name);
                    
                    return (
                        <Link key={category.id} href={`/categories/${encodeURIComponent(category.name)}`} className="group flex flex-col justify-center items-center gap-4 w-full max-w-[160px] h-48 sm:max-w-[240px] sm:h-60 bg-white shadow-sm border border-slate-100 rounded-[2rem] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-emerald-200 cursor-pointer">
                            {category.image ? (
                                <img src={category.image} alt={category.name} className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover" />
                            ) : (
                                <div className="inline-flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                                    <Icon className="w-12 h-12 sm:w-14 sm:h-14" />
                                </div>
                            )}
                            <span className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-emerald-800 transition-colors text-center">{category.name}</span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}