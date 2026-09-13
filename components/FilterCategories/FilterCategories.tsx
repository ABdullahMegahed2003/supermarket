"use client";

import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";
import { CartContext } from "@/store/idproductsReducer";
import { triggerCartFly } from "@/lib/cartFly";

type Props = {
  name: string;
};

export default function FilterCategories({ name }: Props) {
  const decodedName = decodeURIComponent(name);
  const cartContext = useContext(CartContext);
  const router = useRouter();
  const [animatingProductId, setAnimatingProductId] = useState<number | null>(null);

  const product = products.filter((e)=>{
    return e.category == decodedName;
  });

  if (!cartContext) {
    return null;
  }

  const { dispatch } = cartContext;

  const handleAddToCart = (productId: number, productImage: string, sourceElement: HTMLElement | null) => {
    dispatch({ type: "ADD_TO_CART", payload: { id: productId, count: 1 } });
    setAnimatingProductId(productId);
    triggerCartFly(productImage, sourceElement);
    window.setTimeout(() => setAnimatingProductId(null), 700);
    toast.success("تمت إضافة المنتج", {
      description: "يمكنك مراجعة السلة الآن",
      action: {
        label: "السلة",
        onClick: () => {
          router.push("/Cart");
        },
      },
    });
  };

  return (
    <main className="w-11/12 mx-auto my-8">

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      {product.map((pro) => (
            <article
              key={pro.id}
              className={`overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${animatingProductId === pro.id ? "product-fly-to-cart" : ""}`}
            >
              <div className="relative h-40 overflow-hidden bg-slate-100 sm:h-44">
                <Image
                  src={pro.image}
                  alt={pro.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="space-y-2.5 p-4 text-right">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">{pro.title}</h2>
                    <p className="mt-1 text-xs text-slate-500">{pro.category}</p>
                  </div>
                  <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                    {pro.rating} ★
                  </span>
                </div>

                <p className="min-h-[3rem] text-xs leading-5 text-slate-600">
                  {pro.description}
                </p>

                <div className="flex flex-col gap-3 pt-2">
                  <p className="text-lg font-extrabold text-slate-900">{pro.price} جنيه</p>
                  <div className="flex items-center gap-2">
                    <Link 
                      href={`/products/${pro.id}`}
                      className="flex-1 rounded-xl border border-slate-200 py-2.5 text-center text-xs font-bold text-slate-600 transition  hover:bg-emerald-800 hover:text-white"
                    >
                      التفاصيل
                    </Link>
                    <button
                      className="flex-[2] rounded-xl bg-emerald-700 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-800"
                      onClick={(event) => {
                        const source = event.currentTarget.closest("article")?.querySelector("img") as HTMLElement | null;
                        handleAddToCart(pro.id, pro.image, source);
                      }}
                    >
                      أضف إلى السلة
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        </main>
  );
}