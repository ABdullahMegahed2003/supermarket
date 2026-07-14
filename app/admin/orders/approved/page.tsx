import type { Metadata } from "next";
import OrdersStatusPage from "@/components/Admin/OrdersStatusPage";

const orders = [
  {
    id: "ORD-2001",
    customer: "محمود خالد",
    phone: "01000000003",
    total: 480,
    address: "الاسكندرية - سيدي جابر",
    items: ["لحم", "أرز"],
    time: "منذ 35 دقيقة",
  },
];

export const metadata: Metadata = {
  title: "الطلبات الموافق عليها",
  description: "عرض الطلبات التي تم الموافقة عليها.",
};

export default function ApprovedOrdersPage() {
  return (
    <OrdersStatusPage
      title="الطلبات الموافق عليها"
      subtitle="الطلبات التي تم تأكيدها والبدء في تجهيزها"
      badgeClass="bg-emerald-100 text-emerald-700"
      statusLabel="موافق عليه"
      orders={orders}
      nextRoute="/admin/orders/in-delivery"
    />
  );
}
