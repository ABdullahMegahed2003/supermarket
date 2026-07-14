"use client";
import { toast } from "sonner";
import { useState, useContext } from "react";
import { products } from "@/data/products";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import useProduct from "@/hooks/useProduct";
import HeartButton from "../HeartButton/HeartButton";
import { CartContext } from "@/store/idproductsReducer";
import { useRouter } from "next/navigation";

type HeartStorageItem = {
  id: string;
  heart: boolean;
};

export default function Favorites() {
  const cartContext = useContext(CartContext);
  const router = useRouter();
  const [id, setId] = useState<number[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const stored = window.localStorage.getItem("heart");
      const parsed = stored ? JSON.parse(stored) : [];

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .filter(
          (item): item is HeartStorageItem =>
            typeof item === "object" && item !== null && typeof item.id === "string" && typeof item.heart === "boolean"
        )
        .filter((item) => item.heart)
        .map((item) => Number(item.id));
    } catch {
      return [];
    }
  });

  const { dispatch } = cartContext ?? { dispatch: undefined };
  const favoriteProducts = products.filter((product) => id.includes(product.id));
  const { QuantityAll, SetQuantityAll } = useProduct();
  const safeDispatch = dispatch ?? (() => undefined);

  if (!cartContext) {
    return null;
  }

  const loadFavorites = () => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem("heart");
      const parsed = stored ? JSON.parse(stored) : [];

      if (!Array.isArray(parsed)) {
        setId([]);
        return;
      }

      const getId = parsed
        .filter(
          (item): item is HeartStorageItem =>
            typeof item === "object" && item !== null && typeof item.id === "string" && typeof item.heart === "boolean"
        )
        .filter((item) => item.heart)
        .map((item) => Number(item.id));
      setId(getId);
    } catch {
      setId([]);
    }
  };

  const totalPrice = favoriteProducts.reduce((sum, product) => {
    const quantity = QuantityAll.find((item) => item.id === product.id)?.Quantity || 1;
    return sum + product.price * quantity;
  }, 0);

  return (
    <main className="w-full min-h-screen bg-slate-50 px-0 py-10">
      <div className="mb-8 grid gap-4 px-4 lg:grid-cols-[auto_1fr_auto] lg:items-center">
        <button
          className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-600 hover:text-green-700"
          onClick={() => router.back()}
        >
          <FaArrowRight /> رجوع
        </button>
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">المفضلة</h1>
          <p className="text-sm text-gray-500">جميع المنتجات في المفضلة بعرض الشاشة</p>
        </div>
        <div className="rounded-3xl border border-green-200 bg-green-50 px-6 py-4 text-right text-sm font-semibold text-green-900 shadow-sm">
          <div>عدد المنتجات: {favoriteProducts.length}</div>
          <div>السعر الكلي: {totalPrice} جنيه</div>
        </div>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-8 py-16 text-center text-gray-600">
          لا يوجد منتجات مفضلة بعد.
        </div>
      ) : (
        <div className="space-y-8">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="flex flex-col gap-6 p-5 md:flex-row md:items-center md:p-6">
                <div className="relative md:w-1/2">
                  <div className="absolute left-4 top-4 z-10 rounded-full bg-white/95 p-2 shadow-sm">
                    <HeartButton id={product.id} onToggle={loadFavorites} />
                  </div>
                  <Image
                    className="h-[320px] w-full rounded-[26px] object-cover"
                    src={product.image}
                    alt={product.title}
                    width={600}
                    height={600}
                  />
                </div>

                <div className="space-y-5 md:w-1/2">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
                      {product.title}
                    </h2>
                    <p className="text-sm leading-7 text-gray-600 md:text-base">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xl font-bold text-green-800 md:text-2xl">
                      {product.price} جنيه
                    </span>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <button
                        className="rounded-full bg-green-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 md:px-7 md:text-base"
                        onClick={() => {
                          safeDispatch({
                            type: "ADD_TO_CART",
                            payload: {
                              id: product.id,
                              count:
                                QuantityAll.find((item) => item.id === product.id)?.Quantity || 1,
                            },
                          });

                          SetQuantityAll((prev) => {
                            const exists = prev.find((item) => item.id === product.id);
                            if (exists) {
                              return prev.map((item) =>
                                item.id === product.id
                                  ? { ...item, Quantity: 1 }
                                  : item
                              );
                            }
                            return prev;
                          });

                          toast.success("تم إضافة المنتج إلى السلة بنجاح", {
                            description: "يمكنك مراجعة السلة الآن",
                          });
                        }}
                      >
                        اضف الي السلة
                      </button>

                      <div className="flex items-center gap-3 rounded-full bg-green-100 px-4 py-2 text-green-900">
                        <button
                          className="rounded-full bg-white px-3 py-1 transition hover:bg-green-200"
                          onClick={() => {
                            SetQuantityAll((prev) => {
                              const exists = prev.find((item) => item.id === product.id);
                              if (exists) {
                                return prev.map((item) =>
                                  item.id === product.id
                                    ? { ...item, Quantity: item.Quantity + 1 }
                                    : item
                                );
                              }
                              return [...prev, { id: product.id, Quantity: 2 }];
                            });
                          }}
                        >
                          +
                        </button>
                        <span className="min-w-[30px] text-center text-base font-semibold">
                          {QuantityAll.find((item) => item.id === product.id)?.Quantity || 1}
                        </span>
                        <button
                          className="rounded-full bg-white px-3 py-1 transition hover:bg-green-200"
                          onClick={() => {
                            SetQuantityAll((prev) =>
                              prev.map((item) =>
                                item.id === product.id
                                  ? { ...item, Quantity: Math.max(item.Quantity - 1, 1) }
                                  : item
                              )
                            );
                          }}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
