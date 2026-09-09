"use client";

import Image from "next/image";
import { PackageCheck, Smile, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function About() {
  const features = [
    {
      name: "توصيل سريع وموثوق",
      description: "نضمن وصول طلباتك إلى باب بيتك في أسرع وقت ممكن مع متابعة دقيقة لحالة الطلب.",
      icon: Truck,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "جودة لا تضاهى",
      description: "نختار لك أفضل المنتجات الطازجة والمستوردة لتجربة تسوق عصرية ومميزة كل يوم.",
      icon: PackageCheck,
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "تجربة تسوق ممتعة",
      description: "واجهة سهلة، طلب سريع، واستلام مريح؛ لأن راحتك هي أولويتنا في كل خطوة.",
      icon: Smile,
      color: "from-orange-500 to-pink-500",
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

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

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
    if (stat.suffix === "/7") {
      return `${value}/7`;
    }

    return `${value.toLocaleString("en-US")}${stat.suffix}`;
  };

  return (
    <main ref={sectionRef} id="About" className="bg-gradient-to-b from-white via-emerald-50 to-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-sm font-bold tracking-[0.25em] text-emerald-600">من نحن</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            تعرف على <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">فريدو</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            سوبر ماركت فريدو يقدم لك كل احتياجاتك اليومية من البقالة والمستلزمات المنزلية مع خدمة سريعة، مريحة، وجودة عالية في كل طلب.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.name}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.07]`} />
                  <div className="relative flex items-start gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg shadow-emerald-200`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900">{feature.name}</h3>
                      <p className="mt-2 text-base leading-7 text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-xl shadow-emerald-100">
            <div className="relative h-[520px] w-full overflow-hidden sm:h-[620px]">
              <Image
                src="/images/hero-delivery.png"
                alt="توصيل فريدو"
                fill
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-slate-200 pt-16">
          <div className="grid gap-8 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="animate-[popIn_0.7s_ease-out_forwards] text-4xl font-black text-emerald-700 sm:text-5xl">
                  {formatStatValue(stat, animatedStats[index])}
                </div>
                <p className="mt-3 text-lg font-semibold text-slate-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
