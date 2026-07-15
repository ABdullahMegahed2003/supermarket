"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import {
  BadgeDollarSign,
  Leaf,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Link from "next/link";

export const heroSlides = [
  {
    id: 1,
    title: "كل احتياجاتك في مكان واحد",
    description: "مواد غذائية، مشروبات، ومنتجات منزلية بأفضل الأسعار.",
    image: "/images/hero-products.png",
  },
  {
    id: 2,
    title: "توصيل سريع 24/7",
    description: "اطلب في أي وقت واستلم طلبك بسرعة أينما كنت.",
    image: "/images/hero-delivery.png",
  },
  {
    id: 3,
    title: "عروض وخصومات يومية",
    description: "استمتع بأفضل التخفيضات على مئات المنتجات يوميًا.",
    image: "/images/hero-offers.png",
  },
];

const featureItems = [
  {
    title: "توصيل سريع",
    description: "خلال 24 ساعة",
    icon: Truck,
  },
  {
    title: "منتجات طازجة",
    description: "جودة مضمونة",
    icon: Leaf,
  },
  {
    title: "أفضل الأسعار",
    description: "عروض يومية",
    icon: BadgeDollarSign,
  },
  {
    title: "دفع آمن",
    description: "طرق دفع متعددة",
    icon: ShieldCheck,
  },
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false); // Re-add for smooth transitions

  const changeSlide = (slideIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSlide(slideIndex);
      setIsTransitioning(false);
    }, 300); // Match transition duration
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      changeSlide((activeSlide + 1) % heroSlides.length);
    }, 6000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [activeSlide]);

  const goToPreviousSlide = () => {
    changeSlide(
      activeSlide === 0 ? heroSlides.length - 1 : activeSlide - 1
    );
  };

  const goToNextSlide = () => {
    changeSlide((activeSlide + 1) % heroSlides.length);
  };

  const activeContent = heroSlides[activeSlide];

  return (
    <main className="flex flex-1 min-h-0 overflow-hidden px-4 pb-4 pt-3 sm:px-6 lg:px-8">
      <section className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-50 via-green-100 to-lime-50 shadow-lg">
        <div className="flex h-full min-h-0 flex-col px-4 py-4 sm:px-6 lg:px-10 lg:py-5">
          <div
            className={`grid flex-1 min-h-0 items-center gap-5 transition-opacity duration-300 ease-out lg:grid-cols-[1.1fr_0.9fr] ${
              isTransitioning ? "opacity-0 scale-[0.985]" : "opacity-100 scale-100"
            }`}
          >
          <div className="w-full max-w-xl text-center flex flex-col justify-center lg:h-full lg:text-right lg:items-start">
              <h1 className="mt-4 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {activeContent.title}
              </h1>

              <h2 className="mt-3 text-lg font-bold text-emerald-800 sm:text-xl">
                فريدو
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">
                {activeContent.description}
              </p>

            <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start w-full gap-3">
              <Link href="/products" className="inline-flex items-center justify-center rounded-md bg-emerald-800 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700">
                تسوق الآن
              </Link>
            </div>
          </div>

            <div className="flex w-full justify-center lg:justify-end">
              <div className="relative h-[10rem] w-full max-w-[22rem] sm:h-[12rem] sm:max-w-[26rem] lg:h-[20rem] lg:max-w-[38rem] xl:h-[23rem] xl:max-w-[42rem]">
                <Image
                  src={activeContent.image}
                  alt={activeContent.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain drop-shadow-2xl"
                  priority={activeSlide === 0}
                  loading={activeSlide === 0 ? "eager" : "lazy"}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 grid shrink-0 grid-cols-2 gap-3 md:grid-cols-4">
            {featureItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 shadow-sm backdrop-blur"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-200 text-green-800">
                    <Icon className="text-lg" />
                  </div>
                  <div className="text-right">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => changeSlide(index)}
                  aria-label={`انتقل إلى السلايد ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeSlide
                      ? "w-8 bg-emerald-800"
                      : "w-2.5 bg-emerald-200 hover:bg-emerald-300"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPreviousSlide}
                aria-label="السلايد السابق"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-200 bg-white/80 text-emerald-900 transition hover:bg-white"
              >
                <FiChevronRight className="text-lg" />
              </button>
              <button
                type="button"
                onClick={goToNextSlide}
                aria-label="السلايد التالي"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-200 bg-white/80 text-emerald-900 transition hover:bg-white"
              >
                <FiChevronLeft className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
