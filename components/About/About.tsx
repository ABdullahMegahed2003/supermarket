"use client";

import Image from "next/image";
import { PackageCheck, Smile, Truck } from "lucide-react";
import { El_Messiri, Almarai } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const display = El_Messiri({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-body",
});

export default function About() {
  const features = [
    {
      name: "توصيل سريع وموثوق",
      description: "نضمن وصول طلباتك إلى باب بيتك في أسرع وقت ممكن مع متابعة دقيقة لحالة الطلب.",
      icon: Truck,
    },
    {
      name: "جودة لا تضاهى",
      description: "نختار لك أفضل المنتجات الطازجة والمستوردة لتجربة تسوق عصرية ومميزة كل يوم.",
      icon: PackageCheck,
    },
    {
      name: "تجربة تسوق ممتعة",
      description: "واجهة سهلة، طلب سريع، واستلام مريح؛ لأن راحتك هي أولويتنا في كل خطوة.",
      icon: Smile,
    },
  ];

  const stats = [
    { label: "منتج متنوع", target: 1000, suffix: "+", delay: 0 },
    { label: "خدمة عملاء", target: 24, suffix: "/7", delay: 180 },
    { label: "ضمان الجودة", target: 100, suffix: "%", delay: 360 },
  ];

  const [animatedStats, setAnimatedStats] = useState<number[]>(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let animationFrameId = 0;
    const duration = 2200;
    const startTime = performance.now();
    const maxDelay = Math.max(...stats.map((stat) => stat.delay));

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      setAnimatedStats(
        stats.map((stat) => {
          const localProgress = Math.max(0, Math.min((elapsed - stat.delay) / duration, 1));
          const easedProgress = 1 - (1 - localProgress) ** 3;
          return Math.round(stat.target * easedProgress);
        })
      );

      if (elapsed < duration + maxDelay) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible]);

  const formatStatValue = (stat: (typeof stats)[number], value: number) => {
    if (stat.suffix === "/7") return `${value}/7`;
    return `${value.toLocaleString("en-US")}${stat.suffix}`;
  };

  const reveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${delayClass} ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
    }`;

  return (
    <main
      ref={sectionRef}
      id="About"
      className={`${display.variable} ${body.variable} bg-linear-to-b from-emerald-50 via-green-100 to-lime-50 py-20 sm:py-28`}
      style={{
        // @ts-expect-error CSS custom properties
        "--paper": "#ECF6EA",
        "--pine": "#2C6349",
        "--pine-dark": "#1B4432",
        "--gold": "#C9A24B",
        "--ink": "#20241F",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* العنوان */}
        <div className={`mx-auto max-w-2xl text-center ${reveal("delay-0")}`}>
          <h2
            className="text-4xl font-bold text-(--ink) sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            تعرف على <span className="text-(--pine)">فريدو</span>
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl text-base leading-8 text-(--ink)/70 sm:text-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            سوبر ماركت فريدو يقدم لك كل احتياجاتك اليومية من البقالة والمستلزمات المنزلية مع خدمة سريعة، مريحة، وجودة عالية في كل طلب.
          </p>
        </div>

        {/* الميزات + الصورة */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <ul className={`divide-y divide-(--pine)/10 ${reveal("delay-150")}`}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <li key={feature.name} className="flex items-start gap-4 py-6 first:pt-0 last:pb-0">
                  <span className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-(--pine) text-(--paper)">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3
                      className="text-lg font-bold text-(--ink)"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {feature.name}
                    </h3>
                    <p
                      className="mt-1.5 max-w-md text-[15px] leading-7 text-(--ink)/70"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className={`relative mx-auto max-w-md lg:mx-0 lg:max-w-none ${reveal("delay-300")}`}>
            <div
              className="absolute -top-4 right-6 z-10 -rotate-6 rounded-lg border-2 border-dashed border-(--gold) bg-(--paper) px-3 py-1.5 text-sm font-bold text-(--pine-dark) shadow-sm"
              style={{ fontFamily: "var(--font-display)" }}
            >
              توصيل خلال 24 ساعة
            </div>
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-[1.75rem] border border-(--pine)/15 bg-(--paper) shadow-[0_25px_50px_-20px_rgba(31,77,58,0.35)] sm:aspect-3/4 lg:aspect-4/5">
              <Image
                src="/images/hero-delivery.png"
                alt="توصيل فريدو"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-full w-full object-contain p-4"
                priority
              />
            </div>
          </div>
        </div>

        {/* الإحصائيات - شكل إيصال */}
        <div className={`mt-24 ${reveal("delay-450")}`}>
          <div className="relative mx-auto max-w-md">
            <div className="receipt-card relative overflow-hidden rounded-2xl bg-white px-6 pb-6 pt-8 shadow-[0_25px_60px_-30px_rgba(31,77,58,0.5)] sm:px-8">
              <p
                className="text-center text-sm font-bold text-(--pine)"
                style={{ fontFamily: "var(--font-display)" }}
              >
                فريدو بالأرقام
              </p>

              <div className="mt-6 space-y-4">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="flex items-baseline gap-3">
                    <span
                      className="whitespace-nowrap text-[15px] text-(--ink)/70"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {stat.label}
                    </span>
                    <span className="mb-1 flex-1 border-b border-dotted border-(--ink)/25" />
                    <span
                      className="whitespace-nowrap text-2xl font-extrabold text-(--pine-dark)"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {formatStatValue(stat, animatedStats[index])}
                    </span>
                  </div>
                ))}
              </div>

              <div
                aria-hidden
                className="mt-8 h-6 w-full opacity-50"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, var(--ink) 0px, var(--ink) 2px, transparent 2px, transparent 5px, var(--ink) 5px, var(--ink) 6px, transparent 6px, transparent 11px)",
                }}
              />
            </div>

            <style jsx>{`
              .receipt-card::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 14px;
                background-image: linear-gradient(45deg, var(--paper) 8px, transparent 0),
                  linear-gradient(-45deg, var(--paper) 8px, transparent 0);
                background-position: 0 0, 0 0;
                background-size: 16px 16px;
                background-repeat: repeat-x;
              }
            `}</style>
          </div>
        </div>
      </div>
    </main>
  );
}