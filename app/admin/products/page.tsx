import type { Metadata } from "next";
import ProductManagementPage from "@/components/Admin/ProductManagementPage";

export const metadata: Metadata = {
  title: "إدارة المنتجات",
  description: "صفحة لإدارة المنتجات وتغيير حالتها وتعديلها أو حذفها.",
};

export default function ProductsPage() {
  return <ProductManagementPage />;
}
