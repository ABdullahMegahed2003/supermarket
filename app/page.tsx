import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import "./globals.css";

export const metadata: Metadata = {
  title: "الرئيسية",
  description: "اكتشف أفضل المنتجات الطازجة والألبان والمخبوزات والمشروبات في فريدو مع تسوق سهل وسريع.",
};

export default function Home() {
  return <HomePageClient />;
}
