import type { Metadata } from "next";
import Categories from "@/components/Categories/Categories";
import Nav from "@/components/NavBar/Nav";

export const metadata: Metadata = {
  title: "الأقسام",
  description: "استعرض أقسام فريدو واستكشف منتجاتك المفضلة حسب الفئة.",
};

export default function CategoriesPage() {
  return (
    <>
      <Nav />
      <Categories />
    </>
  );
}
