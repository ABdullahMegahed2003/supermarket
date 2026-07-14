import Image from "next/image";
import { Home, MapPin, ShoppingBag } from "lucide-react";

export default function About() {
  return (
    <main className="mx-auto flex min-h-screen w-10/12 items-center justify-center px-2 py-10 sm:px-4 md:px-6 lg:px-8">
      <section className="grid w-full gap-8 rounded-[2rem] border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-100 p-6 shadow-[0_20px_60px_-20px_rgba(22,101,52,0.35)] md:grid-cols-[1.05fr_0.95fr] md:p-8 lg:p-10">
        <div className="flex flex-col justify-center gap-5">
          <div className="flex items-center gap-2 self-start rounded-full bg-green-600/10 px-3 py-1 text-sm font-semibold text-green-700">
            <ShoppingBag className="h-4 w-4" />
            <span>خدمات البيت والبقالة</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              تعرف على <span className="text-green-700">فريدو</span>
            </h1>
            <p className="text-base leading-8 text-gray-700 sm:text-lg">
              سوبر ماركت فريدو يقدم لك كل احتياجاتك اليومية من البقالة
              والمستلزمات المنزلية مع خدمة سريعة ومريحة من خلال الطلب من البيت.
            </p>
          </div>

          <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-green-100">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-green-100 p-2 text-green-700">
                <Home className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">اطلب من غير ما تنزل من البيت</p>
                <p className="mt-1 text-sm text-gray-600">
                  بنوفر لك تجربة تسوق سهلة ومريحة، من المأكولات إلى احتياجات البيت.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-green-700 p-4 text-white shadow-lg">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">العنوان</p>
              <p className="mt-1 text-sm text-green-50">داخل قرية كفر دميره القديم</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-md overflow-hidden rounded-[1.5rem] bg-white/70 p-3 shadow-inner">
            <Image
              src="/images/hero2.png"
              alt="فريدو سوبر ماركت"
              width={600}
              height={600}
              className="h-auto w-full rounded-[1.2rem] object-cover"
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
}