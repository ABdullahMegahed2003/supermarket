"use client";

import { useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaArrowRight, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { CartContext } from "@/store/idproductsReducer";
import { products } from "@/data/products";

export default function Checkout() {
  const cartContext = useContext(CartContext);
  const router = useRouter();

  const [address, setAddress] = useState("كفر دميرة القديم - الشارع الرئيسي");
  const [phone, setPhone] = useState("01050908515");

  if (!cartContext) {
    return null; // or a loading spinner
  }

  const { state, dispatch } = cartContext;
  const safeDispatch = dispatch ?? (() => undefined);

  const productCar = useMemo(() => {
    return products.filter((p) => state.cart.some((item) => item.id === p.id));
  }, [state.cart]);

  const subtotal = useMemo(() => {
    return state.cart.reduce((total, item) => {
      const product = products.find((p) => p.id === item.id);
      return total + (product?.price || 0) * (item.count || 0);
    }, 0);
  }, [state.cart]);

  const deliveryFee = productCar.length > 0 ? 10 : 0;
  const serviceFee = productCar.length > 0 ? 5 : 0;
  const totalFinalPrice = subtotal + deliveryFee + serviceFee;

  const handleConfirmOrder = () => {
    if (productCar.length === 0) {
      toast.error("سلة التسوق فارغة!");
      return;
    }

    // Add order to orders list
    safeDispatch({
      type: "ADD_ORDER",
      payload: {
        items: state.cart,
        total: totalFinalPrice,
        address,
        phone,
        status: "pending",
        date: new Date().toLocaleDateString("ar-EG"),
      },
    });

    // Clear the cart
    safeDispatch({ type: "CLEAR_CART" });

    // Show success message
    toast.success("تم تأكيد طلبك بنجاح!", {
      description: "سيتم توجيهك إلى ملفك الشخصي لمتابعة الطلب.",
    });

    // Redirect to profile page
    router.push("/profile");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">إتمام الطلب</h1>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <FaArrowRight />
            <span>رجوع للسلة</span>
          </button>
        </div>

        {/* Order Summary */}
        <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">ملخص الطلب</h2>
          {productCar.map((product) => {
            const cartItem = state.cart.find((item) => item.id === product.id);
            return (
              <div key={product.id} className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <p className="font-semibold">{product.title}</p>
                  <p className="text-sm text-slate-500">
                    {cartItem?.count} x {product.price} جنيه
                  </p>
                </div>
                <p className="font-semibold text-emerald-700">{(cartItem?.count || 0) * product.price} جنيه</p>
              </div>
            );
          })}
          <div className="space-y-2 pt-4">
            <div className="flex justify-between text-sm"><span className="text-slate-600">المجموع الفرعي</span><span>{subtotal} جنيه</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-600">رسوم التوصيل</span><span>{deliveryFee} جنيه</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-600">رسوم الخدمة</span><span>{serviceFee} جنيه</span></div>
            <div className="flex justify-between pt-2 text-lg font-bold border-t border-slate-200 mt-2"><span className="text-slate-900">الإجمالي النهائي</span><span className="text-emerald-800">{totalFinalPrice} جنيه</span></div>
          </div>
        </section>

        {/* Delivery Information */}
        <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">بيانات التوصيل</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="address" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FaMapMarkerAlt className="text-slate-400" />
                <span>العنوان</span>
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
                placeholder="أدخل عنوانك بالتفصيل"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FaPhoneAlt className="text-slate-400" />
                <span>رقم الهاتف</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
                placeholder="أدخل رقم هاتفك"
              />
            </div>
          </div>
        </section>

        {/* Confirm Button */}
        <button
          onClick={handleConfirmOrder}
          className="w-full rounded-2xl bg-emerald-700 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-700/30 transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-400"
        >
          تأكيد الطلب
        </button>
      </div>
    </main>
  );
}
