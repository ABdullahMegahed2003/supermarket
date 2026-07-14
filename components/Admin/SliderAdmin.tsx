import Link from "next/link";

  const actions = [
    {
      href: "/admin/create",
      title: "إضافة قسم ومنتج",
      className: "bg-emerald-700 text-white",
    },
    {
      href: "/admin/products",
      title: "إدارة المنتجات",
    
      className: "bg-white text-slate-800",
    },
    {
      href: "/admin/orders/new",
      title: "الطلبات الجديدة",
    
      className: "bg-blue-50 text-blue-700",
    },
    {
      href: "/admin/orders/approved",
      title: "الموافق عليها",
     
      className: "bg-emerald-50 text-emerald-700",
    },
    {
      href: "/admin/orders/in-delivery",
      title: "قيد التوصيل",
   
      className: "bg-amber-50 text-amber-700",
    },
    {
      href: "/admin/orders/delivered",
      title: "تم التوصيل",
   
      className: "bg-violet-50 text-violet-700",
    },
  ];
export default function SliderAdmin(){
    return(
         <div className="mt-6 grid gap-4 ">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`group rounded-2xl border border-slate-200 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md ${action.className}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{action.title}</h3>
              
                  </div>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">فتح</span>
                </div>
              </Link>
            ))}
          </div>
    );
}