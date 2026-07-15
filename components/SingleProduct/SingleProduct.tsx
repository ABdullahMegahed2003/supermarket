"use client";
import { toast } from "sonner";
import { useContext } from "react";
import Image from "next/image";

import { FaArrowRight } from "react-icons/fa";
import { CartContext } from "@/store/idproductsReducer";
import { products } from "@/data/products";
import { useRouter } from "next/navigation";
import useProduct from "@/hooks/useProduct";
import HeartButton from "../HeartButton/HeartButton";
type Props = {
    id: string;
};

export default function SingleProduct({ id }: Props) {
  const cartContext = useContext(CartContext);
  const router = useRouter();
  const { Quantity, SetQuantity } = useProduct();
  const { dispatch } = cartContext ?? { dispatch: undefined };
  const safeDispatch = dispatch ?? (() => undefined);

  // get product
  const product = products.find((item) => item.id === Number(id));

  if (!cartContext) {
    return null;
  }

  if (!product) {
    return null;
  }

  const idProduct = product.id;
  const TotalPrice = Quantity * product.price;
  
  


return ( 
<div className="w-11/12 mx-auto h[90vh] mb-10">
<div className="my-5">
<div onClick={()=> router.back()}>
<FaArrowRight/>
</div>
</div>
{/* img text */}
<div className="w-full h-3/5 lg:flex lg:justify-between lg:items-center flex-row-reverse">
    {/* img */}
   <div className="w-full h-[40vh] md:h-[50vh] lg:w-1/2 overflow-hidden relative">
  <Image
    src={product!.image}
    alt={product!.title}
    fill
    priority
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover object-center rounded-2xl"
  />
</div>
    {/* text */}
    <div className="mt-4">

        <h1 className="lg:text-4xl font-bold" >{product?.title}</h1>
          <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 mt-4 lg:mt-16 lg:text-2xl">
                    {product?.rating} ★
                  </span>
                  <p className="mt-4 text-lg font-extrabold text-green-700 lg:mt-16 lg:text-2xl">{product?.price} <span className="text-black">جنيه</span></p>
                  <p className="mt-4 opacity-80 lg:mt-8">{product?.description}</p>
                   {/* Total price */}
                   { Quantity > 1 && <div className="flex justify-between items-center mt-4 text-green-800 ">
                    <h3>الاجمالى</h3>
                    <strong>{TotalPrice}  جنيه </strong>
                  </div>}
                  


    </div>

</div>
 {/* button live add cart */}

 <div className="flex justify-between items-center w-full mt-6 lg:mt-22">
    {/* live */}
    
                    <HeartButton id={idProduct!}/>
        {/* button */}
        <div className="w-1/2">
            <button className="w-full bg-green-400 rounded-2xl h-10 hover:bg-green-500 hover:font-bold" 
            onClick={() => {
  safeDispatch({
    type: "ADD_TO_CART",
    payload: {
      id: product.id,
      count: Quantity,
    },
  })
  SetQuantity(1);
  toast.success("تم إضافة المنتج إلى السلة بنجاح");
                      toast.success("تمت إضافة المنتج", {
                    description: "يمكنك مراجعة السلة الآن",
});
}
}>
                أضف الى السلة
            </button>
        </div>
        {/* Quantity increase/decrease button */}
        <div className="w-1/5  flex justify-between items-center ">
            
                <button onClick={()=>SetQuantity(Quantity+1)} className="text-4xl" >+</button>
                <strong className="text-green-600">{Quantity}</strong>
                <button className="text-4xl" onClick={() => {
  SetQuantity((prev) => (prev > 1 ? prev - 1 : 1));
}}>-</button>
            
        </div>

 </div>
</div>


 );
 
}