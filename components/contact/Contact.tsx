import Link from "next/link";
import Nav from "@/components/NavBar/Nav";
import { Clock3, MapPin, MessageCircle, Phone, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50" id="Contact">
      
      <main className="mx-auto flex w-full flex-col gap-8 px-2 py-10 sm:px-4 md:w-11/12 md:px-6 lg:max-w-7xl lg:px-8">
        <section className="grid gap-8 md:rounded-[2rem] md:bg-white md:p-6 md:shadow-[0_20px_60px_-20px_rgba(22,101,52,0.2)] md:grid-cols-[0.95fr_1.05fr] md:p-8 lg:p-10">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              <MessageCircle className="h-4 w-4" />
              <span>تواصل معنا</span>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                نحن هنا لمساعدتك
              </h1>
              <p className="text-base leading-8 text-gray-700">
                إذا كان لديك أي سؤال أو تريد طلب خدمة أو معرفة المزيد عن منتجاتنا،
                يمكنك التواصل معنا بسهولة وسنرد عليك في أسرع وقت.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-green-100 bg-green-50 p-4">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-green-700" />
                <div>
                  <p className="font-semibold text-gray-900">الهاتف</p>
                  <p className="text-sm text-gray-700">0100 000 0000</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-green-700" />
                <div>
                  <p className="font-semibold text-gray-900">العنوان</p>
                  <p className="text-sm text-gray-700">داخل قرية كفر دميره القديم</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-5 w-5 text-green-700" />
                <div>
                  <p className="font-semibold text-gray-900">أوقات العمل</p>
                  <p className="text-sm text-gray-700">متاح طوال أيام الأسبوع</p>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-4 md:rounded-2xl md:border md:border-gray-200 md:bg-gray-50 md:p-4 sm:p-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">الاسم</label>
              <input
                type="text"
                placeholder="اكتب اسمك"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-green-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">البريد الإلكتروني</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-green-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">الرسالة</label>
              <textarea
                rows={5}
                placeholder="اكتب رسالتك هنا..."
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-green-500"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
            >
              <Send className="h-4 w-4" />
              <span>إرسال الرسالة</span>
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
