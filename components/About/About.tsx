import Image from "next/image";
import { Truck, PackageCheck, Smile } from "lucide-react";

export default function About() {
  const features = [
    {
      name: "توصيل سريع وموثوق",
      description: "نضمن وصول طلباتك إلى باب بيتك في أسرع وقت وبأفضل حالة.",
      icon: Truck,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "جودة لا تضاهى",
      description: "ننتقي لك أفضل المنتجات الطازجة والمستوردة لضمان رضاك الكامل.",
      icon: PackageCheck,
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "تجربة تسوق ممتعة",
      description: "تجربة سهلة ومريحة من الطلب حتى الاستلام، لأن راحتك تهمنا.",
      icon: Smile,
      color: "from-orange-500 to-pink-500",
    },
  ];

  return (
    <main id="About" className="py-20 sm:py-32 bg-gradient-to-b from-white via-slate-50 to-emerald-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-sm font-semibold leading-6 text-emerald-600 uppercase tracking-widest">
            من نحن
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
            تعرف على <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">فريدو</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-8 text-slate-600 max-w-2xl mx-auto">
            سوبر ماركت فريدو يقدم لك كل احتياجاتك اليومية من البقالة والمستلزمات المنزلية مع خدمة سريعة ومريحة من خلال الطلب من البيت.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Image (now on the left on large screens) */}
          <div className="flex justify-center lg:justify-start lg:order-last">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-2xl blur-3xl"></div>
              <Image
                src="/images/hero2.png"
                alt="فريدو سوبر ماركت"
                className="relative w-full rounded-2xl shadow-2xl ring-1 ring-slate-900/10"
                width={2432}
                height={1442}
              />
            </div>
          </div>

          {/* Features (now on the right on large screens) */}
          <div className="space-y-6 lg:order-first">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.name}
                  className="group relative rounded-xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-all duration-300 hover:border-emerald-200"
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-r ${feature.color}`}></div>
                  
                  <div className="relative flex gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-lg">
                        {feature.name}
                      </h3>
                      <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-20 border-t border-slate-200">
          {[
            { number: "1000+", label: "منتج متنوع" },
            { number: "24/7", label: "خدمة عملاء" },
            { number: "100%", label: "ضمان الجودة" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <p className="mt-2 text-slate-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
