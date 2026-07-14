import Link from "next/link";

type Order = {
  id: string;
  customer: string;
  phone: string;
  total: number;
  address: string;
  items: string[];
  time: string;
};

type OrdersStatusPageProps = {
  title: string;
  subtitle: string;
  badgeClass: string;
  statusLabel: string;
  orders: Order[];
  nextRoute?: string;
  isFinal?: boolean;
};

export default function OrdersStatusPage({
  title,
  subtitle,
  badgeClass,
  statusLabel,
  orders,
  nextRoute,
  isFinal = false,
}: OrdersStatusPageProps) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-right">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700">إدارة الطلبات</p>
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
            <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
              لوحة الإدارة
            </Link>
            <Link href="/admin/create" className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">
              إضافة قسم ومنتج
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">الحالة الحالية</p>
            <p className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${badgeClass}`}>{statusLabel}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">عدد الطلبات</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{orders.length}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">إجمالي القيمة</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {orders.reduce((sum, order) => sum + order.total, 0)} جنيه
            </p>
          </div>
        </div>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/orders/new" className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700">
              جديد
            </Link>
            <Link href="/admin/orders/approved" className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700">
              موافق عليه
            </Link>
            <Link href="/admin/orders/in-delivery" className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700">
              يتم التوصيل
            </Link>
            <Link href="/admin/orders/delivered" className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700">
              تم التوصيل
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {orders.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                لا توجد طلبات حالياً في هذه الحالة.
              </div>
            ) : (
              orders.map((order) => (
                <article key={order.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{order.id}</p>
                      <p className="mt-1 text-sm text-slate-600">العميل: {order.customer}</p>
                      <p className="text-sm text-slate-600">الهاتف: {order.phone}</p>
                    </div>
                    <div className="text-sm text-slate-600">
                      <p>المجموع: <span className="font-semibold text-emerald-700">{order.total} جنيه</span></p>
                      <p>العنوان: {order.address}</p>
                      <p>الوقت: {order.time}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {order.items.map((item) => (
                      <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {title === "الطلبات الجديدة" ? (
                      <>
                        <button className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700">
                          قبول
                        </button>
                        <button className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600">
                          رفض
                        </button>
                      </>
                    ) : !isFinal && nextRoute ? (
                      <Link href={nextRoute} className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">
                        {title === "الطلبات الموافق عليها" ? "إرسال إلى يتم التوصيل" : title === "الطلبات التي يتم التوصيل بها" ? "إرسال إلى تم التوصيل" : "التالي"}
                      </Link>
                    ) : null}
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
