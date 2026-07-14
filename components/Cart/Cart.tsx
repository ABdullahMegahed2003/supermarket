"use client"
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useContext, useMemo } from "react";
import Link from "next/link";
import { CartContext } from "@/store/idproductsReducer";
import { products } from "@/data/products";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Cart() {
  const cartContext = useContext(CartContext);
  const state = cartContext?.state ?? { cart: [] };
  const dispatch = cartContext?.dispatch;
  const router = useRouter();
  const safeDispatch = dispatch ?? (() => undefined);

  // تصفية المنتجات الموجودة في السلة بشكل فعال
  const productCar = useMemo(() => {
    return products.filter((p) => state.cart.some((item) => item.id === p.id));
  }, [state.cart]);

     // حساب المجموع الفرعي
    const subtotal = useMemo(() => {
        return state.cart.reduce((total, item) => {
            const product = products.find((p) => p.id === item.id);
            return total + (product?.price || 0) * (item.count || 0);
        }, 0);
    }, [state.cart]);

    const deliveryFee = useMemo(() => {
        return productCar.length > 0 ? 10 : 0;
    }, [productCar.length]);

    const serviceFee = useMemo(() => {
        return productCar.length > 0 ? 5 : 0;
    }, [productCar.length]);

  const totalFinalPrice = useMemo(() => {
    return subtotal + deliveryFee + serviceFee;
  }, [subtotal, deliveryFee, serviceFee]);

  if (!cartContext) {
    return null;
  }

  return (
    <div className="mb-10">
              <div className="mt-6 mr-4" onClick={()=> router.back()}>
                    <FaArrowRight/>
                    </div>
        <div className="text-center mt-8 font-bold text-3xl sm:text-4xl lg:text-4xl px-4">
            <h1 className="text-green-900">
                سلة التسوق 
            </h1>
        </div>
        
        {productCar.map((product) => {
            const cartItem = state.cart.find((item) => item.id === product.id);
            const itemCount = cartItem?.count || 0;

            return (
                <div key={product.id} className="mt-8">
         
                    {/* Mobile Layout */}
                    <div className="lg:hidden">
                        <div className="flex flex-col bg-white rounded-lg shadow hover:shadow-md transition mx-4 sm:mx-auto sm:max-w-2xl">
                            <div className="w-full">
                                <Image 
                                    src={product.image}
                                    alt={product.title}
                                    width={300}
                                    height={300}
                                    className="w-full h-64 sm:h-80 object-cover rounded-t-lg"
                                />
                            </div>

                            <div className="p-4 sm:p-6">
                                <div className="flex-1 text-right mb-4">
                                    <h2 className="text-base sm:text-lg font-semibold text-slate-900">{product.title}</h2>
                                    <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-3">{product.description}</p>
                                    <div className="flex flex-col gap-2 mt-3">
                                        <p className="text-xs sm:text-sm">
                                            <span className="text-slate-600">السعر: </span>
                                            <span className="font-semibold">{product.price}</span>
                                        </p>
                                        <p className="text-xs sm:text-sm">
                                            <span className="text-slate-600">الإجمالي: </span>
                                            <span className="font-bold text-emerald-700">
                                                {itemCount * product.price}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-3 flex-row-reverse">
                                    <button
                                        onClick={() => safeDispatch({type:"REMOVE_FROM_CART",payload:product.id})}
                                        className="text-red-500 hover:text-red-700 transition flex-shrink-0"
                                        aria-label="حذف من السلة"
                                    >
                                        <Trash2 className="w-6 h-6 sm:w-7 sm:h-7" />
                                    </button>

                                    <div className="flex items-center gap-2 bg-gray-100 rounded p-2 flex-shrink-0">
                                        <button
                                            onClick={() => safeDispatch({type:"increment",payload:product.id})}
                                            className="border border-green-400 bg-white hover:bg-green-50 px-2 sm:px-3 py-1 text-sm font-semibold transition rounded"
                                        >
                                            +
                                        </button>
                                        <span className="border border-gray-300 px-2 sm:px-3 py-1 text-sm font-semibold bg-white rounded w-8 text-center">
                                            {itemCount}
                                        </span>
                                        <button
                                            onClick={() => safeDispatch({type:"decrement",payload:product.id})}
                                            className="border border-gray-300 bg-white hover:bg-gray-50 px-2 sm:px-3 py-1 text-sm font-semibold transition rounded"
                                        >
                                            -
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Layout - Original Design */}
                    <div className="hidden lg:block">
                        <div className="flex items-center w-[95%] mx-auto shadow mt-8 p-4 bg-white rounded-lg min-h-[160px]">
                            <Trash2 onClick={() => safeDispatch({type:"REMOVE_FROM_CART",payload:product.id})} className="mr-5 cursor-pointer hover:text-red-500" />
                            <div className="w-1/3 mr-5 flex justify-center">
                                <div className="flex justify-between items-center gap-4">
                                    <button className="border px-8 text-green-400 py-1" onClick={() => safeDispatch({type:"increment",payload:product.id})}>+</button>
                                    <p className="border px-8 py-1">{itemCount}</p>
                                    <button className="border px-8 py-1" onClick={() => safeDispatch({type:"decrement",payload:product.id})}>-</button>
                                </div>
                            </div>
                            <div className="flex justify-between ml-5 items-center w-2/3">
                                <div className="flex-1 text-right px-6">
                                    <h2 className="mb-2 font-bold text-lg">{product.title}</h2>
                                    <p className="mb-4 text-sm text-gray-600 line-clamp-2">{product.description}</p>
                                    <div className="flex justify-end gap-10 items-center">
                                        <h4>{product.price}</h4>
                                        <h2 className="text-red-500 font-bold"><strong className="ml-1 text-black">اجمالي السعر:</strong>{itemCount * product.price}</h2>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <Image 
                                        src={product.image}
                                        alt={product.title}
                                        width={150}
                                        height={150}
                                        className="w-32 h-32 object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}

        {/* Summary Section */}
        {productCar.length > 0 ? (
            <div>
                {/* Mobile Summary */}
                <div className="lg:hidden bg-white rounded-lg shadow p-4 sm:p-6 mx-4 sm:mx-auto sm:max-w-2xl mt-8 sm:mt-10">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 text-right">ملخص الطلب</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs sm:text-sm">
                            <span className="text-slate-600">سعر الطلب:</span>
                            <span className="font-semibold">{subtotal}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm">
                            <span className="text-slate-600">رسوم التوصيل:</span>
                            <span className="font-semibold">10</span>
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm">
                            <span className="text-slate-600">رسوم الخدمة:</span>
                            <span className="font-semibold">{serviceFee}</span>
                        </div>
                        <hr className="my-3" />
                        <div className="flex justify-between items-center text-sm sm:text-base ">
                            <span className="font-bold text-slate-900">الإجمالي:</span>
                            <span className="font-bold text-emerald-700">{totalFinalPrice}</span>
                        </div>
                    </div>
                    <Link href="/checkout" className="block w-full mt-6 rounded-md bg-emerald-800 px-6 py-2.5 sm:py-3 text-center text-sm sm:text-base font-semibold text-white transition hover:bg-emerald-700">
                        
                            إتمام الطلب
                        
                    </Link>
                </div>

                {/* Desktop Summary - Original Design */}
                <div className="hidden lg:block">
                    <div className="w-11/12 flex justify-between items-center mx-auto mt-5">
                        <h3>سعر الطلب:</h3>
                        <h2 className="font-bold text-2xl">{subtotal}</h2>
                    </div>
                    <div className="w-11/12 flex justify-between items-center mx-auto mt-5">
                        <h3>:رسوم التوصيل:</h3>
                        <h2 className="font-bold text-2xl">{deliveryFee}</h2>
                    </div>
                    <div className="w-11/12 flex justify-between items-center mx-auto my-5">
                        <h3>رسوم الخدمة:</h3>
                        <h2 className="font-bold text-2xl">{serviceFee}</h2>
                    </div>
                    <hr />
                    <div className="w-11/12 flex justify-between items-center mx-auto mt-5 w-[50%] mx-auto  mb-8">
                        <h3>اجمالي السعر الكلى:</h3>
                        <h2 className="text-green-500 font-bold text-2xl">{totalFinalPrice}</h2>
                    </div>
                    <div className="w-1/12 mx-auto">
                        <Link href="/checkout" className="rounded-md bg-emerald-800 px-6 py-2.5 text-sm font-semibold text-white transition mb-5 hover:bg-emerald-700 ">
                            اتمام الطلب
                        </Link>
                    </div>
                </div>
            </div>
        ) : (
            <div>
                {/* Mobile Empty State */}
                <div className="lg:hidden text-center mt-10 px-4">
                    <h1 className="text-base sm:text-lg text-slate-600 mb-6">لا يوجد منتجات في السلة</h1>
                    <button className="rounded-md bg-emerald-800 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white transition hover:bg-emerald-700">
                        انتقل للمنتجات
                    </button>
                </div>

                {/* Desktop Empty State - Original Design */}
                <div className="hidden lg:block">
                    <h1 className="text-center mt-10">لا يوجد منتجات في السلة</h1>
                    <div className="w-2/12 transform mx-auto mt-6">
                    <Link href="/products" >
                        <button className="rounded-md bg-emerald-800 px-22 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700">
                            انتقل للمنتجات
                        </button>
                    </Link>
                    </div>
                </div>
            </div>
        )}
    </div>
  );

}