import type { Metadata } from "next";
import Checkout from "@/app/profile/Checkout";
import Nav from "@/components/NavBar/Nav";

export const metadata: Metadata = {
  title: "إتمام الطلب",
  description: "مراجعة الطلب وتأكيد بيانات التوصيل.",
};

export default function CheckoutPage() {
  return (
    <div>
      <Nav />
      <Checkout />
    </div>
  );
}
