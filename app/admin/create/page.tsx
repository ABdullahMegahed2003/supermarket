import type { Metadata } from "next";
import AdminCreatePage from "@/components/Admin/AdminCreatePage";

export const metadata: Metadata = {
  title: "إضافة قسم ومنتج",
  description: "صفحة مستقلة لإضافة قسم جديد ومنتج جديد مع رفع الصور.",
};

export default function CreatePage() {
  return <AdminCreatePage />;
}
