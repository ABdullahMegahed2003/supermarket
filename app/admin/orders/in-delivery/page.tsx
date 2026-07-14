import type { Metadata } from "next";
import OrdersStatusPage from "@/components/Admin/OrdersStatusPage";

const orders = [
  {
    id: "ORD-3001",
    customer: "نورهان يوسف",
    phone: "01000000004",
    total: 255,
    address: "المنصورة - شارع الجمهورية",
    items: ["شوكولاتة", "مياه"],
    time: "منذ 50 دقيقة",
  },
];

export const metadata: Metadata = {
  title: "الطلبات التي يتم التوصيل بها",
  description: "عرض الطلبات الموجودة في مرحلة التوصيل.",
};

export default function InDeliveryOrdersPage() {
  return (
    <OrdersStatusPage
      title="الطلبات التي يتم التوصيل بها"
      subtitle="الطلبات التي خرجت للتوصيل الآن"
      badgeClass="bg-amber-100 text-amber-700"
      statusLabel="يتم التوصيل"
      orders={orders}
      nextRoute="/admin/orders/delivered"
    />
  );
}
