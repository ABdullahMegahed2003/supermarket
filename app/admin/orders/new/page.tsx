import type { Metadata } from "next";
import OrdersStatusPage from "@/components/Admin/OrdersStatusPage";

const orders = [
  {
    id: "ORD-1001",
    customer: "أحمد علي",
    phone: "01000000001",
    total: 320,
    address: "القاهرة - المعادي",
    items: ["خبز", "حليب"],
    time: "منذ 10 دقائق",
  },
  {
    id: "ORD-1002",
    customer: "سارة محمد",
    phone: "01000000002",
    total: 185,
    address: "الجيزة - الدقي",
    items: ["مياه", "جبنة"],
    time: "منذ 25 دقيقة",
  },
];

export const metadata: Metadata = {
  title: "الطلبات الجديدة",
  description: "عرض الطلبات الجديدة في لوحة الإدارة.",
};

export default function NewOrdersPage() {
  return (
    <OrdersStatusPage
      title="الطلبات الجديدة"
      subtitle="هذه الطلبات vừa وصلت إلى النظام وتحتاج إلى متابعة"
      badgeClass="bg-blue-100 text-blue-700"
      statusLabel="جديد"
      orders={orders}
      nextRoute="/admin/orders/approved"
    />
  );
}
