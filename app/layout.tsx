import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import CartContext from "@/store/idproductsReducer";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: {
    default: "فريدو | سوبر ماركت إلكتروني للأطعمة والمنتجات اليومية",
    template: "%s | فريدو",
  },
  description:
    "فريدو هو سوبر ماركت إلكتروني يقدم أفضل المنتجات الطازجة والألبان والمخبوزات والمشروبات مع تجربة تسوق سهلة وسريعة.",
  keywords: [
    "سوبر ماركت",
    "تسوق إلكتروني",
    "فريدو",
    "منتجات طازجة",
    "ألبان",
    "مخبوزات",
    "مشروبات",
  ],
  alternates: {
    canonical: "https://fredo-store.com",
  },
  openGraph: {
    title: "فريدو | سوبر ماركت إلكتروني",
    description: "تسوق احتياجاتك اليومية من منتجات طازجة وألبان ومشروبات ومخبوزات عبر فريدو.",
    type: "website",
    locale: "ar_EG",
    siteName: "فريدو",
  },
  twitter: {
    card: "summary_large_image",
    title: "فريدو | سوبر ماركت إلكتروني",
    description: "أفضل تجربة تسوق إلكتروني للمنتجات اليومية في مصر.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 transition-colors">
        <CartContext>

        {children}
        <Footer />
        <Toaster
  position="top-center"
  toastOptions={{
    className:
      "rounded-xl border shadow-lg text-base",
  }}
/>

        </CartContext>
      </body>
    </html>
  );
}
