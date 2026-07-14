import type { Metadata } from "next";
import OrdersStatusPage from "@/components/Admin/OrdersStatusPage";

const orders = [
  {
    id: "ORD-4001",
    customer: "إياد سمير",
    phone: "01000000005",
    total: 610,
    address: "طنطا - المركز",
    items: ["دجاج", "خبز", "مكرونة"],
    time: "منذ 1 ساعة",
  },
];

export const metadata: Metadata = {
  title: "الطلبات التي تم توصيلها",
  description: "عرض الطلبات التي تم تسليمها بنجاح.",
};

export default function DeliveredOrdersPage() {
  return (
    <OrdersStatusPage
      title="الطلبات التي تم توصيلها"
      subtitle="الطلبات التي اكتملت بنجاح وتم تسليمها للعميل"
      badgeClass="bg-violet-100 text-violet-700"
      statusLabel="تم التوصيل"
      orders={orders}
      isFinal
    />
  );
}
