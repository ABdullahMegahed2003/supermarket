import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "sonner";
import CartContext from "@/store/idproductsReducer";
import Footer from "@/components/Footer/Footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://supermarket-hazel.vercel.app"),
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
    "سوبر ماركت كفر دميره القديم",
    "سوبر ماركت اونلاين كفر دميره",
    "توصيل بقالة كفر دميره",
    "سوبر ماركت فريدو",
    
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "فريدو | سوبر ماركت إلكتروني",
    description: "تسوق احتياجاتك اليومية من منتجات طازجة وألبان ومشروبات ومخبوزات عبر فريدو.",
    type: "website",
    locale: "ar_EG",
    siteName: "فريدو",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "فريدو | سوبر ماركت إلكتروني",
    description: "أفضل تجربة تسوق إلكتروني للمنتجات اليومية في مصر.",
    images: ["/images/logo.png"],
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
        <Analytics />
        {children}
        <Footer />
        <Toaster
  position="top-center"
  toastOptions={{
    className:
      "rounded-md border shadow-sm text-[10px] px-2.5 py-1.5 max-w-[240px]",
  }}
/>
        <Analytics />

        </CartContext>
      </body>
    </html>
  );
}
