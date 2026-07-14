import type { Metadata } from "next";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import SliderAdmin from "@/components/Admin/SliderAdmin";

export const metadata: Metadata = {
  title: "لوحة الإدارة",
  description: "إدارة المنتجات والطلبات من لوحة تحكم بسيطة وسريعة في فريدو.",
};
export default function AdminPage() {
  return (<>
  <div className="w-full h-screen flex justify-between items-center">
    <div className="w-2/12 h-full">
    <SliderAdmin/>
    </div>
    <div className="w-10/12 h-full"><AdminDashboard /></div>
    
  </div>
  </>);
}
