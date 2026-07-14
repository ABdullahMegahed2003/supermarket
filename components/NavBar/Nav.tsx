"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHeart,
  FiMenu,
  FiPackage,
  FiPhone,
  FiShoppingCart,
  FiTag,
  FiUser,
  FiX,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const getNavLinks = (isHomePage: boolean) => {
  const baseLinks = [
    { label: "الرئيسية", icon: FiPackage, link: "/" },
  ];

  if (isHomePage) {
    baseLinks.push(
      { label: "الأقسام", icon: FiPackage, link: "#Categories" },
      { label: "المنتجات", icon: FiPackage, link: "/products" },
      { label: "تواصل معنا", icon: FiPhone, link: "#Contact" }
    );
  } else {
    baseLinks.push({ label: "المنتجات", icon: FiPackage, link: "/products" });
  }

  return baseLinks;
};

import { CartContext } from "@/store/idproductsReducer";

export default function Nav() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const mobileLinks = getNavLinks(isHomePage);
  
  const [isOpen, setIsOpen] = useState(false);
  const [heart, setHeart] = useState<boolean>(false);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    const updateHeart = () => {
      const stored = localStorage.getItem("heart");
      const x = JSON.parse(stored || "[]");
      setHeart(x.some((item: { heart?: boolean }) => item.heart));
    };

    updateHeart();

    window.addEventListener("heartUpdated", updateHeart);

    return () => {
      window.removeEventListener("heartUpdated", updateHeart);
    };
  }, []);

  if (!cartContext) {
    return null;
  }

  return (
    <nav className="bg-white shadow-md py-3 md:py-4">
      <div className="w-11/12 mx-auto flex items-center justify-between gap-3 ">
        {/* جهة اليمين: اللوجو */}
        <div className="flex-shrink-0 order-2">
          <Link href="/">
         <Image 
            src="/images/logo.png"
            alt="Logo"
            width={80}
            height={40}
            className="w-16 h-auto md:w-20"
            />
            </Link>
        </div>

        <ul className="hidden md:flex items-center gap-2 lg:gap-4 order-3 flex-1 justify-center">
          {mobileLinks.map((item) => {
            const Icon = item.icon;

            return (
                <Link key={item.label}  href={item.link}>
              <li >
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full px-3 lg:px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 hover:text-green-800"
                  >
                  <Icon className="text-base" />
                  <span>{item.label}</span>
                </button>
              </li>
                  </Link>
            );
          })}
        </ul>

        {/* جهة اليسار: الأيقونات */}
        <div className="flex items-center gap-3 md:gap-4 order-3 md:mr-auto ">
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-md transition"

            aria-label="السلة"
          >
           <Link href="/Cart">
           
            <FiShoppingCart className="text-lg md:text-xl" />
           </Link>
          </button>
          {heart ? 
          <Link href="/favorites">
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-md transition"
                aria-label="المفضلة"
              >
                <FaHeart className="text-lg md:text-xl text-red-600" />
              </button>
              </Link>
              :

<Link href="/favorites">
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-md transition"
            aria-label="المفضلة"
            >
            <FiHeart className="text-lg md:text-xl" />
          </button>
            </Link>
            }
<Link href="/Auth">
          <div className="hidden sm:flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition cursor-pointer">
            <FiUser />
            <h1 className="text-sm">تسجيل أو إنشاء حساب</h1>
          </div>
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-md transition"
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden border-t border-gray-200 transition-[max-height,opacity] duration-300 ${
          isOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="w-11/12 mx-auto py-4">
          <ul className="grid grid-cols-2 gap-3">
            {mobileLinks.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center gap-3 py-3 px-3 hover:bg-gray-100 rounded-xl cursor-pointer border border-gray-100"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50">
                      <Icon className="text-lg text-green-800" />
                    </span>
                    <span className="text-sm text-right">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
