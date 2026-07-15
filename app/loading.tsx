  import { ShoppingCart } from "lucide-react";
export default function Loading() {
  return (

<div className="flex h-screen items-center justify-center bg-white">
  <div className="relative">
    <div className="h-20 w-20 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>

    <ShoppingCart
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-600"
      size={30}
    />
  </div>
</div>
  );
}