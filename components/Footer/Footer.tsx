import Link from "next/link";
import { Clock3, MapPin, Phone, ShoppingBag } from "lucide-react";

const quickLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "المنتجات", href: "/products" },
  { label: "الأقسام", href: "/categories" },
  { label: "المفضلة", href: "/favorites" },
  { label: "تواصل معنا", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-green-700/20 bg-green-950 text-green-50">
      <div className="mx-auto flex w-11/12 flex-col gap-8 px-2 py-10 sm:px-4 md:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xl font-bold">
              <ShoppingBag className="h-5 w-5" />
              <span>فريدو</span>
            </div>
            <p className="max-w-md text-sm leading-7 text-green-100/90">
              سوبر ماركت فريدو يقدم لك كل احتياجاتك اليومية من البقالة والمستلزمات المنزلية
              مع خدمة سريعة ومريحة من البيت.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-green-100/90">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 text-sm text-green-100/90">
            <h3 className="text-lg font-semibold">تواصل معنا</h3>
            <div className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" />
              <span>0100 000 0000</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>داخل قرية كفر دميره القديم</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>متاح طوال أيام الأسبوع</span>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800/60 pt-4 text-center text-sm text-green-200/80">
          © 2026 فريدو. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
