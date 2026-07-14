import { useState } from "react";
import { Props } from "@/types/product";

export default function useProduct() {
  const [Quantity,SetQuantity] = useState<number>(1);
  const [QuantityAll,SetQuantityAll] = useState<Props[]>([]);


    return {Quantity, SetQuantity,QuantityAll,SetQuantityAll};
}