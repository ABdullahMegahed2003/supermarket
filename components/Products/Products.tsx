"use client"
import { toast } from "sonner";
import Image from "next/image";
import { products } from "@/data/products";
import { useContext } from "react";
import { CartContext } from "@/store/idproductsReducer";
import Link from "next/link";

export default function Products() {
 
 const cartContext = useContext(CartContext);
  if(!cartContext){
        return null;
     }
 const { dispatch }  = cartContext;



  return (
    <section className="bg-slate-50 py-12 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[1.75rem] border border-slate-200 bg-white px-6 py-7">
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
              اكتشف المنتجات
            </p>
            <h1 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              منتجات <span className="text-emerald-700">فريدو</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
              تشكيلة منتقاة من المنتجات الطازجة والمستوردة لتجربة تسوق سريعة وممتعة.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.slice(0, 12).map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-40 overflow-hidden bg-slate-100 sm:h-44">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="space-y-2.5 p-4 text-right">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">{product.title}</h2>
                    <p className="mt-1 text-xs text-slate-500">{product.category}</p>
                  </div>
                  <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                    {product.rating} ★
                  </span>
                </div>

                <p className="min-h-[3rem] text-xs leading-5 text-slate-600">
                  {product.description}
                </p>

                <div className="flex flex-col gap-3 pt-2">
                  <p className="text-lg font-extrabold text-slate-900">{product.price} جنيه</p>
                  <div className="flex items-center gap-2">
                    <Link 
                      href={`/products/${product.id}`}
                      className="flex-1 rounded-xl border border-slate-200 py-2.5 text-center text-xs font-bold text-slate-600 transition hover:bg-emerald-800 hover:text-white"
                    >
                      التفاصيل
                    </Link>
                    {/* <button 
                      className="flex-[2] rounded-xl bg-emerald-700 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-800" 
                      onClick={() => {
                    dispatch({type: "ADD_TO_CART",payload:product.id,});
                    
                      //toast.success("تم إضافة المنتج إلى السلة بنجاح");
                      toast.success("تمت إضافة المنتج", {
                    description: "يمكنك مراجعة السلة الآن",
});
                      
                  }}>
                    أضف إلى السلة
                    
                  </button> */}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="flex justify-center  mt-8">
      <Link href="/products">
        <button className="rounded-md bg-emerald-800 px-6 py-2.5 text-sm font-semibold text-white transition">المزيد من المنتجات</button>
      </Link>
      </div>
    </section>
  );
}
